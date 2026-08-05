import photo1 from "../assets/sindhu2.jpg";
import photo2 from "../assets/sindhu3.jpg";
import photo3 from "../assets/sindhu4.jpg";
import photo4 from "../assets/sindhu5.jpg";
import photo5 from "../assets/sindhu6.jpg";
import photo6 from "../assets/sindhuphotos.jpg";

const photos = [
  { image: photo1, caption: "A memory worth keeping 💗" },
  { image: photo2, caption: "One of those beautiful moments ✨" },
  { image: photo3, caption: "A little piece of happiness 🌷" },
  { image: photo4, caption: "Smiles that stay forever 💕" },
  { image: photo5, caption: "A moment wrapped in warmth 🌸" },
  { image: photo6, caption: "Another lovely chapter together 🌹" },
];

function Memories() {
  return (
    <section className="memories-section" id="memories">
      <div className="memories-heading">
        <span>📸</span>

        <p>THE MOMENTS WORTH REMEMBERING</p>

        <h2>Our Little Memory Lane</h2>

        <div className="heading-heart">♥</div>

        <p className="memories-description">
          Some moments become memories, and some memories stay with us forever.
          Here are the photo moments that are actually present inside your project. 💗
        </p>
      </div>

      <div className="polaroid-grid">
        {photos.map((photo, index) => (
          <figure className={`polaroid polaroid-${index + 1}`} key={photo.caption}>
            <div className="photo-wrapper">
              <img src={photo.image} alt={photo.caption} />
            </div>

            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className="memories-ending">
        <p>
          These are only a few moments from so many beautiful memories.
          I hope your life continues to be filled with even more smiles,
          happiness and unforgettable moments. 💕
        </p>

        <a href="#special-things" className="continue-btn">
          There's More For You 💗 ↓
        </a>
      </div>

    </section>
  );
}

export default Memories;