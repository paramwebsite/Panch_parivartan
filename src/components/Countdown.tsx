import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownProps {
  onComplete: () => void;
}

export default function Countdown({ onComplete }: CountdownProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        {count > 0 && (
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="text-8xl font-bold text-white"
          >
            {count}
          </motion.div>
        )}
        {count === 0 && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="text-6xl font-bold text-white"
          >
            GO!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}