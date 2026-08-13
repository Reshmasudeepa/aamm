import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Heart, Sparkles, Star } from "lucide-react";
import surpriseImage from "../assets/photos/image.png";

function SurpriseScreen({ onOpen }) {
  const handleOpenClick = () => {
    // Launch celebratory confetti burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#ff2a6d", "#ec4899", "#fbbf24", "#ffffff"],
    });

    setTimeout(() => {
      onOpen();
    }, 400);
  };

  return (
    <section className="surprise-screen-hero">
      {/* Background Glow Orbs */}
      <div className="surprise-glow-orb orb-center" />
      <div className="surprise-glow-orb orb-top-right" />

      <div className="surprise-content-container">
        {/* Floating Header Tag */}
        <motion.div
          className="surprise-badge-tag"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Sparkles size={16} className="text-pink" />
          <span>A SPECIAL SURPRISE AWAITS YOU</span>
          <Sparkles size={16} className="text-pink" />
        </motion.div>

        {/* Main Gift Image Container */}
        <motion.div
          className="surprise-cover-wrapper"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="surprise-glass-frame">
            <img
              src={surpriseImage}
              alt="Happy Birthday Sindhu"
              className="surprise-cover-img"
            />
            <div className="surprise-img-overlay" />
            
            <div className="surprise-floating-tag">
              <Heart size={18} fill="#ff2a6d" color="#ff2a6d" />
              <span>For Dearest Sindhu 💗</span>
            </div>
          </div>
        </motion.div>

        {/* Headline Wish */}
        <motion.div
          className="surprise-text-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="surprise-title">
            Happy Birthday <span className="highlight-gradient">Sindhu</span>
          </h1>
          <p className="surprise-subtitle">
            A little magical journey made just for you to celebrate your special day ✨
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="surprise-cta-wrap"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button className="surprise-primary-btn" onClick={handleOpenClick}>
            <Gift className="btn-gift-icn" size={22} />
            <span>Open Your Surprise 🎁</span>
            <Star className="btn-star-icn" size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default SurpriseScreen;