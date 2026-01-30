import type { Question } from "@/core/domain/questions/types";

export function countTags(questions: Question[]): Map<string, number> {
  const counts = new Map<string, number>();

  questions.forEach((question) => {
    question.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  return counts;
}
