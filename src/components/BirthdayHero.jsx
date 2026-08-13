import { motion } from "framer-motion";
import { Sparkles, Heart, Crown, ArrowDown, Gift } from "lucide-react";
import heroImage from "../assets/photos/hero.png";

function BirthdayHero() {
  return (
    <section className="birthday-hero-section" id="hero">
      {/* Background Decorative Lighting */}
      <div className="hero-glow-circle circle-left" />
      <div className="hero-glow-circle circle-right" />

      <div className="hero-section-container">
        {/* Header Badge */}
        <motion.div
          className="hero-top-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Crown size={18} className="text-gold" />
          <span>CELEBRATING SINDHU'S SPECIAL DAY</span>
          <Sparkles size={16} className="text-pink" />
        </motion.div>

        {/* Title */}
        <motion.div
          className="hero-title-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="hero-main-heading">
            Happy Birthday, <span className="rose-gold-gradient">Sindhu!</span> 🎉
          </h1>
          <p className="hero-tagline">
            May your day be filled with warm smiles, sweet laughter, and unforgettable moments 💕
          </p>
        </motion.div>

        {/* Hero Image Showcase */}
        <motion.div
          className="hero-image-stage"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="hero-frame-outer">
            <div className="hero-frame-inner">
              <img src={heroImage} alt="Happy Birthday Sindhu" className="hero-main-img" />
              <div className="hero-img-shine" />
            </div>

            {/* Floating Badges */}
            <motion.div
              className="hero-floating-card badge-left"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart size={20} fill="#ff2a6d" color="#ff2a6d" />
              <div>
                <strong>Birthday Girl</strong>
                <span>Always Shining ✨</span>
              </div>
            </motion.div>

            <motion.div
              className="hero-floating-card badge-right"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Gift size={20} className="text-gold" />
              <div>
                <strong>Special Day</strong>
                <span>Pure Happiness 💖</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll CTA Link */}
        <motion.div
          className="hero-scroll-link-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="#message" className="hero-scroll-btn">
            <span>Scroll To Begin Your Note</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={18} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default BirthdayHero;