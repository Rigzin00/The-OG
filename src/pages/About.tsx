import { useRef, useEffect, useState, type ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '../components/Navbar';

/* ── Reusable in-view reveal ── */
function Reveal({
  children,
  delay = 0,
  y = 32,
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
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated counter ── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const step = to / steps;
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setValue(to); clearInterval(timer); return; }
      setValue(Math.floor(start));
    }, 18);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{value}{suffix}</span>;
}

/* ── Single stat card ── */
function Stat({ value, suffix, label, delay }: { value: number; suffix?: string; label: string; delay: number }) {
  return (
    <Reveal delay={delay} className="flex flex-col gap-1">
      <div
        className="font-black leading-none tracking-[-0.04em] text-black"
        style={{ fontSize: 'clamp(42px,5vw,68px)', fontFamily: "'Syne',sans-serif" }}
      >
        <Counter to={value} suffix={suffix} />
      </div>
      <div
        className="text-[14px] text-neutral-500 font-medium"
        style={{ fontFamily: "'DM Sans',sans-serif" }}
      >
        {label}
      </div>
    </Reveal>
  );
}

/* ── Value card ── */
const VALUES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Quality-first',
    body: 'Every pixel is intentional. We never ship anything we wouldn\'t be proud to put our name on.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Relentless speed',
    body: 'Ideas die in slow pipelines. We move fast, learn faster, and ship without sacrificing craft.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Long-term thinking',
    body: 'We build for durability—scalable systems, clean code, evergreen design that stays relevant.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Radical transparency',
    body: 'No smoke and mirrors. You see exactly what we\'re building, when, and why—at every step.',
  },
];

/* ── Process step ── */
const PROCESS = [
  { num: '01', title: 'Discovery', desc: 'We deep-dive into your business, audience, and goals to understand what success really looks like.' },
  { num: '02', title: 'Strategy', desc: 'We map out the architecture, information hierarchy, and interaction models before a single line of code.' },
  { num: '03', title: 'Design & Build', desc: 'Pixel-perfect design meets production-grade engineering—delivered in tight, iterative sprints.' },
  { num: '04', title: 'Launch & Grow', desc: 'We don\'t just ship and disappear. We monitor, iterate, and scale after go-live.' },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <motion.div
      className="bg-[#f5f5f0] min-h-screen relative overflow-x-clip"
      initial={{ y: '100%', opacity: 1 }}
      animate={{ y: '0%', opacity: 1 }}
      exit={{ y: '-100%', opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* ── Background grid ── */}
      <div className="fixed inset-0 pointer-events-none flex justify-center z-0">
        <div className="w-full max-w-[1300px] h-full border-x border-black/[0.08]" />
      </div>

      <Navbar />

      {/* ════════════ HERO ════════════ */}
      <div ref={heroRef} className="relative overflow-hidden min-h-[88vh] flex items-end pb-20 md:pb-28">
        {/* Animated background blobs */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            className="absolute top-[15%] left-[10%] w-[480px] h-[480px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.08, 1], x: [0, 12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[8%] w-[360px] h-[360px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.035) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.12, 1], y: [0, -16, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 w-full"
        >
          <motion.p
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6"
            style={{ fontFamily: "'DM Sans',sans-serif" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            About The OG
          </motion.p>

          <motion.h1
            className="font-black leading-[0.92] tracking-[-0.04em] mb-8"
            style={{ fontSize: 'clamp(52px,7.5vw,110px)', fontFamily: "'Syne',sans-serif" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[#b8b8b0] block">We build what</span>
            <span className="text-black block">others pitch.</span>
          </motion.h1>

          <motion.p
            className="max-w-lg text-[17px] leading-relaxed text-neutral-500 font-medium"
            style={{ fontFamily: "'DM Sans',sans-serif" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            The OG is a boutique digital studio obsessed with building elegant software that{' '}
            <strong className="text-black font-semibold">actually moves the needle</strong>—for bold brands
            with zero tolerance for mediocrity.
          </motion.p>
        </motion.div>

        {/* Decorative large text */}
        <motion.div
          className="absolute right-0 bottom-[-24px] pointer-events-none select-none hidden md:block"
          style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(80px,10vw,160px)', fontWeight: 900, color: 'rgba(0,0,0,0.035)', lineHeight: 1, letterSpacing: '-0.05em' }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          THE OG
        </motion.div>
      </div>

      {/* ════════════ DIVIDER ════════════ */}
      <div className="border-t border-black/[0.07]" />

      {/* ════════════ STATS ════════════ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
          <Stat value={10}  suffix="+" label="Happy clients"      delay={0}    />
          <Stat value={4}   suffix="+"  label="Years of craft"     delay={0.08} />
          <Stat value={100} suffix="%" label="On-time delivery"   delay={0.16} />
          <Stat value={3}   suffix="x"  label="Avg. ROI uplift"    delay={0.24} />
        </div>
      </section>

      {/* ════════════ DIVIDER ════════════ */}
      <div className="border-t border-black/[0.07]" />

      {/* ════════════ STORY ════════════ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left — text */}
          <div>
            <Reveal delay={0}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-5"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>
                Our Story
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="font-black tracking-[-0.04em] leading-[1.0] mb-7"
                style={{ fontSize: 'clamp(36px,4.5vw,58px)', fontFamily: "'Syne',sans-serif" }}
              >
                Born from a refusal to accept average.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-[16px] leading-relaxed text-neutral-500 mb-5" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                The OG started with a simple frustration: too many agencies were selling decks instead of delivering results. We set out to be different—a team of builders who ship, not presenters who pitch.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="text-[16px] leading-relaxed text-neutral-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                From scrappy MVPs to enterprise-grade platforms, every project we take on gets the same obsessive attention to craft—because we believe that great software is the best marketing a brand can have.
              </p>
            </Reveal>
          </div>

          {/* Right — visual */}
          <Reveal delay={0.12} className="relative">
            <div className="relative aspect-square max-w-[480px] mx-auto">
              {/* Card stack decoration */}
              {[
                { bg: 'linear-gradient(135deg,#0a0a0a,#1a1a1a)', rot: -6, scale: 0.9, z: 0 },
                { bg: 'linear-gradient(135deg,#1f1f1f,#2a2a2a)', rot: 3, scale: 0.95, z: 1 },
                { bg: 'linear-gradient(135deg,#f5f5f0,#eae8e0)', rot: 0, scale: 1, z: 2 },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-4 rounded-[28px] border"
                  style={{
                    background: s.bg,
                    borderColor: i === 2 ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.04)',
                    zIndex: s.z,
                    transform: `rotate(${s.rot}deg) scale(${s.scale})`,
                    boxShadow: i === 2 ? '0 32px 80px rgba(0,0,0,0.12)' : '0 16px 48px rgba(0,0,0,0.25)',
                  }}
                  whileHover={{ rotate: s.rot * 0.6, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } }}
                />
              ))}
              {/* Top card content */}
              <div className="absolute inset-4 rounded-[28px] z-10 overflow-hidden border border-black/[0.08] bg-[#f5f5f0] flex flex-col p-8 shadow-[0_32px_80px_rgba(0,0,0,0.12)]">
                <div className="flex justify-between items-start mb-auto">
                  <span className="text-[11px] tracking-[0.18em] uppercase text-neutral-400 font-bold"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}>The OG Studio</span>
                  <span className="text-[11px] tracking-[0.12em] text-neutral-300 font-medium"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}>Est. 2021</span>
                </div>
                <div className="mt-auto">
                  <div
                    className="font-black text-black leading-none tracking-[-0.04em] mb-3"
                    style={{ fontSize: 48, fontFamily: "'Syne',sans-serif" }}
                  >
                    OG.
                  </div>
                  <div className="text-[13px] text-neutral-400 leading-relaxed max-w-[200px]"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    Strategic software that drives growth, not just works fine.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ DIVIDER ════════════ */}
      <div className="border-t border-black/[0.07]" />

      {/* ════════════ VALUES ════════════ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-20 md:py-32 relative z-10">
        <Reveal delay={0}>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-5"
            style={{ fontFamily: "'DM Sans',sans-serif" }}>
            What We Believe
          </p>
        </Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <Reveal delay={0.06}>
            <h2
              className="font-black tracking-[-0.04em] leading-[1.0]"
              style={{ fontSize: 'clamp(36px,4.8vw,62px)', fontFamily: "'Syne',sans-serif" }}
            >
              Our four<br />core values.
            </h2>
          </Reveal>
          <Reveal delay={0.14} className="max-w-sm">
            <p className="text-[15px] text-neutral-500 leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              These aren't buzzwords on a slide—they're the principles every decision here is measured against.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/[0.07]">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <motion.div
                className="bg-[#f5f5f0] p-8 md:p-10 flex flex-col gap-5 group cursor-default"
                whileHover={{ backgroundColor: '#0a0a0a' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="w-11 h-11 rounded-full border flex items-center justify-center text-black group-hover:text-white group-hover:border-white/20 transition-colors duration-[450ms]"
                  style={{ borderColor: 'rgba(0,0,0,0.12)' }}
                >
                  {v.icon}
                </motion.div>
                <div>
                  <div
                    className="font-black text-[22px] tracking-tight text-black group-hover:text-white mb-2 transition-colors duration-[450ms]"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    {v.title}
                  </div>
                  <div
                    className="text-[14px] leading-relaxed text-neutral-500 group-hover:text-white/50 transition-colors duration-[450ms]"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}
                  >
                    {v.body}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════ DIVIDER ════════════ */}
      <div className="border-t border-black/[0.07]" />

      {/* ════════════ PROCESS ════════════ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-20 md:py-32 relative z-10">
        <Reveal delay={0}>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-5"
            style={{ fontFamily: "'DM Sans',sans-serif" }}>
            How We Work
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            className="font-black tracking-[-0.04em] leading-[1.0] mb-16"
            style={{ fontSize: 'clamp(36px,4.8vw,62px)', fontFamily: "'Syne',sans-serif" }}
          >
            The OG process.
          </h2>
        </Reveal>

        <div className="flex flex-col divide-y divide-black/[0.07]">
          {PROCESS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.07}>
              <motion.div
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-8 group cursor-default"
                whileHover={{ x: 6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="text-[13px] font-bold tracking-[0.14em] text-neutral-300 shrink-0 w-10"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  {step.num}
                </span>
                <div
                  className="text-[22px] md:text-[26px] font-black tracking-[-0.02em] text-black shrink-0 w-full sm:w-48"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {step.title}
                </div>
                <div
                  className="text-[15px] text-neutral-500 leading-relaxed flex-1"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  {step.desc}
                </div>
                <motion.div
                  className="w-9 h-9 rounded-full border border-black/[0.1] flex items-center justify-center text-black shrink-0 opacity-0 group-hover:opacity-100 group-hover:border-black/30 transition-all duration-300 hidden sm:flex"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════ DIVIDER ════════════ */}
      <div className="border-t border-black/[0.07]" />

      {/* ════════════ CTA BANNER ════════════ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-20 md:py-28 relative z-10">
        <Reveal delay={0}>
          <motion.div
            className="rounded-[32px] overflow-hidden bg-[#0a0a0a] p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 relative"
            style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.2)' }}
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* bg pattern */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
            />

            <div className="relative z-10">
              <div
                className="text-white font-black leading-[1.0] tracking-[-0.04em] mb-4"
                style={{ fontSize: 'clamp(32px,4.5vw,56px)', fontFamily: "'Syne',sans-serif" }}
              >
                Ready to build<br />something original?
              </div>
              <p className="text-white/50 text-[15px] leading-relaxed max-w-md" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                Let's skip the pitch and go straight to progress. One call is all it takes.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
              <motion.a
                href="#"
                className="flex items-center gap-3 bg-white text-black rounded-full px-7 py-4 text-[15px] font-bold tracking-tight no-underline"
                style={{ fontFamily: "'DM Sans',sans-serif", boxShadow: '0 8px 24px rgba(255,255,255,0.15)' }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span>Book a call</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.a>
              <motion.a
                href="mailto:hello@theog.studio"
                className="flex items-center justify-center gap-3 border border-white/20 text-white rounded-full px-7 py-4 text-[15px] font-bold tracking-tight no-underline hover:bg-white/5 transition-colors"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2"/>
                  <path d="M4 7l8 5.6L20 7"/>
                </svg>
                <span>Email us</span>
              </motion.a>
            </div>
          </motion.div>
        </Reveal>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer className="relative z-20 border-t border-black/[0.08] bg-[#f5f5f0]">
        <div
          className="max-w-[1300px] mx-auto px-6 py-8 grid grid-cols-3 items-center gap-4 text-[12px] tracking-[0.08em] uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <a href="#" className="justify-self-start text-black/70 hover:text-black transition-colors duration-300">Terms and Conditions</a>
          <p className="justify-self-center tracking-[0.12em] text-black/45">© The OG</p>
          <a href="#" className="justify-self-end text-black/70 hover:text-black transition-colors duration-300">Privacy Policy</a>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
      `}</style>
    </motion.div>
  );
}
