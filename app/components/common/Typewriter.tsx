"use client";

import React, { useState, useEffect, useCallback } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  onRestart?: () => void;
  repeatDelay?: number;
  repeat?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 10,
  className,
  onComplete,
  onRestart,
  repeatDelay = 3000,
  repeat = true,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const resetAnimation = useCallback(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsComplete(false);
    onRestart?.(); // 🔹 Ensures restart logic runs
  }, [onRestart]);

  useEffect(() => {
    resetAnimation(); // 🔹 Reset when `text` changes
  }, [text, resetAnimation]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.(); // 🔹 Ensures `onComplete` fires at the right time

      if (repeat) {
        setTimeout(() => {
          resetAnimation();
        }, repeatDelay);
      }
    }
  }, [currentIndex, text, speed, isComplete, onComplete, repeat, repeatDelay, resetAnimation]);

  return <div className={className}>{displayText}</div>;
};

export default Typewriter;
