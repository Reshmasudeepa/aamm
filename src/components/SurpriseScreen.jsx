function SurpriseScreen({ onOpen }) {
  return (
    <section className="surprise-screen">
      <div className="floating-heart heart-1">♥</div>
      <div className="floating-heart heart-2">♥</div>
      <div className="floating-heart heart-3">♥</div>
      <div className="floating-heart heart-4">♥</div>

      <div className="surprise-card">
        <div className="gift">🎁</div>

        <p className="small-text">Hey, Sindhu 👀</p>

        <h1>
          I made something
          <br />
          special for you...
        </h1>

        <p className="surprise-description">
          Because a normal birthday message was just not enough. 💗
        </p>

        <button className="primary-btn" onClick={onOpen}>
          Open Your Surprise 🎁
        </button>

        <span className="hint">
          Best experienced with a smile ✨
        </span>
      </div>
    </section>
  );
}

export default SurpriseScreen;