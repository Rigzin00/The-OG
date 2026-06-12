import { useRef, useState, useEffect, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { Navbar } from '../components/Navbar';

/* ─────────────────────────────────────────
   SHARED EASING
───────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────
   ANIMATED WORDS
───────────────────────────────────────── */
function AnimatedWords({
  text,
  className = '',
  delay = 0,
  stagger = 0.07,
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  const words = text.split(' ');
  return (
    <div
      ref={ref}
      className={`overflow-visible ${className}`}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.22em 0', ...style }}
    >
      {words.map((word, i) => (
        <div key={i} style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.3em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   REVEAL
───────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   LINE DIVIDER
───────────────────────────────────────── */
function DrawLine({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });
  return (
    <div ref={ref} className="overflow-hidden h-px w-full my-8">
      <motion.div
        className="h-full bg-black/10"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, delay, ease: [0.0, 0.0, 0.2, 1] }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────── */
export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <motion.div
      className="bg-[#f5f5f0] min-h-screen relative overflow-x-clip font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {/* ── Ambient gradient ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-700"
        style={{
          background: `radial-gradient(900px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0,0,0,0.02), transparent 60%)`,
        }}
      />

      {/* ── Grid lines ── */}
      <div className="fixed inset-0 pointer-events-none flex justify-center z-0">
        <div className="w-full max-w-[1300px] h-full border-x border-black/[0.07]" />
      </div>

      <Navbar />

      {/* ══════════════════════════════════════
          PAGE CONTENT
      ══════════════════════════════════════ */}
      <div ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-[1300px] mx-auto px-5 sm:px-7 md:px-10 w-full"
        >
          {/* Label */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          >
            <div className="w-2 h-2 rounded-full bg-black" />
            <span className="text-[12px] font-bold tracking-[0.22em] uppercase text-black/50" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Get In Touch
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1fr_0.8fr] gap-12 md:gap-24 lg:gap-32 items-start mt-8">
            {/* LIFT SIDE (Text & Info) */}
            <div>
              <div className="mb-10">
                <AnimatedWords
                  text="Let's build"
                  delay={0.1}
                  stagger={0.08}
                  className="text-[#b0b0a8] font-black tracking-[-0.045em] leading-[0.9]"
                  style={{ fontSize: 'clamp(36px,7vw,90px)', fontFamily: "'Syne',sans-serif" }}
                />
                <AnimatedWords
                  text="something together."
                  delay={0.25}
                  stagger={0.09}
                  className="text-black font-black tracking-[-0.045em] leading-[0.9]"
                  style={{ fontSize: 'clamp(36px,7vw,90px)', fontFamily: "'Syne',sans-serif" }}
                />
              </div>

              <Reveal delay={0.45}>
                <p className="text-[16px] md:text-[18px] leading-[1.7] text-neutral-500 max-w-[480px] mb-12" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  Whether you have a clear scope in mind or just absolute conviction that you need to evolve, we're ready to talk. Leave a message and we'll get back to you within 24 hours.
                </p>
              </Reveal>

              <Reveal delay={0.55}>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-white border border-black/10 flex items-center justify-center shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
                      alt="Joseph" 
                      className="w-12 h-12 rounded-full object-cover" 
                    />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold tracking-widest uppercase text-black/40 mb-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>Direct Contact</div>
                    <a href="mailto:hello@theog.studio" className="font-bold text-[18px] text-black no-underline hover:text-black/60 transition-colors" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      hello@theog.studio
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Social / Extra info */}
              <div className="mt-16 sm:mt-24">
                <DrawLine delay={0.65} />
                <Reveal delay={0.7} className="flex flex-wrap gap-x-12 gap-y-6">
                  <div>
                     <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-black/30 mb-2" style={{ fontFamily: "'DM Sans',sans-serif" }}>Location</div>
                     <div className="text-[15px] font-medium text-black/80" style={{ fontFamily: "'DM Sans',sans-serif" }}>Based in London, UK<br/>Working Worldwide.</div>
                  </div>
                  <div>
                     <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-black/30 mb-2" style={{ fontFamily: "'DM Sans',sans-serif" }}>Socials</div>
                     <div className="flex gap-4">
                       <a href="#" className="text-[15px] font-medium text-black/80 hover:text-black transition-colors" style={{ fontFamily: "'DM Sans',sans-serif" }}>Twitter</a>
                       <a href="#" className="text-[15px] font-medium text-black/80 hover:text-black transition-colors" style={{ fontFamily: "'DM Sans',sans-serif" }}>LinkedIn</a>
                       <a href="#" className="text-[15px] font-medium text-black/80 hover:text-black transition-colors" style={{ fontFamily: "'DM Sans',sans-serif" }}>Dribbble</a>
                     </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* RIGHT SIDE (Form) */}
            <Reveal delay={0.35}>
               <div className="relative p-6 sm:p-10 rounded-[28px] border border-black/[0.08] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.06)] overflow-hidden">
                 {/* Shiny gradient at the top edge */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
                 
                 <h2 className="text-[22px] font-bold tracking-tight text-black mb-8" style={{ fontFamily: "'Syne',sans-serif" }}>Send us a message</h2>
                 
                 <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                   <div className="flex flex-col gap-2">
                     <label htmlFor="name" className="text-[13px] font-bold tracking-wide text-neutral-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>Name</label>
                     <input 
                       type="text" 
                       id="name" 
                       required
                       placeholder="Jane Doe"
                       className="w-full bg-[#f8f8f8] border border-black/5 rounded-xl px-4 py-3.5 text-[15px] outline-none focus:border-black/20 focus:bg-white transition-all text-black placeholder:text-black/20"
                       style={{ fontFamily: "'DM Sans',sans-serif" }}
                     />
                   </div>

                   <div className="flex flex-col gap-2">
                     <label htmlFor="email" className="text-[13px] font-bold tracking-wide text-neutral-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>Email address</label>
                     <input 
                       type="email" 
                       id="email" 
                       required
                       placeholder="jane@company.com"
                       className="w-full bg-[#f8f8f8] border border-black/5 rounded-xl px-4 py-3.5 text-[15px] outline-none focus:border-black/20 focus:bg-white transition-all text-black placeholder:text-black/20"
                       style={{ fontFamily: "'DM Sans',sans-serif" }}
                     />
                   </div>

                   <div className="flex flex-col gap-2">
                     <label htmlFor="budget" className="text-[13px] font-bold tracking-wide text-neutral-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>Estimated budget</label>
                     <div className="relative">
                       <select 
                         id="budget" 
                         className="w-full appearance-none bg-[#f8f8f8] border border-black/5 rounded-xl px-4 py-3.5 text-[15px] outline-none focus:border-black/20 focus:bg-white transition-all text-black cursor-pointer"
                         style={{ fontFamily: "'DM Sans',sans-serif" }}
                         defaultValue=""
                       >
                         <option value="" disabled>Select an option</option>
                         <option value="10-25k">$10k - $25k</option>
                         <option value="25-50k">$25k - $50k</option>
                         <option value="50-100k">$50k - $100k</option>
                         <option value="100k+">$100k+</option>
                       </select>
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/40">
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                       </div>
                     </div>
                   </div>

                   <div className="flex flex-col gap-2 mb-2">
                     <label htmlFor="message" className="text-[13px] font-bold tracking-wide text-neutral-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>Project details</label>
                     <textarea 
                       id="message" 
                       required
                       placeholder="Tell us about what you want to build..."
                       className="w-full bg-[#f8f8f8] border border-black/5 rounded-xl px-4 py-3.5 text-[15px] outline-none focus:border-black/20 focus:bg-white transition-all text-black placeholder:text-black/20 min-h-[120px] resize-y"
                       style={{ fontFamily: "'DM Sans',sans-serif" }}
                     />
                   </div>

                   <motion.button
                     type="submit"
                     disabled={formState !== 'idle'}
                     className={`w-full relative overflow-hidden rounded-xl py-4 font-bold text-[15px] shrink-0 transition-colors ${formState === 'success' ? 'bg-[#50b848] text-white' : 'bg-[#0a0a0a] text-white hover:bg-black'}`}
                     style={{ fontFamily: "'DM Sans',sans-serif", boxShadow: formState === 'success' ? 'none' : '0 8px 30px rgba(0,0,0,0.2),inset 0 1px 2px rgba(255,255,255,0.1)' }}
                     whileTap={formState === 'idle' ? { scale: 0.98 } : {}}
                   >
                     <AnimatePresence mode="wait">
                       {formState === 'idle' && (
                         <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex justify-center items-center gap-2">
                           Send Message
                         </motion.div>
                       )}
                       {formState === 'submitting' && (
                         <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center items-center">
                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         </motion.div>
                       )}
                       {formState === 'success' && (
                         <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -10 }} className="flex justify-center items-center gap-2">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                           Message sent
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </motion.button>
                 </form>

                 {/* Absolute dots pattern background for form container */}
                 <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle,black 1px,transparent 1px)', backgroundSize: '16px 16px' }}></div>
               </div>
            </Reveal>
          </div>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@400;500;700&display=swap');
      `}</style>
    </motion.div>
  );
}
