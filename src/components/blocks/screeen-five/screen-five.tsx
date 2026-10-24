'use client';
import React from 'react';

export default function ScreenFive() {
  return (
    <section className="screenFive">
      
      {/* Background Layer */}
      <picture className="backgroundLayer">
        <source media="(min-width: 992px)" srcSet="/img/5/dt-background.png" />
        <img src="/img/5/background.png" alt="Sunset Path Background" />
      </picture>

      {/* Couple Walking */}
      <div className="coupleWrapper">
        <img src="/img/5/couple.png" alt="Couple Walking" className="coupleImg" />
      </div>

      {/* Corner Flowers */}
      <img src="/img/5/top-left.png" alt="Top Left Flower" className="cornerFlower topLeft" />
      <img src="/img/5/top-right.png" alt="Top Right Flower" className="cornerFlower topRight" />
      <img src="/img/5/bottom-left.png" alt="Bottom Left Flower" className="cornerFlower bottomLeft" />
      <img src="/img/5/bottom-right.png" alt="Bottom Right Flower" className="cornerFlower bottomRight" />

    </section>
  );
}