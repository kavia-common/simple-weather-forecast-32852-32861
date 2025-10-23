import React, { useEffect, useMemo, useState } from 'react';
import './index.css';
import SearchBar from './components/SearchBar';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import ForecastList from './components/ForecastList';
import { getCurrentWeatherByCity, getForecastByCity } from './services/weatherApi';
import { kelvinToC, toTitle } from './utils/format';

/**
 * PUBLIC_INTERFACE
 * App - Main entry for Ocean Professional themed weather app.
 * Allows searching by city and displays current weather and a 5-day forecast summary.
 */
function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  // Try to load a default city to showcase UI (optional)
  useEffect(() => {
    // No API call without a key; handled inside service.
    // eslint-disable-next-line no-use-before-define
    handleSearch('San Francisco');
  }, []);

  const cityName = useMemo(() => {
    if (!current) return '';
    return [current.name, current.sys?.country].filter(Boolean).join(', ');
  }, [current]);

  // PUBLIC_INTERFACE
  const handleSearch = async (city) => {
    const searchTerm = city || query;
    if (!searchTerm || !searchTerm.trim()) {
      setError('Please enter a city name.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const [cw, fc] = await Promise.all([
        getCurrentWeatherByCity(searchTerm),
        getForecastByCity(searchTerm),
      ]);
      setCurrent(cw);
      setForecast(fc);
    } catch (e) {
      setCurrent(null);
      setForecast([]);
      setError(e?.message || 'Unable to fetch weather. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="header">
        <span className="brand" aria-label="Ocean Weather">
          <span className="brand-mark" aria-hidden="true" />
          Ocean Weather
        </span>
      </header>

      <main className="container main" role="main">
        <section aria-label="Search" className="card">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={() => handleSearch()}
            loading={loading}
          />
          {error ? <div className="error small" role="alert" style={{marginTop: 10}}>{error}</div> : null}
        </section>

        <section aria-label="Current weather" className="card">
          {loading && <div className="loading">Loading weather…</div>}
          {!loading && current ? (
            <CurrentWeatherCard
              location={cityName}
              tempC={kelvinToC(current.main?.temp)}
              description={toTitle(current.weather?.[0]?.description || '')}
              icon={current.weather?.[0]?.icon}
              humidity={current.main?.humidity}
              wind={current.wind?.speed}
            />
          ) : !loading && !current ? (
            <div className="muted small">Search for a city to see the current weather.</div>
          ) : null}
        </section>

        <section aria-label="Forecast" className="forecast">
          <ForecastList items={forecast} />
        </section>
      </main>
    </div>
  );
}

export default App;
