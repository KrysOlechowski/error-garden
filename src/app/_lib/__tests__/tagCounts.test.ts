import { describe, expect, it } from "vitest";

import type { Question } from "@/core/domain/questions/types";
import { countTags } from "../tagCounts";

const questionA: Question = {
  questionId: "count-q-1",
  prompt: "Question A",
  options: ["Alpha", "Beta", "Gamma", "Delta"],
  correctAnswers: ["Alpha"],
  explanation: "Answer A",
  trapId: "js-loose-equality",
  tags: ["js", "closures"],
};

const questionB: Question = {
  questionId: "count-q-2",
  prompt: "Question B",
  options: ["Alpha", "Beta", "Gamma", "Delta"],
  correctAnswers: ["Beta"],
  explanation: "Answer B",
  trapId: "js-this-binding",
  tags: ["js", "functions"],
};

const questionC: Question = {
  questionId: "count-q-3",
  prompt: "Question C",
  options: ["Alpha", "Beta", "Gamma", "Delta"],
  correctAnswers: ["Gamma"],
  explanation: "Answer C",
  trapId: "ts-never-narrowing",
  tags: ["ts", "types"],
};

describe("countTags", () => {
  it("counts tags across all questions", () => {
    const counts = countTags([questionA, questionB, questionC]);

    expect(counts.get("js")).toBe(2);
    expect(counts.get("closures")).toBe(1);
    expect(counts.get("functions")).toBe(1);
    expect(counts.get("ts")).toBe(1);
    expect(counts.get("types")).toBe(1);
  });

  it("returns empty map for no questions", () => {
    const counts = countTags([]);

    expect(counts.size).toBe(0);
  });
});
