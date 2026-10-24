import Image from "next/image";

export default function PromoBanner() {
  return (
    <section className="promo-banner">
      <div className="promo-banner-wrap">
        <div className="info">
          <div className="title">
            <span>Three ways to make it yours</span>
          </div>
          <div className="button">
            <span>Explore</span>
          </div>
        </div>
        <div className="image">
          <div className="motor-cycle">
            <Image src="/assets/images/motorcycle.png" width={500} height={500} alt="motorcycle" />
          </div>
        </div>
      </div>
    </section>
  );
}