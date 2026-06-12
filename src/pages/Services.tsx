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
const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

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
    <div ref={ref} className="overflow-hidden h-px">
      <motion.div
        className="h-full bg-black/10"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, delay, ease: EASE_OUT }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   SERVICE DATA
───────────────────────────────────────── */
interface Service {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  accent: string;
  icon: ReactNode;
  deliverables: string[];
}

const SERVICES: Service[] = [
  {
    id: 'web-dev',
    index: '01',
    title: 'Web Development',
    tagline: 'Fast, scalable, production-ready.',
    description:
      'From landing pages to full-stack platforms, we engineer web experiences that perform. Clean code, pixel-perfect fidelity to design, and zero compromise on speed.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
    accent: '#0a0a0a',
    deliverables: ['Custom web apps', 'E-commerce storefronts', 'SaaS platforms', 'API integrations'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    id: 'app-dev',
    index: '02',
    title: 'App Development',
    tagline: 'Native feel. Cross-platform reach.',
    description:
      'Mobile-first products built for iOS and Android without sacrificing quality. We build apps people actually open — intuitive, fast, and designed to retain.',
    tags: ['React Native', 'Expo', 'Swift', 'Kotlin', 'Firebase'],
    accent: '#111',
    deliverables: ['iOS & Android apps', 'MVP prototypes', 'App store launch', 'Push & analytics'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    ),
  },
  {
    id: 'ui-ux',
    index: '03',
    title: 'UI / UX Design',
    tagline: 'Interfaces people love to use.',
    description:
      'Design systems, prototypes, and pixel-perfect interfaces grounded in real user behaviour. We don\'t just make things look good — we make them work beautifully.',
    tags: ['Figma', 'Prototyping', 'Design Systems', 'User Research', 'Motion'],
    accent: '#0a0a0a',
    deliverables: ['Design systems', 'Interactive prototypes', 'UX audits', 'Usability testing'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    id: 'brand',
    index: '04',
    title: 'Brand Identity',
    tagline: 'Stand out. Stay remembered.',
    description:
      'Your brand is your first impression, your reputation, and your promise — all at once. We craft brand identities that feel inevitable: sharp, distinct, and built to last.',
    tags: ['Logo Design', 'Visual Identity', 'Brand Strategy', 'Typography', 'Color Systems'],
    accent: '#111',
    deliverables: ['Logo & wordmark', 'Brand guidelines', 'Asset library', 'Brand voice'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: 'motion',
    index: '05',
    title: 'Motion & Animation',
    tagline: 'Design that breathes.',
    description:
      'Micro-interactions, scroll-driven sequences, and cinematic brand films. Motion transforms static work into experiences that feel alive — and impossible to ignore.',
    tags: ['Framer Motion', 'GSAP', 'Lottie', 'After Effects', 'CSS Animation'],
    accent: '#0a0a0a',
    deliverables: ['UI micro-animations', 'Scroll experiences', 'Brand films', 'Lottie exports'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
  },
  {
    id: 'growth',
    index: '06',
    title: 'Growth & Strategy',
    tagline: 'Ship it. Scale it. Own it.',
    description:
      'From GTM planning to conversion optimisation, we think beyond the build. We help ambitious founders and teams turn great products into growing businesses.',
    tags: ['SEO', 'Analytics', 'Conversion CRO', 'GTM Strategy', 'Growth Systems'],
    accent: '#111',
    deliverables: ['GTM strategy', 'SEO architecture', 'CRO audits', 'Analytics setup'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────── */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: (index % 2) * 0.1, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(!expanded)}
      className="relative rounded-[28px] border border-black/[0.08] overflow-hidden cursor-pointer select-none"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: hovered ? '#0a0a0a' : '#fafaf8' }}
        transition={{ duration: 0.5, ease: EASE }}
      />

      {/* Noise texture overlay on dark */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '180px',
          opacity: hovered ? 0.022 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10 p-5 sm:p-7 md:p-9">
        {/* Top row */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Icon bubble */}
            <motion.div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
              animate={{
                backgroundColor: hovered ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                color: hovered ? '#fff' : '#0a0a0a',
              }}
              transition={{ duration: 0.4 }}
            >
              {service.icon}
            </motion.div>
            {/* Index */}
            <motion.span
              className="text-[12px] font-bold tracking-[0.18em] uppercase"
              animate={{ color: hovered ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)' }}
              transition={{ duration: 0.4 }}
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              {service.index}
            </motion.span>
          </div>

          {/* Arrow */}
          <motion.div
            animate={{
              rotate: expanded ? 45 : hovered ? 45 : 0,
              color: hovered ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.25)',
            }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h3
          className="font-black tracking-tight leading-[1.05] mb-2"
          animate={{ color: hovered ? '#fff' : '#0a0a0a' }}
          transition={{ duration: 0.4 }}
          style={{ fontSize: 'clamp(20px,2.5vw,30px)', fontFamily: "'Syne',sans-serif" }}
        >
          {service.title}
        </motion.h3>

        {/* Tagline */}
        <motion.p
          className="text-[14px] font-semibold mb-5"
          animate={{ color: hovered ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)' }}
          transition={{ duration: 0.4 }}
          style={{ fontFamily: "'DM Sans',sans-serif" }}
        >
          {service.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-[14px] leading-[1.75] mb-6"
          animate={{ color: hovered ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
          transition={{ duration: 0.4 }}
          style={{ fontFamily: "'DM Sans',sans-serif" }}
        >
          {service.description}
        </motion.p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.tags.map((tag) => (
            <motion.span
              key={tag}
              className="text-[11px] font-bold tracking-[0.12em] uppercase rounded-full px-3 py-1.5"
              animate={{
                backgroundColor: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                color: hovered ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.4)',
              }}
              transition={{ duration: 0.4 }}
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Deliverables — expand on click */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden"
            >
              <motion.div
                className="pt-4 border-t"
                animate={{ borderColor: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)' }}
                transition={{ duration: 0.4 }}
              >
                <motion.p
                  className="text-[11px] font-bold tracking-[0.18em] uppercase mb-3"
                  animate={{ color: hovered ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)' }}
                  transition={{ duration: 0.4 }}
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  What you get
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.deliverables.map((d) => (
                    <motion.div
                      key={d}
                      className="flex items-center gap-2.5 text-[13px]"
                      animate={{ color: hovered ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)' }}
                      transition={{ duration: 0.4 }}
                      style={{ fontFamily: "'DM Sans',sans-serif" }}
                    >
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        animate={{ backgroundColor: hovered ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)' }}
                        transition={{ duration: 0.4 }}
                      />
                      {d}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click hint */}
        <motion.div
          className="flex items-center gap-1.5 mt-4"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
          transition={{ duration: 0.35 }}
        >
          <motion.span
            className="text-[11px] font-bold tracking-[0.14em] uppercase"
            animate={{ color: 'rgba(255,255,255,0.35)' }}
            style={{ fontFamily: "'DM Sans',sans-serif" }}
          >
            {expanded ? 'Collapse' : 'See deliverables'}
          </motion.span>
        </motion.div>
      </div>

      {/* Background index ghost number */}
      <motion.div
        className="absolute -right-2 -bottom-5 font-black leading-none pointer-events-none select-none"
        style={{ fontSize: 'clamp(48px,9vw,110px)', fontFamily: "'Syne',sans-serif" }}
        animate={{ color: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.035)' }}
        transition={{ duration: 0.5 }}
      >
        {service.index}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   PROCESS STRIP
───────────────────────────────────────── */
const PROCESS_STEPS = [
  { num: '01', label: 'Discovery', desc: 'We start by deeply understanding your goals, audience, and the problem worth solving.' },
  { num: '02', label: 'Proposal', desc: 'A clear scope, timeline, and fixed price — no surprises, no scope creep.' },
  { num: '03', label: 'Build', desc: 'Rapid sprints with continuous delivery and weekly updates, visible throughout.' },
  { num: '04', label: 'Launch', desc: 'We deploy, monitor, and stand behind everything we ship — long after go-live.' },
];

/* ─────────────────────────────────────────
   MARQUEE
───────────────────────────────────────── */
function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-black/[0.07] py-5 select-none">
      <div className="flex items-center w-max" style={{ animation: 'svcMarquee 30s linear infinite' }}>
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-8 pr-8">
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-black/20" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              {item}
            </span>
            <span className="text-black/10 text-[8px]">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const MARQUEE_ITEMS = [
  'Web Development', 'App Development', 'UI / UX Design', 'Motion Design',
  'Brand Identity', 'Growth Strategy', 'SaaS Products', 'E‑Commerce',
];

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function Services() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const h = (e: MouseEvent) =>
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <motion.div
      className="bg-[#f5f5f0] min-h-screen relative overflow-x-clip"
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
          HERO
      ══════════════════════════════════════ */}
      <div ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-end pb-16 md:pb-28 pt-28 md:pt-36">
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
            <span className="text-[12px] font-bold tracking-[0.22em] uppercase text-black/50" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              What We Do
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-10">
            <AnimatedWords
              text="Every service."
              delay={0.1}
              stagger={0.08}
              className="text-[#b0b0a8] font-black tracking-[-0.045em] leading-[0.9]"
              style={{ fontSize: 'clamp(32px,8vw,120px)', fontFamily: "'Syne',sans-serif" }}
            />
            <AnimatedWords
              text="One standard."
              delay={0.25}
              stagger={0.09}
              className="text-black font-black tracking-[-0.045em] leading-[0.9]"
              style={{ fontSize: 'clamp(32px,8vw,120px)', fontFamily: "'Syne',sans-serif" }}
            />
          </div>

          {/* Sub + CTA */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <Reveal delay={0.45} className="max-w-[480px]">
              <p className="text-[15px] md:text-[17px] leading-[1.7] text-neutral-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                From pixel-perfect interfaces to full-stack platforms —{' '}
                <strong className="text-black font-semibold">we build the complete digital stack your brand needs to grow.</strong>{' '}
                One team. End to end.
              </p>
            </Reveal>
            <Reveal delay={0.55}>
              <motion.a
                href="#services"
                className="flex justify-center items-center gap-3 bg-[#0a0a0a] text-white rounded-full px-7 py-4 text-[15px] font-bold no-underline w-full md:w-auto"
                style={{ fontFamily: "'DM Sans',sans-serif", boxShadow: '0 12px 40px rgba(0,0,0,0.25),inset 0 1px 2px rgba(255,255,255,0.1)' }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <span>View all services</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </motion.a>
            </Reveal>
          </div>
        </motion.div>

        {/* Ghost text */}
        <motion.div
          className="absolute right-[-2%] top-[20%] pointer-events-none select-none hidden lg:block"
          style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(80px,12vw,180px)', fontWeight: 900, color: 'rgba(0,0,0,0.025)', lineHeight: 1, letterSpacing: '-0.05em' }}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
        >
          SVC
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
          MARQUEE
      ══════════════════════════════════════ */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* ══════════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════════ */}
      <section id="services" className="max-w-[1300px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-20 items-start mb-16">
          <Reveal delay={0}>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 block md:pt-3" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Our Services
            </span>
          </Reveal>
          <div>
            <AnimatedWords
              text="Six disciplines. One obsessive standard."
              delay={0.04}
              stagger={0.055}
              className="font-black tracking-[-0.035em] leading-[1.05] text-black"
              style={{ fontSize: 'clamp(22px,3.8vw,50px)', fontFamily: "'Syne',sans-serif" }}
            />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      <DrawLine />

      {/* ══════════════════════════════════════
          PROCESS STRIP
      ══════════════════════════════════════ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-20 items-start mb-16">
          <Reveal delay={0}>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 block md:pt-3" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              How It Works
            </span>
          </Reveal>
          <AnimatedWords
            text="From first call to final launch."
            delay={0.04}
            stagger={0.06}
            className="font-black tracking-[-0.035em] leading-[1.05] text-black"
            style={{ fontSize: 'clamp(22px,3.8vw,50px)', fontFamily: "'Syne',sans-serif" }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <motion.div
                className="rounded-[24px] border border-black/[0.08] p-6 md:p-7 bg-[#fafaf8] flex flex-col gap-4 h-full"
                whileHover={{ y: -4, boxShadow: '0 24px 60px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <span
                  className="text-[12px] font-bold tracking-[0.18em] uppercase text-black/25"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  {step.num}
                </span>
                <div
                  className="font-black text-[20px] tracking-tight text-black"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {step.label}
                </div>
                <p className="text-[13px] leading-[1.7] text-neutral-500 flex-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  {step.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <DrawLine />

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 pb-24 md:pb-32 relative z-10">
        <Reveal delay={0}>
          <div
            className="rounded-[32px] overflow-hidden relative"
            style={{ background: '#0a0a0a', boxShadow: '0 48px 120px rgba(0,0,0,0.22)' }}
          >
            {/* Orb */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)', top: -200, right: -100 }}
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.035] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '28px 28px' }}
            />

            <div className="relative z-10 p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10">
              <div>
                <AnimatedWords
                  text="Ready to start a project?"
                  delay={0.05}
                  stagger={0.05}
                  className="text-white font-black tracking-[-0.04em] leading-[1.05] mb-5"
                  style={{ fontSize: 'clamp(22px,4vw,52px)', fontFamily: "'Syne',sans-serif" }}
                />
                <Reveal delay={0.4}>
                  <p className="text-white/40 text-[15px] leading-relaxed max-w-md" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    Tell us what you need and we'll tell you how we can help — honestly and without the sales theatre.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.5} className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                <motion.a
                  href="#"
                  className="flex items-center justify-center gap-3 bg-white text-black rounded-full px-7 py-4 text-[15px] font-bold no-underline"
                  style={{ fontFamily: "'DM Sans',sans-serif", boxShadow: '0 8px 28px rgba(255,255,255,0.12)' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  Book a call
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
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
                    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 5.6L20 7" />
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
          className="max-w-[1300px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] tracking-[0.08em] uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <a href="#" className="text-black/70 hover:text-black transition-colors duration-300">Terms</a>
          <p className="tracking-[0.12em] text-black/40">© The OG</p>
          <a href="#" className="text-black/70 hover:text-black transition-colors duration-300">Privacy</a>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes svcMarquee {
          0%   { transform: translateX(0) }
          100% { transform: translateX(-50%) }
        }
      `}</style>
    </motion.div>
  );
}
