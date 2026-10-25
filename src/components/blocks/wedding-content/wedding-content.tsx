'use client';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ScreenOne from "@/components/blocks/screen-one";
import ScreenTwo from "@/components/blocks/screen-two";
import ScreenThree from "@/components/blocks/screen-three";
import ScreenFour from "@/components/blocks/screen-four";
import ScreenFive from "@/components/blocks/screen-five"; 
import ScreenSix from "@/components/blocks/screen-six"; 
import ScreenSeven from "@/components/blocks/screen-seven"; 

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const flyingFlowerRef = useRef<HTMLImageElement>(null);
  const screenOneWrapperRef = useRef<HTMLDivElement>(null);
  const screenTwoWrapperRef = useRef<HTMLDivElement>(null);
  const screenThreeWrapperRef = useRef<HTMLDivElement>(null);
  const screenFourWrapperRef = useRef<HTMLDivElement>(null);
  const screenFiveWrapperRef = useRef<HTMLDivElement>(null); 
  const screenSixWrapperRef = useRef<HTMLDivElement>(null); 
  const screenSevenWrapperRef = useRef<HTMLDivElement>(null); 
  
  const [isScreenOneDone, setIsScreenOneDone] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(true);

  const { contextSafe } = useGSAP({ scope: containerRef });

  useEffect(() => {
    const handleResize = () => setIsDesktopView(window.innerWidth >= 992);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isScreenOneDone) {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto'; 
      document.documentElement.style.scrollbarWidth = 'none'; 
      setTimeout(() => ScrollTrigger.refresh(), 100);
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
          scale: 0.6, // Width/Height වෙනුවට scale භාවිතා කර ඇත (Layout Reflows නතර වේ)
          duration: 1.5,
          force3D: true, 
          lazy: false,
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
          end: "+=600%", 
          pin: true,     
          scrub: 2.5,
          anticipatePin: 1,
          fastScrollEnd: true, 
        }
      });

      // Scale multiplier calculated for smooth GPU zoom without changing layout dimensions
      const targetScale = isDesktop ? 100 : 50; 
      
      const stripClass4 = isDesktop ? '.strip4-desk' : '.strip4-mob';
      const stripClass5 = isDesktop ? '.strip5-desk' : '.strip5-mob';
      const stripClass6 = isDesktop ? '.strip6-desk' : '.strip6-mob';

      // 1. Screen 1 -> Screen 2 -> Screen 3 (Palaweani Zoom Fix: Transform/Scale-based Pure GPU execution)
      tl.to(flyingFlowerRef.current, {
        x: '0vw',
        y: '0vh',
        rotation: "+=180", 
        scale: targetScale, // width/height animate නොකර GPU Hardware accelerated scale100x එකක් යෙදුවා
        transformOrigin: "50% 50%",
        force3D: true, 
        lazy: false,
        ease: "power1.inOut"
      }, 0);

      tl.to(screenTwoWrapperRef.current, { autoAlpha: 0, ease: "none", lazy: false }, 0.4);
      tl.to(screenThreeWrapperRef.current, { autoAlpha: 1, ease: "none", lazy: false }, 0.4);
      tl.to(flyingFlowerRef.current, { autoAlpha: 0, ease: "none", lazy: false }, 0.6); 

      // 2. Screen 3 Hold
      tl.to({}, { duration: 0.5 }); 

      // 3. Screen 3 -> Screen 4
      tl.set(screenFourWrapperRef.current, { autoAlpha: 1 }, "+=0.2");
      tl.to(stripClass4, { attr: { height: 1 }, stagger: 0.05, ease: "power2.inOut", lazy: false }); 

      // 4. Screen 4 Hold
      tl.to({}, { duration: 0.5 }); 

      // 5. Screen 4 -> Screen 5
      tl.set(screenFiveWrapperRef.current, { autoAlpha: 1 }, "+=0.2");
      tl.to(stripClass5, { attr: { y: 0, height: 1 }, stagger: 0.05, ease: "power2.inOut", lazy: false }); 
      
      // 6. Screen 5 Hold
      tl.to({}, { duration: 0.5 }); 

      // 7. Screen 5 -> Screen 6
      tl.set(screenSixWrapperRef.current, { autoAlpha: 1 }, "+=0.2");
      tl.to(stripClass6, { attr: { height: 1 }, stagger: { each: 0.05, from: "center" }, ease: "power2.inOut", lazy: false }); 

      // 8. Screen 6 Hold
      tl.to({}, { duration: 0.5 }); 

      // 9. Screen 6 -> Screen 7 
      const zoomX = isDesktop ? "-25vw" : "-30vw"; 
      const zoomY = isDesktop ? "-30vh" : "-40vh";
      const zoomOrigin = isDesktop ? "80% 75%" : "75% 80%"; 

      tl.to(screenSixWrapperRef.current, {
        scale: 8, 
        x: zoomX, 
        y: zoomY,
        transformOrigin: zoomOrigin, 
        ease: "power2.inOut", 
        duration: 2,
        lazy: false
      });

      // 10. Screen 7 Fade in
      tl.to(screenSevenWrapperRef.current, { 
        autoAlpha: 1, 
        ease: "power1.inOut",
        duration: 1,
        lazy: false
      }, "-=1"); 

    });

  }, [isScreenOneDone]);

  return (
    <>
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* SVG MASKS */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        {/* ... (Keep existing SVG clipPaths) ... */}
      </svg>

      <main ref={containerRef} style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'transparent' }}>
        
        {/* FLOWER WRAPPER */}
        <div 
          style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '50px', height: '50px', zIndex: 50, pointerEvents: 'none',
            contain: 'strict',
          }}
        >
          <img 
            ref={flyingFlowerRef}
            src="/img/common/flower.webp" 
            alt="Flying Flower" 
            loading="eager" 
            decoding="sync" 
            fetchPriority="high" 
            style={{ 
              position: 'absolute', 
              top: '0', left: '0', 
              width: '100%', height: '100%', 
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
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