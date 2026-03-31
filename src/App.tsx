import { useEffect, useRef, useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { AnimatedCards } from './components/AnimCard';

function App() {
  const [progress, setProgress]   = useState(0);
  const [showHint, setShowHint]   = useState(true);
  const heroRightRef              = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    if (!heroRightRef.current) return;
    const rect  = heroRightRef.current.getBoundingClientRect();
    const total = heroRightRef.current.offsetHeight - window.innerHeight;
    const p     = -rect.top / (total * 0.7);
    setProgress(p);
    setShowHint(p < 0.04);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <div className="bg-[#f5f5f0] min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <div className="max-w-[1300px] mx-auto px-10 grid grid-cols-2 min-h-screen">

        {/* LEFT — sticky */}
        <div className="sticky top-0 h-screen flex flex-col justify-center pr-12 z-20">
          <div className="w-9 h-9 rounded-full bg-white border border-black/10 shadow-sm mb-7
                          animate-[fadeUp_.5s_ease_both]" />

          <h1
            className="font-black leading-[1.0] tracking-[-0.04em] mb-5
                       animate-[fadeUp_.6s_.08s_ease_both] opacity-0 [animation-fill-mode:both]"
            style={{ fontSize: 'clamp(42px,4.8vw,66px)', fontFamily: "'Syne',sans-serif" }}
          >
            <span className="text-[#b8b8b0] block">Design that</span>
            <span className="text-black block">delivers results.</span>
          </h1>

          <p className="text-base leading-relaxed max-w-sm mb-8
                        animate-[fadeUp_.6s_.18s_ease_both] opacity-0 [animation-fill-mode:both]">
            <strong className="text-black font-semibold">
              Strategic design that drives growth, not just looks good.{' '}
            </strong>
            <span className="text-neutral-500">
              I create everything your brand needs to attract customers and turn them into sales.
            </span>
          </p>

          <button
            className="inline-flex items-center gap-3 bg-black text-white rounded-full
                       px-6 py-3 text-sm font-semibold w-fit cursor-pointer
                       hover:bg-neutral-800 transition-colors
                       animate-[fadeUp_.6s_.28s_ease_both] opacity-0 [animation-fill-mode:both]"
            style={{ boxShadow: '0 12px 40px rgba(0,0,0,.22)', fontFamily: "'DM Sans',sans-serif" }}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-300 shrink-0 overflow-hidden flex items-center justify-center text-xs">
              👤
            </div>
            Book a call with me
          </button>

          {/* Social proof */}
          <div className="flex items-center gap-3 mt-8
                          animate-[fadeUp_.6s_.38s_ease_both] opacity-0 [animation-fill-mode:both]">
            <div className="flex">
              {[0,1,2,3,4].map(i => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#f5f5f0] flex items-center justify-center text-xs"
                  style={{ background:`hsl(${i*35+20},55%,65%)`, marginLeft: i>0 ? -8 : 0, zIndex: 5-i }}>
                  👤
                </div>
              ))}
            </div>
            <div>
              <div className="text-[11px] text-amber-500 tracking-wide">★★★★★</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">99+ Happy clients</div>
            </div>
          </div>

          {/* Scroll hint */}
          <div
            className="absolute bottom-8 left-0 flex flex-col items-center gap-1.5 transition-opacity duration-500"
            style={{ opacity: showHint ? 1 : 0 }}
          >
            <span className="text-[9px] font-bold tracking-[.16em] uppercase text-neutral-400"
              style={{ fontFamily: "'Syne',sans-serif" }}>Scroll</span>
            <div className="w-px h-8 bg-neutral-300 relative overflow-hidden">
              <div className="absolute inset-x-0 h-full bg-black animate-[scrollLine_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        {/* RIGHT — scroll zone (210vh) → sticky cards viewport */}
        <div ref={heroRightRef} className="min-h-[210vh] relative">
          <div className="sticky top-0 h-screen py-6 pl-4">
            {/*
              AnimatedCards fills 100% of this container.
              progress 0 = stacked/tilted fan
              progress 1 = full 2×2 grid filling the right half
            */}
            <AnimatedCards progress={progress} />
          </div>
        </div>
      </div>

      {/* ── LOGOS STRIP ── */}
      <div className="border-t border-black/[0.07] py-6 px-12 flex items-center gap-12 overflow-hidden max-w-[1300px] mx-auto">
        {['Frequencii', 'Kintsugi', 'CoreOS', 'Luminary', 'Codecraft_'].map(l => (
          <span key={l} className="text-sm font-semibold text-neutral-300 whitespace-nowrap">{l}</span>
        ))}
      </div>

      {/* ── SPEAK TO ME floating CTA ── */}
      <div
        className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50
                   bg-white/95 backdrop-blur-xl rounded-full
                   px-5 py-2.5 flex items-center gap-3
                   shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                   border border-black/[0.07]
                   transition-opacity duration-500"
        style={{ opacity: progress > 0.3 ? 1 : 0 }}
      >
        <div>
          <div className="text-[13px] font-semibold text-black leading-tight">Speak to me</div>
          <div className="text-[11px] text-neutral-400">Email or book a call</div>
        </div>
        {['✉','📅'].map((ico, i) => (
          <div key={i} className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-base cursor-pointer hover:bg-neutral-800 transition-colors">
            {ico}
          </div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp     { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scrollLine { 0%{top:-100%} 100%{top:100%} }
      `}</style>
    </div>
  );
}

export default App;