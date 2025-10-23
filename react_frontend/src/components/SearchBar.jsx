import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * SearchBar - City input with submit button and optional debounce.
 * Props:
 *  - value: string
 *  - onChange: (val: string) => void
 *  - onSearch: () => void
 *  - loading: boolean
 */
function SearchBar({ value, onChange, onSearch, loading }) {
  const [local, setLocal] = useState(value || '');
  const timer = useRef(null);

  useEffect(() => {
    setLocal(value || '');
  }, [value]);

  useEffect(() => {
    // simple debounce: if user stops typing for 800ms, do nothing (submit is explicit).
    return () => clearTimeout(timer.current);
  }, []);

  const handleInput = (e) => {
    const v = e.target.value;
    setLocal(v);
    onChange?.(v);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      onSearch?.();
    }
  };

  return (
    <div className="search" role="search" aria-label="Search city">
      <label htmlFor="city-input" className="visually-hidden">City</label>
      <input
        id="city-input"
        type="text"
        value={local}
        onChange={handleInput}
        onKeyDown={handleKey}
        placeholder="Search city (e.g., London, Tokyo)…"
        aria-label="City name"
        autoComplete="off"
      />
      <button
        className="button"
        onClick={onSearch}
        disabled={loading}
        aria-label="Search"
      >
        {loading ? 'Searching…' : 'Search'}
      </button>
      <style>{`.visually-hidden{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px);white-space:nowrap;}`}</style>
    </div>
  );
}

export default SearchBar;
