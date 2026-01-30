import type { Question } from "@/core/domain/questions/types";

type Rng = () => number;

function shuffleList<T>(items: T[], rng: Rng): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

export function shuffleQuestionOptions(
  questions: Question[],
  rng: Rng = Math.random,
): Question[] {
  return questions.map((question) => ({
    ...question,
    options: shuffleList(question.options, rng),
  }));
}
