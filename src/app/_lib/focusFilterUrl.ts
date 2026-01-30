import {
  normalizeFocusFilter,
  type FocusFilter,
  type FocusFilterInput,
} from "@/core/domain/engine";

type SearchParamValue = string | string[] | null | undefined;

export type FocusFilterParams = {
  tags?: SearchParamValue;
  match?: SearchParamValue;
};

function splitTagValue(value: string): string[] {
  return value.split(",");
}

function coerceParamValue(value: SearchParamValue): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  if (value === null || value === undefined) {
    return undefined;
  }

  return value;
}

function coerceTagValues(value: SearchParamValue): string[] {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(splitTagValue);
  }

  return splitTagValue(value);
}

export function parseFocusFilterParams(params: FocusFilterParams): FocusFilter {
  const tags = coerceTagValues(params.tags);
  const match = coerceParamValue(params.match);

  return normalizeFocusFilter({ tags, match });
}

export function parseFocusFilterFromSearchParams(
  searchParams: URLSearchParams,
): FocusFilter {
  return parseFocusFilterParams({
    tags: searchParams.get("tags"),
    match: searchParams.get("match"),
  });
}

export function buildFocusFilterSearchParams(
  filter: FocusFilterInput,
): URLSearchParams {
  const normalized = normalizeFocusFilter(filter);
  const params = new URLSearchParams();

  if (normalized.tags.length > 0) {
    params.set("tags", normalized.tags.join(","));
  }

  params.set("match", normalized.match);

  return params;
}

export function serializeFocusFilter(filter: FocusFilterInput): string {
  return buildFocusFilterSearchParams(filter).toString();
}
