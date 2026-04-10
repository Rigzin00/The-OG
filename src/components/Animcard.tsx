import { useRef, useState, useEffect } from 'react';

interface CardData {
  id: string; bg: string; accent: string; label: string; sub: string;
  headline: string; body: string; cta?: string; dark: boolean; big?: boolean;
}

const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, mn: number, mx: number) => Math.max(mn, Math.min(mx, v));
const easeInOutCubic = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;

export const CARD_DATA: CardData[] = [
  { id:'kyma',      bg:'linear-gradient(160deg,#1a2a1a,#000)',     accent:'#8aff2a', label:'KYMA®',      sub:'AI AUTOMATION',   headline:'SCALE YOUR OPERATIONS [10X]\nWITHOUT HIRING [100] PEOPLE.', body:'We build custom AI systems that handle your repetitive work.', cta:'SEE HOW IT WORKS →', dark:true },
  { id:'mugen',     bg:'linear-gradient(160deg,#111,#0d0d0d)',      accent:'#fff',    label:'MUGEN®',     sub:'Since — 2016',     headline:'MUGEN\nSTUDIO',      body:"We've reimagined how great design happens. No pitches. No proposals.", dark:true, big:true },
  { id:'essential', bg:'linear-gradient(160deg,#f8f4ee,#f0e8dc)',   accent:'#c8873a', label:'Essential™', sub:'Skincare',         headline:'Your skin,\nreimagined.', body:'Clinically-tested formulas for every skin type.', dark:false },
  { id:'launch',    bg:'linear-gradient(160deg,#0a0a0a,#151515)',   accent:'#fff',    label:'LaunchNow',  sub:'Product Launch',   headline:'BUILT\nTO SHIP.',    body:'From idea to launch in days, not months.', cta:'LaunchNow →', dark:true, big:true },
];

const INIT_STATES = [
  { x:-60, y:-20, rot:-8,  initZ:1 },
  { x: 80, y: 10, rot: 12, initZ:2 },
  { x:-20, y: 30, rot:-4,  initZ:3 },
  { x: 40, y:-10, rot:  9, initZ:0 },
];

export function CardMockup({ card, hovered }: { card: CardData; hovered: boolean }) {
  return (
    <div style={{ width:'100%', height:'100%', background:card.bg, position:'relative', padding:'18px 20px', display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Navbar row */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
        <span style={{ fontSize:10, fontWeight:800, color:card.dark?'#fff':'#0a0a0a', letterSpacing:'.06em', fontFamily:"'Syne',sans-serif" }}>{card.label}</span>
        <div style={{ display:'flex', gap:8 }}>
          {['About','Work','Contact'].map(l=><span key={l} style={{ fontSize:8, color:card.dark?'rgba(255,255,255,.35)':'rgba(0,0,0,.35)' }}>{l}</span>)}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
          {[0,1].map(i=><div key={i} style={{ width:16, height:1, background:card.dark?'rgba(255,255,255,.4)':'rgba(0,0,0,.3)', borderRadius:1 }}/>)}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
        {card.big ? (
          <>
            <div style={{ fontSize:6, letterSpacing:'.14em', color:card.dark?'rgba(255,255,255,.4)':'rgba(0,0,0,.4)', textTransform:'uppercase', marginBottom:6 }}>{card.sub}</div>
            <div style={{ fontSize:32, fontWeight:800, color:card.dark?'#fff':'#0a0a0a', lineHeight:.95, letterSpacing:'-.02em', marginBottom:12, fontFamily:"'Syne',sans-serif" }}>
              {card.headline.split('\n').map((l,i)=><div key={i}>{l}</div>)}
            </div>
            <div style={{ fontSize:8, color:card.dark?'rgba(255,255,255,.5)':'rgba(0,0,0,.5)', lineHeight:1.55, maxWidth:200 }}>{card.body}</div>
          </>
        ) : (
          <>
            <div style={{ fontSize:6, letterSpacing:'.12em', color:card.accent, textTransform:'uppercase', marginBottom:8 }}>{card.sub}</div>
            <div style={{ fontSize:14, fontWeight:800, color:card.dark?'#fff':'#0a0a0a', lineHeight:1.1, marginBottom:10, fontFamily:"'Syne',sans-serif" }}>
              {card.headline.split('\n').map((line,i)=>(
                <div key={i}>{line.split(/(\[.*?\])/).map((part,j)=>(
                  <span key={j} style={{ color:/\[.*?\]/.test(part)?card.accent:'inherit' }}>{part}</span>
                ))}</div>
              ))}
            </div>
            <div style={{ fontSize:8, color:card.dark?'rgba(255,255,255,.5)':'rgba(0,0,0,.5)', lineHeight:1.55, marginBottom:12, maxWidth:180 }}>{card.body}</div>
            {card.cta && <div style={{ background:card.accent, color:card.dark?'#000':'#fff', borderRadius:4, padding:'5px 10px', fontSize:7, fontWeight:700, width:'fit-content', fontFamily:"'Syne',sans-serif" }}>{card.cta}</div>}
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop:`1px solid ${card.dark?'rgba(255,255,255,.08)':'rgba(0,0,0,.06)'}`, paddingTop:8, marginTop:8, display:'flex', justifyContent:'space-between' }}>
        <span style={{ fontSize:9, color:card.accent }}>★★★★★</span>
        <span style={{ fontSize:7, color:card.dark?'rgba(255,255,255,.3)':'rgba(0,0,0,.3)' }}>100+ clients</span>
      </div>

      {/* Hover pop-up overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: card.dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <div style={{
          background: 'rgba(255,255,255,.96)',
          color: '#0a0a0a',
          borderRadius: 999,
          padding: '10px 22px',
          fontSize: 13,
          fontWeight: 600,
          boxShadow: '0 8px 32px rgba(0,0,0,.2)',
          whiteSpace: 'nowrap',
          fontFamily: "'DM Sans',sans-serif",
          transform: hovered ? 'translateY(0)' : 'translateY(16px)',
          opacity: hovered ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '0.05s'
        }}>
          View Project
        </div>
      </div>
    </div>
  );
}

interface AnimatedCardsProps { progress: number; }

export function AnimatedCards({ progress }: AnimatedCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w:600, h:600 });

  useEffect(()=>{
    const syncSize = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    };

    syncSize();

    if (typeof ResizeObserver !== 'undefined') {
      const obs = new ResizeObserver(([e]) =>
        setSize({ w: e.contentRect.width, h: e.contentRect.height })
      );
      if (containerRef.current) obs.observe(containerRef.current);
      return () => obs.disconnect();
    }

    window.addEventListener('resize', syncSize);
    return () => window.removeEventListener('resize', syncSize);
  },[]);

  // We limit the intro animation to the 0-1 range.
  // Using easeInOutCubic for a graceful layout landing.
  const t = easeInOutCubic(clamp(progress, 0, 1)); 
  
  // The scroll distance beyond 1 will natively push the cards up 
  // so the second row comes into view.
  const overScroll = Math.max(0, progress - 1); 
  
  const { w:W, h:H } = size;
  const gap = 20;
  const compactT = clamp((1024 - W) / 384, 0, 1);
  const stackedScale = W < 1024 ? lerp(0.86, 0.68, compactT) : 1;
  const isTabletAndUp = W >= 768;

  // Final layout geometry
  const marginW = Math.max(40, W * 0.05);
  const topMargin = Math.max(120, H * 0.15); 

  const columnW = (W - marginW * 2 - gap) / 2;
  const finalW = columnW;
  const finalH = isTabletAndUp ? finalW * 0.62 : H * 0.65;

  // Base size when stacked
  const baseW = 420 * stackedScale;
  const baseH = 260 * stackedScale;

  return (
    <div ref={containerRef} style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden', pointerEvents:'none' }}>
      {CARD_DATA.map((card, i) => {
        const ini = INIT_STATES[i];
        const col = i % 2, row = Math.floor(i/2);

        // At t=0, origin is right side of the screen.
        // The landing page limits content to max-w-[1300px] with px-10 (40px padding).
        const maxContentW = Math.min(W, 1300);
        const contentLeft = (W - maxContentW) / 2;
        const colW = (maxContentW - 80) / 2; // 80 is px-10 * 2
        // Right column center:
        const rightColCenter = contentLeft + 40 + colW + colW / 2;
        
        const initCX = rightColCenter + ini.x;
        // Shift initial stacked cards slightly lower on the screen
        const initCY = H * 0.55 + ini.y + 10;

        // At t=1, they form a vertical-overflow layout
        // Instead of splitting the space to fit all 4, we treat row=0 and row=1 drastically differently.
        const finCX = marginW + (col === 0 ? columnW / 2 : columnW + gap + columnW / 2);
        
        // Push row 1 way down below the screen initially
        const finCY = topMargin + (row === 0 ? finalH / 2 : finalH + gap + finalH / 2);

        // Also add a little arc so they swoop "down" during transition
        const tArc = Math.sin(t * Math.PI);
        const cx  = lerp(initCX, finCX, t) - (tArc * 30);
        
        // When t reaches 1, the grid is fully formed.
        // We use a separate scroll variable beyond t=1 if App.tsx supports progress > 1, 
        // but App currently clamps at progress=1. We need the scrolling wrapper.
        
        // We will tie the CY to a much larger space.
        // If progress goes up to 1, row 1 will be offscreen.
        // we need the height of a single row to take up most of the screen view.
        // We calculate CY so that all 4 cards move up natively due to standard scrolling instead of pinning.
        // As overScroll increases, we move up exactly at 1:1 speed with the browser scroll.
        // Because progress = 1 per 1 window height (H) scrolled natively:
        const scrollOffset = overScroll * H; 
        const cy  = lerp(initCY, finCY, t) + (tArc * 80) - scrollOffset;
        const rot = lerp(ini.rot, 0, t);
        const w   = lerp(baseW, finalW, t);
        const h   = lerp(baseH, finalH, t);
        const sha = lerp(.35,.08,t).toFixed(2);
        const isHov = hoveredCard===i && t>0.85;
        return (
          <div key={card.id}
            onMouseEnter={()=>setHoveredCard(i)}
            onMouseLeave={()=>setHoveredCard(null)}
            style={{
              position:'absolute', width:w, height:h,
              left:cx-w/2, top:cy-h/2,
              borderRadius:lerp(16,12,t),
              zIndex: isHov ? 100 : Math.round(lerp(ini.initZ, i+4, t)),
              boxShadow:`0 ${lerp(20,8,t)}px ${lerp(48,20,t)}px rgba(0,0,0,${sha})`,
              transform:`rotate(${rot}deg) scale(${isHov?1.02:1}) translateY(${isHov?-8:0}px)`,
              transition: t>0.9 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
              cursor: t>0.85?'pointer':'default',
              pointerEvents:'auto',
              overflow:'hidden',
              willChange:'transform,width,height,left,top'
            }}
          >
            <CardMockup card={card} hovered={isHov}/>
          </div>
        );
      })}
    </div>
  );
}