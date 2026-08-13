import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles } from "lucide-react";

export default function LightboxModal({ item, onClose }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="lightbox-content"
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="lightbox-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>

          <div className="lightbox-media-wrapper">
            {item.type === "video" ? (
              <video
                src={item.src}
                controls
                autoPlay
                className="lightbox-video"
                playsInline
              />
            ) : (
              <img src={item.src} alt={item.caption || "Sindhu Memory"} className="lightbox-image" />
            )}
          </div>

          <div className="lightbox-footer">
            <div className="lightbox-badge">
              <Sparkles size={16} className="text-pink" />
              <span>Sindhu's Special Memory</span>
            </div>
            {item.caption && <h3 className="lightbox-caption">{item.caption}</h3>}
            <div className="lightbox-heart-icn">
              <Heart size={20} fill="#ff2a6d" color="#ff2a6d" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
