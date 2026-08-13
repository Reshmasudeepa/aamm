import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Music, Play, Pause, Heart, Menu, X, Sparkles } from "lucide-react";

export default function Navbar({ isAudioPlaying, onToggleAudio }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Note 💌", href: "#message" },
    { name: "Memories 📸", href: "#memories" },
    { name: "Videos 🎬", href: "#video-memories" },
    { name: "Melody 🎵", href: "#music" },
    { name: "Finale 🎁", href: "#final-surprise" },
  ];

  return (
    <header className={`navbar-header ${scrolled ? "is-scrolled" : ""}`}>
      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#hero" className="navbar-brand">
          <div className="brand-icon-wrap">
            <Heart size={18} fill="#ff2a6d" color="#ff2a6d" className="brand-heart" />
          </div>
          <span className="brand-title">Sindhu's Day ✨</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links-desktop">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link-item">
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Widgets */}
        <div className="navbar-actions">
          {/* Quick Music Toggle */}
          <button
            type="button"
            className={`nav-music-widget ${isAudioPlaying ? "is-playing" : ""}`}
            onClick={onToggleAudio}
            title={isAudioPlaying ? "Pause Birthday Tune" : "Play Birthday Tune"}
          >
            <div className="music-icn-glow">
              <Music size={16} />
            </div>
            <span className="music-widget-text">
              {isAudioPlaying ? "Playing Tune..." : "Play Music"}
            </span>
            <div className="music-play-btn-round">
              {isAudioPlaying ? <Pause size={12} fill="#fff" /> : <Play size={12} fill="#fff" />}
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="mobile-drawer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="mobile-drawer-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles size={14} className="text-pink" />
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
