'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ScreenFourProps {
  startTextAnimation?: boolean;
}

export default function ScreenFour({ startTextAnimation = false }: ScreenFourProps) {
  const containerRef = useRef<HTMLElement>(null);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className="char-s4" 
        style={{ opacity: 0, transform: 'translateY(15px)', display: 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useGSAP(() => {
    // Hanging Lamps Premium Swing Animation
    gsap.to('.lamp', {
      rotation: 5,
      transformOrigin: 'top center',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.3,
        from: 'random'
      }
    });
  }, { scope: containerRef });

  // Text Animation
  useGSAP(() => {
    if (startTextAnimation) {
      gsap.to('.char-s4', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.04, // Tikak fast kara text wadi nisa
        delay: 0.2
      });
    }
  }, [startTextAnimation]);

  return (
    <section ref={containerRef} className="screenFour">
      
      {/* Background Image */}
      <picture className="backgroundLayer">
        <source media="(min-width: 992px)" srcSet="/img/4/dt-background.webp" />
        <img src="/img/4/background.webp" alt="Dinner Background" />
      </picture>

      {/* Hanging Lamps */}
      <div className="lampsWrapper">
        <img src="/img/4/lamp-l.png" alt="Large Lamp" className="lamp lampL" />
        <img src="/img/4/lamp-m.png" alt="Medium Lamp" className="lamp lampM" />
        <img src="/img/4/lamp-s.png" alt="Small Lamp" className="lamp lampS" />
      </div>

      {/* Typography Section */}
      <div className="textWrapper">
        <img src="/img/4/text-back.webp" className="textGlow" alt="Text Glow" />
        
        <div className="textContent">
          <p className="topSmallText">
            {splitText("But a love story is")}<br />
            {splitText("never just about")}
          </p>
          <h2 className="scriptText">
            {splitText("Two People")}
          </h2>
          <p className="bottomSmallText">
            {splitText("It's about the laughter")}<br />
            {splitText("they've shared, the memories")}<br />
            {splitText("they've made, and the people")}<br />
            {splitText("who helped shape their story.")}
          </p>
        </div>
      </div>

    </section>
  );
}