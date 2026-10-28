"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ScreenFiveProps {
  startTextAnimation?: boolean;
  onVoiceEnd?: () => void;
}

export default function ScreenFive({
  startTextAnimation = false,
  onVoiceEnd,
}: ScreenFiveProps) {
  const containerRef = useRef<HTMLElement>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="char-s5"
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
        rotation: 6,
        y: -7,
        x: 3,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.35,
      });

      gsap.to(".walkingCoupleImg", {
        y: -8,
        scale: 1.01,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  useGSAP(() => {
    if (startTextAnimation) {
      gsap.to(".char-s5", {
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
    <section ref={containerRef} className="screenFive">
      <audio
        ref={voiceAudioRef}
        src="/audio/05.mp3"
        preload="auto"
        onEnded={onVoiceEnd}
      />

      <picture className="backgroundLayer">
        <source media="(min-width: 992px)" srcSet="/img/5/dt-background.webp" />
        <img src="/img/5/background.webp" alt="Sunset Path Background" />
      </picture>

      <div className="textWrapper">
        <img src="/img/4/text-back.webp" className="textGlow" alt="Text Glow" />
        <div className="textContent">
          <h2 className="topHeading">{splitText("And now,")}</h2>
          <p className="middleText">
            {splitText("a new moment is waiting")}
            <br />
            {splitText("to become a memory.")}
          </p>
          <p className="smallText">
            {splitText("They’ve dreamed up a little celebration")}
            <br />
            {splitText("by the water,")}
          </p>
          <h3 className="scriptText">{splitText("Beneath The Trees")}</h3>
        </div>
      </div>

      <div className="walkingCoupleWrapper">
        <img
          src="/img/5/couple.webp"
          alt="Couple Walking"
          className="walkingCoupleImg"
        />
      </div>

      <img
        src="/img/5/top-left.webp"
        alt="Top Left Flower"
        className="cornerFlower topLeft"
      />
      <img
        src="/img/5/top-right.webp"
        alt="Top Right Flower"
        className="cornerFlower topRight"
      />
      <img
        src="/img/5/bottom-left.webp"
        alt="Bottom Left Flower"
        className="cornerFlower bottomLeft"
      />
      <img
        src="/img/5/bottom-right.webp"
        alt="Bottom Right Flower"
        className="cornerFlower bottomRight"
      />
    </section>
  );
}
