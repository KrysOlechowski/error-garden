import { describe, expect, it } from "vitest";

import type { Question } from "../../questions/types";
import {
  DEFAULT_FOCUS_MATCH,
  filterQuestionsByFocus,
  isQuestionMatchingFocus,
  normalizeFocusMatch,
  normalizeFocusTags,
} from "../focusFilter";

const questionA: Question = {
  questionId: "filter-q-1",
  prompt: "Question A",
  correctAnswers: ["Alpha"],
  explanation: "Answer A",
  trapId: "js-loose-equality",
  tags: ["js", "closures", "basics"],
};

const questionB: Question = {
  questionId: "filter-q-2",
  prompt: "Question B",
  correctAnswers: ["Beta"],
  explanation: "Answer B",
  trapId: "ts-never-narrowing",
  tags: ["ts", "types"],
};

const questionC: Question = {
  questionId: "filter-q-3",
  prompt: "Question C",
  correctAnswers: ["Gamma"],
  explanation: "Answer C",
  trapId: "react-stale-closure",
  tags: ["react", "hooks", "js"],
};

const allQuestions = [questionA, questionB, questionC];

describe("focus filter", () => {
  it("normalizes focus tags for case, whitespace, and duplicates", () => {
    expect(normalizeFocusTags([" JS ", "js", "", "Closures"]))
      .toEqual(["js", "closures"]);
  });

  it("normalizes focus match with a safe default", () => {
    expect(normalizeFocusMatch("all")).toBe("all");
    expect(normalizeFocusMatch("any")).toBe(DEFAULT_FOCUS_MATCH);
    expect(normalizeFocusMatch("unknown")).toBe(DEFAULT_FOCUS_MATCH);
    expect(normalizeFocusMatch(undefined)).toBe(DEFAULT_FOCUS_MATCH);
  });

  it("returns all questions when no tags are selected", () => {
    const result = filterQuestionsByFocus(allQuestions, {
      tags: [],
      match: "any",
    });

    expect(result).toHaveLength(3);
    expect(result).toEqual(allQuestions);
    expect(result).not.toBe(allQuestions);
  });

  it("matches any tag when match=any", () => {
    const result = filterQuestionsByFocus(allQuestions, {
      tags: ["js"],
      match: "any",
    });

    expect(result).toEqual([questionA, questionC]);
  });

  it("matches all tags when match=all", () => {
    const result = filterQuestionsByFocus(allQuestions, {
      tags: ["js", "closures"],
      match: "all",
    });

    expect(result).toEqual([questionA]);
  });

  it("matches with normalized tags", () => {
    expect(
      isQuestionMatchingFocus(questionA, {
        tags: [" JS ", "CLOSURES"],
        match: "all",
      }),
    ).toBe(true);
  });
});
