import { describe, expect, it } from "vitest";

import {
  buildFocusFilterSearchParams,
  parseFocusFilterParams,
  parseFocusFilterFromSearchParams,
  serializeFocusFilter,
} from "../focusFilterUrl";

describe("focus filter url helpers", () => {
  it("normalizes tags and match from params", () => {
    const filter = parseFocusFilterParams({
      tags: " JS, React ,js",
      match: "all",
    });

    expect(filter).toEqual({
      tags: ["js", "react"],
      match: "all",
    });
  });

  it("handles array params for tags and match", () => {
    const filter = parseFocusFilterParams({
      tags: ["js,react", "ts"],
      match: ["any", "all"],
    });

    expect(filter.tags).toEqual(["js", "react", "ts"]);
    expect(filter.match).toBe("any");
  });

  it("reads repeated tags from URLSearchParams", () => {
    const params = new URLSearchParams();
    params.append("tags", "js");
    params.append("tags", "react");
    params.append("match", "all");

    const filter = parseFocusFilterFromSearchParams(params);

    expect(filter.tags).toEqual(["js", "react"]);
    expect(filter.match).toBe("all");
  });

  it("builds params with a safe default match", () => {
    const params = buildFocusFilterSearchParams({
      tags: [],
    });

    expect(params.get("match")).toBe("any");
    expect(params.has("tags")).toBe(false);
  });

  it("serializes params consistently", () => {
    const params = buildFocusFilterSearchParams({
      tags: ["React", " js "],
      match: "all",
    });

    expect(params.get("tags")).toBe("react,js");
    expect(params.get("match")).toBe("all");

    expect(serializeFocusFilter({ tags: ["js"], match: "all" })).toBe(
      "tags=js&match=all",
    );
  });
});
