export { evaluateAnswer, getRequiredSelections } from "./evaluateAnswer";
export type { EvaluateAnswerResult } from "./types";
export {
  DEFAULT_FOCUS_MATCH,
  FOCUS_MATCHES,
  filterQuestionsByFocus,
  isQuestionMatchingFocus,
  normalizeFocusFilter,
  normalizeFocusMatch,
  normalizeFocusTags,
} from "./focusFilter";
export {
  advanceSession,
  createQuizSession,
  getCurrentQuestion,
  getLastAnswer,
  getProgressSummary,
  getRequiredSelectionsForQuestion,
  getRequiredSelectionsForCurrentQuestion,
  submitAnswer,
} from "./quizSession";
export type {
  QuizAnswer,
  QuizProgressSummary,
  QuizSession,
  QuizSessionPhase,
  FocusFilter,
  FocusFilterInput,
  FocusMatch,
} from "./types";
