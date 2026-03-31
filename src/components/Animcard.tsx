import React, { useRef, useState, useEffect } from 'react';

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

function CardMockup({ card, hovered }: { card: CardData; hovered: boolean }) {
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

      {/* Hover pill */}
      {hovered && (
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:'rgba(255,255,255,.96)', color:'#0a0a0a', borderRadius:999, padding:'10px 22px', fontSize:13, fontWeight:600, boxShadow:'0 8px 32px rgba(0,0,0,.2)', whiteSpace:'nowrap', pointerEvents:'none', fontFamily:"'DM Sans',sans-serif" }}>
          View Project
        </div>
      )}
    </div>
  );
}

interface AnimatedCardsProps { progress: number; }

export function AnimatedCards({ progress }: AnimatedCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w:600, h:600 });

  useEffect(()=>{
    const obs = new ResizeObserver(([e])=>setSize({ w:e.contentRect.width, h:e.contentRect.height }));
    if(containerRef.current) obs.observe(containerRef.current);
    return ()=>obs.disconnect();
  },[]);

  const t = easeInOutCubic(clamp(progress, 0, 1));
  const { w:W, h:H } = size;
  const gap = 10;
  const finalW = W/2 - gap*1.5;
  const finalH = H/2 - gap*1.5;
  const baseW = 340, baseH = 220;

  return (
    <div ref={containerRef} style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden' }}>
      {CARD_DATA.map((card, i) => {
        const ini = INIT_STATES[i];
        const col = i % 2, row = Math.floor(i/2);
        const finCX = col===0 ? gap+finalW/2 : W-gap-finalW/2;
        const finCY = row===0 ? gap+finalH/2 : H-gap-finalH/2;
        const cx  = lerp(W/2+ini.x, finCX, t);
        const cy  = lerp(H/2+ini.y, finCY, t);
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
              cursor: t>0.85?'pointer':'default',
              transform:`rotate(${rot}deg)`,
              willChange:'transform,width,height,left,top',
              overflow:'hidden',
            }}>
            <CardMockup card={card} hovered={isHov}/>
          </div>
        );
      })}
    </div>
  );
}