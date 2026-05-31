import { motion } from 'framer-motion';

interface LogoProps {
  size?: number;
  animate?: boolean;
  className?: string;
}

export function Logo({ size = 120, animate = false, className = '' }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      className={className}
      animate={animate ? { rotate: 360 } : {}}
      transition={animate ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
    >
      <defs>
        <linearGradient id="topBarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="middleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bottomBarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      {/* Top Blue Bar */}
      <polygon
        points="50,60 170,60 130,100 50,100"
        fill="url(#topBarGradient)"
        filter="drop-shadow(0 4px 12px rgba(37, 99, 235, 0.2))"
      />

      {/* Middle Purple Diagonal */}
      <polygon
        points="70,100 190,50 180,130 60,180"
        fill="url(#middleGradient)"
        filter="drop-shadow(0 4px 16px rgba(124, 58, 237, 0.3))"
      />

      {/* Bottom Purple Bar */}
      <polygon
        points="50,160 170,140 190,180 70,200"
        fill="url(#bottomBarGradient)"
        filter="drop-shadow(0 4px 12px rgba(124, 58, 237, 0.2))"
      />
    </motion.svg>
  );
}
