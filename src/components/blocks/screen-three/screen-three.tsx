'use client';
import React from 'react';

export default function ScreenThree() {
  return (
    <section className="screenThree">
      
      {/* Background Image */}
      <picture className="backgroundLayer">
        <source media="(min-width: 992px)" srcSet="/img/3/dt-background.png" />
        <img src="/img/3/background.png" alt="Sunset Background" />
      </picture>

      {/* Bottom Gradient */}
      <picture className="bottomGradient">
        <source media="(min-width: 992px)" srcSet="/img/3/bottom-gradient.png" />
        <img src="/img/3/bottom-gradient.png" alt="Bottom Gradient" />
      </picture>

      {/* Couple Image */}
      <div className="coupleWrapper">
        <img src="/img/3/couple.png" alt="Dancing Couple" className="coupleImg" />
      </div>

      {/* Corner Flowers */}
      <img src="/img/2/top-left.png" alt="Top Left Flower" className="cornerFlower topLeft" />
      <img src="/img/3/top-right.png" alt="Top Right Flower" className="cornerFlower topRight" />
      <img src="/img/3/bottom-left.png" alt="Bottom Left Flower" className="cornerFlower bottomLeft" />
      <img src="/img/3/bottom-right.png" alt="Bottom Right Flower" className="cornerFlower bottomRight" />

      {/* Typography Section (Highest z-index) */}
      <div className="textWrapper">
        <img src="/img/3/text-back.png" className="textGlow" alt="Text Glow" />
        
        <div className="textContent">
          <p className="topSmallText">
            TWO PEOPLE,<br/>
            EACH WITH A LITTLE<br/>
            WORLD OF THEIR OWN.
          </p>
          <p className="topSmallText new">AND SOMEHOW,</p>
          <div className="scriptWrapper">
            <h2 className="scriptText">those worlds</h2>
          </div>
          <p className="bottomSmallText">FIND EACH OTHER.</p>
        </div>
      </div>

    </section>
  );
}