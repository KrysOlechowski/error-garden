import type { Trap, TrapId } from "./types";

const traps: Trap[] = [
  {
    trapId: "js-loose-equality",
    name: "Loose equality coercion",
    summary: "`==` performs type coercion that often contradicts intuition.",
  },
  {
    trapId: "js-this-binding",
    name: "Unexpected this binding",
    summary: "`this` depends on call-site and differs between arrow and function.",
  },
  {
    trapId: "js-var-loop-closure",
    name: "var in loops captures one binding",
    summary: "`var` in loops creates a single binding shared by all closures.",
  },
  {
    trapId: "js-float-precision",
    name: "Floating point precision",
    summary: "Binary floating point makes 0.1 + 0.2 !== 0.3.",
  },
  {
    trapId: "ts-never-narrowing",
    name: "Unexpected never narrowing",
    summary: "Narrowing can lead to `never` in branches you assume are reachable.",
  },
  {
    trapId: "react-stale-closure",
    name: "Stale closure in React state",
    summary: "Event handlers can close over outdated state values.",
  },
  {
    trapId: "js-implicit-conversion",
    name: "Implicit string/number conversion",
    summary: "Operators like `+` switch between concat and math based on types.",
  },
];

const trapsById = new Map<TrapId, Trap>(
  traps.map((trap) => [trap.trapId, trap]),
);

export function listTraps(): Trap[] {
  return [...traps];
}

export function getTrapById(trapId: TrapId): Trap | undefined {
  return trapsById.get(trapId);
}

export function hasTrap(trapId: TrapId): boolean {
  return trapsById.has(trapId);
}
