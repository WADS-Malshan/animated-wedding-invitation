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
          <p className="topSmallText">BUT A LOVE STORY IS<br/>NEVER JUST ABOUT</p>
          <h2 className="scriptText">Two People</h2>
          <p className="bottomSmallText">IT'S ABOUT THE LAUGHTER<br/>THEY'VE SHARED, THE MEMORIES<br/>THEY'VE MADE, AND THE PEOPLE<br/>WHO HELPED SHAPE THEIR STORY.</p>
        </div>
      </div>

    </section>
  );
}