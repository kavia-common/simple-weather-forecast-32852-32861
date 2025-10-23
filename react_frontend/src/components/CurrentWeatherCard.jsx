import React from 'react';
import { iconUrl } from '../utils/format';

/**
 * PUBLIC_INTERFACE
 * CurrentWeatherCard - Displays current conditions.
 * Props:
 *  - location: string
 *  - tempC: number
 *  - description: string
 *  - icon: string (OpenWeather icon code)
 *  - humidity: number
 *  - wind: number (m/s)
 */
function CurrentWeatherCard({ location, tempC, description, icon, humidity, wind }) {
  return (
    <div className="current" role="region" aria-label="Current conditions">
      <div>
        <div className="badge" aria-live="polite">
          {location || '—'}
        </div>
        <div className="temp" aria-label="Temperature">
          {Number.isFinite(tempC) ? `${Math.round(tempC)}°C` : '—'}
        </div>
        <div className="meta">
          {description || '—'}
        </div>
        <div className="row small" style={{marginTop: 10}}>
          <span className="muted">Humidity: {humidity ?? '—'}%</span>
          <span className="muted">Wind: {wind != null ? `${Math.round(wind)} m/s` : '—'}</span>
        </div>
      </div>
      <div aria-hidden="true">
        {icon ? <img src={iconUrl(icon)} alt="" width="96" height="96" /> : null}
      </div>
    </div>
  );
}

export default CurrentWeatherCard;
