import React, { useEffect, useRef } from 'react';
import { THEME_CONFIG } from '../data';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  color: string;
}

export const RippleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripples = useRef<Ripple[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const frameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    const createRipple = (x: number, y: number, isAmbient: boolean = false) => {
      // Create organic variations using config colors
      const colors = THEME_CONFIG.rippleColors;
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      ripples.current.push({
        x,
        y,
        radius: isAmbient ? 5 : 10,
        maxRadius: isAmbient ? (150 + Math.random() * 150) : (100 + Math.random() * 100), // Ambient can be larger
        alpha: isAmbient ? (0.15 + Math.random() * 0.1) : (0.3 + Math.random() * 0.2), // Ambient is subtler
        speed: isAmbient ? (0.5 + Math.random() * 1) : (1 + Math.random() * 2), // Ambient is slower
        color: randomColor
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Randomly spawn ambient ripples to simulate water surface activity
      // 3% chance per frame => ~1.8 ripples/sec at 60fps
      if (Math.random() < 0.03) {
          createRipple(
              Math.random() * canvas.width, 
              Math.random() * canvas.height, 
              true
          );
      }

      for (let i = ripples.current.length - 1; i >= 0; i--) {
        const ripple = ripples.current[i];
        
        ripple.radius += ripple.speed;
        ripple.alpha -= 0.005; // Fade out speed

        if (ripple.alpha <= 0) {
          ripples.current.splice(i, 1);
        } else {
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            // Gradient for softer edges
            const gradient = ctx.createRadialGradient(
                ripple.x, ripple.y, ripple.radius * 0.8,
                ripple.x, ripple.y, ripple.radius
            );
            gradient.addColorStop(0, `rgba(${ripple.color}, 0)`);
            gradient.addColorStop(0.5, `rgba(${ripple.color}, ${ripple.alpha * 0.5})`);
            gradient.addColorStop(1, `rgba(${ripple.color}, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Thin line for definition
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${ripple.color}, ${ripple.alpha * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
      }

      frameId.current = requestAnimationFrame(animate);
    };

    const handleInteraction = (clientX: number, clientY: number) => {
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Distance check to prevent too many ripples
        const dx = x - lastPos.current.x;
        const dy = y - lastPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 40) { 
            createRipple(x, y, false);
            lastPos.current = { x, y };
        }
    };

    const onMouseMove = (e: MouseEvent) => handleInteraction(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        handleInteraction(touch.clientX, touch.clientY);
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove);

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(frameId.current);
    };
  }, []);

  // Applying the liquid distortion filter from App.tsx/LiquidFilter component
  return (
    <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 mix-blend-multiply opacity-60"
        style={{ 
            width: '100%', 
            height: '100%',
            filter: 'url(#liquid-distortion)' 
        }}
    />
  );
};