import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLottie } from 'lottie-react';
import boxAnimation from '../assets/boxAnimation.json';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

export default function LoadingScreen({
  onLoadingComplete,
  duration = 4500,
}: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f5f0]"
    >
      {/* Lottie Animation Container */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center p-12"
      >
        <div className="relative w-80 h-80 flex items-center justify-center">
          {View}
        </div>
      </motion.div>
    </motion.div>
  );
}
