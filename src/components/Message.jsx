import { motion } from "framer-motion";
import { Mail, Sparkles, Maximize2, ArrowDown, HeartHandshake } from "lucide-react";
import sindhuLetter from "../assets/letter.png";

function Message({ onOpenLightbox }) {
  const handleOpenLetterModal = () => {
    if (onOpenLightbox) {
      onOpenLightbox({
        type: "image",
        src: sindhuLetter,
        caption: "A Birthday Letter For Sindhu 💌",
      });
    }
  };

  return (
    <section className="message-section-redesign" id="message">
      <div className="message-glow-orb" />

      <div className="message-container">
        {/* Heading */}
        <motion.div
          className="message-heading-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="message-icon-pill">
            <Mail size={22} className="text-pink" />
            <span>A LITTLE SOMETHING FROM ME TO YOU</span>
          </div>

          <h2 className="section-title-serif">A Note For You 💌</h2>

          <p className="section-subtitle-text">
            Written from the heart, just for you. Click on the letter below to expand and read full screen.
          </p>
        </motion.div>

        {/* Interactive Letter Envelope Container */}
        <motion.div
          className="message-letter-card"
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="letter-glass-shell" onClick={handleOpenLetterModal}>
            <div className="letter-header-bar">
              <div className="letter-stamp-badge">
                <HeartHandshake size={16} />
                <span>Special Wish</span>
              </div>
              <button
                type="button"
                className="letter-expand-btn"
                onClick={handleOpenLetterModal}
                title="Expand letter full screen"
              >
                <Maximize2 size={16} />
                <span>Expand Note</span>
              </button>
            </div>

            <div className="letter-img-container">
              <img
                className="message-letter-image"
                src={sindhuLetter}
                alt="Sindhu's birthday letter"
              />
              <div className="letter-hover-overlay">
                <Sparkles size={28} className="text-gold" />
                <span>Click to View Full Size</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Section CTA Button */}
        <motion.div
          className="message-footer-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="#memories" className="nav-continue-btn">
            <span>Our Memories 📸</span>
            <ArrowDown size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Message;