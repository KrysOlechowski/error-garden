import { createQuizSession, filterQuestionsByFocus } from "@/core/domain/engine";
import { listSeedQuestions } from "@/core/domain/questions/seedQuestions";
import {
  parseFocusFilterParams,
  serializeFocusFilter,
} from "@/app/_lib/focusFilterUrl";
import { shuffleQuestionOptions } from "@/app/_lib/shuffleQuestionOptions";

import { Suspense } from "react";

import PlayClient from "./PlayClient";

type PlayPageProps = {
  searchParams: {
    tags?: string | string[];
    match?: string | string[];
  };
};

function PlaySkeleton() {
  return (
    <div className="play-theme relative min-h-screen overflow-hidden bg-(--play-bg) text-(--play-ink)">
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(46,107,79,0.25),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-25%] left-[-10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(227,196,140,0.35),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-12 font-sans">
        <div className="max-w-2xl animate-pulse space-y-4">
          <div className="h-6 w-32 rounded-full bg-(--play-outline)" />
          <div className="h-10 w-3/4 rounded-2xl bg-(--play-outline) opacity-40" />
          <div className="h-6 w-full rounded-2xl bg-(--play-outline) opacity-25" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="min-h-80 rounded-3xl border border-(--play-outline) bg-(--play-panel) p-6 animate-pulse">
            <div className="space-y-4">
              <div className="h-4 w-32 rounded bg-(--play-outline) opacity-60" />
              <div className="h-3 w-48 rounded bg-(--play-outline) opacity-40" />
              <div className="h-24 rounded-2xl bg-(--play-outline) opacity-20" />
              <div className="h-28 rounded-2xl bg-(--play-outline) opacity-20" />
            </div>
          </div>

          <div className="min-h-80 rounded-3xl border border-(--play-outline) bg-(--play-panel) p-6 animate-pulse">
            <div className="space-y-4">
              <div className="h-4 w-24 rounded bg-(--play-outline) opacity-60" />
              <div className="h-8 w-3/4 rounded-2xl bg-(--play-outline) opacity-30" />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="h-12 rounded-2xl bg-(--play-outline) opacity-20" />
                <div className="h-12 rounded-2xl bg-(--play-outline) opacity-20" />
                <div className="h-12 rounded-2xl bg-(--play-outline) opacity-20" />
                <div className="h-12 rounded-2xl bg-(--play-outline) opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlayPage({ searchParams }: PlayPageProps) {
  const questions = shuffleQuestionOptions(listSeedQuestions());
  const focusFilter = parseFocusFilterParams({
    tags: searchParams.tags,
    match: searchParams.match,
  });
  const filteredQuestions = filterQuestionsByFocus(questions, focusFilter);
  const session = createQuizSession(filteredQuestions);

  return (
    <Suspense fallback={<PlaySkeleton />}>
      <PlayClient
        initialSession={session}
        initialFilterKey={serializeFocusFilter(focusFilter)}
        questions={questions}
      />
    </Suspense>
  );
}
