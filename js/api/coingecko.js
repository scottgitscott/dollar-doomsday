/* ============================================================
   DOLLAR DOOMSDAY — js/api/coingecko.js
   CoinGecko public API — no key required (free tier)
   Rate limited: ~10-30 calls/min on free tier
   ============================================================ */

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

/**
 * Fetch full Bitcoin price history (monthly intervals)
 * Returns [{x: 'YYYY-MM-DD', y: number}]
 */
async function fetchBitcoinHistory() {
  return window.fetchWithCache('coingecko_btc_max', async () => {
    const response = await fetch(
      `${COINGECKO_BASE}/coins/bitcoin/market_chart?vs_currency=usd&days=max&interval=monthly`
    );
    if (!response.ok) {
      throw new Error(`CoinGecko API returned ${response.status}`);
    }

    const json = await response.json();

    if (!json.prices || !json.prices.length) {
      throw new Error('CoinGecko: no price data returned');
    }

    // prices = [[timestamp_ms, price_usd], ...]
    return json.prices.map(([ts, price]) => ({
      x: new Date(ts).toISOString().slice(0, 10),
      y: price,
    }));
  }, 120);
}

window.CoinGecko = { fetchBitcoinHistory };
