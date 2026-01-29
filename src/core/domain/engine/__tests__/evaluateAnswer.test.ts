import { describe, expect, it } from "vitest";

import { evaluateAnswer } from "../evaluateAnswer";

describe("evaluateAnswer", () => {
  it("marks incomplete until required selections are made", () => {
    const result = evaluateAnswer(["One", "Two"], ["One"]);

    expect(result.requiredSelections).toBe(2);
    expect(result.isComplete).toBe(false);
    expect(result.isCorrect).toBe(false);
  });

  it("normalizes whitespace and casing", () => {
    const result = evaluateAnswer(["Loose   Equality"], ["  loose equality "]);

    expect(result.isComplete).toBe(true);
    expect(result.isCorrect).toBe(true);
  });

  it("accepts multi-answer selections in any order", () => {
    const result = evaluateAnswer(["First", "Second"], ["second", "first"]);

    expect(result.isComplete).toBe(true);
    expect(result.isCorrect).toBe(true);
  });

  it("rejects incorrect selections even when complete", () => {
    const result = evaluateAnswer(["Alpha", "Beta"], ["alpha", "gamma"]);

    expect(result.isComplete).toBe(true);
    expect(result.isCorrect).toBe(false);
  });
});
