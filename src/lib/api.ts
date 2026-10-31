  /**
 * Central base URL for the Wanderlast Express API.
 *
 * Configure it with NEXT_PUBLIC_API_URL in `.env.local` (or the deployment
 * environment). Trailing slashes are removed so endpoint concatenation never
 * produces duplicate slashes.
 */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? ""
).replace(/\/+$/, "");
