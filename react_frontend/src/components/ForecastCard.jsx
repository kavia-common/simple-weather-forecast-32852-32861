import React from 'react';
import { iconUrl } from '../utils/format';

/**
 * PUBLIC_INTERFACE
 * ForecastCard - One-day forecast summary.
 * Props:
 *  - dayLabel: string
 *  - highC: number
 *  - lowC: number
 *  - icon: string
 *  - description: string
 */
function ForecastCard({ dayLabel, highC, lowC, icon, description }) {
  return (
    <div className="forecast-card" role="article" aria-label={`${dayLabel} forecast`}>
      <div className="row">
        <div className="day">{dayLabel}</div>
        {icon ? <img src={iconUrl(icon)} width="48" height="48" alt={description || 'Weather icon'} /> : null}
      </div>
      <div className="range">
        {Number.isFinite(highC) ? `${Math.round(highC)}°C` : '—'} / {Number.isFinite(lowC) ? `${Math.round(lowC)}°C` : '—'}
      </div>
      <div className="muted small">{description || '—'}</div>
    </div>
  );
}

export default ForecastCard;
