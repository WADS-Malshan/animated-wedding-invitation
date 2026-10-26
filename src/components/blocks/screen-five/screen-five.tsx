'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ScreenFiveProps {
  startTextAnimation?: boolean;
}

export default function ScreenFive({ startTextAnimation = false }: ScreenFiveProps) {
  const containerRef = useRef<HTMLElement>(null);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className="char-s5" 
        style={{ opacity: 0, transform: 'translateY(15px)', display: 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useGSAP(() => {
    // 1. Corner Flowers
    gsap.to('.cornerFlower', {
      rotation: 6,
      y: -7,
      x: 3,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.35
    });

    // 2. Walking Couple Effect
    gsap.to('.walkingCoupleImg', {
      y: -8,
      scale: 1.01,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, { scope: containerRef });

  // Text Animation
  useGSAP(() => {
    if (startTextAnimation) {
      gsap.to('.char-s5', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.05,
        delay: 0.2
      });
    }
  }, [startTextAnimation]);

  return (
    <section ref={containerRef} className="screenFive">
      
      {/* Background Layer */}
      <picture className="backgroundLayer">
        <source media="(min-width: 992px)" srcSet="/img/5/dt-background.png" />
        <img src="/img/5/background.png" alt="Sunset Path Background" />
      </picture>

      {/* Typography Section */}
      <div className="textWrapper">
        <img src="/img/4/text-back.png" className="textGlow" alt="Text Glow" />
        <div className="textContent">
          <h2 className="topHeading">{splitText("And now,")}</h2>
          <p className="middleText">
            {splitText("a new moment is waiting")}<br />
            {splitText("to become a memory.")}
          </p>
          <p className="smallText">
            {splitText("They’ve dreamed up a little celebration")}<br />
            {splitText("by the water,")}
          </p>
          <h3 className="scriptText">{splitText("Beneath The Trees")}</h3>
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