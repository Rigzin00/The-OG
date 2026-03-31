import { useEffect, useRef, useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { AnimatedCards } from './components/Animcard';

function App() {
  const [progress, setProgress]   = useState(0);
  const [showHint, setShowHint]   = useState(true);
  const heroRightRef              = useRef<HTMLDivElement>(null);

const currentProgress = useRef(0);
  const targetProgress = useRef(0);
  const rafRef = useRef<number | null>(null);

  const onScroll = useCallback(() => {
    if (!heroRightRef.current) return;
    const rect  = heroRightRef.current.getBoundingClientRect();
    const total = heroRightRef.current.offsetHeight - window.innerHeight;       
    // Lock progress to exactly viewport height: 1 progress unit = 100vh scroll.
    // This makes the transition to "overScroll" perfectly match native browser scroll speed.
    let p = -rect.top / window.innerHeight;
    p = Math.max(0, p);
    targetProgress.current = p;
    setShowHint(p < 0.04);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      // Lerp for smooth scrolling - increased to 0.14 for a more snappy "web native" feel
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.14;
      
      // Only set state if the difference is meaningful to prevent micro-renders
      if (Math.abs(currentProgress.current - targetProgress.current) > 0.0001) {
        setProgress(currentProgress.current);
      }
      
      rafRef.current = requestAnimationFrame(updateProgress);
    };
    rafRef.current = requestAnimationFrame(updateProgress);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  return (
    <div className="bg-[#f5f5f0] min-h-screen">
      <Navbar />

      {/* ── HERO CONTENT ── */}
      <div className="max-w-[1300px] mx-auto px-10 grid grid-cols-2 min-h-screen relative z-10 pointer-events-none">
        {/* LEFT — sticky text */}
        <div className="sticky top-0 h-screen flex flex-col justify-center pr-12 pointer-events-auto">
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

        {/* This invisible column just to maintain grid structure */}
        <div className="relative pointer-events-none"></div>
      </div>

      {/* ── SCROLL TRIGER for CARDS ── */}
      {/* We make the scroll container much taller to give plenty of room to scroll down through the cards */}
      {/* We'll use 350vh so it maps beautifully to standard scroll without making it artificially too deep */}
      <div ref={heroRightRef} className="min-h-[350vh] relative -mt-[100vh]">   
        <div className="sticky top-0 w-full h-screen overflow-hidden z-20 pointer-events-none">
          <div className="absolute inset-0">
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
        className="group fixed left-1/2 z-50
                   bg-white/40 backdrop-blur-sm rounded-full
                   pl-6 group-hover:pl-1.5 pr-1.5 py-1.5 flex items-center
                   shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)]
                   border border-white/40
                   transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          bottom: '32px',
          opacity: progress > 0.3 ? 1 : 0,
          transform: progress > 0.3 ? 'translate(-50%, 0)' : 'translate(-50%, 120px)',
          pointerEvents: progress > 0.3 ? 'auto' : 'none'
        }}
      >
        <div className="flex flex-col whitespace-nowrap overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-w-[200px] opacity-100 group-hover:max-w-0 group-hover:opacity-0 mr-6 group-hover:mr-0">
          <div className="text-[16px] font-bold text-black leading-tight tracking-tight" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>Speak to me</div>
          <div className="text-[13px] text-black/50 font-semibold mt-0.5">Email or book a call</div>
        </div>
        
        <div className="flex gap-1.5 items-center cursor-default">
          <div className="h-[46px] min-w-[46px] px-[12px] group-hover:px-6 rounded-full bg-[#0a0a0a] border border-white/10 text-white flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-black hover:scale-[1.02] active:scale-95 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
            <svg className="shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
            </svg>
            <span className="font-semibold text-[15px] tracking-wide overflow-hidden whitespace-nowrap transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:ml-2.5">Contact</span>
          </div>

          <div className="h-[46px] min-w-[46px] px-[12px] group-hover:px-6 rounded-full bg-white text-black flex items-center justify-center border border-black/5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer hover:bg-gray-50 hover:scale-[1.02] active:scale-95 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
            <svg className="shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <path d="M3 10H21V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V10Z" fill="currentColor" stroke="none" />
              <path d="M9 16l2 2 4-4" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-semibold text-[15px] tracking-wide overflow-hidden whitespace-nowrap transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-w-0 opacity-0 group-hover:max-w-[110px] group-hover:opacity-100 group-hover:ml-2.5">Book a call</span>
          </div>
        </div>
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