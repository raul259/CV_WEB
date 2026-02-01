"use client";

import { useEffect, useState } from "react";

// Animaciones de los cuadrados de fondo
const squareAnimations = Array.from({ length: 20 }, (_, i) => ({
  delay: Math.random() * 2,
  duration: Math.random() * 3 + 2,
  opacity: Math.random() * 0.5 + 0.3,
}));

export default function IntroLoader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFading(true);
          setTimeout(onFinish, 800);
          return 100;
        }
        const increment = Math.random() * 15; 
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-700 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ 
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}
    >
      {/* Grid de cuadrados que ocupa toda la pantalla */}
      <div className="absolute inset-0 grid grid-cols-5 gap-3 p-8">
        {squareAnimations.map((anim, i) => (
          <div
            key={i}
            className="rounded-lg animate-pulse transition-all duration-300"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              animationDelay: `${anim.delay}s`,
              animationDuration: `${anim.duration}s`,
              opacity: anim.opacity,
            }}
          />
        ))}
      </div>

      {/* Contenido centrado sobre los cuadrados */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 
          className="text-8xl font-bold tracking-tighter animate-pulse mb-8 transition-all duration-300"
          style={{
            color: 'var(--accent-color)',
            textShadow: '0 0 30px currentColor, 0 0 60px currentColor',
          }}
        >
          {Math.floor(progress)}%
        </h1>

        {/* Barra de progreso visual */}
        <div 
          className="w-96 h-2 rounded-full overflow-hidden mb-6 transition-all duration-300"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
          }}
        >
          <div 
            className="h-full transition-all duration-300 ease-out"
            style={{ 
              width: `${progress}%`,
              background: `linear-gradient(to right, var(--accent-color), var(--accent-color))`,
              boxShadow: `0 0 20px var(--accent-color)`,
            }}
          />
        </div>

        <p 
          className="text-base font-mono animate-pulse tracking-widest uppercase transition-all duration-300"
          style={{
            color: 'var(--text-secondary)',
          }}
        >
          Iniciando Sistemas...
        </p>
      </div>
    </div>
  );
}