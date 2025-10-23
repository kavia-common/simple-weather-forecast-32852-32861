 /**
  * PUBLIC_INTERFACE
  * kelvinToC - Convert Kelvin to Celsius
  */
export function kelvinToC(k) {
  if (!Number.isFinite(k)) return NaN;
  return k - 273.15;
}

/**
 * PUBLIC_INTERFACE
 * iconUrl - OpenWeather icon URL
 */
export function iconUrl(code) {
  if (!code) return '';
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

/**
 * PUBLIC_INTERFACE
 * toTitle - Title case a string
 */
export function toTitle(s) {
  if (!s) return '';
  return s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
}

/**
 * PUBLIC_INTERFACE
 * weekdayShort - From YYYY-MM-DD to short weekday label
 */
export function weekdayShort(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { weekday: 'short' });
  } catch {
    return dateStr;
  }
}
