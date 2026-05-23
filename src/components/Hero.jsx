import { useState, useEffect, useRef } from 'react';

function Radar() {
  return (
    <div className="radar-stage">
      <div className="radar">
        <div className="radar__ring radar__ring--r1"></div>
        <div className="radar__ring radar__ring--r2"></div>
        <div className="radar__ring radar__ring--r3"></div>
        <div className="radar__ring radar__ring--r4"></div>
        <div className="radar__cross radar__cross--v"></div>
        <div className="radar__cross radar__cross--h"></div>
        <div className="radar__sweep"></div>
        <div className="radar__core"></div>
        <div className="radar__blip radar__blip--b1" data-label="EMBRACE"></div>
        <div className="radar__blip radar__blip--b2" data-label="DUMBMONEY"></div>
        <div className="radar__blip radar__blip--b3" data-label="EARNKARO"></div>
        <div className="radar__blip radar__blip--b4" data-label="SCRAPER"></div>
      </div>
      <div className="radar-frame">
        <span className="radar-frame__deg radar-frame__deg--n">N · 000</span>
        <span className="radar-frame__deg radar-frame__deg--e">E · 090</span>
        <span className="radar-frame__deg radar-frame__deg--s">S · 180</span>
        <span className="radar-frame__deg radar-frame__deg--w">W · 270</span>
      </div>
    </div>
  );
}

const TERM_LINES = [
  { type: 'prompt', text: 'whoami' },
  { type: 'out', text: 'akshat.somani / product-manager' },
  { type: 'prompt', text: 'stack --list' },
  { type: 'out', text: 'specs · automation · seo · prd' },
  { type: 'prompt', text: 'status', cursor: true },
];

export default function Hero({ showHud = true }) {
  const [time, setTime] = useState(null);
  const tiltRef = useRef(null);

  useEffect(() => {
    setTime(new Date());
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    const handler = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      el.style.transform = `rotateX(${(-dy * 6).toFixed(2)}deg) rotateY(${(dx * 8).toFixed(2)}deg)`;
    };
    const reset = () => { el.style.transform = 'rotateX(0) rotateY(0)'; };
    window.addEventListener('mousemove', handler);
    window.addEventListener('mouseleave', reset);
    return () => {
      window.removeEventListener('mousemove', handler);
      window.removeEventListener('mouseleave', reset);
    };
  }, []);

  const clock = time
    ? `${String(time.getUTCHours()).padStart(2, '0')}:${String(time.getUTCMinutes()).padStart(2, '0')}:${String(time.getUTCSeconds()).padStart(2, '0')} UTC`
    : '--:--:-- UTC';

  const particles = Array.from({ length: 26 }, (_, i) => {
    const top = (i * 37) % 100;
    const left = (i * 73) % 100;
    const delay = (i * 0.4) % 8;
    return (
      <div
        key={i}
        className="particle"
        style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${delay}s` }}
      />
    );
  });

  return (
    <section className="hero3d">
      <span className="frame-bracket frame-bracket--tl"></span>
      <span className="frame-bracket frame-bracket--tr"></span>
      <span className="frame-bracket frame-bracket--bl"></span>
      <span className="frame-bracket frame-bracket--br"></span>

      <div className="hero3d__topbar">
        <span><span className="live-dot"></span>SYS.ONLINE</span>
        <span className="div"></span>
        <span>PM-OS / v2026.1</span>
        <span className="div"></span>
        <span>NODE / IN-DEL</span>
        <span className="div"></span>
        <span style={{ color: 'var(--north-star)' }}>{clock}</span>
      </div>

      <div className="hero3d__bg" aria-hidden="true">
        <div className="hero3d__bg-row">AKSHAT — SOMANI</div>
        <div className="hero3d__bg-row">PRODUCT · MANAGER</div>
      </div>

      {particles}

      <div className="hero3d__main">
        <div className="hero3d__left">
          <span className="hero3d__role">Akshat Somani · Product Manager</span>
          <h1 className="hero3d__name">
            The things you <span className="accent">own</span> end up owning you. I build those things.
          </h1>
          <p className="hero3d__tag">I learn boring things because they seem fun. I build things that seem broken. Mostly both at once.</p>
          <div className="hero3d__ctas">
            <a href="/work.html" className="cta cta--primary">See the work</a>
            <a href="/thinking.html" className="cta cta--secondary">Read the thinking</a>
          </div>
        </div>

        <div className="hero3d__scene">
          <div className="hero3d__tilt" ref={tiltRef}>
            <Radar />
          </div>

          {showHud && (
            <>
              <div className="hud hud--tl">
                <div className="hud__label">// node.location</div>
                <div className="hud__value">Delhi NCR — IN</div>
                <div className="hud__label" style={{ marginTop: 4 }}>// role</div>
                <div className="hud__value">PM @ <span className="ok">EarnKaro</span></div>
              </div>

              <div className="hud hud--tr">
                <div className="hud__label">// shipped</div>
                <div className="hud__value">04 / projects</div>
                <div className="hud__label" style={{ marginTop: 4 }}>// uptime</div>
                <div className="hud__value">3y 2mo · <span className="ok">stable</span></div>
              </div>

              <div className="hud hud--bl">
                <div className="hud__label">// terminal — 0x01</div>
                <div className="hud__term">
                  {TERM_LINES.map((l, i) => (
                    <div key={i}>
                      <span className={l.type}>{l.type === 'prompt' ? '$ ' : '» '}</span>
                      {l.text}
                      {l.cursor && <span className="cursor"></span>}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="scroll-cue">scroll <span>↓</span></div>
    </section>
  );
}
