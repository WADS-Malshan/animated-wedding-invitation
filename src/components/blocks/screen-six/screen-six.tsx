"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ScreenSixProps {
  startTextAnimation?: boolean;
  onVoiceEnd?: () => void;
}

export default function ScreenSix({
  startTextAnimation = false,
  onVoiceEnd,
}: ScreenSixProps) {
  const containerRef = useRef<HTMLElement>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="char-s6"
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
      gsap.to(".tableCard", {
        y: -6,
        scale: 1.02,
        rotation: 1,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".textGlow", {
        opacity: 0.5,
        scale: 1.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  useGSAP(() => {
    if (startTextAnimation) {
      gsap.to(".char-s6", {
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
    <section ref={containerRef} className="screenSix">
      <audio
        ref={voiceAudioRef}
        src="/audio/06.mp3"
        preload="auto"
        onEnded={onVoiceEnd}
      />

      <picture className="backgroundLayer">
        <source media="(min-width: 992px)" srcSet="/img/6/dt-background.webp" />
        <img src="/img/6/background.webp" alt="Couple at table" />
      </picture>

      <div className="cardWrapper">
        <img
          src="/img/6/invitaion-on-table.png"
          alt="Invitation Card"
          className="tableCard"
        />
      </div>

      <div className="textWrapper">
        <img src="/img/6/text back.webp" className="textGlow" alt="Text Glow" />

        <div className="textContent">
          <p className="topSmallText">
            {splitText("Of all the people")}
            <br />
            {splitText("in the world,")}
            <br />
            {splitText("there's someone they")}
            <br />
            {splitText("couldn't imagine")}
            <br />
            {splitText("this moment without")}
          </p>
          <h2 className="scriptText">{splitText("you")}</h2>
        </div>
      </div>
    </section>
  );
}
