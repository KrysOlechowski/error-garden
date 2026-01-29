import type { Question } from "../questions/types";
import type { QuizAnswer, QuizProgressSummary, QuizSession } from "./types";
import { evaluateAnswer, getRequiredSelections } from "./evaluateAnswer";

export function createQuizSession(questions: Question[]): QuizSession {
  const initialQuestions = [...questions];
  const phase = initialQuestions.length === 0 ? "complete" : "answering";

  return {
    questions: initialQuestions,
    currentIndex: 0,
    phase,
    answers: [],
  };
}

export function getCurrentQuestion(session: QuizSession): Question | null {
  if (session.phase === "complete") {
    return null;
  }

  return session.questions[session.currentIndex] ?? null;
}

export function getLastAnswer(session: QuizSession): QuizAnswer | null {
  if (session.answers.length === 0) {
    return null;
  }

  return session.answers[session.answers.length - 1] ?? null;
}

export function getProgressSummary(session: QuizSession): QuizProgressSummary {
  const totalQuestions = session.questions.length;
  const answeredCount = session.answers.length;
  const remainingCount = Math.max(totalQuestions - answeredCount, 0);
  const currentNumber =
    session.phase === "complete" || totalQuestions === 0
      ? null
      : Math.min(session.currentIndex + 1, totalQuestions);

  return {
    totalQuestions,
    answeredCount,
    remainingCount,
    currentNumber,
    currentIndex: session.currentIndex,
    phase: session.phase,
  };
}

export function getRequiredSelectionsForQuestion(question: Question): number {
  // Domain-only: lets UI show required count without exposing correct answers or reimplementing normalization.
  return getRequiredSelections(question.correctAnswers);
}

export function getRequiredSelectionsForCurrentQuestion(
  session: QuizSession,
): number | null {
  if (session.phase !== "answering") {
    return null;
  }

  const currentQuestion = getCurrentQuestion(session);
  if (!currentQuestion) {
    return null;
  }

  return getRequiredSelectionsForQuestion(currentQuestion);
}

export function submitAnswer(
  session: QuizSession,
  selectedAnswers: string[],
): QuizSession {
  if (session.phase !== "answering") {
    return session;
  }

  const currentQuestion = getCurrentQuestion(session);
  if (!currentQuestion) {
    return {
      ...session,
      phase: "complete",
    };
  }

  const result = evaluateAnswer(currentQuestion.correctAnswers, selectedAnswers);
  if (!result.isComplete) {
    return session;
  }

  const answer: QuizAnswer = {
    questionId: currentQuestion.questionId,
    selectedAnswers: [...selectedAnswers],
    result,
  };

  return {
    ...session,
    answers: [...session.answers, answer],
    phase: "feedback",
  };
}

export function advanceSession(session: QuizSession): QuizSession {
  if (session.phase !== "feedback") {
    return session;
  }

  const nextIndex = session.currentIndex + 1;
  if (nextIndex >= session.questions.length) {
    const lastIndex = Math.max(session.questions.length - 1, 0);
    return {
      ...session,
      currentIndex: lastIndex,
      phase: "complete",
    };
  }

  return {
    ...session,
    currentIndex: nextIndex,
    phase: "answering",
  };
}
