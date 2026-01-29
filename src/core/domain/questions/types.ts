import type { TrapId } from "../traps/types";

export type QuestionId = string;

export type Question = {
  questionId: QuestionId;
  prompt: string;
  correctAnswers: string[];
  explanation: string;
  trapId: TrapId;
  tags: string[];
};
