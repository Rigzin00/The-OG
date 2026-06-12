import { useRef, useEffect, useState, type ReactNode } from 'react';
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
   SHARED EASING & TRANSITION PRESETS
───────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

/* ─────────────────────────────────────────
   WORD-BY-WORD ANIMATED HEADLINE
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
    <div ref={ref} className={`overflow-visible ${className}`} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.22em 0', ...style }}>
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
   GENERIC REVEAL (fade + slide up)
───────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-60px 0px' });
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
   LINE DRAW DIVIDER
───────────────────────────────────────── */
function DrawLine({ delay = 0, vertical = false }: { delay?: number; vertical?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });
  return (
    <div ref={ref} className={`overflow-hidden ${vertical ? 'w-px' : 'h-px'}`}>
      <motion.div
        className={`bg-black/10 ${vertical ? 'h-full w-full' : 'h-full'}`}
        initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1, originX: 0, originY: 0 }}
        animate={inView ? { scaleX: 1, scaleY: 1 } : {}}
        transition={{ duration: 1.1, delay, ease: EASE_OUT }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = to / 55;
    const id = setInterval(() => {
      cur += step;
      if (cur >= to) { setVal(to); clearInterval(id); return; }
      setVal(Math.floor(cur));
    }, 20);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─────────────────────────────────────────
   MARQUEE TEXT STRIP
───────────────────────────────────────── */
function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-black/[0.07] py-5 select-none">
      <div
        className="flex items-center w-max"
        style={{ animation: 'marqueeSlide 28s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-8 pr-8">
            <span
              className="text-[13px] font-bold tracking-[0.2em] uppercase text-black/25"
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              {item}
            </span>
            <span className="text-black/15 text-[8px]">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   VALUE CARD (hover-flip dark)
───────────────────────────────────────── */
interface ValueItem {
  num: string;
  title: string;
  body: string;
  icon: ReactNode;
}

function ValueCard({ item, delay }: { item: ValueItem; delay: number }) {
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className="relative cursor-default"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <motion.div
        className="rounded-[24px] border border-black/[0.09] p-8 flex flex-col gap-6 overflow-hidden relative"
        animate={{ backgroundColor: hov ? '#0a0a0a' : '#fafaf8', borderColor: hov ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.09)' }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {/* background number */}
        <motion.div
          className="absolute -right-3 -bottom-6 font-black text-[96px] leading-none pointer-events-none"
          style={{ fontFamily: "'Syne',sans-serif" }}
          animate={{ color: hov ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}
          transition={{ duration: 0.4 }}
        >
          {item.num}
        </motion.div>

        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          animate={{ backgroundColor: hov ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', color: hov ? '#fff' : '#0a0a0a' }}
          transition={{ duration: 0.4 }}
        >
          {item.icon}
        </motion.div>

        <div>
          <motion.div
            className="font-black text-[20px] mb-2 tracking-tight"
            style={{ fontFamily: "'Syne',sans-serif" }}
            animate={{ color: hov ? '#fff' : '#0a0a0a' }}
            transition={{ duration: 0.4 }}
          >
            {item.title}
          </motion.div>
          <motion.div
            className="text-[14px] leading-relaxed"
            style={{ fontFamily: "'DM Sans',sans-serif" }}
            animate={{ color: hov ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)' }}
            transition={{ duration: 0.4 }}
          >
            {item.body}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const VALUES: ValueItem[] = [
  {
    num: '01',
    title: 'Quality-first',
    body: 'Every pixel is intentional. We never ship anything we wouldn\'t be proud to put our name on. Craft is non-negotiable.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Speed without compromise',
    body: 'Ideas die in slow pipelines. We move fast, learn faster, and deliver without sacrificing the craft that makes things great.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Long-term thinking',
    body: 'We build for durability—scalable systems, clean code, and evergreen design that stays relevant long after v1 ships.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Radical transparency',
    body: 'No smoke. No mirrors. You see exactly what we\'re building, when, and why—at every step of the process.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
];

const PROCESS = [
  { step: '01', title: 'Discover', time: '~1 week', desc: 'We deep-dive into your business, your audience, and what success truly looks like—before touching a single file.' },
  { step: '02', title: 'Architect', time: '~1 week', desc: 'We map the information architecture, system design, and interaction flows. Strategy before execution, always.' },
  { step: '03', title: 'Build', time: '2–6 weeks', desc: 'Pixel-perfect design meets production-grade engineering. Tight sprints, continuous delivery, zero compromise on quality.' },
  { step: '04', title: 'Launch & Scale', time: 'Ongoing', desc: 'We don\'t ship and disappear. Post-launch monitoring, iteration, and growth support—as long as you need us.' },
];

const MARQUEE_ITEMS = [
  'Strategy', 'Web Design', 'Brand Identity', 'Digital Products',
  'UI/UX', 'Frontend Engineering', 'Motion Design', 'Growth Systems',
];

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const rawHeroY = useTransform(heroScroll, [0, 1], [0, 80]);
  const heroY = useSpring(rawHeroY, { stiffness: 60, damping: 20 });
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  // Subtle mouse-tracking gradient
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <motion.div
      ref={pageRef}
      className="bg-[#f5f5f0] min-h-screen relative overflow-x-clip"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {/* ── Mouse-reactive ambient gradient ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-700"
        style={{
          background: `radial-gradient(900px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0,0,0,0.022), transparent 60%)`,
        }}
      />

      {/* ── Background grid lines ── */}
      <div className="fixed inset-0 pointer-events-none flex justify-center z-0">
        <div className="w-full max-w-[1300px] h-full border-x border-black/[0.07]" />
      </div>

      <Navbar />

      {/* ══════════════════════════════════════
          HERO — "We build what others pitch."
      ══════════════════════════════════════ */}
      <div ref={heroRef} className="relative min-h-screen flex flex-col justify-end pb-20 md:pb-28 pt-36">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 w-full"
        >
          {/* Label */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          >
            <div className="w-2 h-2 rounded-full bg-black" />
            <span
              className="text-[12px] font-bold tracking-[0.22em] uppercase text-black/50"
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              About The OG Studio
            </span>
          </motion.div>

          {/* Main headline — word reveal */}
          <div className="mb-10">
            <AnimatedWords
              text="We build what"
              delay={0.1}
              stagger={0.08}
              className="text-[#b0b0a8] font-black tracking-[-0.045em] leading-[0.9]"
              style={{ fontSize: 'clamp(52px,8vw,120px)', fontFamily: "'Syne',sans-serif" } as React.CSSProperties}
            />
            <AnimatedWords
              text="others pitch."
              delay={0.25}
              stagger={0.09}
              className="text-black font-black tracking-[-0.045em] leading-[0.9]"
              style={{ fontSize: 'clamp(52px,8vw,120px)', fontFamily: "'Syne',sans-serif" } as React.CSSProperties}
            />
          </div>

          {/* Sub + CTA row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <Reveal delay={0.45} className="max-w-[480px]">
              <p
                className="text-[17px] leading-[1.7] text-neutral-500"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              >
                The OG is a boutique digital studio obsessed with one thing:{' '}
                <strong className="text-black font-semibold">building software that actually moves the needle.</strong>{' '}
                No fluff. No pitch decks. Just results, shipped fast and built to last.
              </p>
            </Reveal>
            <Reveal delay={0.55}>
              <motion.a
                href="#"
                className="inline-flex items-center gap-3 bg-[#0a0a0a] text-white rounded-full px-7 py-4 text-[15px] font-bold no-underline shrink-0"
                style={{ fontFamily: "'DM Sans',sans-serif", boxShadow: '0 12px 40px rgba(0,0,0,0.25),inset 0 1px 2px rgba(255,255,255,0.1)' }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <span>Work with us</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.a>
            </Reveal>
          </div>
        </motion.div>

        {/* Decorative ghost text */}
        <motion.div
          className="absolute right-[-2%] top-[18%] pointer-events-none select-none hidden lg:block"
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: 'clamp(100px,13vw,200px)',
            fontWeight: 900,
            color: 'rgba(0,0,0,0.028)',
            lineHeight: 1,
            letterSpacing: '-0.05em',
          }}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
        >
          OG
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: EASE }}
        >
          <motion.div
            className="w-px h-12 bg-black/20 origin-top"
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
          />
          <span className="text-[10px] tracking-[0.2em] uppercase text-black/30" style={{ fontFamily: "'DM Sans',sans-serif" }}>Scroll</span>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════ */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* ══════════════════════════════════════
          MANIFESTO — Bold statement block
      ══════════════════════════════════════ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          <Reveal delay={0}>
            <span
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 block md:pt-3"
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              Our Manifesto
            </span>
          </Reveal>
          <div>
            <AnimatedWords
              text="Most agencies sell ideas. We sell outcomes."
              delay={0.05}
              stagger={0.055}
              className="font-black tracking-[-0.035em] leading-[1.05] text-black mb-8"
              style={{ fontSize: 'clamp(30px,4vw,54px)', fontFamily: "'Syne',sans-serif" } as React.CSSProperties}
            />
            <Reveal delay={0.5}>
              <p className="text-[16px] leading-[1.75] text-neutral-500 mb-5" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                The OG was born from a simple frustration: too many studios were obsessed with looking like they work instead of actually working. Layers of process, decks, revisions, and meetings—all padding the invoice, none moving the needle.
              </p>
              <p className="text-[16px] leading-[1.75] text-neutral-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                We built something different. A small, sharp team that treats every project like it's their own—moving fast, thinking long, and shipping work that earns results. From scrappy MVPs to enterprise-grade platforms, every line of code and every pixel carries the same obsessive standard.{' '}
                <strong className="text-black font-semibold">That's the OG guarantee.</strong>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <DrawLine />

      {/* ══════════════════════════════════════
          STATS — Animated counters
      ══════════════════════════════════════ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {[
            { val: 10, suf: '+', label: 'Clients served' },
            { val: 4,  suf: '+', label: 'Years of craft' },
            { val: 100, suf: '%', label: 'On-time delivery' },
            { val: 3,  suf: 'x',  label: 'Avg. growth uplift' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.09}>
              <div className="flex flex-col gap-1">
                <div
                  className="font-black text-black leading-none tracking-[-0.04em]"
                  style={{ fontSize: 'clamp(48px,5.5vw,76px)', fontFamily: "'Syne',sans-serif" }}
                >
                  <Counter to={s.val} suffix={s.suf} />
                </div>
                <div className="text-[13px] text-neutral-400 font-medium mt-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <DrawLine />

      {/* ══════════════════════════════════════
          STORY VISUAL — Card stack
      ══════════════════════════════════════ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Visual - stacked cards */}
          <Reveal delay={0.05} className="order-2 lg:order-1">
            <div className="relative w-full max-w-[460px] mx-auto" style={{ aspectRatio: '1/1' }}>
              {/* Layer 3 — dark back */}
              <motion.div
                className="absolute rounded-[28px]"
                style={{
                  inset: '8%',
                  background: 'linear-gradient(135deg,#0d0d0d,#1a1a1a)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
                  rotate: '-7deg',
                  zIndex: 1,
                }}
                whileHover={{ rotate: '-4deg', transition: { duration: 0.5, ease: EASE } }}
              />
              {/* Layer 2 — mid */}
              <motion.div
                className="absolute rounded-[28px]"
                style={{
                  inset: '5%',
                  background: 'linear-gradient(135deg,#232323,#2e2e2e)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
                  rotate: '4deg',
                  zIndex: 2,
                }}
                whileHover={{ rotate: '2deg', transition: { duration: 0.5, ease: EASE } }}
              />
              {/* Layer 1 — cream front card */}
              <motion.div
                className="absolute rounded-[28px] border border-black/[0.09] overflow-hidden"
                style={{
                  inset: '0%',
                  background: '#f8f8f3',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.14)',
                  zIndex: 3,
                }}
                whileHover={{ y: -8, boxShadow: '0 48px 100px rgba(0,0,0,0.18)', transition: { duration: 0.5, ease: EASE } }}
              >
                <div className="h-full w-full flex flex-col p-8 md:p-10">
                  <div className="flex justify-between items-start mb-auto">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-neutral-400 font-bold" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      The OG Studio
                    </span>
                    <span className="text-[11px] text-neutral-300" style={{ fontFamily: "'DM Sans',sans-serif" }}>Est. 2021</span>
                  </div>

                  {/* Mini work showcase */}
                  <div className="flex-1 flex flex-col justify-center gap-3 py-6">
                    {[
                      { c: '#0a0a0a', l: 'KYMA®', sub: 'AI Automation', a: '#8aff2a' },
                      { c: '#f8f4ee', l: 'Essential™', sub: 'Skincare Brand', a: '#c8873a' },
                      { c: '#111', l: 'LaunchNow', sub: 'Product Launch', a: '#fff' },
                    ].map((item) => (
                      <div
                        key={item.l}
                        className="rounded-xl flex items-center justify-between px-4 py-3"
                        style={{ background: item.c, border: `1px solid ${item.c === '#f8f4ee' ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.05)'}` }}
                      >
                        <div>
                          <div className="text-[10px] font-black" style={{ color: item.a, fontFamily: "'Syne',sans-serif" }}>{item.l}</div>
                          <div className="text-[8px] opacity-40" style={{ color: item.a, fontFamily: "'DM Sans',sans-serif" }}>{item.sub}</div>
                        </div>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: item.a, opacity: 0.15 }} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="font-black text-black leading-none tracking-[-0.04em] mb-1" style={{ fontSize: 36, fontFamily: "'Syne',sans-serif" }}>
                      OG.
                    </div>
                    <div className="text-[12px] text-neutral-400" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      Strategic software. Real results.
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <Reveal delay={0}>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-6" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                Our Story
              </span>
            </Reveal>
            <AnimatedWords
              text="Built by builders. Run by obsessives."
              delay={0.06}
              stagger={0.06}
              className="font-black tracking-[-0.04em] leading-[1.0] text-black mb-8"
              style={{ fontSize: 'clamp(32px,4vw,52px)', fontFamily: "'Syne',sans-serif" } as React.CSSProperties}
            />
            <Reveal delay={0.4}>
              <p className="text-[15px] leading-[1.75] text-neutral-500 mb-5" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                We started The OG after years of watching great ideas die inside bloated agency processes. We knew there was a better way—one where the people getting on the call are the same people writing the code and designing the screens.
              </p>
              <p className="text-[15px] leading-[1.75] text-neutral-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                Today, we work with a handful of ambitious clients at a time—keeping the team small and the quality high. Every engagement is treated as a long-term partnership, not a transaction.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <DrawLine />

      {/* ══════════════════════════════════════
          VALUES — 2x2 hover cards
      ══════════════════════════════════════ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start mb-16">
          <Reveal delay={0}>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 block md:pt-3" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              What We Stand For
            </span>
          </Reveal>
          <AnimatedWords
            text="Four principles that govern everything we do."
            delay={0.05}
            stagger={0.055}
            className="font-black tracking-[-0.035em] leading-[1.05] text-black"
            style={{ fontSize: 'clamp(28px,3.8vw,50px)', fontFamily: "'Syne',sans-serif" } as React.CSSProperties}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VALUES.map((v, i) => (
            <ValueCard key={v.title} item={v} delay={i * 0.08} />
          ))}
        </div>
      </section>

      <DrawLine />

      {/* ══════════════════════════════════════
          PROCESS — Timeline rows
      ══════════════════════════════════════ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start mb-16">
          <Reveal delay={0}>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 block md:pt-3" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              How We Work
            </span>
          </Reveal>
          <AnimatedWords
            text="A process built for outcomes, not optics."
            delay={0.05}
            stagger={0.06}
            className="font-black tracking-[-0.035em] leading-[1.05] text-black"
            style={{ fontSize: 'clamp(28px,3.8vw,50px)', fontFamily: "'Syne',sans-serif" } as React.CSSProperties}
          />
        </div>

        <div className="flex flex-col">
          {PROCESS.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.07}>
              <motion.div
                className="group grid grid-cols-[40px_1fr] md:grid-cols-[40px_180px_1fr_120px] items-start md:items-center gap-4 md:gap-8 py-7 border-b border-black/[0.07] cursor-default"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <span
                  className="text-[12px] font-bold text-neutral-300 tracking-[0.14em] mt-1 md:mt-0"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  {step.step}
                </span>
                <div
                  className="text-[22px] font-black tracking-tight text-black"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {step.title}
                </div>
                <div
                  className="col-span-2 md:col-span-1 text-[14px] text-neutral-500 leading-relaxed"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  {step.desc}
                </div>
                <div
                  className="hidden md:flex items-center justify-end gap-1.5 text-[12px] font-semibold text-neutral-400 tracking-wide"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                  {step.time}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER — Dark full-bleed
      ══════════════════════════════════════ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 pb-24 md:pb-32 relative z-10">
        <Reveal delay={0}>
          <div
            className="rounded-[32px] overflow-hidden relative"
            style={{ background: '#0a0a0a', boxShadow: '0 48px 120px rgba(0,0,0,0.22)' }}
          >
            {/* animated gradient orb */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 600,
                height: 600,
                background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)',
                top: -200,
                right: -100,
              }}
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.035] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '28px 28px' }}
            />

            <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <div>
                <AnimatedWords
                  text="Ready to build something original?"
                  delay={0.05}
                  stagger={0.05}
                  className="text-white font-black tracking-[-0.04em] leading-[1.05] mb-5"
                  style={{ fontSize: 'clamp(28px,4vw,52px)', fontFamily: "'Syne',sans-serif" } as React.CSSProperties}
                />
                <Reveal delay={0.45}>
                  <p className="text-white/40 text-[15px] leading-relaxed max-w-md" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    Skip the pitch. Let's go straight to progress. One honest conversation is all it takes to know if we're the right fit.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.5} className="flex flex-col sm:flex-row gap-3 shrink-0">
                <motion.a
                  href="#"
                  className="flex items-center gap-3 bg-white text-black rounded-full px-7 py-4 text-[15px] font-bold no-underline"
                  style={{ fontFamily: "'DM Sans',sans-serif", boxShadow: '0 8px 28px rgba(255,255,255,0.12)' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  Book a call
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="mailto:hello@theog.studio"
                  className="flex items-center justify-center gap-3 border border-white/15 text-white rounded-full px-7 py-4 text-[15px] font-bold no-underline"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                  whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(255,255,255,0.06)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 5.6L20 7"/>
                  </svg>
                  Email us
                </motion.a>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-20 border-t border-black/[0.08] bg-[#f5f5f0]">
        <div
          className="max-w-[1300px] mx-auto px-6 py-8 grid grid-cols-3 items-center gap-4 text-[12px] tracking-[0.08em] uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <a href="#" className="justify-self-start text-black/70 hover:text-black transition-colors duration-300">Terms</a>
          <p className="justify-self-center tracking-[0.12em] text-black/40">© The OG</p>
          <a href="#" className="justify-self-end text-black/70 hover:text-black transition-colors duration-300">Privacy</a>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes marqueeSlide {
          0%   { transform: translateX(0) }
          100% { transform: translateX(-50%) }
        }
      `}</style>
    </motion.div>
  );
}
