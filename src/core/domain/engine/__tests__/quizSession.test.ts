import { describe, expect, it } from "vitest";

import type { Question } from "../../questions/types";
import {
  advanceSession,
  createQuizSession,
  getCurrentQuestion,
  getLastAnswer,
  getProgressSummary,
  getRequiredSelectionsForCurrentQuestion,
  getRequiredSelectionsForQuestion,
  submitAnswer,
} from "../quizSession";

const questionA: Question = {
  questionId: "quiz-q-1",
  prompt: "Pick both answers",
  correctAnswers: ["Alpha", "Beta"],
  explanation: "Both are required.",
  trapId: "js-loose-equality",
  tags: ["js", "basics"],
};

const questionB: Question = {
  questionId: "quiz-q-2",
  prompt: "Single answer",
  correctAnswers: ["Gamma"],
  explanation: "Only one answer.",
  trapId: "js-this-binding",
  tags: ["js", "basics"],
};

describe("quiz session flow", () => {
  it("starts complete when there are no questions", () => {
    const session = createQuizSession([]);

    expect(session.phase).toBe("complete");
    expect(getCurrentQuestion(session)).toBeNull();
  });

  it("creates an answering session with the first question", () => {
    const session = createQuizSession([questionA, questionB]);

    expect(session.phase).toBe("answering");
    expect(session.currentIndex).toBe(0);
    expect(getCurrentQuestion(session)?.questionId).toBe("quiz-q-1");
  });

  it("summarizes quiz progress based on answered questions", () => {
    const session = createQuizSession([questionA, questionB]);
    const initialSummary = getProgressSummary(session);

    expect(initialSummary.totalQuestions).toBe(2);
    expect(initialSummary.answeredCount).toBe(0);
    expect(initialSummary.remainingCount).toBe(2);
    expect(initialSummary.currentNumber).toBe(1);

    const answeredFirst = submitAnswer(session, ["Alpha", "Beta"]);
    const afterFirstSummary = getProgressSummary(answeredFirst);

    expect(afterFirstSummary.answeredCount).toBe(1);
    expect(afterFirstSummary.remainingCount).toBe(1);
    expect(afterFirstSummary.currentNumber).toBe(1);
  });

  it("returns null current number for completed sessions", () => {
    const session = createQuizSession([]);
    const summary = getProgressSummary(session);

    expect(summary.currentNumber).toBeNull();
  });

  it("exposes required selections without leaking answers", () => {
    expect(getRequiredSelectionsForQuestion(questionA)).toBe(2);
    expect(getRequiredSelectionsForQuestion(questionB)).toBe(1);
  });

  it("exposes required selections for the current question", () => {
    const session = createQuizSession([questionA]);

    expect(getRequiredSelectionsForCurrentQuestion(session)).toBe(2);

    const answered = submitAnswer(session, ["Alpha", "Beta"]);
    expect(getRequiredSelectionsForCurrentQuestion(answered)).toBeNull();

    const completed = advanceSession(answered);

    expect(getRequiredSelectionsForCurrentQuestion(completed)).toBeNull();
  });

  it("returns null current number after completing a non-empty session", () => {
    const session = createQuizSession([questionA]);
    const completed = advanceSession(
      submitAnswer(session, ["Alpha", "Beta"]),
    );
    const summary = getProgressSummary(completed);

    expect(summary.currentNumber).toBeNull();
  });

  it("ignores incomplete submissions", () => {
    const session = createQuizSession([questionA]);
    const next = submitAnswer(session, ["Alpha"]);

    expect(next.phase).toBe("answering");
    expect(next.answers).toHaveLength(0);
    expect(getLastAnswer(next)).toBeNull();
  });

  it("records a complete answer and moves to feedback", () => {
    const session = createQuizSession([questionA]);
    const next = submitAnswer(session, ["beta", "alpha"]);

    expect(next.phase).toBe("feedback");
    expect(next.answers).toHaveLength(1);
    expect(getLastAnswer(next)?.result.isCorrect).toBe(true);
  });

  it("advances through questions and completes after the last one", () => {
    const session = createQuizSession([questionA, questionB]);
    const answeredFirst = submitAnswer(session, ["Alpha", "Beta"]);
    const movedToSecond = advanceSession(answeredFirst);

    expect(movedToSecond.phase).toBe("answering");
    expect(getCurrentQuestion(movedToSecond)?.questionId).toBe("quiz-q-2");

    const answeredSecond = submitAnswer(movedToSecond, ["Gamma"]);
    const completed = advanceSession(answeredSecond);

    expect(completed.phase).toBe("complete");
    expect(getCurrentQuestion(completed)).toBeNull();
    expect(completed.currentIndex).toBe(1);
  });
});
