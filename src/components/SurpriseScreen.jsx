import surpriseImage from "../assets/photos/image.png";

function SurpriseScreen({ onOpen }) {
  return (
    <section className="surprise-screen">
      <img
        src={surpriseImage}
        alt="Happy Birthday Sindhu"
        className="surprise-cover"
      />

      <div className="surprise-cta">
        <button className="primary-btn" onClick={onOpen}>
          Open Your Surprise 🎁
        </button>
      </div>
    </section>
  );
}

export default SurpriseScreen;