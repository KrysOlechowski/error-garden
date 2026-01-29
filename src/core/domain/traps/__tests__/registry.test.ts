import { describe, expect, it } from "vitest";

import { getTrapById, hasTrap, listTraps } from "../registry";

describe("trap registry", () => {
  it("lists all traps", () => {
    const traps = listTraps();

    expect(traps.length).toBeGreaterThan(0);
    expect(traps.every((trap) => trap.trapId.length > 0)).toBe(true);
  });

  it("retrieves traps by id", () => {
    const trapId = "js-loose-equality";
    const trap = getTrapById(trapId);

    expect(trap).toBeDefined();
    expect(trap?.trapId).toBe(trapId);
  });

  it("reports known ids", () => {
    expect(hasTrap("js-loose-equality")).toBe(true);
    expect(hasTrap("unknown-trap")).toBe(false);
  });
});
