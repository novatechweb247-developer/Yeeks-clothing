import { motion } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2] text-[#171717]"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-4"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block mb-2">
          Boutique Experience
        </span>
        <h1 className="text-3xl md:text-5xl font-serif tracking-widest font-bold text-[#171717] mb-1">
          YEEKS
        </h1>
        <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#77736D] font-medium">
          Clothing Enterprise
        </p>
        <div className="mt-8 w-16 h-[2px] bg-[#C5A36A] mx-auto animate-pulse" />
      </motion.div>
    </motion.div>
  );
}
