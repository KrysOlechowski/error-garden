import type { Question } from "../questions/types";
import type {
  FocusFilter,
  FocusFilterInput,
  FocusMatch,
} from "./types";

export const FOCUS_MATCHES: FocusMatch[] = ["any", "all"];
export const DEFAULT_FOCUS_MATCH: FocusMatch = "any";

function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}

export function normalizeFocusTags(tags: string[]): string[] {
  const normalized = tags
    .map(normalizeTag)
    .filter((tag) => tag.length > 0);

  return [...new Set(normalized)];
}

export function normalizeFocusMatch(match?: string | null): FocusMatch {
  return match === "all" ? "all" : DEFAULT_FOCUS_MATCH;
}

export function normalizeFocusFilter(filter: FocusFilterInput): FocusFilter {
  return {
    tags: normalizeFocusTags(filter.tags),
    match: normalizeFocusMatch(filter.match),
  };
}

function toTagSet(tags: string[]): Set<string> {
  return new Set(normalizeFocusTags(tags));
}

function isMatch(
  questionTags: Set<string>,
  filterTags: string[],
  match: FocusMatch,
): boolean {
  if (filterTags.length === 0) {
    return true;
  }

  if (match === "all") {
    return filterTags.every((tag) => questionTags.has(tag));
  }

  return filterTags.some((tag) => questionTags.has(tag));
}

export function isQuestionMatchingFocus(
  question: Question,
  filter: FocusFilterInput,
): boolean {
  const normalizedFilter = normalizeFocusFilter(filter);
  const questionTags = toTagSet(question.tags);

  return isMatch(questionTags, normalizedFilter.tags, normalizedFilter.match);
}

export function filterQuestionsByFocus(
  questions: Question[],
  filter: FocusFilterInput,
): Question[] {
  const normalizedFilter = normalizeFocusFilter(filter);

  if (normalizedFilter.tags.length === 0) {
    return [...questions];
  }

  return questions.filter((question) =>
    isMatch(
      toTagSet(question.tags),
      normalizedFilter.tags,
      normalizedFilter.match,
    ),
  );
}
