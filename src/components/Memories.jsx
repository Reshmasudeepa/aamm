import { motion } from "framer-motion";
import { Camera, Sparkles, Heart, Maximize2, ArrowDown } from "lucide-react";
import photo1 from "../assets/sindhu2.jpg";
import photo2 from "../assets/sindhu3.jpg";
import photo3 from "../assets/sindhu4.jpg";
import photo4 from "../assets/sindhu5.jpg";
import photo5 from "../assets/sindhu6.jpg";
import photo6 from "../assets/sindhuphotos.jpg";

const photos = [
  { id: 1, image: photo1, caption: "A memory worth keeping 💗", rotation: "-3deg" },
  { id: 2, image: photo2, caption: "One of those beautiful moments ✨", rotation: "3deg" },
  { id: 3, image: photo3, caption: "A little piece of happiness 🌷", rotation: "-2deg" },
  { id: 4, image: photo4, caption: "Smiles that stay forever 💕", rotation: "2deg" },
  { id: 5, image: photo5, caption: "A moment wrapped in warmth 🌸", rotation: "-3deg" },
  { id: 6, image: photo6, caption: "Another lovely chapter together 🌹", rotation: "3deg" },
];

function Memories({ onOpenLightbox }) {
  const handlePhotoClick = (photo) => {
    if (onOpenLightbox) {
      onOpenLightbox({
        type: "image",
        src: photo.image,
        caption: photo.caption,
      });
    }
  };

  return (
    <section className="memories-section-redesign" id="memories">
      <div className="memories-ambient-glow" />

      <div className="memories-wrapper">
        {/* Section Header */}
        <motion.div
          className="memories-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-pill-tag">
            <Camera size={18} className="text-pink" />
            <span>THE MOMENTS WORTH REMEMBERING</span>
          </div>

          <h2 className="section-title-serif">Our Little Memory Lane 📸</h2>

          <div className="heading-heart-divider">
            <Heart size={20} fill="#ff2a6d" color="#ff2a6d" />
          </div>

          <p className="memories-description">
            Some moments become memories, and some memories stay with us forever.
            Here are the photo moments captured in your special journey 💗
          </p>
        </motion.div>

        {/* Polaroid Grid Layout */}
        <div className="polaroid-grid-layout">
          {photos.map((photo, index) => (
            <motion.figure
              key={photo.id}
              className={`polaroid-card-item polaroid-slot-${index + 1}`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotate: "0deg",
                y: -10,
                zIndex: 10,
                transition: { duration: 0.3 },
              }}
              onClick={() => handlePhotoClick(photo)}
            >
              <div className="polaroid-photo-frame">
                <img src={photo.image} alt={photo.caption} loading="lazy" />
                <div className="polaroid-pin-icon">📍</div>
                <div className="polaroid-hover-badge">
                  <Maximize2 size={16} />
                </div>
              </div>

              <figcaption className="polaroid-caption-text">
                <span>{photo.caption}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Memories Ending Banner */}
        <motion.div
          className="memories-ending-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Sparkles size={24} className="text-gold mb-2" />
          <p>
            These are only a few moments from so many beautiful memories.
            I hope your life continues to be filled with even more smiles,
            happiness and unforgettable moments. 💕
          </p>

          <a href="#video-memories" className="continue-btn-pill">
            <span>Video Memories 🎬</span>
            <ArrowDown size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Memories;