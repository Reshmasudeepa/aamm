import { motion } from "framer-motion";
import { Film, Play, Maximize2, ArrowDown, Sparkles } from "lucide-react";
import video1 from "../assets/videos sindhu/WhatsApp Video 2026-08-05 at 11.49.21 AM.mp4";
import video2 from "../assets/videos sindhu/WhatsApp Video 2026-08-05 at 11.49.20 AM.mp4";
import video3 from "../assets/videos sindhu/WhatsApp Video 2026-08-05 at 11.49.20 AM (1).mp4";
import video4 from "../assets/videos sindhu/WhatsApp Video 2026-08-05 at 11.49.17 AM.mp4";
import video5 from "../assets/videos sindhu/WhatsApp Video 2026-08-05 at 11.49.15 AM.mp4";
import video6 from "../assets/videos sindhu/WhatsApp Video 2026-08-05 at 11.49.09 AM.mp4";

const videoList = [
  { src: video1, label: "The Smile That Says Everything 😂💗" },
  { src: video2, label: "Just Another Beautiful Moment ✨" },
  { src: video3, label: "Pretty You, Happy You 💕" },
  { src: video4, label: "Your Cute & Crazy Side 🎀" },
  { src: video5, label: "This Smile Never Gets Old 😂💗" },
  { src: video6, label: "A Little Moment Worth Keeping 🦋" },
];

function Music({ onOpenLightbox }) {
  const handleOpenVideo = (video) => {
    if (onOpenLightbox) {
      onOpenLightbox({
        type: "video",
        src: video.src,
        caption: video.label,
      });
    }
  };

  return (
    <section className="video-memories-redesign" id="video-memories">
      <div className="video-glow-orb" />

      <div className="video-section-container">
        {/* Header */}
        <motion.div
          className="video-section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-pill-tag">
            <Film size={18} className="text-pink" />
            <span>THE MEMORIES IN MOTION</span>
          </div>

          <h2 className="section-title-serif">Video Memories Cinema 🎬</h2>

          <p className="video-section-description">
            Videos that capture your laughter, your joy, and your sweet personality in real time.
            Tap any video to play or expand full screen 💗
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="video-cinema-grid">
          {videoList.map((video, index) => (
            <motion.article
              className="video-cinema-card"
              key={video.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="video-frame-shell">
                <video
                  src={video.src}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="video-player-element"
                />
                
                <button
                  type="button"
                  className="video-expand-overlay-btn"
                  onClick={() => handleOpenVideo(video)}
                  title="Watch fullscreen"
                >
                  <Maximize2 size={18} />
                  <span>Fullscreen</span>
                </button>
              </div>

              <div className="video-card-caption">
                <Sparkles size={14} className="text-pink" />
                <p>{video.label}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer Jump */}
        <motion.div
          className="video-ending-banner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p>Ready for the Birthday Song? 🎵</p>

          <a href="#music" className="video-surprise-btn">
            <span>Play Birthday Melody 🎵</span>
            <ArrowDown size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Music;
