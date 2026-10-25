'use client';

export default function ScreenFour() {
  return (
    <section className="screenFour">
      
      {/* Background Image */}
      <picture className="backgroundLayer">
        <source media="(min-width: 992px)" srcSet="/img/4/dt-background.png" />
        <img src="/img/4/background.png" alt="Dinner Background" />
      </picture>

      {/* Hanging Lamps */}
      <div className="lampsWrapper">
        <img src="/img/4/lamp-l.png" alt="Large Lamp" className="lamp lampL" />
        <img src="/img/4/lamp-m.png" alt="Medium Lamp" className="lamp lampM" />
        <img src="/img/4/lamp-s.png" alt="Small Lamp" className="lamp lampS" />
      </div>

      {/* Typography Section (Highest z-index) */}
      <div className="textWrapper">
        <img src="/img/4/text-back.png" className="textGlow" alt="Text Glow" />
        
        <div className="textContent">
          <p className="topSmallText">
            But a love story is<br />never just about
          </p>
          <h2 className="scriptText">Two People</h2>
          <p className="bottomSmallText">
            It's about the laughter<br />
            they've shared, the memories<br />
            they've made, and the people<br />
            who helped shape their story.
          </p>
        </div>
      </div>

    </section>
  );
}