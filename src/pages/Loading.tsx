import React from 'react';
import { motion } from 'framer-motion';
import { useLottie } from 'lottie-react';
import boxAnimation from '../assets/boxAnimation.json';

interface LoadingPageProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

export default function LoadingPage({
  onLoadingComplete,
  duration = 3500,
}: LoadingPageProps) {
  const { View } = useLottie(
    {
      animationData: boxAnimation,
      loop: true,
      autoplay: true,
      renderer: 'canvas',
      rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
    },
    { width: 320, height: 320 }
  );
  // Auto-complete after duration
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 w-full h-screen bg-[#000000] flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 12,
          delay: 0.2,
        }}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        <div className="relative w-80 h-80 flex items-center justify-center">
          {View}
        </div>

        {/* Brand name + bio */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-center max-w-[360px]"
        >
          <div
            className="text-white text-[28px] tracking-[0.18em] uppercase"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Zylro
          </div>
          <p
            className="mt-3 text-white/70 text-[13px] leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Zylro builds elegant, high-performing digital experiences for modern brands.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
