const API_BASE = 'https://api.openweathermap.org/data/2.5';

/**
 * PUBLIC_INTERFACE
 * getApiKey - returns the API key from environment.
 * Make sure REACT_APP_OPENWEATHER_API_KEY is set in environment.
 */
export function getApiKey() {
  /** Returns the OpenWeatherMap API key from environment. */
  const key = process.env.REACT_APP_OPENWEATHER_API_KEY;
  return key || '';
}

/**
 * PUBLIC_INTERFACE
 * getCurrentWeatherByCity - Fetches current weather data.
 * @param {string} city
 * @returns {Promise<object>}
 */
export async function getCurrentWeatherByCity(city) {
  const key = getApiKey();
  if (!key) {
    throw new Error('Missing API key. Set REACT_APP_OPENWEATHER_API_KEY in your environment.');
  }
  const url = `${API_BASE}/weather?q=${encodeURIComponent(city)}&appid=${key}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Failed to fetch current weather (${res.status}).`);
  }
  return res.json();
}

/**
 * PUBLIC_INTERFACE
 * getForecastByCity - Fetches 5-day / 3-hour forecast list and returns raw list.
 * @param {string} city
 * @returns {Promise<Array>}
 */
export async function getForecastByCity(city) {
  const key = getApiKey();
  if (!key) {
    throw new Error('Missing API key. Set REACT_APP_OPENWEATHER_API_KEY in your environment.');
  }
  const url = `${API_BASE}/forecast?q=${encodeURIComponent(city)}&appid=${key}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Failed to fetch forecast (${res.status}).`);
  }
  const data = await res.json();
  return Array.isArray(data?.list) ? data.list : [];
}
