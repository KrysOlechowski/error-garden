import type { EvaluateAnswerResult } from "./types";

function normalizeAnswer(answer: string): string {
  return answer.trim().replace(/\s+/g, " ").toLowerCase();
}

function normalizeUnique(answers: string[]): string[] {
  return [...new Set(answers.map(normalizeAnswer))];
}

function isSameSet(left: string[], right: string[]): boolean {
  if (left.length !== right.length) {
    return false;
  }

  const rightSet = new Set(right);
  return left.every((value) => rightSet.has(value));
}

export function evaluateAnswer(
  correctAnswers: string[],
  selectedAnswers: string[],
): EvaluateAnswerResult {
  const normalizedCorrect = normalizeUnique(correctAnswers);
  const normalizedSelected = normalizeUnique(selectedAnswers);
  const requiredSelections = normalizedCorrect.length;
  const isComplete = normalizedSelected.length >= requiredSelections;
  const isCorrect = isComplete && isSameSet(normalizedSelected, normalizedCorrect);

  return {
    isComplete,
    isCorrect,
    requiredSelections,
  };
}
