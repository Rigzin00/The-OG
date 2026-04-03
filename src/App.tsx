import { useEffect, useRef, useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { AnimatedCards } from './components/Animcard';

function App() {
  const [progress, setProgress]   = useState(0);
  const heroRightRef              = useRef<HTMLDivElement>(null);

const currentProgress = useRef(0);
  const targetProgress = useRef(0);
  const rafRef = useRef<number | null>(null);

  const onScroll = useCallback(() => {
    if (!heroRightRef.current) return;
    const rect  = heroRightRef.current.getBoundingClientRect();
    // Lock progress to exactly viewport height: 1 progress unit = 100vh scroll.
    // This makes the transition to "overScroll" perfectly match native browser scroll speed.
    let p = -rect.top / window.innerHeight;
    p = Math.max(0, p);
    targetProgress.current = p;
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
<div className="bg-[#f5f5f0] min-h-screen relative overflow-x-clip">
      {/* ── GLOBAL BACKGROUND GRID ── */}
      <div className="fixed inset-0 pointer-events-none flex justify-center z-0">
        <div className="w-full max-w-[1300px] h-full border-x border-black/[0.08]"></div>
      </div>

      <Navbar />

      {/* ── HERO CONTENT ── */}
      <div className="max-w-[1300px] mx-auto px-10 grid grid-cols-2 min-h-screen relative z-10 pointer-events-none">
        {/* LEFT — sticky text */}
        <div className="sticky top-0 h-screen flex flex-col justify-center pr-12 pointer-events-auto">
          

          <h1
            className="font-black leading-[1.0] tracking-[-0.04em] mb-5
                       animate-[fadeUp_.6s_.08s_ease_both] opacity-0 [animation-fill-mode:both]"
            style={{ fontSize: 'clamp(42px,4.8vw,66px)', fontFamily: "'Syne',sans-serif" }}
          >
            <span className="text-[#b8b8b0] block">Software that</span>
            <span className="text-black block">delivers results.</span>
          </h1>

          <p className="text-base leading-relaxed max-w-sm mb-8
                        animate-[fadeUp_.6s_.18s_ease_both] opacity-0 [animation-fill-mode:both]">
            <strong className="text-black font-semibold">
              Strategic software that drives growth, not just works fine.{' '}
            </strong>
            <span className="text-neutral-500">
              We create everything your brand needs to attract customers and turn them into sales.
            </span>
          </p>

          <button
            className="group inline-flex items-center gap-3.5 bg-[#0a0a0a] text-white rounded-full
                       pl-1.5 pr-7 py-1.5 text-[16px] font-bold w-fit cursor-pointer
                       border border-white/10 hover:scale-[1.02] hover:bg-black active:scale-95 
                       transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                       animate-[fadeUp_.6s_.28s_ease_both] opacity-0 [animation-fill-mode:both]"
            style={{ 
              boxShadow: '0 12px 40px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.15)', 
              fontFamily: "'DM Sans',sans-serif" 
            }}
          >
            <div className="flex items-center relative">
              <div className="relative z-10 w-[42px] h-[42px] shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=120&h=120&fit=crop" 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover pointer-events-none drop-shadow-sm"
                />
              </div>

              {/* The "+" Sign sliding out */}
              <div className="absolute z-[5] left-[42px] top-0 h-full w-[32px] flex items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                              opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>

              {/* The "You" Circle sliding out */}
              <div className="absolute z-[4] left-0 top-0 h-full flex items-center transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                              opacity-0 translate-x-0 group-hover:translate-x-[74px] group-hover:opacity-100">
                <div className="w-[42px] h-[42px] bg-white rounded-full flex items-center justify-center text-black font-bold text-[14px] shrink-0 tracking-tight leading-none">
                  You
                </div>
              </div>

              {/* Invisible Spacer to push the text */}
              <div className="transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] w-0 group-hover:w-[74px]"></div>
            </div>
            <span className="tracking-tight whitespace-nowrap">Book a call with us</span>
          </button>
        </div>

        {/* This invisible column just to maintain grid structure */}
        <div className="relative pointer-events-none"></div>
      </div>

      {/* ── LOGOS STRIP (Placed just after the Hero / Landing page) ── */}
      <div className="absolute top-[100vh] left-0 w-full z-10 bg-[#f5f5f0] border-t border-b border-black/[0.07] pointer-events-auto">
        <div className="py-10 px-10 flex items-center justify-between gap-8 max-w-[1300px] w-full mx-auto overflow-hidden">
          {/* STATIC LEFT: Social Proof */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex">
              {[
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
                'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop'
              ].map((imgUrl, i) => (
                <img 
                  key={i} 
                  src={imgUrl} 
                  alt="Client" 
                  className="w-[36px] h-[36px] rounded-full border-[2.5px] border-[#f5f5f0] object-cover grayscale-[20%]" 
                  style={{ marginLeft: i > 0 ? -12 : 0, zIndex: 5 - i }} 
                />
              ))}
            </div>
            <div>
              <div className="text-[13px] text-black tracking-widest leading-none mb-1">★★★★★</div>
              <div className="text-[14px] font-bold text-neutral-600 leading-none" style={{ fontFamily: "'DM Sans',sans-serif" }}>10+ Happy clients</div>
            </div>
          </div>

          {/* SCROLLING RIGHT: Logos Marquee */}
          <div 
            className="flex-1 relative overflow-hidden" 
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', 
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' 
            }}
          >
            <div className="flex items-center w-max animate-[marquee_25s_linear_infinite]">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-16 px-8">
                  {/* Luminary */}
                  <div className="flex items-center gap-3 text-[22px] font-bold text-black/30 tracking-tight" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-black/5 to-black/20 shadow-inner"></div>
                    HHTrails
                  </div>
                  {/* 45 Degrees */}
                  <div className="flex items-center gap-2.5 text-[22px] font-bold text-black/30 tracking-tight" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                    ICGAIFE
                  </div>
                  {/* Codecraft_ */}
                  <div className="flex items-center gap-2.5 text-[22px] font-bold text-black/30 tracking-tight" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                     <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" opacity="0.5"/><path d="M10 10h6v6h-6z"/></svg>
                    SNIVRA
                  </div>
                  {/* Frequencii */}
                  <div className="flex items-center gap-2.5 text-[22px] font-bold text-black/30 tracking-tight" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" /></svg>
                    Walnut Snowveil
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SCROLL TRIGER for CARDS ── */}
      {/* Keep enough room for the card transition + reveal, without trailing blank space. */}
      <div ref={heroRightRef} className="min-h-[240vh] relative -mt-[100vh]">   
        <div className="sticky top-0 w-full h-screen overflow-hidden z-20 pointer-events-none">
          <div className="absolute inset-0">
            <AnimatedCards progress={progress} />
          </div>
        </div>
      </div>

      <footer className="relative z-20 border-t border-black/[0.08] bg-[#f5f5f0]">
        <div
          className="max-w-[1300px] mx-auto px-6 py-8 grid grid-cols-3 items-center gap-4 text-[12px] tracking-[0.08em] uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <a href="#" className="justify-self-start text-black/70 hover:text-black transition-colors duration-300">Terms and Conditions</a>
          <p className="justify-self-center text-[11px] tracking-[0.12em] text-black/45">© The OG</p>
          <a href="#" className="justify-self-end text-black/70 hover:text-black transition-colors duration-300">Privacy Policy</a>
        </div>
      </footer>

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
          <div className="text-[16px] font-bold text-black leading-tight tracking-tight" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>Speak to us</div>
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