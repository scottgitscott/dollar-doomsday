/* ============================================================
   DOLLAR DOOMSDAY — js/utils.js
   Shared utilities loaded before all other scripts.
   ============================================================ */

/**
 * Fetch with sessionStorage cache.
 * @param {string}   key        - Cache key
 * @param {Function} fetchFn    - Async function that returns data
 * @param {number}   ttlMinutes - Cache TTL in minutes (default 60)
 */
window.fetchWithCache = async function fetchWithCache(key, fetchFn, ttlMinutes = 60) {
  try {
    const cached = sessionStorage.getItem(key);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < ttlMinutes * 60 * 1000) {
        return data;
      }
    }
  } catch (_) {
    // sessionStorage unavailable or parse error — proceed without cache
  }

  const data = await fetchFn();

  try {
    sessionStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch (_) {
    // Storage quota exceeded — ignore
  }

  return data;
};
