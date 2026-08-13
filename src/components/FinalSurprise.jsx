import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Heart, Sparkles, Send, Check } from "lucide-react";

function FinalSurprise() {
  const [wishText, setWishText] = useState("");
  const [savedWish, setSavedWish] = useState(() => {
    return localStorage.getItem("sindhu_birthday_wish") || "";
  });
  const [submitted, setSubmitted] = useState(false);

  const handleConfettiFire = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#ff2a6d", "#ec4899", "#fbbf24", "#38bdf8", "#a855f7"],
    });
  };

  const handleSaveWish = (e) => {
    e.preventDefault();
    if (!wishText.trim()) return;
    localStorage.setItem("sindhu_birthday_wish", wishText.trim());
    setSavedWish(wishText.trim());
    setSubmitted(true);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ff2a6d", "#fbbf24"],
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="final-surprise-section-redesign" id="final-surprise">
      <div className="final-glow-orb" />

      <div className="final-surprise-shell-container">
        <motion.div
          className="final-surprise-card"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="final-gift-badge">
            <Gift size={42} className="text-pink" />
          </div>

          <p className="final-kicker-tag">ONE LAST LITTLE GIFT</p>

          <h2 className="final-main-title">Happy Birthday, Sindhu 💗</h2>

          <p className="final-surprise-copy">
            You are the sweetest part of this little story, and I hope this birthday
            leaves you with the softest smile and warmest heart ✨
          </p>

          {/* Action Buttons */}
          <div className="final-action-bar">
            <button
              type="button"
              className="final-confetti-btn"
              onClick={handleConfettiFire}
            >
              <Sparkles size={18} />
              <span>Celebrate With Confetti 🎉</span>
            </button>
          </div>

          {/* Interactive Wish Box */}
          <div className="final-wish-box-container">
            <div className="wish-box-header">
              <Heart size={16} fill="#ff2a6d" color="#ff2a6d" />
              <span>Make a Birthday Wish for the Coming Year 🌸</span>
            </div>

            <form onSubmit={handleSaveWish} className="wish-form">
              <input
                type="text"
                className="wish-input-field"
                placeholder="Type your birthday wish here, Sindhu..."
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
              />
              <button type="submit" className="wish-submit-btn">
                {submitted ? <Check size={16} /> : <Send size={16} />}
                <span>{submitted ? "Wish Saved!" : "Save Wish"}</span>
              </button>
            </form>

            {savedWish && (
              <div className="saved-wish-display">
                <Sparkles size={14} className="text-gold" />
                <span>Your Saved Wish: "{savedWish}" ✨</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Celebratory Page Footer */}
        <footer className="birthday-site-footer">
          <p>© {new Date().getFullYear()} Made with Dearest Love For Sindhu 💗</p>
          <div className="footer-hearts-row">
            <span>💖</span>
            <span>✨</span>
            <span>🌸</span>
            <span>💖</span>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default FinalSurprise;
