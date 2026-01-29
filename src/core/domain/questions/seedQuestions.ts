import type { Question } from "./types";

const seedQuestions: Question[] = [
  {
    questionId: "seed-js-loose-equality-1",
    prompt: "What is the main risk of using loose equality in JavaScript?",
    correctAnswer:
      "It performs type coercion before comparison, so different types can be treated as equal.",
    explanation:
      "Loose equality converts operands to a common type using coercion rules, which can yield surprising matches.",
    trapId: "js-loose-equality",
    tags: ["js", "coercion", "equality"],
  },
  {
    questionId: "seed-js-loose-equality-2",
    prompt:
      "Why can loose equality make two very different-looking values compare as equal?",
    correctAnswer:
      "Because the values are coerced to a common type before comparison.",
    explanation:
      "The coercion rules can transform both sides until they match, even when the originals differ greatly.",
    trapId: "js-loose-equality",
    tags: ["absurd", "coercion", "equality"],
  },
  {
    questionId: "seed-js-this-binding-1",
    prompt:
      "In a regular function call, what decides the value of this in JavaScript?",
    correctAnswer: "The call-site (how the function is invoked).",
    explanation:
      "Calling a function as a method sets this to the receiver; a plain call uses the default binding.",
    trapId: "js-this-binding",
    tags: ["js", "this", "functions"],
  },
  {
    questionId: "seed-react-stale-closure-1",
    prompt: "Why can a React event handler read stale state values?",
    correctAnswer:
      "Because the handler closes over state from the render when it was created.",
    explanation:
      "Closures capture values at render time, so handlers can reference outdated state.",
    trapId: "react-stale-closure",
    tags: ["react", "state", "closures"],
  },
  {
    questionId: "seed-js-var-loop-closure-1",
    prompt:
      "Why do callbacks created in a loop with var often see the same final value?",
    correctAnswer: "var creates a single shared binding for the loop index.",
    explanation:
      "All closures capture the same variable, which ends with the loop's final value.",
    trapId: "js-var-loop-closure",
    tags: ["js", "closures", "loops"],
  },
  {
    questionId: "seed-js-var-loop-closure-2",
    prompt:
      "What scope behavior of var causes common loop closure bugs?",
    correctAnswer: "var is function-scoped rather than block-scoped.",
    explanation:
      "Without block scope, each iteration does not get its own binding.",
    trapId: "js-var-loop-closure",
    tags: ["js", "scope", "loops"],
  },
  {
    questionId: "seed-js-float-precision-1",
    prompt: "Why can decimal math in JavaScript yield slightly off results?",
    correctAnswer:
      "Numbers are IEEE-754 binary floats, so many decimals are not represented exactly.",
    explanation:
      "Binary floating point approximates decimal fractions, leading to rounding artifacts.",
    trapId: "js-float-precision",
    tags: ["js", "numbers", "precision"],
  },
  {
    questionId: "seed-js-implicit-conversion-1",
    prompt: "Why can the plus operator behave inconsistently in JavaScript?",
    correctAnswer:
      "If either operand is a string, it concatenates; otherwise it adds numbers.",
    explanation:
      "The operator switches between string concatenation and numeric addition based on operand types.",
    trapId: "js-implicit-conversion",
    tags: ["js", "operators", "coercion"],
  },
  {
    questionId: "seed-ts-never-narrowing-1",
    prompt:
      "How can a TypeScript union narrow to never unexpectedly?",
    correctAnswer:
      "Overlapping or impossible type guards can eliminate all possibilities.",
    explanation:
      "If checks exclude every union member, TypeScript concludes the branch is impossible.",
    trapId: "ts-never-narrowing",
    tags: ["ts", "narrowing", "control-flow"],
  },
  {
    questionId: "seed-ts-never-narrowing-2",
    prompt:
      "Why might a branch you expect to be reachable get typed as never?",
    correctAnswer:
      "Previous checks already exhaust the union members, leaving no remaining type.",
    explanation:
      "Control-flow analysis can prove the branch is unreachable, producing never.",
    trapId: "ts-never-narrowing",
    tags: ["absurd", "types", "narrowing"],
  },
];

export function listSeedQuestions(): Question[] {
  return [...seedQuestions];
}
