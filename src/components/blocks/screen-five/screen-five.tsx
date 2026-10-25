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

      {/* Typography Section (Highest z-index) */}
      <div className="textWrapper">
        <img src="/img/4/text-back.png" className="textGlow" alt="Text Glow" />
        <div className="textContent">
          <h2 className="topHeading">And now,</h2>
          <p className="middleText">
            a new moment is waiting<br />
            to become a memory.
          </p>
          <p className="smallText">
            They’ve dreamed up a little celebration<br />
            by the water,
          </p>
          <h3 className="scriptText">Beneath The Trees</h3>
        </div>
      </div>

      {/* Couple Walking */}
      <div className="walkingCoupleWrapper">
        <img src="/img/5/couple.png" alt="Couple Walking" className="walkingCoupleImg" />
      </div>

      {/* Corner Flowers */}
      <img src="/img/5/top-left.png" alt="Top Left Flower" className="cornerFlower topLeft" />
      <img src="/img/5/top-right.png" alt="Top Right Flower" className="cornerFlower topRight" />
      <img src="/img/5/bottom-left.png" alt="Bottom Left Flower" className="cornerFlower bottomLeft" />
      <img src="/img/5/bottom-right.png" alt="Bottom Right Flower" className="cornerFlower bottomRight" />

    </section>
  );
}