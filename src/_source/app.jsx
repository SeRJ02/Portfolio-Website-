/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

// ============ TWEAKS DEFAULTS ============
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "northStar": "#b67d3e",
  "scanlines": true,
  "glowIntensity": 0.35,
  "showHud": true,
  "centerpiece": "radar"
}/*EDITMODE-END*/;

const THEMES = {
  dark:         { label: "Dark — Coffee & Amber", northStar: "#b67d3e" },
  paperInk:     { label: "Light — Paper & Ink",   northStar: "#a86d2b" },
  linenStudio:  { label: "Light — Linen Studio",  northStar: "#c68642" },
  warmStone:    { label: "Light — Warm Stone",    northStar: "#b67d3e" },
};

const PALETTE_OPTIONS = ["#b67d3e", "#c89968", "#806730", "#5d5a3a", "#a86d2b"];

// ============ DATA ============
const PROJECTS = [
  {
    id: "embrace",
    href: "work/embrace.html",
    label: "PRD · 2025",
    title: "Embrace",
    badge: "EM",
    index: "01",
    tagline: "A dating app whose north star is users leaving — not staying. Personality-first matching, one match a day.",
    desc: "13-page production PRD, 4 personas, novel exit-as-success metric. Chats auto-close when social handles are exchanged.",
    chips: ["PRD", "UX", "B2C"],
    stats: [
      { k: "Pages", v: "13" },
      { k: "Personas", v: "04" },
      { k: "Year", v: "'25" },
    ],
  },
  {
    id: "dumbmoney",
    href: "work/dumbmoney.html",
    label: "SEO + Automation",
    title: "DumbMoney",
    badge: "DM",
    index: "02",
    tagline: "An affiliate coupon site + MCP server, shipped in 14 days. Still running on autopilot.",
    desc: "Cloudflare Workers MCP, organic SEO to ~1k/day visitors, 20% CTR. The MCP server kept the codes honest.",
    chips: ["SEO", "MCP", "WEB"],
    stats: [
      { k: "Daily", v: "1k+" },
      { k: "CTR", v: "20%" },
      { k: "Retailers", v: "40+" },
    ],
  },
  {
    id: "earnkaro",
    href: "work/earnkaro.html",
    label: "Automation @ Work",
    title: "Broadcast",
    badge: "EK",
    index: "03",
    tagline: "3,000 users moved off ten personal WhatsApp numbers onto one broadcast system. Effort down 40%.",
    desc: "5,000 monthly CRM chats analyzed, 3 triggers unified into one spec, Telegram bot live in 5 days. Rookie Rockstar Q1.",
    chips: ["OPS", "PM", "B2B"],
    stats: [
      { k: "Users", v: "3.9k" },
      { k: "CRM ↓", v: "30→10%" },
      { k: "Effort ↓", v: "40%" },
    ],
  },
  {
    id: "deals-scraper",
    href: "work/deals-scraper.html",
    label: "Side / Internal Tool",
    title: "Scraper",
    badge: "DS",
    index: "04",
    tagline: "A serverless pipeline that scrapes, converts affiliate links, and broadcasts to Telegram. Untouched for weeks.",
    desc: "Google Apps Script + EarnKaro API. Time-driven trigger every 15 min. Sheet-based dedup, fallback on API miss.",
    chips: ["BOT", "API", "TG"],
    stats: [
      { k: "Cadence", v: "15m" },
      { k: "Servers", v: "0" },
      { k: "Cost", v: "$0" },
    ],
  },
];

// ============ HOOKS ============
function useTweaks(defaults) {
  const [tweaks, setTweaks] = useState(defaults);
  const setTweak = (keyOrObj, value) => {
    const edits = typeof keyOrObj === "string" ? { [keyOrObj]: value } : keyOrObj;
    setTweaks(prev => ({ ...prev, ...edits }));
    try { window.parent.postMessage({ type: "__edit_mode_set_keys", edits }, "*"); } catch (e) {}
  };
  return [tweaks, setTweak];
}

// ============ NAV ============
function Nav() {
  return (
    <nav className="nav" data-screen-label="00 Nav">
      <a href="index.html" className="nav__logo">Akshat Somani</a>
      <ul className="nav__links">
        <li><a href="work.html">Work</a></li>
        <li><a href="thinking.html">Thinking</a></li>
        <li><a href="about.html">About</a></li>
      </ul>
    </nav>
  );
}

// ============ CENTERPIECES ============
function CommandPanel() {
  return (
    <div className="panel-stage">
      <div className="panel">
        <div className="panel__bar">
          <span><span className="panel__lights"><span></span><span></span><span></span></span> &nbsp; // embrace.prd</span>
          <span>0x01</span>
        </div>
        <div className="panel__title">Dating App PRD</div>
        <div className="panel__rows">
          <div className="panel__row"><span className="panel__idx">01</span><span className="panel__key">status</span><span className="panel__val tag">shipping</span></div>
          <div className="panel__row"><span className="panel__idx">02</span><span className="panel__key">pages</span><span className="panel__val ok">13</span></div>
          <div className="panel__row"><span className="panel__idx">03</span><span className="panel__key">personas</span><span className="panel__val ok">04</span></div>
          <div className="panel__row"><span className="panel__idx">04</span><span className="panel__key">north_star</span><span className="panel__val">exits / day</span></div>
          <div className="panel__row"><span className="panel__idx">05</span><span className="panel__key">phase</span><span className="panel__val">beta-prep</span></div>
        </div>
        <div className="panel__progress">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>compile</span><span style={{ color: "var(--north-star)" }}>78%</span>
          </div>
          <div className="panel__bar-wrap"><div className="panel__bar-fill"></div></div>
        </div>
        <div className="panel__foot">
          <span>sys.online</span>
          <span>cursor_<span className="panel__cursor"></span></span>
        </div>
      </div>

      <div className="panel-chip panel-chip--c1"></div>
      <div className="panel-chip panel-chip--c2"></div>
      <div className="panel-chip panel-chip--c3"></div>
      <div className="panel-chip panel-chip--c4"></div>
    </div>
  );
}

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

function Centerpiece({ kind }) {
  if (kind === "radar") return <Radar />;
  return <CommandPanel />;
}

// ============ HERO 3D ============
function Hero({ showHud, centerpiece }) {
  const [time, setTime] = useState(new Date());
  const tiltRef = useRef(null);
  const termLines = [
    { type: "prompt", text: "$ whoami" },
    { type: "out", text: "akshat.somani / product-manager" },
    { type: "prompt", text: "$ stack --list" },
    { type: "out", text: "specs · automation · seo · prd" },
    { type: "prompt", text: "$ status", cursor: true },
  ];

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // mouse parallax tilt
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
    const reset = () => { el.style.transform = "rotateX(0) rotateY(0)"; };
    window.addEventListener("mousemove", handler);
    window.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseleave", reset);
    };
  }, []);

  const hh = String(time.getUTCHours()).padStart(2, "0");
  const mm = String(time.getUTCMinutes()).padStart(2, "0");
  const ss = String(time.getUTCSeconds()).padStart(2, "0");

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
    <section className="hero3d" data-screen-label="01 Hero">
      {/* corner frame */}
      <span className="frame-bracket frame-bracket--tl"></span>
      <span className="frame-bracket frame-bracket--tr"></span>
      <span className="frame-bracket frame-bracket--bl"></span>
      <span className="frame-bracket frame-bracket--br"></span>

      {/* top status bar */}
      <div className="hero3d__topbar">
        <span><span className="live-dot"></span>SYS.ONLINE</span>
        <span className="div"></span>
        <span>PM-OS / v2026.1</span>
        <span className="div"></span>
        <span>NODE / IN-DEL</span>
        <span className="div"></span>
        <span style={{ color: "var(--north-star)" }}>{hh}:{mm}:{ss} UTC</span>
      </div>

      {/* backdrop big type */}
      <div className="hero3d__bg" aria-hidden="true">
        <div className="hero3d__bg-row">AKSHAT — SOMANI</div>
        <div className="hero3d__bg-row">PRODUCT · MANAGER</div>
      </div>

      {/* particles */}
      {particles}

      {/* MAIN — two columns: copy + scene */}
      <div className="hero3d__main">
        <div className="hero3d__left">
          <span className="hero3d__role">Akshat Somani · Product Manager</span>
          <h1 className="hero3d__name">
            The things you <span className="accent">own</span> end up owning you. I build those things.
          </h1>
          <p className="hero3d__tag">I learn boring things because they seem fun. I build things that seem broken. Mostly both at once.</p>
          <div className="hero3d__ctas">
            <a href="work.html" className="cta cta--primary">See the work</a>
            <a href="thinking.html" className="cta cta--secondary">Read the thinking</a>
          </div>
        </div>

        <div className="hero3d__scene">
          <div className="hero3d__tilt" ref={tiltRef}>
            <Centerpiece kind={centerpiece} />
          </div>

          {showHud && centerpiece !== "panel" && (
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
                  {termLines.map((l, i) => (
                    <div key={i}>
                      <span className={l.type}>{l.type === "prompt" ? "$ " : "» "}</span>
                      {l.text.replace(/^\$ /, "")}
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

// ============ FLIP CARDS ============
function FlipCard({ project }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={"flip" + (flipped ? " is-flipped" : "")}
      onClick={() => setFlipped(f => !f)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className="flip__inner">
        {/* CUBE EDGES — give depth */}
        <div className="flip__edge flip__edge--right"></div>
        <div className="flip__edge flip__edge--left"></div>
        <div className="flip__edge flip__edge--top"></div>
        <div className="flip__edge flip__edge--bottom"></div>
        <div className="flip__shadow"></div>

        {/* FRONT — glossy amber gradient w/ sonar rings */}
        <div className="flip__face flip__face--front">
          <div className="flip__head">
            <span className="flip__head-label">{project.label}</span>
            <div className="flip__badge">{project.badge}</div>
          </div>

          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 className="flip__title">{project.title}</h3>
            <p className="flip__desc">{project.tagline}</p>
          </div>

          <div className="flip__foot">
            <div className="flip__chips">
              {project.chips.map((c, i) => (
                <span key={c} className={"flip__chip" + (i === 1 ? " flip__chip--alt" : "")}>{c}</span>
              ))}
            </div>
            <span className="flip__more">View detail</span>
          </div>
        </div>

        {/* BACK — dark interior, amber rings, detail + stats + open CTA */}
        <div className="flip__face flip__face--back">
          <div className="flip__head">
            <span className="flip__head-label">{project.index} / 04</span>
            <div className="flip__badge">{project.badge}</div>
          </div>

          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 className="flip__title">{project.title}</h3>
            <p className="flip__desc">{project.desc}</p>
          </div>

          <div className="flip__stats">
            {project.stats.map(s => (
              <div className="flip__stat" key={s.k}>
                <span className="flip__stat-k">{s.k}</span>
                <span className="flip__stat-v">{s.v}</span>
              </div>
            ))}
          </div>

          <a
            href={project.href}
            className="flip__open"
            onClick={e => e.stopPropagation()}
          >
            Open case study
          </a>
        </div>
      </div>
    </div>
  );
}

function WorkSection() {
  return (
    <section className="section" data-screen-label="02 Work">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">/ 02 — Work</div>
          <h2 className="section__title">Four things that started broken.</h2>
        </div>
        <div className="section__sub">hover to flip — click to open</div>
      </div>
      <div className="flip-grid">
        {PROJECTS.map(p => <FlipCard key={p.id} project={p} />)}
      </div>
    </section>
  );
}

// ============ THINKING TEASER ============
function ThinkingSection() {
  return (
    <section className="section" data-screen-label="03 Thinking">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">/ 03 — Thinking</div>
          <h2 className="section__title">When something doesn't add up.</h2>
        </div>
      </div>
      <div className="thinking-block">
        <div>
          <p className="thinking-block__lead">The Bumble teardown started as a LinkedIn post.</p>
          <p className="thinking-block__body">It became 10 slides, 4 personas, the Beehive algorithm dismantled, trade-offs, and a quarterly prioritization matrix. That's probably a personality trait.</p>
          <a href="thinking.html" className="cta cta--secondary" style={{ marginTop: 18 }}>Read the thinking</a>
        </div>
        <div className="thinking-block__side">
          <div className="series-item"><span>01 — The Problem Statement</span><span className="series-item__status live">Live</span></div>
          <div className="series-item"><span>02 — Why It Happened</span><span className="series-item__status">Drafting</span></div>
          <div className="series-item"><span>03 — Two Personas</span><span className="series-item__status">Planned</span></div>
          <div className="series-item"><span>04 — Business Model</span><span className="series-item__status">Planned</span></div>
          <div className="series-item"><span>05 — Rebuild</span><span className="series-item__status">Planned</span></div>
          <div className="series-item"><span>06 — The Metrics</span><span className="series-item__status">Planned</span></div>
        </div>
      </div>
    </section>
  );
}

// ============ BENTO ============
function BentoSection() {
  return (
    <section className="section" data-screen-label="04 Navigate">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">/ 04 — Navigate</div>
          <h2 className="section__title">Where would you like to land?</h2>
        </div>
        <div className="section__sub">a faster way around the site</div>
      </div>
      <div className="bento">
        <a href="work.html" className="bento__cell bento__cell--wide bento__cell--accent">
          <div className="bento__arrow">↗</div>
          <div className="bento__label">/ work — all four projects</div>
          <div>
            <div className="bento__title">All the work, one scroll.</div>
            <div className="bento__meta" style={{ marginTop: 12 }}>04 case studies · STAR format · ~9 min read</div>
          </div>
        </a>

        <a href="about.html" className="bento__cell bento__cell--tall">
          <div className="bento__arrow">↗</div>
          <div className="bento__label">/ about</div>
          <div className="bento__title">Who I am, fast.</div>
          <div className="bento__meta">B.Tech SRMIST · ex-co-founder · PM @ EarnKaro</div>
        </a>

        <a href="work/embrace.html" className="bento__cell bento__cell--sq">
          <div className="bento__arrow">↗</div>
          <div className="bento__label">// featured</div>
          <div className="bento__title">Embrace PRD</div>
        </a>

        <a href="thinking.html" className="bento__cell bento__cell--sq">
          <div className="bento__arrow">↗</div>
          <div className="bento__label">/ thinking</div>
          <div className="bento__title">Teardowns & essays</div>
        </a>

        <a href="https://github.com/SeRJ02" className="bento__cell bento__cell--med">
          <div className="bento__arrow">↗</div>
          <div className="bento__label">/ ext — github</div>
          <div className="bento__terminal">
            <div><span className="prompt">$</span> ls ~/repos</div>
            <div className="out">dumbmoney-mcp/  deals-scraper/  embrace-prd/</div>
          </div>
        </a>

        <a href="mailto:somaniakshat02@gmail.com" className="bento__cell bento__cell--med">
          <div className="bento__arrow">↗</div>
          <div className="bento__label">/ ping</div>
          <div className="bento__title">somaniakshat02<wbr/>@gmail.com</div>
        </a>

        <a href="https://linkedin.com/in/akshat-somani" className="bento__cell bento__cell--sq">
          <div className="bento__arrow">↗</div>
          <div className="bento__label">/ ext — linkedin</div>
          <div className="bento__title">akshat-somani</div>
        </a>

        <a href="resume.pdf" className="bento__cell bento__cell--sq">
          <div className="bento__arrow">↗</div>
          <div className="bento__label">/ doc</div>
          <div className="bento__title">Resume.pdf</div>
        </a>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="footer" data-screen-label="05 Footer">
      <p className="footer__big">If something here seemed <span className="accent">relevant</span> — pick one.</p>
      <div className="footer__row">
        <ul className="footer__links">
          <li><a href="mailto:somaniakshat02@gmail.com">somaniakshat02@gmail.com</a></li>
          <li><a href="https://linkedin.com/in/akshat-somani">LinkedIn</a></li>
          <li><a href="https://github.com/SeRJ02">GitHub</a></li>
        </ul>
        <p className="footer__copy">// Akshat Somani · 2026</p>
      </div>
    </footer>
  );
}

// ============ TWEAKS PANEL ============
function MyTweaksPanel({ tweaks, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection title="Theme">
        <TweakSelect
          label="Palette"
          value={tweaks.theme}
          options={Object.entries(THEMES).map(([value, t]) => ({ value, label: t.label }))}
          onChange={v => setTweak({ theme: v, northStar: THEMES[v].northStar })}
        />
        <TweakRadio
          label="Centerpiece"
          value={tweaks.centerpiece}
          options={[
            { value: "panel", label: "Panel" },
            { value: "radar", label: "Radar" },
          ]}
          onChange={v => setTweak("centerpiece", v)}
        />
        <TweakColor
          label="North star color"
          value={tweaks.northStar}
          options={PALETTE_OPTIONS}
          onChange={v => setTweak("northStar", v)}
        />
        <TweakToggle
          label="CRT scanlines"
          value={tweaks.scanlines}
          onChange={v => setTweak("scanlines", v)}
        />
        <TweakSlider
          label="Glow intensity"
          value={tweaks.glowIntensity}
          min={0}
          max={0.7}
          step={0.05}
          onChange={v => setTweak("glowIntensity", v)}
        />
        <TweakToggle
          label="HUD info strip"
          value={tweaks.showHud}
          onChange={v => setTweak("showHud", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ============ APP ROOT ============
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply tweaks to root vars
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", tweaks.theme);
    root.style.setProperty("--north-star", tweaks.northStar);
    // softer version (lighten by mixing with cream)
    const lighter = lighten(tweaks.northStar, 0.18);
    root.style.setProperty("--north-star-soft", lighter);
    const rgb = hexToRgb(tweaks.northStar);
    root.style.setProperty("--glow", `0 0 24px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${tweaks.glowIntensity})`);
    root.style.setProperty("--glow-soft", `0 0 12px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${tweaks.glowIntensity * 0.5})`);
    document.body.classList.toggle("scanlines-on", !!tweaks.scanlines);
  }, [tweaks]);

  return (
    <>
      <Nav />
      <Hero showHud={tweaks.showHud} centerpiece={tweaks.centerpiece} />
      <WorkSection />
      <ThinkingSection />
      <BentoSection />
      <Footer />
      <MyTweaksPanel tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

// ============ COLOR HELPERS ============
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
}
function lighten(hex, amt) {
  const { r, g, b } = hexToRgb(hex);
  const nr = Math.min(255, Math.round(r + (255 - r) * amt));
  const ng = Math.min(255, Math.round(g + (255 - g) * amt));
  const nb = Math.min(255, Math.round(b + (255 - b) * amt));
  return `#${nr.toString(16).padStart(2,"0")}${ng.toString(16).padStart(2,"0")}${nb.toString(16).padStart(2,"0")}`;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
