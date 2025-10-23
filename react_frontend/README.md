# Ocean Weather - React Frontend

A lightweight, modern weather app that lets you search for a city and view the current conditions and a 5-day forecast. Built with React and styled using the Ocean Professional theme (blues, subtle gradients, rounded cards, soft shadows).

## Features
- Search by city with explicit submit button
- Current conditions: temperature, icon, description, humidity, wind
- 5-day forecast summary (from 3-hour data): highs/lows and daily icon
- Ocean Professional theme with accessible, responsive layout
- Graceful loading and error states
- Environment variable support for OpenWeatherMap API key

## Quick Start

1) Install dependencies
```bash
npm install
```

2) Create your `.env` from the example:
```bash
cp .env.example .env
# Then edit .env and set REACT_APP_OPENWEATHER_API_KEY
```

3) Run the app
```bash
npm start
```

Open http://localhost:3000 to view it in your browser.

## Environment

- REACT_APP_OPENWEATHER_API_KEY: Your OpenWeatherMap API key.

These environment variables must be prefixed with `REACT_APP_` to be exposed to the front-end.

## Project Structure

- src/components/SearchBar.jsx: Input and submit
- src/components/CurrentWeatherCard.jsx: Current conditions
- src/components/ForecastList.jsx and ForecastCard.jsx: Forecast summary
- src/services/weatherApi.js: Fetch helpers for current/forecast
- src/utils/format.js: Utility functions (Kelvin->Celsius, icons, date labels)

## Notes

- The app uses the OpenWeatherMap Current Weather and 5-Day/3-Hour Forecast APIs.
- If you see a "Missing API key" error, ensure your `.env` has `REACT_APP_OPENWEATHER_API_KEY` and restart the dev server.

## Accessibility and Responsiveness
- Form controls have labels or ARIA attributes.
- Layout adapts from single-column to a 5-card grid for forecasts on larger screens.

## License
MIT
