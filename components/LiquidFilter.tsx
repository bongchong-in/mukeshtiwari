import React from 'react';

export const LiquidFilter: React.FC = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
    <defs>
      <filter id="liquid-distortion">
        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="1" result="warp" />
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
      </filter>
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      </filter>
    </defs>
  </svg>
);
