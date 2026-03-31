import { useState } from 'react';

const WORK_ITEMS = [
  { bg: 'bg-gradient-to-br from-blue-100 to-cyan-100', label: '✦ LUMIÈRE', color: '#4a6fa5', small: true,  title: 'Lumière Studio',    sub: 'E-commerce · Skincare Brand' },
  { bg: 'bg-[#0f111a]',                                label: 'KYMA',       color: '#ffffff', small: false, title: 'KYMA',              sub: 'Portfolio · Architecture Studio' },
  { bg: 'bg-[#111211]',                                label: '[10X]',      color: '#b8f53a', small: false, title: 'Apex Systems',      sub: 'SaaS · Growth Platform' },
  { bg: 'bg-[#faf7f2]',                                label: 'Serif Journal', color: '#5a4a3a', small: true, title: 'The Serif Journal', sub: 'Editorial · Publishing Brand' },
] as const;

function WorkItem({ bg, label, color, small, title, sub }: typeof WORK_ITEMS[number]) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`rounded-[20px] overflow-hidden border border-neutral-200 cursor-pointer transition-all duration-300 ${hov ? '-translate-y-1 shadow-[0_24px_60px_rgba(0,0,0,0.1)]' : ''}`}
    >
      <div className={`h-60 ${bg} flex items-center justify-center p-8`}>
        <span
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            color,
            fontSize: small ? 14 : 44,
            letterSpacing: small ? '.12em' : '.06em',
          }}
        >
          {label}
        </span>
      </div>
      <div className="px-5 py-4 bg-white flex justify-between items-end">
        <div>
          <div className="font-bold text-base mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>{title}</div>
          <div className="text-[13px] text-neutral-400">{sub}</div>
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0 transition-all duration-200"
          style={{ background: hov ? '#0a0a0a' : '#f5f5f3', color: hov ? '#fff' : '#0a0a0a' }}
        >
          →
        </div>
      </div>
    </div>
  );
}

export function WorkGrid() {
  return (
    <section className="py-20 pb-32">
      <p
        className="text-[11px] font-bold tracking-[.18em] uppercase text-neutral-400 mb-4"
        style={{ fontFamily: "'Syne',sans-serif" }}
      >
        Selected Work
      </p>
      <h2
        className="font-extrabold tracking-[-0.04em] mb-14 leading-[1.1]"
        style={{ fontSize: 42, fontFamily: "'Syne',sans-serif" }}
      >
        Projects that performed.
      </h2>
      <div className="grid grid-cols-2 gap-5">
        {WORK_ITEMS.map((item) => (
          <WorkItem key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}