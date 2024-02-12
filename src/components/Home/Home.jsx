import "./home.scss";

export default function () {
  return (
    <header>
      <figure className="home-figure">
        <img
          src="../../public/desktop-background.jpeg"
          alt="background"
          className="home-background"
        />
        <img
          src="../../public/vertical-bg-4.jpeg"
          alt=""
          className="tablet-show"
        />
        <div className="home-caption">
          Discover a magical world, where the most unexpected figures exist...
        </div>
        <img
          src="../../public/boat-yokai.png"
          alt=""
          className="boat-yokai tablet-hide"
        />
        <img src="../../public/carp.png" alt="" className="carp tablet-hide" />
        <img
          src="../../public/sitting-yokais.png"
          alt=""
          className="sitting-yokais tablet-hide"
        />
        <img
          src="../../public/yokai2.png"
          alt=""
          className="running-yokais tablet-hide"
        />
        <img
          src="../../public/yokai1.png"
          alt=""
          className="walking-yokai tablet-hide"
        />
        <img
          src="../../public/flying-yokai.png"
          alt=""
          className="flying-yokai tablet-hide"
        />
        <img
          src="../../public/female-yokai.png"
          alt=""
          className="dropping-yokai tablet-hide"
        />
        <img
          src="../../public/dragon.png"
          alt=""
          className="dragon tablet-hide"
        />
      </figure>
    </header>
  );
}
