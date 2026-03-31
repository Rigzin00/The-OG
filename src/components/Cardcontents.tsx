// ── Card 1: Light Cosmetic ──────────────────────────────
export function Card1() {
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="h-28 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-end p-3">
        <span
          className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-lg"
          style={{
            background: 'rgba(255,255,255,0.72)',
            color: '#4a6fa5',
            backdropFilter: 'blur(8px)',
            fontFamily: "'Syne', sans-serif",
          }}
        >
          Skincare
        </span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-2 rounded bg-gray-200 w-4/5" />
        <div className="h-2 rounded bg-gray-100 w-2/3" />
        <div className="h-2 rounded bg-gray-100 w-3/4" />
      </div>
      <div
        className="text-xs font-bold"
        style={{ color: '#555', fontFamily: "'Syne', sans-serif" }}
      >
        Lumière Studio
      </div>
    </div>
  );
}

// ── Card 2: Dark KYMA ───────────────────────────────────
export function Card2() {
  return (
    <div className="h-full flex flex-col gap-3">
      <div
        className="h-28 rounded-xl flex flex-col items-center justify-center gap-1 border"
        style={{
          background: 'linear-gradient(135deg,#1a1d2e,#0d0f18)',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <span
          className="text-[9px] font-bold tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Syne', sans-serif" }}
        >
          Architecture Studio
        </span>
        <span
          className="text-3xl font-black tracking-widest text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          KYMA
        </span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-2 rounded w-4/5" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <div className="h-2 rounded w-3/5" style={{ background: 'rgba(255,255,255,0.07)' }} />
      </div>
      <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
        Premium Architecture &amp; Interiors
      </div>
    </div>
  );
}

// ── Card 3: Lime Scale ──────────────────────────────────
export function Card3() {
  return (
    <div className="h-full flex flex-col gap-3">
      <div
        className="h-24 rounded-xl flex flex-col items-center justify-center gap-1"
        style={{ background: '#0d0e0d', border: '1px solid rgba(184,245,58,0.10)' }}
      >
        <span
          className="text-[9px] font-bold tracking-widest uppercase"
          style={{ color: 'rgba(184,245,58,0.5)', fontFamily: "'Syne', sans-serif" }}
        >
          Scale Your Ops
        </span>
        <span
          className="text-4xl font-black"
          style={{ color: '#b8f53a', fontFamily: "'Syne', sans-serif" }}
        >
          [10X]
        </span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-2 rounded w-4/5" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="h-2 rounded w-3/5" style={{ background: 'rgba(255,255,255,0.05)' }} />
      </div>
      <div className="flex justify-between items-center">
        <span
          className="text-xs font-bold tracking-wider"
          style={{ color: '#b8f53a', fontFamily: "'Syne', sans-serif" }}
        >
          APEX SYSTEMS
        </span>
        <button
          className="text-xs font-bold px-3 py-1.5 rounded-lg"
          style={{ background: '#b8f53a', color: '#0a0a0a', fontFamily: "'Syne', sans-serif" }}
        >
          Launch →
        </button>
      </div>
    </div>
  );
}

// ── Card 4: Warm Editorial ──────────────────────────────
export function Card4() {
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="h-28 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-2 rounded bg-amber-200 w-4/5" />
        <div className="h-2 rounded bg-amber-100 w-3/5" />
      </div>
      <span
        className="text-[10px] font-semibold px-2 py-1 rounded-lg self-start"
        style={{
          background: '#f0ebe3',
          color: '#8a7a6a',
          fontFamily: "'Syne', sans-serif",
        }}
      >
        Editorial Design
      </span>
    </div>
  );
}