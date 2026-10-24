'use client';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ScreenOne from "@/components/blocks/screen-one";
import ScreenTwo from "@/components/blocks/screen-two";
import ScreenThree from "@/components/blocks/screen-three";
import ScreenFour from "@/components/blocks/screen-four"; // Screen 4 import karaganna

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const flyingFlowerRef = useRef<HTMLImageElement>(null);
  const screenOneWrapperRef = useRef<HTMLDivElement>(null);
  const screenTwoWrapperRef = useRef<HTMLDivElement>(null);
  const screenThreeWrapperRef = useRef<HTMLDivElement>(null);
  const screenFourWrapperRef = useRef<HTMLDivElement>(null); // Screen 4 Ref
  
  const [isScreenOneDone, setIsScreenOneDone] = useState(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  useEffect(() => {
    if (isScreenOneDone) {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto'; 
      document.documentElement.style.scrollbarWidth = 'none'; 
    } else {
      document.body.style.overflow = 'hidden';
    }
    
    return () => { 
      document.body.style.overflow = 'auto'; 
      document.documentElement.style.scrollbarWidth = 'auto';
    };
  }, [isScreenOneDone]);

  const handleFlowerAnimation = contextSafe(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 992px)",
      isMobile: "(max-width: 991px)"
    }, (context) => {
      let { isDesktop } = context.conditions as { isDesktop: boolean };
      const targetX = isDesktop ? '-2vw' : '-10vw'; 
      const targetY = isDesktop ? '-3vh' : '0vh';    

      if (flyingFlowerRef.current) {
        gsap.to(flyingFlowerRef.current, {
          x: targetX,
          y: targetY,
          rotation: 360,
          scale: 0.6,
          duration: 1.5,
          force3D: true, 
          ease: "power2.inOut",
          onComplete: () => {
            setIsScreenOneDone(true); 
          }
        });
      }
    });

    if (screenOneWrapperRef.current) {
      gsap.to(screenOneWrapperRef.current, {
        autoAlpha: 0,
        duration: 0.5,
        delay: 1.6,
        display: 'none'
      });
    }
  });

  useGSAP(() => {
    if (!isScreenOneDone) return;

    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 992px)",
      isMobile: "(max-width: 991px)"
    }, (context) => {
      let { isDesktop } = context.conditions as { isDesktop: boolean };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%", // Scroll distance eka wadi kara Screen 4 nisa
          pin: true,     
          scrub: 2.5,
          anticipatePin: 1, 
        }
      });

      const targetScale = isDesktop ? 100 : 35;

      // 1. Screen 1 -> Screen 2 -> Screen 3 Transition (Flower zoom)
      tl.to(flyingFlowerRef.current, {
        x: '0vw',
        y: '0vh',
        rotation: "+=180", 
        scale: targetScale, 
        force3D: true, 
        ease: "power1.inOut"
      }, 0);

      tl.to(screenTwoWrapperRef.current, { autoAlpha: 0, ease: "none" }, 0.4);
      tl.to(screenThreeWrapperRef.current, { autoAlpha: 1, ease: "none" }, 0.4);
      
      tl.to(flyingFlowerRef.current, { 
        autoAlpha: 0, 
        ease: "none" 
      }, 0.6); 

      // 2. Screen 3 eka kiyawanna podi welawak hold karanawa
      tl.to({}, { duration: 0.5 }); 

      // 3. Screen 3 -> Screen 4 Premium Parallax Transition
      tl.to(screenThreeWrapperRef.current, { 
        y: "-15vh", // Screen 3 poddak udaha gihin fade out wenawa
        autoAlpha: 0, 
        ease: "power2.inOut" 
      }, "+=0.2");

      tl.fromTo(screenFourWrapperRef.current, 
        { autoAlpha: 0, scale: 0.9, y: "10vh" }, // Screen 4 podiyata yatin thiyenne
        { autoAlpha: 1, scale: 1, y: "0vh", ease: "power2.out" }, // Ekama welawata loku wela udaha enawa
        "<" // Kalin animation eka ekkama (Screen 3 yana ekkama) play wenna
      );
    });

  }, [isScreenOneDone]);

  return (
    <>
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <main ref={containerRef} style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        
        {/* Screen 4 (Pallehainma thiyenne z-index 0) */}
        <div ref={screenFourWrapperRef} style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0, visibility: 'hidden' }}>
          <ScreenFour />
        </div>

        {/* Screen 3 */}
        <div ref={screenThreeWrapperRef} style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0, visibility: 'hidden' }}>
          <ScreenThree />
        </div>

        {/* Screen 2 */}
        <div ref={screenTwoWrapperRef} style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <ScreenTwo />
        </div>

        {/* Flower Anchor */}
        <div 
          style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '90px', height: '90px', zIndex: 50, pointerEvents: 'none',
          }}
        >
          <img 
            ref={flyingFlowerRef}
            src="/img/common/flower.png" 
            alt="Flying Flower" 
            style={{ 
              position: 'absolute', top: '-15px', right: '-15px', width: '50px', height: '50px', 
              transformOrigin: 'center center',
              willChange: 'transform', 
            }}
          />
        </div>

        {/* Screen 1 */}
        <div ref={screenOneWrapperRef} style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <ScreenOne onAnimateFlower={handleFlowerAnimation} />
        </div>
        
      </main>
    </>
  );
}