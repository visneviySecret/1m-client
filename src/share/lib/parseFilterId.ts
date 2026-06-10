export function normalizeIdFilter(filterId: string): string | undefined {
  const trimmedFilterId = filterId.trim();

  if (!trimmedFilterId) {
    return undefined;
  }

  return trimmedFilterId;
}
