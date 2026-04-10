import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);

  const compactMode = isScrolled || isNarrowViewport;

  useEffect(() => {
    const media = window.matchMedia('(max-width: 529px)');
    const syncViewport = () => setIsNarrowViewport(media.matches);

    syncViewport();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', syncViewport);
      return () => media.removeEventListener('change', syncViewport);
    }

    media.addListener(syncViewport);
    return () => media.removeListener(syncViewport);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger contract animation when scrolled down more than 50px
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize text state appropriately
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <style>{`
        @keyframes dotWave {
          0%, 100% { transform: translateY(1.5px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
      <nav 
        className="bg-[#f5f5f0] backdrop-blur-md border border-neutral-200/80 rounded-full p-2 flex items-center shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]" 
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Profile */}
        <Link to="/" className="flex items-center gap-3 no-underline pl-1 pr-2 whitespace-nowrap">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
            alt="Joseph Alexander" 
            className="w-[42px] h-[42px] rounded-full object-cover shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          />
          <span className="font-bold text-[15px] text-black tracking-tight leading-none hover:opacity-80 transition-opacity">
            The OG
          </span>
        </Link>

        {/* Links + Contact (Collapses on Scroll) */}
        <div 
          className={`flex items-center overflow-hidden transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            compactMode ? 'max-w-0 opacity-0' : 'max-w-[500px] opacity-100'
          }`}
        >
          <ul className="flex items-center gap-8 list-none m-0 p-0 pl-6 pr-8 border-l border-transparent">
            {['Works', 'About', 'Services' ].map((link) => (
              <li key={link}>
                <Link
                  to={`/${link.toLowerCase()}`}
                  className="text-[15px] font-bold text-black no-underline hover:text-neutral-500 transition-colors whitespace-nowrap"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="bg-[#f7f7f7] border border-neutral-200/60 rounded-full px-6 py-2.5 text-[15px] font-bold text-black no-underline hover:bg-[#e5e5e5] transition-colors leading-none shrink-0 whitespace-nowrap shadow-sm"
          >
            Contact
          </a>
        </div>

        {/* 3 Dots Menu (Appears on Scroll) */}
        <div 
          className={`flex items-center justify-center overflow-hidden transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
            compactMode ? 'max-w-[40px] opacity-100 px-3' : 'max-w-0 opacity-0 px-0'
          }`}
        >
          <div className="flex gap-1.5 hover:opacity-70 transition-opacity py-2 px-1">
            <div className="w-[5.5px] h-[5.5px] rounded-full bg-[#111] animate-[dotWave_1.2s_ease-in-out_infinite]" />
            <div className="w-[5.5px] h-[5.5px] rounded-full bg-neutral-400 animate-[dotWave_1.2s_ease-in-out_infinite] [animation-delay:200ms]" />
            <div className="w-[5.5px] h-[5.5px] rounded-full bg-neutral-400 animate-[dotWave_1.2s_ease-in-out_infinite] [animation-delay:400ms]" />
          </div>
        </div>

      </nav>
    </div>
  );
}