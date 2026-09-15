import React, { useState } from 'react';

export default function Card3DTilt({ children, className = "", onClick }) {
  const [transformStyle, setTransformStyle] = useState("");
  const [glowStyle, setGlowStyle] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03) translateY(-4px)`);
    setGlowStyle({
      opacity: 1,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0px)");
    setGlowStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden rounded-2xl border border-palette-laceBorder transition-all duration-300 shadow-lilac-md hover:shadow-lilac-lg ${className}`}
    >
      {/* 3D Radial Hover Glow Effect (Shamrock & Lilac) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: glowStyle.opacity,
          background: `radial-gradient(600px circle at ${glowStyle.x}% ${glowStyle.y}%, rgba(158, 193, 66, 0.25), rgba(189, 178, 255, 0.15), transparent 50%)`,
        }}
      />
      {children}
    </div>
  );
}
