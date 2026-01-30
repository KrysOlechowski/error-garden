import { describe, expect, it } from "vitest";

import type { Question } from "@/core/domain/questions/types";
import { shuffleQuestionOptions } from "../shuffleQuestionOptions";

function createRng(values: number[]): () => number {
  let index = 0;

  return () => {
    const value = values[index % values.length] ?? 0;
    index += 1;
    return value;
  };
}

const baseQuestion: Question = {
  questionId: "shuffle-q-1",
  prompt: "Pick one",
  options: ["Alpha", "Beta", "Gamma", "Delta"],
  correctAnswers: ["Alpha"],
  explanation: "Only one is correct.",
  trapId: "js-loose-equality",
  tags: ["js", "basics"],
};

describe("shuffleQuestionOptions", () => {
  it("shuffles options without mutating the original question", () => {
    const rng = createRng([0, 0, 0, 0]);
    const questions = [baseQuestion];

    const shuffled = shuffleQuestionOptions(questions, rng);

    expect(shuffled).not.toBe(questions);
    expect(shuffled[0]).not.toBe(baseQuestion);
    expect(baseQuestion.options).toEqual(["Alpha", "Beta", "Gamma", "Delta"]);
    expect(shuffled[0]?.options).toEqual(["Beta", "Gamma", "Delta", "Alpha"]);
  });

  it("preserves the same option set", () => {
    const rng = createRng([0.9, 0.1, 0.2, 0.8]);
    const shuffled = shuffleQuestionOptions([baseQuestion], rng);

    expect(new Set(shuffled[0]?.options)).toEqual(new Set(baseQuestion.options));
  });
});
