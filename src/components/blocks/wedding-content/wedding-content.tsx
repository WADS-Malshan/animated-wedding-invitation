'use client';

import React, { useState, useRef } from 'react';

export default function WeddingContent() {
  const [activeScreen, setActiveScreen] = useState(1);
  const [hideScreenOne, setHideScreenOne] = useState(false);
  const [isFlowerLanded, setIsFlowerLanded] = useState(false);
  
  // Scroll progress 0 inda 100 varege
  const [zoomProgress, setZoomProgress] = useState(0);

  const touchStartY = useRef(0);
  const touchStartZoom = useRef(0);

  const text1 = "SOME OF THE MOST";
  const text2 = "Beautiful Stories begin";
  const text3 = "WHEN NO ONE IS QUITE EXPECTING THEM.";

  const handleOpen = () => {
    setActiveScreen(2);
    // 2.2s nantara flower land aaguttade
    setTimeout(() => {
      setIsFlowerLanded(true);
    }, 2200);
  };

  const handleCurtainTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (activeScreen > 1 && e.propertyName === 'transform') {
      setHideScreenOne(true);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (activeScreen === 1 || !isFlowerLanded) return;

    if (activeScreen === 2) {
      setZoomProgress((prev) => {
        let next = prev + e.deltaY * 0.08; // Smooth zoom speed
        if (next <= 0) next = 0;
        if (next >= 100) {
          next = 100;
          setActiveScreen(3);
        }
        return next;
      });
    } else if (activeScreen === 3 && e.deltaY < 0) {
      setActiveScreen(2);
      setZoomProgress(95);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartZoom.current = zoomProgress;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (activeScreen === 1 || !isFlowerLanded) return;
    
    const touchCurrentY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchCurrentY;

    if (activeScreen === 2) {
      let next = touchStartZoom.current + deltaY * 0.25;
      if (next <= 0) next = 0;
      if (next >= 100) {
        next = 100;
        setActiveScreen(3);
      }
      setZoomProgress(next);
    } else if (activeScreen === 3 && deltaY < -20) {
      setActiveScreen(2);
      setZoomProgress(95);
    }
  };

  const renderSmoothLetters = (text: string, startDelay: number, speed: number = 0.05) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="smoothLetter"
        style={{
          animationDelay: `${startDelay + (index * speed)}s`, 
          animationPlayState: activeScreen >= 2 ? 'running' : 'paused'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  // --- PREMIUM HIGH-QUALITY ZOOM LOGIC ---
  
  // Transform scale() badalu neravagi width & height change maduttiddeve. 
  // Idarinda entha dodda zoom aadaru image blur aagalla. (40px to ~5000px)
  const flowerSize = 40 + (zoomProgress / 100) * 5000; 
  
  // Progress 50 inda 60 naduve (Flower inda screen cover aagiruvaaga) Screen 2 inda 3 ge switch aaguttade
  const screenTwoOpacity = Math.max(0, 1 - ((zoomProgress - 50) / 10));
  const screenThreeOpacity = Math.min(1, Math.max(0, (zoomProgress - 50) / 10));
  
  // Progress 75 inda 100 varege, switch aada nantara flower fade aaguttade
  const flowerOpacity = zoomProgress < 75 ? 1 : 1 - ((zoomProgress - 75) / 25);

  const showScreenTwo = activeScreen === 1 || (activeScreen === 2 && zoomProgress < 60);
  const showScreenThree = activeScreen === 3 || (activeScreen === 2 && zoomProgress >= 50);

  return (
    <div 
      className="invitationContainer"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      
      {/* SHARED CORNERS */}
      {activeScreen >= 2 && (
        <div className="sharedCorners">
          <div className="cornerFlower corner1"><img src="/img/2/corner (3).png" alt="Corner 1" /></div>
          <div className="cornerFlower corner2"><img src="/img/2/corner (1).png" alt="Corner 2" /></div>
          <div className="cornerFlower corner3"><img src="/img/2/corner (4).png" alt="Corner 3" /></div>
          <div className="cornerFlower corner4"><img src="/img/2/corner (2).png" alt="Corner 4" /></div>
        </div>
      )}

      {/* MAGICAL FLOWER (High Quality Dynamic Width/Height) */}
      <div 
        className={`magicFlower ${activeScreen >= 2 ? 'flyToEar' : ''}`}
        style={isFlowerLanded ? {
          width: `${flowerSize}px`,
          height: `${flowerSize}px`,
          transform: `translate(-50%, -50%) rotate(350deg)`,
          transition: 'none', 
          opacity: activeScreen === 3 ? 0 : flowerOpacity
        } : {}}
      >
        <img src="/img/2/flower 2.png" alt="Magical Flower" />
      </div>

      {/* ---------------- SCREEN 3 ---------------- */}
      <div 
        className={`screenThreeContent ${showScreenThree ? 'active' : ''}`}
        style={{ opacity: showScreenThree ? screenThreeOpacity : 0 }}
      >
        <div className="bg3">
          <img src="/img/3/Hue_Saturation 2.png" alt="Sunset Background" />
        </div>
        <div className="textBack3">
          <img src="/img/3/text back.png" alt="Glow" />
        </div>
        <div className="dancingCoupleLayer">
          <img src="/img/3/Tender twirl of an ivory-clad couple.png" alt="Dancing Couple" />
        </div>

        <div className="screenThreeText">
          <p className="subTitleTop">TWO PEOPLE,</p>
          <p className="subTitleTop" style={{ fontSize: '0.6rem', marginTop: '-5px' }}>EACH WITH A LITTLE<br/>WORLD OF THEIR OWN.</p>
          <p className="subTitleTop" style={{ marginTop: '10px' }}>AND SOMEHOW,</p>
          <h2 className="scriptTitle">those worlds</h2>
          <p className="subTitleTop">FIND EACH OTHER.</p>
        </div>
      </div>

      {/* ---------------- SCREEN 2 ---------------- */}
      <div 
        className="screenTwoContent"
        style={{ opacity: showScreenTwo ? screenTwoOpacity : 0, pointerEvents: showScreenTwo ? 'auto' : 'none' }} 
      >
        <div className="bg1">
          <img src="/img/2/background1.png" alt="Background" />
        </div>
        <div className="textBack">
          <img src="/img/2/text back.png" alt="Glow" />
        </div>
        <div className="coupleLayer">
          <img src="/img/2/couple.png" alt="Couple" />
        </div>

        <div className="textWrapper">
          <p className="subTitleTop">
            {activeScreen >= 2 && renderSmoothLetters(text1, 2.4, 0.06)}
          </p>
          <h1 className="mainTitle">
            {activeScreen >= 2 && renderSmoothLetters(text2, 3.6, 0.08)}
          </h1>
          <p className="subTitleBottom">
            {activeScreen >= 2 && renderSmoothLetters(text3, 5.8, 0.05)}
          </p>
        </div>
      </div>

      {/* ---------------- SCREEN 1 ---------------- */}
      {!hideScreenOne && (
        <div className="screenOneOverlay">
          <div className={`firstBg ${activeScreen >= 2 ? 'fadeOut' : ''}`}></div>
          <div className={`flowerLeft ${activeScreen >= 2 ? 'openLeft' : ''}`} onTransitionEnd={handleCurtainTransitionEnd}>
            <img src="/img/1/left.png" alt="Flowers Left" />
          </div>
          <div className={`flowerRight ${activeScreen >= 2 ? 'openRight' : ''}`}>
            <img src="/img/1/right.png" alt="Flowers Right" />
          </div>
          <div className={`buttonContainer ${activeScreen >= 2 ? 'hideButton' : ''}`}>
            <button className="envelopeButton" onClick={handleOpen}>
              <div className="pulseRing"></div>
              <div className="pulseRing delay"></div>
              <div className="buttonContent">
                <svg className="envelopeIcon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#fff" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}