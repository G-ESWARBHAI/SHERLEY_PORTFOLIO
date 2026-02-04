import React, { useState, useEffect, useRef, useCallback } from 'react';

const TypingEffect = ({ text, speed = 100, className = '', enableSound = true }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const audioContextRef = useRef(null);

  // Initialize AudioContext for typing sound
  useEffect(() => {
    if (enableSound && typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        // Resume AudioContext if suspended (required for autoplay policies)
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
      } catch (e) {
        console.warn('AudioContext not supported');
      }
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [enableSound]);

  // Function to play typing sound - Professional, crisp typing sound
  const playTypingSound = useCallback(() => {
    if (!enableSound || !audioContextRef.current) return;

    try {
      const audioContext = audioContextRef.current;
      
      // Resume if suspended
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const now = audioContext.currentTime;
      const duration = 0.025; // 25ms - crisp and professional

      // Create a professional, clean typing sound - like a modern mechanical keyboard
      // Main click - sharp and clear
      const osc1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      osc1.type = 'square'; // Square wave for a sharper, more defined click
      osc1.frequency.setValueAtTime(1100, now);
      osc1.frequency.exponentialRampToValueAtTime(900, now + duration);
      gain1.gain.setValueAtTime(0.04, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc1.connect(gain1);
      gain1.connect(audioContext.destination);

      // High-frequency click for crispness
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1800, now);
      osc2.frequency.exponentialRampToValueAtTime(1400, now + duration);
      gain2.gain.setValueAtTime(0.025, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);

      // Low-frequency body for depth
      const osc3 = audioContext.createOscillator();
      const gain3 = audioContext.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(300, now);
      osc3.frequency.exponentialRampToValueAtTime(250, now + duration);
      gain3.gain.setValueAtTime(0.02, now);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc3.connect(gain3);
      gain3.connect(audioContext.destination);

      // Start all oscillators
      osc1.start(now);
      osc1.stop(now + duration);
      osc2.start(now);
      osc2.stop(now + duration);
      osc3.start(now);
      osc3.stop(now + duration);
    } catch (e) {
      // Silently fail if audio can't be played
    }
  }, [enableSound]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        // Play typing sound for each character (except spaces)
        if (text[currentIndex] !== ' ') {
          playTypingSound();
        }
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, playTypingSound]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className={showCursor ? 'opacity-100' : 'opacity-0'}>|</span>
      )}
    </span>
  );
};

export default TypingEffect;

