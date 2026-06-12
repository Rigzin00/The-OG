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
function DrawLine({ delay = 0, className = "my-8" }: { delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });
  return (
    <div ref={ref} className={`overflow-hidden h-px w-full ${className}`}>
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
   FAQ ACCORDION
───────────────────────────────────────── */
const FAQS = [
  {
    q: "Do you take on equity-based projects?",
    a: "We rarely take on speculative equity-only projects. However, for heavily-vetted startups with secured funding, we occasionally offer a hybrid cash/equity model to align long-term incentives."
  },
  {
    q: "What is your typical turnaround time?",
    a: "A standard MVP or aesthetic refresh takes 4-6 weeks. Complex enterprise applications or massive full-scale branding usually run 8-12 weeks. We map this out exactly in the initial proposal."
  },
  {
    q: "Do you provide ongoing post-launch support?",
    a: "Absolutely. Most of our clients retain us on a monthly basis for continuous conversion optimization, architecture scaling, and new feature rollouts after the initial build is complete."
  }
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={0.1 * index}>
      <div 
        className="border-b border-black/[0.08] py-6 cursor-pointer group"
        onClick={() => setOpen(!open)}
      >
        <div className="flex justify-between items-center pr-2">
          <h4 className="text-[17px] font-bold text-black tracking-tight" style={{ fontFamily: "'Syne',sans-serif" }}>{q}</h4>
          <motion.div
            animate={{ rotate: open ? 45 : 0, color: open ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)' }}
            transition={{ duration: 0.35, ease: EASE }}
            className="group-hover:text-black/80 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </motion.div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="pt-4 text-[15px] leading-[1.7] text-neutral-500 max-w-[90%]" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────── */
const SERVICE_PILLS = [
  "Web Development", "App Development", "UI/UX Design", "Brand Identity", "Motion", "Growth Strategy"
];

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  // Track scroll for subtle parallax
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

  const toggleService = (svc: string) => {
    setSelectedServices(prev => 
      prev.includes(svc) ? prev.filter(s => s !== svc) : [...prev, svc]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 4000);
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
          background: `radial-gradient(1100px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0,0,0,0.025), transparent 60%)`,
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

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-24 items-start mt-8">
            {/* ── LEFT SIDE (Text & Info) ── */}
            <div>
              <div className="mb-10 lg:mb-14">
                <AnimatedWords
                  text="Let's build"
                  delay={0.1}
                  stagger={0.08}
                  className="text-[#b0b0a8] font-black tracking-[-0.045em] leading-[0.9]"
                  style={{ fontSize: 'clamp(42px,6.5vw,90px)', fontFamily: "'Syne',sans-serif" }}
                />
                <AnimatedWords
                  text="something exceptional."
                  delay={0.25}
                  stagger={0.09}
                  className="text-black font-black tracking-[-0.045em] leading-[0.9]"
                  style={{ fontSize: 'clamp(42px,6.5vw,90px)', fontFamily: "'Syne',sans-serif" }}
                />
              </div>

              <Reveal delay={0.45}>
                <p className="text-[16px] md:text-[18px] leading-[1.7] text-neutral-500 max-w-[480px] mb-12" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  Whether you have a clear scope in mind or just absolute conviction that you need to evolve, we're ready to talk. Leave a detailed message and a senior partner will get back to you within 24 hours.
                </p>
              </Reveal>

              {/* Direct Contacts Grid */}
              <Reveal delay={0.55}>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
                    <div>
                      <div className="text-[11px] font-bold tracking-widest uppercase text-black/40 mb-2.5 flex items-center gap-2" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                        New Business
                      </div>
                      <a href="mailto:hello@theog.studio" className="font-bold text-[17px] text-black no-underline hover:text-black/60 transition-colors block" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        hello@theog.studio
                      </a>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-widest uppercase text-black/40 mb-2.5 flex items-center gap-2" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                        Client Support
                      </div>
                      <a href="mailto:support@theog.studio" className="font-bold text-[17px] text-black no-underline hover:text-black/60 transition-colors block" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        support@theog.studio
                      </a>
                    </div>
                 </div>
              </Reveal>

              <DrawLine delay={0.6} className="my-10" />

              {/* Global Locations */}
              <Reveal delay={0.65}>
                <div className="text-[11px] font-bold tracking-widest uppercase text-black/40 mb-6" style={{ fontFamily: "'DM Sans',sans-serif" }}>Global Offices</div>
                <div className="flex flex-wrap gap-x-12 gap-y-8">
                  <div>
                    <div className="font-bold text-[16px] text-black mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>London</div>
                    <div className="text-[14px] text-neutral-500 leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif" }}>71 Cherry Court<br/>Southampton, SO53 5PD<br/>United Kingdom</div>
                  </div>
                  <div>
                    <div className="font-bold text-[16px] text-black mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>New York</div>
                    <div className="text-[14px] text-neutral-500 leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif" }}>120 Spencer Street<br/>Brooklyn, NY 11205<br/>United States</div>
                  </div>
                  <div>
                    <div className="font-bold text-[16px] text-black mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>Tokyo</div>
                    <div className="text-[14px] text-neutral-500 leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif" }}>Shibuya-ku<br/>Tokyo 150-0002<br/>Japan</div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT SIDE (Premium Extended Form) ── */}
            <Reveal delay={0.35}>
               <div className="relative p-6 sm:p-10 rounded-[32px] border border-black/[0.06] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.05),_0_2px_10px_rgba(0,0,0,0.03)] overflow-hidden">
                 {/* Shiny gradient at the top edge */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
                 
                 <div className="flex items-center gap-3 mb-8">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#50b848] animate-pulse"></div>
                   <h2 className="text-[15px] font-bold tracking-tight text-neutral-500 uppercase tracking-widest" style={{ fontFamily: "'DM Sans',sans-serif" }}>Accepting new clients</h2>
                 </div>
                 
                 <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                   {/* Pills Section */}
                   <div className="flex flex-col gap-3">
                     <label className="text-[13px] font-bold tracking-wide text-black" style={{ fontFamily: "'DM Sans',sans-serif" }}>What can we help you with? <span className="text-black/30 font-normal">(Select all that apply)</span></label>
                     <div className="flex flex-wrap gap-2">
                       {SERVICE_PILLS.map(svc => {
                         const isSelected = selectedServices.includes(svc);
                         return (
                           <button
                             type="button"
                             key={svc}
                             onClick={() => toggleService(svc)}
                             className={`px-4 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 border ${
                               isSelected 
                                ? 'bg-black text-white border-black shadow-md scale-[1.02]' 
                                : 'bg-[#f8f8f8] text-black/60 border-black/5 hover:border-black/20 hover:bg-white'
                             }`}
                             style={{ fontFamily: "'DM Sans',sans-serif" }}
                           >
                             {svc}
                           </button>
                         )
                       })}
                     </div>
                   </div>

                   {/* Split Row for Name & Email */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                     <div className="flex flex-col gap-2 relative group">
                       <label htmlFor="name" className="text-[13px] font-bold tracking-wide text-black" style={{ fontFamily: "'DM Sans',sans-serif" }}>Name</label>
                       <div className="relative">
                         <input 
                           type="text" 
                           id="name" 
                           required
                           placeholder="John Doe"
                           className="w-full bg-[#f8f8f8] border border-black/5 rounded-2xl px-5 py-4 text-[15px] outline-none focus:border-black/20 focus:bg-white focus:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all text-black placeholder:text-black/20"
                           style={{ fontFamily: "'DM Sans',sans-serif" }}
                         />
                       </div>
                     </div>

                     <div className="flex flex-col gap-2">
                       <label htmlFor="email" className="text-[13px] font-bold tracking-wide text-black" style={{ fontFamily: "'DM Sans',sans-serif" }}>Email address</label>
                       <div className="relative">
                         <input 
                           type="email" 
                           id="email" 
                           required
                           placeholder="john@company.com"
                           className="w-full bg-[#f8f8f8] border border-black/5 rounded-2xl px-5 py-4 text-[15px] outline-none focus:border-black/20 focus:bg-white focus:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all text-black placeholder:text-black/20"
                           style={{ fontFamily: "'DM Sans',sans-serif" }}
                         />
                       </div>
                     </div>
                   </div>

                   {/* Split Row for Budget & Lead Source */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                     <div className="flex flex-col gap-2">
                       <label htmlFor="budget" className="text-[13px] font-bold tracking-wide text-black" style={{ fontFamily: "'DM Sans',sans-serif" }}>Estimated budget</label>
                       <div className="relative">
                         <select 
                           id="budget" 
                           className="w-full appearance-none bg-[#f8f8f8] border border-black/5 rounded-2xl px-5 py-4 text-[15px] outline-none focus:border-black/20 focus:bg-white focus:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all text-black cursor-pointer"
                           style={{ fontFamily: "'DM Sans',sans-serif" }}
                           defaultValue=""
                         >
                           <option value="" disabled>Select budget...</option>
                           <option value="10-25k">$10k - $25k</option>
                           <option value="25-50k">$25k - $50k</option>
                           <option value="50-100k">$50k - $100k</option>
                           <option value="100k+">$100k+</option>
                         </select>
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/40">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                         </div>
                       </div>
                     </div>
                     <div className="flex flex-col gap-2">
                       <label htmlFor="source" className="text-[13px] font-bold tracking-wide text-black" style={{ fontFamily: "'DM Sans',sans-serif" }}>How did you hear about us?</label>
                       <div className="relative">
                         <select 
                           id="source" 
                           className="w-full appearance-none bg-[#f8f8f8] border border-black/5 rounded-2xl px-5 py-4 text-[15px] outline-none focus:border-black/20 focus:bg-white focus:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all text-black cursor-pointer"
                           style={{ fontFamily: "'DM Sans',sans-serif" }}
                           defaultValue=""
                         >
                           <option value="" disabled>Select option...</option>
                           <option value="google">Google Search</option>
                           <option value="social">Social Media (Twitter, LinkedIn)</option>
                           <option value="referral">Friend / Colleague</option>
                           <option value="awwwards">Awwwards / Gallery</option>
                           <option value="other">Other</option>
                         </select>
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/40">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                         </div>
                       </div>
                     </div>
                   </div>

                   <div className="flex flex-col gap-2">
                     <label htmlFor="message" className="text-[13px] font-bold tracking-wide text-black" style={{ fontFamily: "'DM Sans',sans-serif" }}>Project details</label>
                     <textarea 
                       id="message" 
                       required
                       placeholder="Tell us about your company, your vision, and what you're hoping to achieve..."
                       className="w-full bg-[#f8f8f8] border border-black/5 rounded-2xl px-5 py-4 text-[15px] outline-none focus:border-black/20 focus:bg-white focus:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all text-black placeholder:text-black/20 min-h-[140px] resize-y"
                       style={{ fontFamily: "'DM Sans',sans-serif" }}
                     />
                   </div>

                   <motion.button
                     type="submit"
                     disabled={formState !== 'idle'}
                     className={`w-full relative overflow-hidden rounded-2xl py-4 mt-2 font-bold text-[16px] shrink-0 transition-colors ${formState === 'success' ? 'bg-[#50b848] text-white' : 'bg-[#0a0a0a] text-white hover:bg-black'}`}
                     style={{ fontFamily: "'DM Sans',sans-serif", boxShadow: formState === 'success' ? 'none' : '0 12px 40px rgba(0,0,0,0.2),inset 0 1px 2px rgba(255,255,255,0.1)' }}
                     whileTap={formState === 'idle' ? { scale: 0.98 } : {}}
                   >
                     <AnimatePresence mode="wait">
                       {formState === 'idle' && (
                         <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex justify-center items-center gap-2">
                           Submit Inquiry
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                         </motion.div>
                       )}
                       {formState === 'submitting' && (
                         <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center items-center">
                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         </motion.div>
                       )}
                       {formState === 'success' && (
                         <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -10 }} className="flex justify-center items-center gap-2">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                           We'll be in touch soon
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </motion.button>
                 </form>

                 {/* Absolute dots pattern background for form container */}
                 <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle,black 1px,transparent 1px)', backgroundSize: '24px 24px' }}></div>
               </div>
            </Reveal>
          </div>

          {/* ══════════════════════════════════════
              FAQ SECTION
          ══════════════════════════════════════ */}
          <div className="mt-24 md:mt-32 border-t border-black/[0.08] pt-20">
             <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
                <Reveal delay={0}>
                  <div className="sticky top-12">
                    <AnimatedWords
                      text="Common questions."
                      delay={0.0}
                      stagger={0.07}
                      className="text-black font-black tracking-[-0.035em] leading-[1.0] mb-4"
                      style={{ fontSize: 'clamp(28px,4vw,42px)', fontFamily: "'Syne',sans-serif" }}
                    />
                    <p className="text-[15px] leading-[1.7] text-neutral-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      Can't find the answer you're looking for? Reach out to our client support direct at <a href="mailto:support@theog.studio" className="text-black underline underline-offset-4 decoration-black/20 hover:decoration-black/100 transition-colors">support@theog.studio</a>.
                    </p>
                  </div>
                </Reveal>
                
                <div>
                   {FAQS.map((faq, i) => (
                     <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
                   ))}
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="relative z-20 border-t border-black/[0.08] bg-[#f5f5f0] mt-10">
        <div
          className="max-w-[1300px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] tracking-[0.08em] uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <a href="#" className="text-black/70 hover:text-black transition-colors duration-300">Terms</a>
          <p className="tracking-[0.12em] text-black/40">© The OG</p>
          <a href="#" className="text-black/70 hover:text-black transition-colors duration-300">Privacy</a>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@400;500;700&display=swap');
      `}</style>
    </motion.div>
  );
}
