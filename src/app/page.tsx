"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScreenOne from "@/components/blocks/screen-one";
import ScreenTwo from "@/components/blocks/screen-two";
import ScreenThree from "@/components/blocks/screen-three";
import ScreenFour from "@/components/blocks/screen-four";
import ScreenFive from "@/components/blocks/screen-five";
import ScreenSix from "@/components/blocks/screen-six";
import ScreenSeven from "@/components/blocks/screen-seven";

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

  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isScreenOneDone, setIsScreenOneDone] = useState(false);

  // Voice state eka
  const [isVoiceDone, setIsVoiceDone] = useState(false);

  const [currentScreen, setCurrentScreen] = useState(1);
  const currentScreenRef = useRef(1);

  const [isScreenThreeActive, setIsScreenThreeActive] = useState(false);
  const [isScreenFourActive, setIsScreenFourActive] = useState(false);
  const [isScreenFiveActive, setIsScreenFiveActive] = useState(false);
  const [isScreenSixActive, setIsScreenSixActive] = useState(false);

  const [isDesktopView, setIsDesktopView] = useState(true);

  const isAnimating = useRef(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  useEffect(() => {
    // BGM eka methana initialize karanawa
    bgAudioRef.current = new Audio("/audio/bgm.mp3");
    bgAudioRef.current.loop = true;
    bgAudioRef.current.volume = 0.4;
    // iPhone walata podi support ekak widihata preload danna
    bgAudioRef.current.preload = "auto";

    const imageUrls = [
      "/img/1/left.webp",
      "/img/1/right.webp",
      "/img/1/dt-left.webp",
      "/img/1/dt-right.webp",
      "/img/2/background.webp",
      "/img/2/dt-background.webp",
      "/img/2/couple.webp",
      "/img/common/flower.webp",
    ];

    let loadedCount = 0;
    // Audio eka wait list eken ain kara, eka nisa image length eka witharak gannawa
    const totalAssets = imageUrls.length;

    const assetLoader = () => {
      loadedCount++;
      if (loadedCount === totalAssets) {
        setTimeout(() => setImagesLoaded(true), 500);
      }
    };

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = assetLoader;
      img.onerror = assetLoader; // Error awath stuck wenne nathi wenna
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsDesktopView(window.innerWidth >= 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleFlowerAnimation = contextSafe(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    // User interaction ekedi (flower eka click karaddi) music eka play wenawa
    if (bgAudioRef.current) {
      bgAudioRef.current
        .play()
        .catch((err) => console.log("Audio play error:", err));
    }

    const isDesktop = window.innerWidth >= 992;
    const targetX = isDesktop ? "-2vw" : "-10vw";
    const targetY = isDesktop ? "23vh" : "26vh";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsScreenOneDone(true);
        setCurrentScreen(2);
        currentScreenRef.current = 2;
        setIsVoiceDone(false); // Screen 2 start weddi button eka lock karanawa
        isAnimating.current = false;
      },
    });

    if (flyingFlowerRef.current) {
      tl.to(
        flyingFlowerRef.current,
        {
          x: targetX,
          y: targetY,
          rotation: 360,
          scale: 0.6,
          duration: 1.5,
          force3D: true,
          ease: "power2.inOut",
        },
        0,
      );
    }

    if (screenOneWrapperRef.current) {
      tl.to(
        screenOneWrapperRef.current,
        { autoAlpha: 0, duration: 0.5, display: "none" },
        1.2,
      );
    }
  });

  useGSAP(() => {
    if (!isScreenOneDone) return;
    gsap.utils.toArray(".falling-leaf").forEach((leaf: any) => {
      gsap.set(leaf, {
        x: `random(0, ${window.innerWidth})`,
        y: -100,
        rotation: "random(0, 360)",
        opacity: "random(0.15, 0.35)",
      });
      gsap.to(leaf, {
        y: window.innerHeight + 100,
        x: "+=random(-150, 150)",
        rotation: "+=random(-180, 180)",
        duration: "random(8, 15)",
        ease: "none",
        repeat: -1,
        delay: "random(0, 8)",
      });
    });
  }, [isScreenOneDone]);

  const handleNextScreen = contextSafe(() => {
    const screenNum = currentScreenRef.current;

    // Voice eka iwara nathnam button click eka wada karanne na
    if (!isVoiceDone || isAnimating.current || screenNum >= 7) return;

    isAnimating.current = true;
    setIsVoiceDone(false); // Eelanga screen ekata yaddi aith lock karanawa

    const isDesktop = window.innerWidth >= 992;

    // Screen 2 -> 3
    if (screenNum === 2) {
      const targetScale = isDesktop ? 100 : 35;
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
          setCurrentScreen(3);
          currentScreenRef.current = 3;
        },
      });
      tl.to(
        flyingFlowerRef.current,
        {
          x: "0vw",
          y: "0vh",
          rotation: "+=180",
          scale: targetScale,
          force3D: true,
          duration: 1.5,
          ease: "power2.inOut",
        },
        0,
      )
        .to(
          screenTwoWrapperRef.current,
          { autoAlpha: 0, duration: 0.8, ease: "power1.inOut" },
          0.3,
        )
        .to(
          screenThreeWrapperRef.current,
          {
            autoAlpha: 1,
            visibility: "visible",
            duration: 0.8,
            ease: "power1.inOut",
            onStart: () => setIsScreenThreeActive(true),
          },
          0.3,
        )
        .to(flyingFlowerRef.current, { autoAlpha: 0, duration: 0.5 }, 1.1);
    }
    // Screen 3 -> 4
    else if (screenNum === 3) {
      const stripClass = isDesktop ? ".strip4-desk" : ".strip4-mob";
      gsap.set(screenFourWrapperRef.current, {
        autoAlpha: 1,
        visibility: "visible",
      });
      gsap.to(stripClass, {
        attr: { height: 1 },
        stagger: 0.05,
        duration: 1.2,
        ease: "power2.inOut",
        onStart: () => setIsScreenFourActive(true),
        onComplete: () => {
          isAnimating.current = false;
          setCurrentScreen(4);
          currentScreenRef.current = 4;
        },
      });
    }
    // Screen 4 -> 5
    else if (screenNum === 4) {
      const stripClass = isDesktop ? ".strip5-desk" : ".strip5-mob";
      gsap.set(screenFiveWrapperRef.current, {
        autoAlpha: 1,
        visibility: "visible",
      });
      gsap.to(stripClass, {
        attr: { y: 0, height: 1 },
        stagger: 0.05,
        duration: 1.2,
        ease: "power2.inOut",
        onStart: () => setIsScreenFiveActive(true),
        onComplete: () => {
          isAnimating.current = false;
          setCurrentScreen(5);
          currentScreenRef.current = 5;
        },
      });
    }
    // Screen 5 -> 6
    else if (screenNum === 5) {
      const stripClass = isDesktop ? ".strip6-desk" : ".strip6-mob";
      gsap.set(screenSixWrapperRef.current, {
        autoAlpha: 1,
        visibility: "visible",
      });
      gsap.to(stripClass, {
        attr: { height: 1 },
        stagger: { each: 0.05, from: "center" },
        duration: 1.2,
        ease: "power2.inOut",
        onStart: () => setIsScreenSixActive(true),
        onComplete: () => {
          isAnimating.current = false;
          setCurrentScreen(6);
          currentScreenRef.current = 6;
        },
      });
    }
    // Screen 6 -> 7
    else if (screenNum === 6) {
      const zoomX = isDesktop ? "-25vw" : "-30vw";
      const zoomY = isDesktop ? "-30vh" : "-40vh";
      const zoomOrigin = isDesktop ? "80% 75%" : "75% 80%";
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
          setCurrentScreen(7);
          currentScreenRef.current = 7;
        },
      });
      tl.to(
        screenSixWrapperRef.current,
        {
          scale: 8,
          x: zoomX,
          y: zoomY,
          transformOrigin: zoomOrigin,
          ease: "power2.inOut",
          duration: 1.5,
        },
        0,
      ).to(
        screenSevenWrapperRef.current,
        {
          autoAlpha: 1,
          visibility: "visible",
          ease: "power1.inOut",
          duration: 1,
        },
        0.8,
      );
    }
  });

  const leavesArray = Array.from({ length: 12 });

  if (!imagesLoaded) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#e5d9c5",
        }}
      >
        <img
          src="/img/common/flower.webp"
          alt="Loading"
          style={{ width: "50px", animation: "spin 3s linear infinite" }}
        />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .next-screen-btn {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255, 255, 255, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ab573e;
          cursor: pointer;
          z-index: 100;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          animation: bounceArrow 2.5s infinite;
        }
        .next-screen-btn:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: translateX(-50%) scale(1.1);
        }
        .next-screen-btn.disabled {
          opacity: 0.4;
          cursor: not-allowed;
          animation: none;
          box-shadow: none;
        }
        @keyframes bounceArrow {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-8px); }
          60% { transform: translateX(-50%) translateY(-4px); }
        }
      `}</style>

      <main
        ref={containerRef}
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <svg
          width="0"
          height="0"
          style={{ position: "absolute", pointerEvents: "none" }}
        >
          {/* ඔයාගේ Clip paths (defs) ටික මෙතන තියන්න! */}
        </svg>

        {isScreenOneDone && currentScreen < 7 && (
          <button
            className={`next-screen-btn ${!isVoiceDone ? "disabled" : ""}`}
            onClick={handleNextScreen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        )}

        {isScreenOneDone && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 8,
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            {leavesArray.map((_, i) => (
              <img
                key={i}
                className="falling-leaf"
                src={`/img/common/bg-leave-${(i % 2) + 1}.png`}
                style={{
                  position: "absolute",
                  width: isDesktopView ? "35px" : "25px",
                }}
              />
            ))}
          </div>
        )}

        <div
          ref={screenSevenWrapperRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 6,
            opacity: 0,
            visibility: "hidden",
          }}
        >
          <ScreenSeven />
        </div>

        <div
          ref={screenSixWrapperRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            opacity: 0,
            visibility: "hidden",
            clipPath: isDesktopView
              ? "url(#screen6-mask-desk)"
              : "url(#screen6-mask-mob)",
            WebkitClipPath: isDesktopView
              ? "url(#screen6-mask-desk)"
              : "url(#screen6-mask-mob)",
          }}
        >
          <ScreenSix
            startTextAnimation={isScreenSixActive}
            onVoiceEnd={() => setIsVoiceDone(true)}
          />
        </div>

        <div
          ref={screenFiveWrapperRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            opacity: 0,
            visibility: "hidden",
            clipPath: isDesktopView
              ? "url(#screen5-mask-desk)"
              : "url(#screen5-mask-mob)",
            WebkitClipPath: isDesktopView
              ? "url(#screen5-mask-desk)"
              : "url(#screen5-mask-mob)",
          }}
        >
          <ScreenFive
            startTextAnimation={isScreenFiveActive}
            onVoiceEnd={() => setIsVoiceDone(true)}
          />
        </div>

        <div
          ref={screenFourWrapperRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            opacity: 0,
            visibility: "hidden",
            clipPath: isDesktopView
              ? "url(#screen4-mask-desk)"
              : "url(#screen4-mask-mob)",
            WebkitClipPath: isDesktopView
              ? "url(#screen4-mask-desk)"
              : "url(#screen4-mask-mob)",
          }}
        >
          <ScreenFour
            startTextAnimation={isScreenFourActive}
            onVoiceEnd={() => setIsVoiceDone(true)}
          />
        </div>

        <div
          ref={screenThreeWrapperRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            opacity: 0,
            visibility: "hidden",
          }}
        >
          <ScreenThree
            startTextAnimation={isScreenThreeActive}
            onVoiceEnd={() => setIsVoiceDone(true)}
          />
        </div>

        <div
          ref={screenTwoWrapperRef}
          style={{ position: "absolute", inset: 0, zIndex: 3 }}
        >
          <ScreenTwo
            startTextAnimation={isScreenOneDone}
            onVoiceEnd={() => setIsVoiceDone(true)}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -20%)",
            width: "90px",
            height: "90px",
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          <img
            ref={flyingFlowerRef}
            src="/img/common/flower.webp"
            style={{
              position: "absolute",
              top: "-15px",
              right: "-15px",
              width: "50px",
              height: "50px",
            }}
          />
        </div>

        <div
          ref={screenOneWrapperRef}
          style={{ position: "absolute", inset: 0, zIndex: 10 }}
        >
          <ScreenOne onAnimateFlower={handleFlowerAnimation} />
        </div>
      </main>
    </>
  );
}
