/* ============================================================
   DOLLAR DOOMSDAY — js/api/fred.js
   Calls the /fred-proxy Pages Function (server-side).
   The API key lives in the proxy — not here.
   ============================================================ */

const FRED_PROXY = '/fred-proxy';

async function fetchFredSeries(seriesId, observationStart) {
  const startDate = observationStart || '1900-01-01';
  const cacheKey  = `fred_${seriesId}_${startDate}`;

  return window.fetchWithCache(cacheKey, async () => {
    const params = new URLSearchParams({
      series_id:         seriesId,
      observation_start: startDate,
    });

    const response = await fetch(`${FRED_PROXY}?${params}`);
    if (!response.ok) {
      throw new Error(`FRED proxy returned ${response.status} for ${seriesId}`);
    }

    const json = await response.json();

    if (!json.observations) {
      throw new Error(`No observations in response for ${seriesId}`);
    }

    return json.observations
      .filter(obs => obs.value !== '.' && obs.value !== 'NA' && obs.value !== '')
      .map(obs => ({
        x: obs.date,
        y: parseFloat(obs.value),
      }));
  }, 120);
}

window.FRED = { fetchSeries: fetchFredSeries };
