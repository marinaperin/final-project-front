import "./home.scss";

export default function () {
  return (
    <main>
      <header>
        <figure className="home-figure">
          <img
            src="../../desktop-background.jpeg"
            alt="background"
            className="home-background"
          />
          <img src="../../vertical-bg-4.jpeg" alt="" className="tablet-show" />
          <div className="home-caption">
            Discover a magical world, where the most unexpected figures exist...
          </div>
          <img
            src="../../boat-yokai.png"
            alt=""
            className="boat-yokai tablet-hide"
          />
          <img src="../../carp.png" alt="" className="carp tablet-hide" />
          <img
            src="../../sitting-yokais.png"
            alt=""
            className="sitting-yokais tablet-hide"
          />
          <img
            src="../../yokai2.png"
            alt=""
            className="running-yokais tablet-hide"
          />
          <img
            src="../../yokai1.png"
            alt=""
            className="walking-yokai tablet-hide"
          />
          <img
            src="../../flying-yokai.png"
            alt=""
            className="flying-yokai tablet-hide"
          />
          <img
            src="../../female-yokai.png"
            alt=""
            className="dropping-yokai tablet-hide"
          />
          <img src="../../dragon.png" alt="" className="dragon tablet-hide" />
        </figure>
      </header>
    </main>
  );
}
