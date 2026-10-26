'use client';

export default function ScreenSeven() {
  return (
    <section className="screenSeven">
      
      {/* Background Layer */}
      <div className="backgroundLayer">
        <img src="/img/7/background.png" alt="Card Background" />
      </div>

      {/* Corner Flowers */}
      <img src="/img/7/top-left.png" alt="Top Left Flower" className="cornerFlower topLeft" />
      <img src="/img/7/top-right.png" alt="Top Right Flower" className="cornerFlower topRight" />
      <img src="/img/7/bottom-left.png" alt="Bottom Left Flower" className="cornerFlower bottomLeft" />
      <img src="/img/7/bottom-right.png" alt="Bottom Right Flower" className="cornerFlower bottomRight" />

      {/* Invitation Content */}
      <div className="invitationContent">

        <div className="heart-icon">
          <img src="/img/7/heart.png" alt="Card Background" />
        </div>
        
        {/* Names Section */}
        <div className="coupleNames">
          <h2 className="scriptText">Jayani</h2>
          <h2 className="scriptText small">and</h2>
          <h2 className="scriptText">Kulinda</h2>
        </div>
        
        <div className="devider-icon">
          <img src="/img/7/wedding-line.png" alt="Card Background" />
        </div>

        {/* Request Text */}
        <p className="requestText">
          WARMLY REQUEST THE HONOUR<br/>
          OF THE PRESENCE OF<br/>
        </p>

        <h2 className="invite-name">Mr. Ruwan</h2>

        <p className="requestText">
          TO CELEBRATE THEIR WEDDING ON
        </p>

        {/* Date Section with Watermark */}
        <div className="dateSection">
          <span className="watermark">2026</span>
          <p className="dateText">
            THE <span className="largeDay">16<sup className="superscript">TH</sup></span> OF NOVEMBER<br/>
            FROM 5:15 PM TO 11 PM
          </p>
        </div>

        {/* Location Section */}
        <p className="locationText">
          AT FIFTYKAY ORCHIDS,<br/>
          WATERS EDGE COLOMBO<br/>
          <span className="poruwaText">(PORUWA CEREMONY AT 5:50 PM)</span>
        </p>

      </div>
    </section>
  );
}