import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { CARD_DATA, CardMockup } from '../components/Animcard';

function WorkCard({ card, index }: { card: typeof CARD_DATA[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div 
      className="w-full aspect-[4/3] rounded-[24px] overflow-hidden relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 + (index * 0.1), ease: [0.76, 0, 0.24, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <CardMockup card={card} hovered={hovered} />
    </motion.div>
  );
}

export default function Work() {
  return (
    <motion.div 
      className="bg-[#f5f5f0] min-h-screen relative overflow-x-clip pt-32"
      initial={{ y: '100%', opacity: 1 }}
      animate={{ y: '0%', opacity: 1 }}
      exit={{ y: '-100%', opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* ── GLOBAL BACKGROUND GRID ── */}
      <div className="fixed inset-0 pointer-events-none flex justify-center z-0">
        <div className="w-full max-w-[1300px] h-full border-x border-black/[0.08]"></div>
      </div>

      <Navbar />

      {/* ── WORK CONTENT ── */}
      <div className="max-w-[1300px] mx-auto px-10 relative z-10 flex flex-col items-center justify-center pt-24 pb-32">
        <motion.h1 
          className="font-semibold leading-[0.85] tracking-[-0.05em] text-center mb-10 text-[#0a0a0a] blur-0"
          style={{ fontSize: 'clamp(64px, 12vw, 100px)', fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="block">My most</span>
          <span className="block">recent work</span>
        </motion.h1>

        <motion.p 
          className="text-[#0a0a0a] font-medium text-[20px] md:text-[22px] tracking-[-0.01em] mt-0 text-center pb-24" 
          style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
        >
          No fluff, just hard-hitting design projects.
        </motion.p>

        {/* WORK GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 w-full max-w-[1100px] mx-auto pb-40">
          {CARD_DATA.map((card, i) => (
            <WorkCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
