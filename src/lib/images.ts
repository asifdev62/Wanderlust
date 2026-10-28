/**
 * Google Images share links point at an HTML page, not the image itself.
 * They carry the real file in the `imgurl` query parameter.
 */
export function normalizeImageUrl(value: string | null | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return "";
  }

  try {
    const url = new URL(trimmed);

    if (
      /^(?:www\.|images\.)?google\.[a-z.]+$/i.test(url.hostname) &&
      url.pathname === "/imgres"
    ) {
      const embedded = url.searchParams.get("imgurl");

      if (embedded) {
        return embedded;
      }
    }
  } catch {
    return trimmed;
  }

  return trimmed;
}
