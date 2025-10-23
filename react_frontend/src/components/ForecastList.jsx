import React, { useMemo } from 'react';
import ForecastCard from './ForecastCard';
import { kelvinToC, weekdayShort } from '../utils/format';

/**
 * PUBLIC_INTERFACE
 * ForecastList - Displays up to 5 days from 3-hour forecast.
 * Props:
 *  - items: array from OpenWeatherMap forecast (list)
 */
function ForecastList({ items }) {
  const days = useMemo(() => {
    if (!Array.isArray(items) || items.length === 0) return [];

    // Group by date (YYYY-MM-DD) and compute min/max temp, pick midday entry as representative.
    const byDate = {};
    items.forEach((entry) => {
      const dt = entry.dt_txt?.split(' ')[0]; // "YYYY-MM-DD"
      if (!dt) return;
      if (!byDate[dt]) {
        byDate[dt] = { entries: [] };
      }
      byDate[dt].entries.push(entry);
    });

    const result = Object.entries(byDate).map(([date, { entries }]) => {
      const temps = entries.map((e) => e.main?.temp).filter((v) => Number.isFinite(v));
      const minK = Math.min(...temps);
      const maxK = Math.max(...temps);

      // pick entry closest to 12:00
      let rep = entries[0];
      const targetHour = 12;
      let bestDiff = 99;
      entries.forEach((e) => {
        const hour = parseInt(e.dt_txt?.split(' ')[1]?.split(':')[0] || '0', 10);
        const diff = Math.abs(hour - targetHour);
        if (diff < bestDiff) {
          bestDiff = diff;
          rep = e;
        }
      });

      const icon = rep?.weather?.[0]?.icon;
      const description = rep?.weather?.[0]?.description;

      return {
        date,
        minC: kelvinToC(minK),
        maxC: kelvinToC(maxK),
        icon,
        description,
      };
    });

    // Show next 5 days max
    return result.slice(0, 5);
  }, [items]);

  if (!days.length) {
    return <div className="card muted small center">No forecast yet. Search for a city to see the 5-day outlook.</div>;
  }

  return (
    <div className="grid grid-cols-5">
      {days.map((d) => {
        const label = weekdayShort(d.date);
        return (
          <ForecastCard
            key={d.date}
            dayLabel={label}
            highC={d.maxC}
            lowC={d.minC}
            icon={d.icon}
            description={d.description}
          />
        );
      })}
    </div>
  );
}

export default ForecastList;
