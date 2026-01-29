import type { Question, QuestionId } from "../questions/types";

export type EvaluateAnswerResult = {
  isComplete: boolean;
  isCorrect: boolean;
  requiredSelections: number;
};

export type QuizSessionPhase = "answering" | "feedback" | "complete";

export type QuizAnswer = {
  questionId: QuestionId;
  selectedAnswers: string[];
  result: EvaluateAnswerResult;
};

export type QuizSession = {
  questions: Question[];
  currentIndex: number;
  phase: QuizSessionPhase;
  answers: QuizAnswer[];
};

export type QuizProgressSummary = {
  totalQuestions: number;
  answeredCount: number;
  remainingCount: number;
  currentNumber: number | null;
  currentIndex: number;
  phase: QuizSessionPhase;
};
