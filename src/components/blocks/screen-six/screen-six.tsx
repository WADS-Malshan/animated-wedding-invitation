'use client';
import React from 'react';

export default function ScreenSix() {
  return (
    <section className="screenSix">
      
      {/* Background Layer */}
      <picture className="backgroundLayer">
        <source media="(min-width: 992px)" srcSet="/img/6/dt-background.png" />
        <img src="/img/6/background.png" alt="Couple at table" />
      </picture>

      {/* Invitation Card on Table */}
      <div className="cardWrapper">
        <img src="/img/6/invitaion-on-table.png" alt="Invitation Card" className="tableCard" />
      </div>

      {/* Typography Section */}
      <div className="textWrapper">
        <img src="/img/6/text back.png" className="textGlow" alt="Text Glow" />
        
        <div className="textContent">
          <p className="topSmallText">
            Of all the people<br />
            in the world,<br />
            there's someone they<br />
            couldn't imagine<br />
            this moment without
          </p>
          <h2 className="scriptText">you</h2>
        </div>
      </div>

    </section>
  );
}