import { createQuizSession, filterQuestionsByFocus } from "@/core/domain/engine";
import { listSeedQuestions } from "@/core/domain/questions/seedQuestions";
import {
  parseFocusFilterParams,
  serializeFocusFilter,
} from "@/app/_lib/focusFilterUrl";
import { shuffleQuestionOptions } from "@/app/_lib/shuffleQuestionOptions";

import PlayClient from "./PlayClient";

type PlayPageProps = {
  searchParams: {
    tags?: string | string[];
    match?: string | string[];
  };
};

export default function PlayPage({ searchParams }: PlayPageProps) {
  const questions = shuffleQuestionOptions(listSeedQuestions());
  const focusFilter = parseFocusFilterParams({
    tags: searchParams.tags,
    match: searchParams.match,
  });
  const filteredQuestions = filterQuestionsByFocus(questions, focusFilter);
  const session = createQuizSession(filteredQuestions);

  return (
    <PlayClient
      initialSession={session}
      initialFilterKey={serializeFocusFilter(focusFilter)}
      questions={questions}
    />
  );
}
