import sindhuLetter from "../assets/letter.png";

function Message() {
  return (
    <section className="message-section" id="message">
      <div className="message-container">
        <div className="message-heading">
          <span>💌</span>
          <p>A LITTLE SOMETHING FROM ME TO YOU</p>
          <h2>A Note For You</h2>
        </div>

        <div className="message-letter-wrap">
          <img
            className="message-letter-image"
            src={sindhuLetter}
            alt="Sindhu's birthday letter"
          />
        </div>

        <a href="#memories" className="next-section-btn">
          Our Memories 📸 ↓
        </a>
      </div>
    </section>
  );
}

export default Message;