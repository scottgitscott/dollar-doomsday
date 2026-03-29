/* ============================================================
   Cloudflare Pages Function — /fred-proxy
   Server-side proxy for the FRED API.
   Keeps the API key off the client and solves CORS.

   Called by js/api/fred.js as:
   /fred-proxy?series_id=M2SL&observation_start=1960-01-01
   ============================================================ */

const FRED_API_KEY = 'cc4f21765e73b823dfa47eaea0e64254';
const FRED_BASE    = 'https://api.stlouisfed.org/fred/series/observations';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequest(context) {
  const { request } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const incoming = new URL(request.url);
  const seriesId        = incoming.searchParams.get('series_id');
  const observationStart = incoming.searchParams.get('observation_start');

  if (!seriesId) {
    return new Response(
      JSON.stringify({ error: 'series_id parameter is required' }),
      { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }

  // Build FRED request
  const fredUrl = new URL(FRED_BASE);
  fredUrl.searchParams.set('series_id',   seriesId);
  fredUrl.searchParams.set('api_key',     FRED_API_KEY);
  fredUrl.searchParams.set('file_type',   'json');
  fredUrl.searchParams.set('sort_order',  'asc');
  if (observationStart) {
    fredUrl.searchParams.set('observation_start', observationStart);
  }

  try {
    const fredResponse = await fetch(fredUrl.toString());
    const body = await fredResponse.text();

    return new Response(body, {
      status: fredResponse.status,
      headers: {
        ...CORS_HEADERS,
        'Content-Type':  'application/json',
        'Cache-Control': 'public, max-age=7200', // cache 2 hours at the edge
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Upstream FRED request failed', detail: err.message }),
      { status: 502, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }
}
