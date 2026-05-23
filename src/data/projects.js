export const PROJECTS = [
  {
    id: 'embrace',
    href: '/work/embrace.html',
    label: 'PRD · 2025',
    title: 'Embrace',
    badge: 'EM',
    index: '01',
    tagline:
      'A dating app whose north star is users leaving — not staying. Personality-first matching, one match a day.',
    desc:
      '13-page production PRD, 4 personas, novel exit-as-success metric. Chats auto-close when social handles are exchanged.',
    chips: ['PRD', 'UX', 'B2C'],
    stats: [
      { k: 'Pages', v: '13' },
      { k: 'Personas', v: '04' },
      { k: 'Year', v: "'25" },
    ],
  },
  {
    id: 'dumbmoney',
    href: '/work/dumbmoney.html',
    label: 'SEO + Automation',
    title: 'DumbMoney',
    badge: 'DM',
    index: '02',
    tagline:
      'An affiliate coupon site + MCP server, shipped in 14 days. Still running on autopilot.',
    desc:
      'Cloudflare Workers MCP, organic SEO to ~1k/day visitors, 20% CTR. The MCP server kept the codes honest.',
    chips: ['SEO', 'MCP', 'WEB'],
    stats: [
      { k: 'Daily', v: '1k+' },
      { k: 'CTR', v: '20%' },
      { k: 'Retailers', v: '40+' },
    ],
  },
  {
    id: 'earnkaro',
    href: '/work/earnkaro.html',
    label: 'Automation @ Work',
    title: 'Broadcast',
    badge: 'EK',
    index: '03',
    tagline:
      '3,000 users moved off ten personal WhatsApp numbers onto one broadcast system. Effort down 40%.',
    desc:
      '5,000 monthly CRM chats analyzed, 3 triggers unified into one spec, Telegram bot live in 5 days. Rookie Rockstar Q1.',
    chips: ['OPS', 'PM', 'B2B'],
    stats: [
      { k: 'Users', v: '3.9k' },
      { k: 'CRM ↓', v: '30→10%' },
      { k: 'Effort ↓', v: '40%' },
    ],
  },
  {
    id: 'deals-scraper',
    href: '/work/deals-scraper.html',
    label: 'Side / Internal Tool',
    title: 'Scraper',
    badge: 'DS',
    index: '04',
    tagline:
      'A serverless pipeline that scrapes, converts affiliate links, and broadcasts to Telegram. Untouched for weeks.',
    desc:
      'Google Apps Script + EarnKaro API. Time-driven trigger every 15 min. Sheet-based dedup, fallback on API miss.',
    chips: ['BOT', 'API', 'TG'],
    stats: [
      { k: 'Cadence', v: '15m' },
      { k: 'Servers', v: '0' },
      { k: 'Cost', v: '$0' },
    ],
  },
];
