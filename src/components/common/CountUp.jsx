import React, { useState, useEffect } from 'react';

export default function CountUp({ value, duration = 2000, className = "" }) {
  const strVal = String(value);
  const match = strVal.match(/([^\d.]*)([\d,.]+)(.*)/);
  
  let prefix = "";
  let numericVal = 0;
  let suffix = "";
  let decimals = 0;

  if (match) {
    prefix = match[1] || "";
    const rawNumberStr = match[2].replace(/,/g, "");
    numericVal = parseFloat(rawNumberStr) || 0;
    suffix = match[3] || "";
    
    if (rawNumberStr.includes(".")) {
      decimals = rawNumberStr.split(".")[1].length;
    }
  } else {
    numericVal = typeof value === "number" ? value : 0;
  }

  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Quadratic ease-out formula
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = easeProgress * numericVal;
      
      setDisplayCount(currentVal);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [numericVal, duration]);

  const formattedNum = decimals > 0
    ? displayCount.toFixed(decimals)
    : Math.floor(displayCount).toLocaleString('en-IN');

  return (
    <span className={className}>
      {prefix}{formattedNum}{suffix}
    </span>
  );
}
