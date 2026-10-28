"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ScreenThreeProps {
  startTextAnimation?: boolean;
  onVoiceEnd?: () => void;
}

export default function ScreenThree({
  startTextAnimation = false,
  onVoiceEnd,
}: ScreenThreeProps) {
  const containerRef = useRef<HTMLElement>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="char-s3"
        style={{
          opacity: 0,
          transform: "translateY(15px)",
          display: "inline-block",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useGSAP(
    () => {
      gsap.to(".cornerFlower", {
        rotation: 5,
        y: -6,
        x: 2,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      gsap.to(".coupleImg", {
        y: -8,
        scale: 1.01,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  useGSAP(() => {
    if (startTextAnimation) {
      gsap.to(".char-s3", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.02,
        delay: 0.1,
      });

      if (voiceAudioRef.current) {
        voiceAudioRef.current.currentTime = 0;
        voiceAudioRef.current.play().catch((err) => {
          console.log("Voice audio play error:", err);
        });
      }
    }
  }, [startTextAnimation]);

  return (
    <section ref={containerRef} className="screenThree">
      <audio
        ref={voiceAudioRef}
        src="/audio/03.mp3"
        preload="auto"
        onEnded={onVoiceEnd}
      />

      <picture className="backgroundLayer">
        <source media="(min-width: 992px)" srcSet="/img/3/dt-background.webp" />
        <img src="/img/3/background.webp" alt="Sunset Background" />
      </picture>

      <picture className="bottomGradient">
        <source
          media="(min-width: 992px)"
          srcSet="/img/3/bottom-gradient.png"
        />
        <img src="/img/3/bottom-gradient.png" alt="Bottom Gradient" />
      </picture>

      <div className="coupleWrapper">
        <img
          src="/img/3/couple.webp"
          alt="Dancing Couple"
          className="coupleImg"
        />
      </div>

      <img
        src="/img/2/top-left.webp"
        alt="Top Left Flower"
        className="cornerFlower topLeft"
      />
      <img
        src="/img/3/top-right.webp"
        alt="Top Right Flower"
        className="cornerFlower topRight"
      />
      <img
        src="/img/3/bottom-left.webp"
        alt="Bottom Left Flower"
        className="cornerFlower bottomLeft"
      />
      <img
        src="/img/3/bottom-right.webp"
        alt="Bottom Right Flower"
        className="cornerFlower bottomRight"
      />

      <div className="textWrapper">
        <img src="/img/3/text-back.webp" className="textGlow" alt="Text Glow" />

        <div className="textContent">
          <p className="topSmallText">
            {splitText("Two people,")}
            <br />
            {splitText("each with a little")}
            <br />
            {splitText("world of their own.")}
          </p>

          <p className="topSmallText new">{splitText("And somehow,")}</p>

          <div className="scriptWrapper">
            <h2 className="scriptText">{splitText("those worlds")}</h2>
          </div>

          <p className="bottomSmallText">{splitText("Find each other.")}</p>
        </div>
      </div>
    </section>
  );
}
