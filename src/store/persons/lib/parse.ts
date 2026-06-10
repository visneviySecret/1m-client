export function parseFilterId(filterId: string): number | undefined {
  const trimmedFilterId = filterId.trim();

  if (!trimmedFilterId) {
    return undefined;
  }

  const parsedId = Number(trimmedFilterId);

  if (Number.isNaN(parsedId)) {
    return undefined;
  }

  return parsedId;
}
