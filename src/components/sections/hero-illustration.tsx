'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface AiIllustrationProps {
  width?: string;
  height?: number;
  autoplay?: boolean;
}

export default function AiTransformIllustration({}: AiIllustrationProps) {
  const [stage, setStage] = useState('falling'); // "falling" → "processing" → "info"
  const images = [
    '/_products/chair.png',
    '/_products/lamp.png',
    '/_products/lamp2.png',
    '/_products/phone.png',
    '/_products/pc.png',
  ]; // your image paths

  useEffect(() => {
    if (stage === 'falling') {
      const timer = setTimeout(() => setStage('processing'), 3500);
      return () => clearTimeout(timer);
    }
    if (stage === 'processing') {
      const timer = setTimeout(() => setStage('info'), 2000);
      return () => clearTimeout(timer);
    }
    if (stage === 'info') {
      const timer = setTimeout(() => setStage('falling'), 4000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <div className="relative flex flex-col w-full flex items-center justify-center">
      <div className="relative w-80 h-80 rounded-4xl overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* Falling Image */}
          {stage === 'falling' && (
            <motion.div
              key="falling"
              className="relative w-full h-full flex items-center justify-center"
            >
              {images.map((src, i) => (
                <motion.img
                  key={src}
                  src={src}
                  alt={`Falling ${i}`}
                  initial={{ y: -300, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 80,
                    damping: 10,
                    delay: i * 0.5, // staggered drop
                  }}
                  className="absolute w-20 h-20 object-cover rounded-2xl"
                  style={{
                    left: `${30 + i * 40}px`, // stagger horizontal positions
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Processing Animation */}
          {stage === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative flex flex-col items-center justify-center"
            >
              {/* Pulsing concentric circles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-32 h-32 rounded-full border border-cyan-400/30"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 0.2, 0.6],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ zIndex: 0 }}
                />
              ))}

              {/* Central glowing orb */}
              <motion.div
                className="relative w-16 h-16 rounded-full bg-cyan-500/80 blur-md"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    '0 0 20px rgba(0,255,255,0.6)',
                    '0 0 40px rgba(0,255,255,0.9)',
                    '0 0 20px rgba(0,255,255,0.6)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Scanning beam */}
              <motion.div
                className="absolute w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
                animate={{ y: [-40, 40, -40] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          )}

          {/* Info Section */}
          {stage === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center justify-center p-4"
            >
              {/* Main central logo */}
              <motion.img
                src="/logo.png"
                alt="Main Logo"
                className="w-32 h-32"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />

              {/* Scattered mini logos */}
              {[
                { src: '/_social/amazon.png', x: -120, y: -60 },
                { src: '/_social/amazon2.png', x: 120, y: -60 },
                { src: '/_social/shopify.png', x: -100, y: 100 },
                { src: '/_social/ebay.png', x: 100, y: 100 },
              ].map((logo, i) => (
                <motion.img
                  key={i}
                  src={logo.src}
                  alt={`Mini Logo ${i + 1}`}
                  className="absolute w-12 h-12"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{
                    x: logo.x,
                    y: logo.y,
                    opacity: 1,
                    scale: 1,
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    delay: 0.5 + i * 0.1,
                    duration: 1.2,
                    ease: 'easeInOut',
                    type: 'tween',
                    stiffness: 70,
                    damping: 10,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
