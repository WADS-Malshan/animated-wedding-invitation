'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ScreenOneProps {
  onAnimateFlower: () => void;
}

export default function ScreenOne({ onAnimateFlower }: ScreenOneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const leftFlowersRef = useRef<HTMLPictureElement>(null);
  const rightFlowersRef = useRef<HTMLPictureElement>(null);
  const envelopeRef = useRef<HTMLButtonElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleOpen = contextSafe(() => {
    const tl = gsap.timeline();

    // 1. Envelope button gayab wena eka
    tl.to(envelopeRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
    }, 0);

    // 2. Background fade out wela yatin thiyena Screen 2 penna gannawa
    tl.to(bgRef.current, {
      opacity: 0,
      duration: 0.8
    }, 0);

    // 3. Mal depaththata arenawa
    tl.to(leftFlowersRef.current, {
      xPercent: -100,
      duration: 1.5,
      ease: "power3.inOut"
    }, 0.2);

    tl.to(rightFlowersRef.current, {
      xPercent: 100,
      duration: 1.5,
      ease: "power3.inOut"
    }, 0.2);
    
    tl.to(containerRef.current, {
      pointerEvents: 'none',
      duration: 0.1
    }, "-=0.2");

    // Home eke thiyena flower animation eka trigger karanawa
    onAnimateFlower();
  });

  return (
    <div className="screenOne" ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div className="backgroundLayer" ref={bgRef}></div>

      <picture ref={leftFlowersRef} className="leftFlowers">
        <source media="(min-width: 992px)" srcSet="/img/1/dt-left.webp" />
        <img src="/img/1/left.webp" alt="Left Flowers" />
      </picture>
      
      <picture ref={rightFlowersRef} className="rightFlowers">
        <source media="(min-width: 992px)" srcSet="/img/1/dt-right.webp" />
        <img src="/img/1/right.webp" alt="Right Flowers" />
      </picture>

      {/* Envelop button eka center karanawa */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }}>
        <button 
          ref={envelopeRef} 
          className="envelopeButton" 
          onClick={handleOpen}
          aria-label="Open Invitation"
        >
          <div className="buttonContent">
            <svg className="envelopeIcon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#fff" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}