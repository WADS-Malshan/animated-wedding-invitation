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
  const [isScreenThreeActive, setIsScreenThreeActive] = useState(false); 
  const [isScreenFourActive, setIsScreenFourActive] = useState(false); 
  const [isScreenFiveActive, setIsScreenFiveActive] = useState(false); 
  const [isScreenSixActive, setIsScreenSixActive] = useState(false); 
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

    // --- Falling Leaves Animation ---
    gsap.utils.toArray('.falling-leaf').forEach((leaf: any) => {
      gsap.set(leaf, {
        x: `random(0, ${window.innerWidth})`,
        y: -100, 
        rotation: 'random(0, 360)',
        opacity: 'random(0.15, 0.35)' 
      });

      gsap.to(leaf, {
        y: window.innerHeight + 100, 
        x: '+=random(-150, 150)',    
        rotation: '+=random(-180, 180)',
        duration: 'random(8, 15)',   
        ease: 'none',
        repeat: -1,                  
        delay: 'random(0, 8)'        
      });
    });

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
          end: "+=500%", 
          pin: true,     
          scrub: 1,      
          anticipatePin: 1, 
        }
      });

      const targetScale = isDesktop ? 100 : 35;
      const stripClass4 = isDesktop ? '.strip4-desk' : '.strip4-mob';
      const stripClass5 = isDesktop ? '.strip5-desk' : '.strip5-mob';
      const stripClass6 = isDesktop ? '.strip6-desk' : '.strip6-mob';

      // 1. Screen 1 -> Screen 2 -> Screen 3
      tl.to(flyingFlowerRef.current, {
        x: '0vw',
        y: '0vh',
        rotation: "+=180", 
        scale: targetScale, 
        force3D: true, 
        ease: "power1.inOut"
      }, 0);

      tl.to(screenTwoWrapperRef.current, { autoAlpha: 0, ease: "none" }, 0.4);
      
      tl.to(screenThreeWrapperRef.current, { 
        autoAlpha: 1, 
        ease: "none",
        onStart: () => setIsScreenThreeActive(true) 
      }, 0.4);
      
      tl.to(flyingFlowerRef.current, { autoAlpha: 0, ease: "none" }, 0.6); 

      tl.to({}, { duration: 0.2 }); 

      // 3. Screen 3 -> Screen 4
      tl.set(screenFourWrapperRef.current, { autoAlpha: 1 }, "+=0.1");
      tl.to(stripClass4, { 
        attr: { height: 1 }, 
        stagger: 0.05, 
        ease: "power2.inOut",
        onStart: () => setIsScreenFourActive(true) // Mask expand weddi text on wenawa
      }); 

      tl.to({}, { duration: 0.2 }); 

      // 5. Screen 4 -> Screen 5
      tl.set(screenFiveWrapperRef.current, { autoAlpha: 1 }, "+=0.1");
      tl.to(stripClass5, { 
        attr: { y: 0, height: 1 }, 
        stagger: 0.05, 
        ease: "power2.inOut",
        onStart: () => setIsScreenFiveActive(true) // Mask expand weddi text on wenawa
      }); 
      
      tl.to({}, { duration: 0.2 }); 

      // 7. Screen 5 -> Screen 6
      tl.set(screenSixWrapperRef.current, { autoAlpha: 1 }, "+=0.1");
      tl.to(stripClass6, { 
        attr: { height: 1 }, 
        stagger: {
          each: 0.05,
          from: "center" 
        }, 
        ease: "power2.inOut",
        onStart: () => setIsScreenSixActive(true) // Mask expand weddi text on wenawa
      }); 

      tl.to({}, { duration: 0.2 }); 

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
        duration: 1.5 
      });

      // 10. Screen 7 Fade in
      tl.to(screenSevenWrapperRef.current, { 
        autoAlpha: 1, 
        ease: "power1.inOut",
        duration: 1
      }, "-=0.8"); 

    });

  }, [isScreenOneDone]);

  const leavesArray = Array.from({ length: 12 });

  return (
    <>
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* SVG Masks Definitions */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          {/* MOBILE MASKS */}
          <clipPath id="screen4-mask-mob" clipPathUnits="objectBoundingBox">
            {[0, 0.2, 0.4, 0.6, 0.8].map((x, i) => (
              <rect key={i} className="strip4-mob" x={x} y="0" width="0.2" height="0" />
            ))}
          </clipPath>
          <clipPath id="screen5-mask-mob" clipPathUnits="objectBoundingBox">
            {[0, 0.2, 0.4, 0.6, 0.8].map((x, i) => (
              <rect key={i} className="strip5-mob" x={x} y="1" width="0.2" height="0" />
            ))}
          </clipPath>
          <clipPath id="screen6-mask-mob" clipPathUnits="objectBoundingBox">
            {[0, 0.2, 0.4, 0.6, 0.8].map((x, i) => (
              <rect key={i} className="strip6-mob" x={x} y="0" width="0.2" height="0" />
            ))}
          </clipPath>

          {/* DESKTOP MASKS */}
          <clipPath id="screen4-mask-desk" clipPathUnits="objectBoundingBox">
            {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((x, i) => (
              <rect key={i} className="strip4-desk" x={x} y="0" width="0.1" height="0" />
            ))}
          </clipPath>
          <clipPath id="screen5-mask-desk" clipPathUnits="objectBoundingBox">
            {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((x, i) => (
              <rect key={i} className="strip5-desk" x={x} y="1" width="0.1" height="0" />
            ))}
          </clipPath>
          <clipPath id="screen6-mask-desk" clipPathUnits="objectBoundingBox">
            {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((x, i) => (
              <rect key={i} className="strip6-desk" x={x} y="0" width="0.1" height="0" />
            ))}
          </clipPath>
        </defs>
      </svg>

      <main ref={containerRef} style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'transparent' }}>
        
        {isScreenOneDone && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 8, pointerEvents: 'none', overflow: 'hidden' }}>
            {leavesArray.map((_, i) => (
              <img
                key={i}
                className="falling-leaf"
                src={`/img/common/bg-leave-${(i % 2) + 1}.png`} 
                alt="Falling leaf petal"
                style={{ 
                  position: 'absolute', 
                  width: isDesktopView ? '35px' : '25px', 
                  willChange: 'transform' 
                }}
              />
            ))}
          </div>
        )}

        {/* Screen 7 */}
        <div ref={screenSevenWrapperRef} style={{ position: 'absolute', inset: 0, zIndex: 6, opacity: 0, visibility: 'hidden' }}>
          <ScreenSeven />
        </div>

        {/* Screen 6 */}
        <div ref={screenSixWrapperRef} style={{ position: 'absolute', inset: 0, zIndex: 5, opacity: 0, visibility: 'hidden', clipPath: isDesktopView ? 'url(#screen6-mask-desk)' : 'url(#screen6-mask-mob)', WebkitClipPath: isDesktopView ? 'url(#screen6-mask-desk)' : 'url(#screen6-mask-mob)' }}>
          <ScreenSix startTextAnimation={isScreenSixActive} />
        </div>

        {/* Screen 5 */}
        <div ref={screenFiveWrapperRef} style={{ position: 'absolute', inset: 0, zIndex: 4, opacity: 0, visibility: 'hidden', clipPath: isDesktopView ? 'url(#screen5-mask-desk)' : 'url(#screen5-mask-mob)', WebkitClipPath: isDesktopView ? 'url(#screen5-mask-desk)' : 'url(#screen5-mask-mob)' }}>
          <ScreenFive startTextAnimation={isScreenFiveActive} />
        </div>

        {/* Screen 4 */}
        <div ref={screenFourWrapperRef} style={{ position: 'absolute', inset: 0, zIndex: 2, opacity: 0, visibility: 'hidden', clipPath: isDesktopView ? 'url(#screen4-mask-desk)' : 'url(#screen4-mask-mob)', WebkitClipPath: isDesktopView ? 'url(#screen4-mask-desk)' : 'url(#screen4-mask-mob)' }}>
          <ScreenFour startTextAnimation={isScreenFourActive} />
        </div>

        {/* Screen 3 */}
        <div ref={screenThreeWrapperRef} style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0, visibility: 'hidden' }}>
          <ScreenThree startTextAnimation={isScreenThreeActive} />
        </div>

        {/* Screen 2 */}
        <div ref={screenTwoWrapperRef} style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
          <ScreenTwo startTextAnimation={isScreenOneDone} />
        </div>

        {/* Flying Flower */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90px', height: '90px', zIndex: 50, pointerEvents: 'none' }}>
          <img ref={flyingFlowerRef} src="/img/common/flower.webp" alt="Flying Flower" style={{ position: 'absolute', top: '-15px', right: '-15px', width: '50px', height: '50px', transformOrigin: 'center center', willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }} />
        </div>

        {/* Screen 1 */}
        <div ref={screenOneWrapperRef} style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <ScreenOne onAnimateFlower={handleFlowerAnimation} />
        </div>
        
      </main>
    </>
  );
}