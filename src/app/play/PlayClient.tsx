"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { FocusMatch, QuizSession } from "@/core/domain/engine";
import {
  advanceSession,
  createQuizSession,
  filterQuestionsByFocus,
  FOCUS_MATCHES,
  getCurrentQuestion,
  getLastAnswer,
  getProgressSummary,
  getRequiredSelectionsForCurrentQuestion,
  submitAnswer,
} from "@/core/domain/engine";
import type { Question } from "@/core/domain/questions/types";
import {
  buildFocusFilterSearchParams,
  parseFocusFilterFromSearchParams,
  serializeFocusFilter,
} from "@/app/_lib/focusFilterUrl";

import { PLAY_COPY } from "./copy";

type PlayClientProps = {
  initialSession: QuizSession;
  questions: Question[];
  initialFilterKey: string;
};

function buildTagList(questions: Question[]): string[] {
  const tags = new Set<string>();

  questions.forEach((question) => {
    question.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort((left, right) => left.localeCompare(right));
}

export default function PlayClient({
  initialSession,
  questions,
  initialFilterKey,
}: PlayClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const focusFilter = useMemo(
    () => parseFocusFilterFromSearchParams(searchParams),
    [searchParams],
  );
  const filterKey = useMemo(() => serializeFocusFilter(focusFilter), [focusFilter]);

  const [session, setSession] = useState(initialSession);
  const [activeFilterKey, setActiveFilterKey] = useState(initialFilterKey);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const availableTags = useMemo(() => buildTagList(questions), [questions]);
  const summary = getProgressSummary(session);
  const currentQuestion = getCurrentQuestion(session);
  const requiredSelections =
    getRequiredSelectionsForCurrentQuestion(session) ?? 0;
  const lastAnswer = getLastAnswer(session);
  const isComplete = session.phase === "complete";
  const hasQuestions = session.questions.length > 0;

  useEffect(() => {
    if (filterKey === activeFilterKey) {
      return;
    }

    const filteredQuestions = filterQuestionsByFocus(questions, focusFilter);

    setSession(createQuizSession(filteredQuestions));
    setActiveFilterKey(filterKey);
    setSelectedAnswers([]);
  }, [activeFilterKey, filterKey, focusFilter, questions]);

  const updateUrl = (nextFilter: { tags: string[]; match: FocusMatch }) => {
    const params = new URLSearchParams(searchParams);
    params.delete("tags");
    params.delete("match");

    const nextParams = buildFocusFilterSearchParams(nextFilter);
    nextParams.forEach((value, key) => {
      params.set(key, value);
    });

    const query = params.toString();
    router.replace(query.length > 0 ? `${pathname}?${query}` : pathname);
  };

  const toggleTag = (tag: string) => {
    const isSelected = focusFilter.tags.includes(tag);
    const nextTags = isSelected
      ? focusFilter.tags.filter((item) => item !== tag)
      : [...focusFilter.tags, tag];

    updateUrl({ tags: nextTags, match: focusFilter.match });
  };

  const clearTags = () => {
    updateUrl({ tags: [], match: focusFilter.match });
  };

  const setMatch = (match: FocusMatch) => {
    updateUrl({ tags: focusFilter.tags, match });
  };

  const handleOptionSelect = (option: string) => {
    if (session.phase !== "answering") {
      return;
    }

    if (selectedAnswers.includes(option)) {
      return;
    }

    if (requiredSelections <= 0) {
      return;
    }

    const nextSelected = [...selectedAnswers, option];

    if (nextSelected.length >= requiredSelections) {
      const nextSession = submitAnswer(session, nextSelected);
      setSession(nextSession);
      setSelectedAnswers([]);
      return;
    }

    setSelectedAnswers(nextSelected);
  };

  const handleAdvance = () => {
    const nextSession = advanceSession(session);

    setSession(nextSession);
    setSelectedAnswers([]);
  };

  const handleRestart = () => {
    const filteredQuestions = filterQuestionsByFocus(questions, focusFilter);

    setSession(createQuizSession(filteredQuestions));
    setSelectedAnswers([]);
  };

  const correctCount = session.answers.filter((answer) => answer.result.isCorrect)
    .length;

  const tagButtonClass = (active: boolean) =>
    `rounded-full border px-3 py-1 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--play-accent)] ${
      active
        ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-950/30 dark:text-emerald-200"
        : "border-[var(--play-outline)] bg-white/70 text-[var(--play-ink)] hover:border-[var(--play-accent)]"
    }`;

  const matchButtonClass = (active: boolean) =>
    `rounded-2xl border px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--play-accent)] ${
      active
        ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-950/30 dark:text-emerald-200"
        : "border-[var(--play-outline)] bg-white/70 text-[var(--play-ink)] hover:border-[var(--play-accent)]"
    }`;

  const optionButtonClass = (active: boolean) =>
    `rounded-2xl border px-4 py-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--play-accent)] disabled:cursor-not-allowed disabled:opacity-60 ${
      active
        ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-950/30 dark:text-emerald-200"
        : "border-[var(--play-outline)] bg-white/80 text-[var(--play-ink)] hover:border-[var(--play-accent)]"
    }`;

  return (
    <div className="play-theme relative min-h-screen overflow-hidden bg-[var(--play-bg)] text-[var(--play-ink)]">
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(46,107,79,0.25),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-25%] left-[-10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(227,196,140,0.35),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-12 font-sans">
        <header className="max-w-2xl animate-rise-in">
          <span className="inline-flex items-center rounded-full border border-[var(--play-outline)] bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--play-muted)]">
            Play Loop
          </span>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            {PLAY_COPY.title}
          </h1>
          <p className="mt-4 text-lg text-[var(--play-muted)]">
            {PLAY_COPY.subtitle}
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside
            className="rounded-3xl border border-[var(--play-outline)] bg-[var(--play-panel)] p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.4)] animate-rise-in"
            style={{ animationDelay: "120ms" }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{PLAY_COPY.focusTitle}</h2>
              <span className="rounded-full bg-[var(--play-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--play-ink)]">
                URL
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--play-muted)]">
              {PLAY_COPY.focusHint}
            </p>

            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--play-muted)]">
                {PLAY_COPY.matchLabel}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {FOCUS_MATCHES.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={matchButtonClass(focusFilter.match === option)}
                    aria-pressed={focusFilter.match === option}
                    onClick={() => setMatch(option)}
                  >
                    {option === "all" ? PLAY_COPY.matchAll : PLAY_COPY.matchAny}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--play-muted)]">
                {PLAY_COPY.tagsLabel}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className={tagButtonClass(focusFilter.tags.length === 0)}
                  aria-pressed={focusFilter.tags.length === 0}
                  onClick={clearTags}
                >
                  {PLAY_COPY.tagsAll}
                </button>
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={tagButtonClass(focusFilter.tags.includes(tag))}
                    aria-pressed={focusFilter.tags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--play-outline)] bg-white/80 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--play-muted)]">
                {PLAY_COPY.progressLabel}
              </div>
              <div className="mt-2 text-sm font-semibold text-[var(--play-ink)]">
                {summary.currentNumber ? summary.currentNumber : 0} / {summary.totalQuestions}
              </div>
              <div className="mt-1 text-xs text-[var(--play-muted)]">
                {summary.remainingCount} remaining
              </div>
            </div>
          </aside>

          <section
            className="rounded-3xl border border-[var(--play-outline)] bg-[var(--play-panel)] p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.4)] animate-rise-in"
            style={{ animationDelay: "180ms" }}
          >
            {!hasQuestions ? (
              <div className="flex min-h-[320px] flex-col justify-center gap-4">
                <h2 className="text-2xl font-semibold">
                  {PLAY_COPY.emptyStateTitle}
                </h2>
                <p className="text-sm text-[var(--play-muted)]">
                  {PLAY_COPY.emptyStateBody}
                </p>
              </div>
            ) : isComplete ? (
              <div className="flex min-h-[320px] flex-col justify-center gap-4">
                <h2 className="text-2xl font-semibold">
                  {PLAY_COPY.sessionCompleteTitle}
                </h2>
                <p className="text-sm text-[var(--play-muted)]">
                  {PLAY_COPY.sessionCompleteBody}
                </p>
                <div className="rounded-2xl border border-[var(--play-outline)] bg-white/80 p-4 text-sm">
                  <div className="font-semibold">
                    {correctCount} / {session.answers.length} correct
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-[var(--play-accent)] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {PLAY_COPY.startOver}
                </button>
              </div>
            ) : (
              <div className="flex min-h-[320px] flex-col gap-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--play-muted)]">
                      {PLAY_COPY.questionLabel}
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold">
                      {currentQuestion?.prompt}
                    </h2>
                  </div>
                  <div className="rounded-full border border-[var(--play-outline)] bg-white/80 px-4 py-2 text-xs font-semibold text-[var(--play-muted)]">
                    {summary.currentNumber} / {summary.totalQuestions}
                  </div>
                </div>

                {session.phase === "answering" ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--play-muted)]">
                      <span>
                        {PLAY_COPY.requiredLabel}: {requiredSelections}
                      </span>
                      <span>
                        {PLAY_COPY.selectedCountLabel}: {selectedAnswers.length} /{" "}
                        {requiredSelections}
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {(currentQuestion?.options ?? []).map((option) => {
                        const isSelected = selectedAnswers.includes(option);
                        const isDisabled =
                          isSelected || selectedAnswers.length >= requiredSelections;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleOptionSelect(option)}
                            disabled={isDisabled}
                            aria-pressed={isSelected}
                            className={optionButtonClass(isSelected)}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {selectedAnswers.length === 0 ? (
                      <p className="text-sm text-[var(--play-muted)]">
                        {PLAY_COPY.selectPrompt}
                      </p>
                    ) : (
                      <div className="text-sm text-[var(--play-muted)]">
                        {PLAY_COPY.selectedLabel}: {selectedAnswers.join(", ")}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-sm font-semibold">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                          lastAnswer?.result.isCorrect
                            ? "bg-[var(--play-accent-soft)] text-[var(--play-ink)]"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {lastAnswer?.result.isCorrect
                          ? PLAY_COPY.resultCorrect
                          : PLAY_COPY.resultIncorrect}
                      </span>
                      <span className="text-[var(--play-muted)]">
                        {PLAY_COPY.correctAnswersLabel}:
                      </span>
                      <span className="text-[var(--play-ink)]">
                        {currentQuestion?.correctAnswers.join(", ")}
                      </span>
                    </div>
                    <div className="text-sm text-[var(--play-muted)]">
                      {PLAY_COPY.selectedLabel}:{" "}
                      {lastAnswer?.selectedAnswers.join(", ") ?? "-"}
                    </div>

                    <div className="rounded-2xl border border-[var(--play-outline)] bg-white/80 p-4 text-sm">
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--play-muted)]">
                        {PLAY_COPY.explanationLabel}
                      </div>
                      <p className="mt-2 text-sm text-[var(--play-ink)]">
                        {currentQuestion?.explanation}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAdvance}
                      className="inline-flex w-fit items-center justify-center rounded-full bg-[var(--play-accent)] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      {summary.currentNumber === summary.totalQuestions
                        ? PLAY_COPY.finishSession
                        : PLAY_COPY.nextQuestion}
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
