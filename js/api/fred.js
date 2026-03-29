/* ============================================================
   DOLLAR DOOMSDAY — js/api/fred.js
   FRED (Federal Reserve Economic Data) API wrapper

   SETUP: Replace 'YOUR_FRED_API_KEY_HERE' with your key.
   Get a free key at: https://fred.stlouisfed.org/docs/api/api_key.html

   For production, proxy requests through a Cloudflare Worker
   and store the key as a Worker secret to keep it off the client.
   ============================================================ */

const FRED_API_KEY = 'YOUR_FRED_API_KEY_HERE';
const FRED_BASE_URL = 'https://api.stlouisfed.org/fred/series/observations';

/**
 * Fetch a FRED data series, returning [{x: 'YYYY-MM-DD', y: number}]
 * Uses sessionStorage cache to avoid redundant requests.
 */
async function fetchFredSeries(seriesId, observationStart) {
  if (FRED_API_KEY === 'YOUR_FRED_API_KEY_HERE') {
    throw new Error('FRED API key not configured. Add your key to js/api/fred.js.');
  }

  const startDate = observationStart || '1900-01-01';
  const cacheKey = `fred_${seriesId}_${startDate}`;

  return window.fetchWithCache(cacheKey, async () => {
    const params = new URLSearchParams({
      series_id:         seriesId,
      api_key:           FRED_API_KEY,
      file_type:         'json',
      observation_start: startDate,
    });

    const response = await fetch(`${FRED_BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error(`FRED API returned ${response.status} for series ${seriesId}`);
    }

    const json = await response.json();

    if (!json.observations) {
      throw new Error(`FRED API: no observations in response for ${seriesId}`);
    }

    return json.observations
      .filter(obs => obs.value !== '.' && obs.value !== 'NA' && obs.value !== '')
      .map(obs => ({
        x: obs.date,           // 'YYYY-MM-DD'
        y: parseFloat(obs.value),
      }));
  }, 120); // Cache 2 hours
}

// Expose globally
window.FRED = { fetchSeries: fetchFredSeries };
