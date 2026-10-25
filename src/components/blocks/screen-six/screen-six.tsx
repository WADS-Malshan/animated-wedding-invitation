'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ScreenSix() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Invitation Card Floating Effect (Card eka poddak udata pallahata yanawa)
    gsap.to('.tableCard', {
      y: -6,             // Poddak udata yanawa
      scale: 1.02,       // Poddak loku wenawa
      rotation: 1,       // Himiita podi angle ekakata harenawa
      duration: 2.5,     // Speed eka
      repeat: -1,        // Digatama play wenna
      yoyo: true,        // Apahu mulata enna
      ease: 'sine.inOut'
    });

    // 2. Text Glow Pulsing Effect (Pitipasse eliya wadi/adu wenawa magical feel ekakata)
    gsap.to('.textGlow', {
      opacity: 0.5,      // Eliya adu wenawa
      scale: 1.05,       // Poddak spread wenawa
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="screenSix">
      
      {/* Background Layer */}
      <picture className="backgroundLayer">
        <source media="(min-width: 992px)" srcSet="/img/6/dt-background.png" />
        <img src="/img/6/background.png" alt="Couple at table" />
      </picture>

      {/* Invitation Card on Table */}
      <div className="cardWrapper">
        <img src="/img/6/invitaion-on-table.png" alt="Invitation Card" className="tableCard" />
      </div>

      {/* Typography Section */}
      <div className="textWrapper">
        <img src="/img/6/text back.png" className="textGlow" alt="Text Glow" />
        
        <div className="textContent">
          <p className="topSmallText">
            Of all the people<br />
            in the world,<br />
            there's someone they<br />
            couldn't imagine<br />
            this moment without
          </p>
          <h2 className="scriptText">you</h2>
        </div>
      </div>

    </section>
  );
}