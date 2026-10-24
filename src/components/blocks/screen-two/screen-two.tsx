'use client';
import React from 'react';

export default function ScreenTwo() {
  return (
    <section className="screenTwo">
      
      {/* Background Image */}
      <picture className="backgroundLayer">
        <source media="(min-width: 992px)" srcSet="/img/2/dt-background.png" />
        <img src="/img/2/background.png" alt="Romantic Background" />
      </picture>

      {/* Couple Image */}
      <div className="coupleWrapper">
        <img src="/img/2/couple.png" alt="Couple" className="coupleImg" />
      </div>

      {/* Corner Flowers */}
      <img src="/img/2/top-left.png" alt="Top Left Flower" className="cornerFlower topLeft" />
      <img src="/img/2/top-right.png" alt="Top Right Flower" className="cornerFlower topRight" />
      <img src="/img/2/bottom-left.png" alt="Bottom Left Flower" className="cornerFlower bottomLeft" />
      <img src="/img/2/bottom-right.png" alt="Bottom Right Flower" className="cornerFlower bottomRight" />

      {/* Typography Section */}
      <div className="textWrapper">
        <img src="/img/2/text back.png" className="textGlow" alt="Text Glow" />
        
        <div className="textContent">
          <p className="topSmallText">Some of the most</p>
          <div className="scriptWrapper">
            <h2 className="scriptText">Beautiful Stories Begin</h2>
          </div>
          <p className="bottomSmallText">when no one is quite<br/>expecting them.</p>
        </div>
      </div>

    </section>
  );
}