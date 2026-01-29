import { describe, expect, it } from "vitest";

import { listSeedQuestions } from "../seedQuestions";

const BASE_TAGS = new Set(["js", "ts", "react", "absurd"]);

function getBaseTags(tags: string[]): string[] {
  return tags.filter((tag) => BASE_TAGS.has(tag));
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
