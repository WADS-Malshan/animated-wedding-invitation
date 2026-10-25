'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ScreenTwo() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Corner Flowers Swaying Animation (Mal hulangata hellenawa wage)
    gsap.to('.cornerFlower', {
      rotation: 6,       // Podi rotation ekak
      y: -8,             // Udata pallahata yanawa
      x: 3,              // Poddak paththata yanawa
      duration: 3,       // Animation speed eka
      repeat: -1,        // Digatama play wenna
      yoyo: true,        // Apahu mulata enna
      ease: 'sine.inOut',
      stagger: 0.4       // Eka eka mala wenas welawal wala hellenna
    });

    // 2. Couple Breathing Effect (Couple eka poddak float wenawa)
    gsap.to('.coupleImg', {
      y: -6,             // Poddak udata yanawa
      scale: 1.015,      // Godak podi loku weemak (us gannawa wage)
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="screenTwo">
      
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