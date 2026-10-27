'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ScreenTwoProps {
  startTextAnimation?: boolean;
}

export default function ScreenTwo({ startTextAnimation = false }: ScreenTwoProps) {
  const containerRef = useRef(null);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className="char" 
        style={{ opacity: 0, transform: 'translateY(15px)', display: 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useGSAP(() => {
    gsap.to('.cornerFlower', {
      rotation: 6,
      y: -8,
      x: 3,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.4
    });

    gsap.to('.coupleImg', {
      y: -6,
      scale: 1.015,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, { scope: containerRef });

  useGSAP(() => {
    if (startTextAnimation) {
      gsap.to('.char', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.5 
      });
    }
  }, [startTextAnimation]);

  return (
    <section ref={containerRef} className="screenTwo">
      
      <picture className="backgroundLayer">
        <source media="(min-width: 992px)" srcSet="/img/2/dt-background.webp" />
        {/* fetchPriority ekathu kara */}
        <img src="/img/2/background.webp" alt="Romantic Background" fetchPriority="high" />
      </picture>

      <div className="coupleWrapper">
        {/* fetchPriority ekathu kara */}
        <img src="/img/2/couple.webp" alt="Couple" className="coupleImg" fetchPriority="high" />
      </div>

      <img src="/img/2/top-left.webp" alt="Top Left Flower" className="cornerFlower topLeft" />
      <img src="/img/2/top-right.webp" alt="Top Right Flower" className="cornerFlower topRight" />
      <img src="/img/2/bottom-left.webp" alt="Bottom Left Flower" className="cornerFlower bottomLeft" />
      <img src="/img/2/bottom-right.webp" alt="Bottom Right Flower" className="cornerFlower bottomRight" />

      <div className="textWrapper">
        <img src="/img/2/text back.webp" className="textGlow" alt="Text Glow" />
        
        <div className="textContent">
          <p className="topSmallText">
            {splitText("Some of the most")}
          </p>
          <div className="scriptWrapper">
            <h2 className="scriptText">
              {splitText("Beautiful Stories Begin")}
            </h2>
          </div>
          <p className="bottomSmallText">
            {splitText("when no one is quite")}
            <br/>
            {splitText("expecting them.")}
          </p>
        </div>
      </div>

    </section>
  );
}