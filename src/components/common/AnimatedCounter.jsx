import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ target, suffix = '', prefix = '', decimals = 0, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let animationFrameId;
    let startTime;

    const startAnimation = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Smooth easeOutCubic easing curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOut * target;
      
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(startAnimation);
      } else {
        setCount(target);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animationFrameId = requestAnimationFrame(startAnimation);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [target, duration]);

  const formattedNumber = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('en-IN');

  return (
    <span ref={ref} className="inline-block">
      {prefix}{formattedNumber}{suffix}
    </span>
  );
}
