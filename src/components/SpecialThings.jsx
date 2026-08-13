import { motion } from "framer-motion";
import { Smile, Heart, Laugh, Users, Sparkles, Flower2, ArrowDown } from "lucide-react";
import sindhuBg from "../assets/sindhu2.jpg";

function SpecialThings() {
  const specialThings = [
    {
      emoji: "😊",
      icon: Smile,
      title: "Your Smile",
      text: "That smile has a way of making everything around you feel a little brighter.",
      gradient: "from-pink-500/20 to-rose-500/20",
    },
    {
      emoji: "💖",
      icon: Heart,
      title: "Your Kind Heart",
      text: "The way you care about people and the little things you do make you truly special.",
      gradient: "from-rose-500/20 to-purple-500/20",
    },
    {
      emoji: "😂",
      icon: Laugh,
      title: "Your Crazy Side",
      text: "Life would definitely be boring without your funny, crazy and unexpected moments.",
      gradient: "from-amber-500/20 to-pink-500/20",
    },
    {
      emoji: "🤝",
      icon: Users,
      title: "Our Friendship",
      text: "From random conversations to unforgettable memories, I'm grateful for every moment.",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      emoji: "✨",
      icon: Sparkles,
      title: "Just Being You",
      text: "Never change the beautiful, genuine and wonderful person that you are.",
      gradient: "from-yellow-500/20 to-rose-500/20",
    },
    {
      emoji: "🌸",
      icon: Flower2,
      title: "The Memories",
      text: "Every little memory we've created has become a beautiful part of our story.",
      gradient: "from-pink-500/20 to-amber-500/20",
    },
  ];

  return (
    <section className="special-things-redesign" id="special-things">
      {/* Background Image Overlay with Soft Dark Filter */}
      <div
        className="special-bg-image-overlay"
        style={{ backgroundImage: `url(${sindhuBg})` }}
      />

      <div className="special-things-container">
        {/* Header */}
        <motion.div
          className="special-things-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-pill-tag">
            <Heart size={18} className="text-pink" fill="#ff2a6d" />
            <span>A FEW THINGS I LOVE ABOUT YOU</span>
          </div>

          <h2 className="section-title-serif">What Makes You So Special, Sindhu? 💗</h2>

          <p className="special-things-description">
            There are so many things that make you special, but here are just a few of my favorites 💕
          </p>
        </motion.div>

        {/* Card Grid */}
        <div className="special-things-grid">
          {specialThings.map((thing, index) => {
            const IconComponent = thing.icon;
            return (
              <motion.article
                className="special-glass-card"
                key={thing.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="special-card-top">
                  <div className="special-emoji-badge">
                    <span>{thing.emoji}</span>
                  </div>
                  <div className="special-icn-pill">
                    <IconComponent size={18} className="text-pink" />
                  </div>
                </div>

                <h3 className="special-card-title">{thing.title}</h3>

                <p className="special-card-text">{thing.text}</p>
              </motion.article>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          className="special-things-ending"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="special-quote-line">And honestly... this list could go on forever 💗</p>

          <a href="#video-memories" className="special-things-btn">
            <span>Video Memories 🎬</span>
            <ArrowDown size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default SpecialThings;
