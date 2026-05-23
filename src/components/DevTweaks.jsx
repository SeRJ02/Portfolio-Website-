import { useState, useEffect } from 'react';

const THEMES = [
  { value: 'dark', label: 'Dark — Coffee & Amber' },
  { value: 'paperInk', label: 'Light — Paper & Ink' },
  { value: 'linenStudio', label: 'Light — Linen Studio' },
  { value: 'warmStone', label: 'Light — Warm Stone' },
];

const panelStyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 9999,
  background: 'rgba(21,16,10,0.92)',
  color: '#ece0c4',
  padding: '12px 14px',
  borderRadius: 8,
  fontFamily: 'ui-monospace, monospace',
  fontSize: 11,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  border: '1px solid #b67d3e',
  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  minWidth: 220,
};

const labelStyle = {
  color: '#b67d3e',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontSize: 9,
  marginBottom: 2,
};

const fieldStyle = {
  background: '#15100a',
  color: '#ece0c4',
  border: '1px solid #3a2c1c',
  padding: '4px 6px',
  fontFamily: 'inherit',
  fontSize: 11,
  borderRadius: 4,
};

export default function DevTweaks() {
  const [theme, setTheme] = useState('dark');
  const [scanlines, setScanlines] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle('scanlines-on', scanlines);
  }, [scanlines]);

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        style={{ ...panelStyle, padding: '6px 10px', cursor: 'pointer', minWidth: 0 }}
      >
        // dev tweaks
      </button>
    );
  }

  return (
    <div style={panelStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ ...labelStyle, marginBottom: 0 }}>// dev tweaks</span>
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          style={{ background: 'transparent', border: 0, color: '#8e7c5d', cursor: 'pointer', fontSize: 13, padding: 0 }}
          aria-label="Collapse"
        >
          ×
        </button>
      </div>

      <div>
        <div style={labelStyle}>Theme</div>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{ ...fieldStyle, width: '100%' }}
        >
          {THEMES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={scanlines}
          onChange={(e) => setScanlines(e.target.checked)}
        />
        CRT scanlines
      </label>
    </div>
  );
}
