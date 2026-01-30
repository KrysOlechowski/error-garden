import { describe, expect, it } from "vitest";

import { listSeedQuestions } from "../seedQuestions";

const BASE_TAGS = new Set(["js", "ts", "react", "absurd"]);

function getBaseTags(tags: string[]): string[] {
  return tags.filter((tag) => BASE_TAGS.has(tag));
}

function normalizeAnswer(answer: string): string {
  return answer.trim().replace(/\s+/g, " ").toLowerCase();
}

describe("seed questions", () => {
  it("provides at least 10 questions", () => {
    const questions = listSeedQuestions();

    expect(questions.length).toBeGreaterThanOrEqual(10);
  });

  it("keeps question ids unique", () => {
    const questions = listSeedQuestions();
    const ids = new Set(questions.map((question) => question.questionId));

    expect(ids.size).toBe(questions.length);
  });

  it("requires at least one correct answer per question", () => {
    const questions = listSeedQuestions();

    questions.forEach((question) => {
      expect(question.correctAnswers.length).toBeGreaterThan(0);
      expect(
        question.correctAnswers.every(
          (answer) => typeof answer === "string" && answer.length > 0,
        ),
      ).toBe(true);
    });
  });

  it("requires exactly four options and keeps correct answers within options", () => {
    const questions = listSeedQuestions();

    questions.forEach((question) => {
      expect(question.options).toHaveLength(4);
      expect(
        question.options.every(
          (option) => typeof option === "string" && option.length > 0,
        ),
      ).toBe(true);

      const normalizedOptions = new Set(
        question.options.map((option) => normalizeAnswer(option)),
      );
      expect(normalizedOptions.size).toBe(question.options.length);

      const normalizedCorrect = new Set(
        question.correctAnswers.map((answer) => normalizeAnswer(answer)),
      );
      expect(normalizedCorrect.size).toBe(question.correctAnswers.length);
      expect(question.correctAnswers.length).toBeLessThanOrEqual(
        question.options.length,
      );

      question.correctAnswers.forEach((answer) => {
        expect(normalizedOptions.has(normalizeAnswer(answer))).toBe(true);
      });
    });
  });

  it("ensures each question has exactly one base tag", () => {
    const questions = listSeedQuestions();

    questions.forEach((question) => {
      expect(question.tags.length).toBeGreaterThan(0);
      expect(getBaseTags(question.tags)).toHaveLength(1);
    });
  });

  it("includes at least two absurd base tags", () => {
    const questions = listSeedQuestions();
    const absurdCount = questions.filter((question) =>
      question.tags.includes("absurd"),
    ).length;

    expect(absurdCount).toBeGreaterThanOrEqual(2);
  });
});
