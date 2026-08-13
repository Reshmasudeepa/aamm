import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, Play, Square, Sparkles, Heart, Volume2, ArrowDown } from "lucide-react";
import sindhuMusicPhoto from "../assets/sindhu-music.jpg";

const baseMelody = [
  { frequency: 392, duration: 0.34 },
  { frequency: 392, duration: 0.24 },
  { frequency: 440, duration: 0.52 },
  { frequency: 392, duration: 0.52 },
  { frequency: 523.25, duration: 0.52 },
  { frequency: 493.88, duration: 0.8 },
  { frequency: 392, duration: 0.34 },
  { frequency: 392, duration: 0.24 },
  { frequency: 440, duration: 0.52 },
  { frequency: 392, duration: 0.52 },
  { frequency: 587.33, duration: 0.52 },
  { frequency: 523.25, duration: 0.8 },
  { frequency: 392, duration: 0.34 },
  { frequency: 392, duration: 0.24 },
  { frequency: 784, duration: 0.52 },
  { frequency: 659.25, duration: 0.52 },
  { frequency: 523.25, duration: 0.52 },
  { frequency: 493.88, duration: 0.52 },
  { frequency: 440, duration: 0.82 },
  { frequency: 698.46, duration: 0.34 },
  { frequency: 698.46, duration: 0.24 },
  { frequency: 659.25, duration: 0.52 },
  { frequency: 523.25, duration: 0.52 },
  { frequency: 587.33, duration: 0.52 },
  { frequency: 523.25, duration: 0.92 },
];

const performancePlan = [
  { transpose: 0, tempo: 1.6, wave: "triangle", restAfterMs: 3500 },
  { transpose: 12, tempo: 1.4, wave: "sine", restAfterMs: 4500 },
  { transpose: -12, tempo: 1.5, wave: "triangle", restAfterMs: 5000 },
  { transpose: 0, tempo: 1.75, wave: "sine", restAfterMs: 2500 },
];

function BirthdaySong({ externalIsPlaying, externalOnToggle }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const audioContextRef = useRef(null);
  const masterGainRef = useRef(null);
  const filterRef = useRef(null);
  const currentOscillatorRef = useRef(null);
  const activeTimeoutRef = useRef(null);
  const stopRequestedRef = useRef(false);
  const isPlayingRef = useRef(false);

  const cleanupAudio = () => {
    if (activeTimeoutRef.current) {
      clearTimeout(activeTimeoutRef.current);
      activeTimeoutRef.current = null;
    }

    if (currentOscillatorRef.current) {
      try {
        currentOscillatorRef.current.stop();
      } catch {
        // ignore if already stopped
      }
      currentOscillatorRef.current.disconnect();
      currentOscillatorRef.current = null;
    }

    if (filterRef.current) {
      filterRef.current.disconnect();
      filterRef.current = null;
    }

    if (masterGainRef.current) {
      masterGainRef.current.disconnect();
      masterGainRef.current = null;
    }

    if (audioContextRef.current) {
      const context = audioContextRef.current;
      audioContextRef.current = null;
      if (context.state !== "closed") {
        void context.close();
      }
    }
  };

  useEffect(() => {
    return () => {
      stopRequestedRef.current = true;
      isPlayingRef.current = false;
      cleanupAudio();
    };
  }, []);

  // Sync external state from navbar toggle if needed
  useEffect(() => {
    if (externalIsPlaying !== undefined && externalIsPlaying !== isPlaying) {
      if (externalIsPlaying) {
        void startMelody();
      } else {
        stopMelody();
      }
    }
  }, [externalIsPlaying]);

  const stopMelody = () => {
    stopRequestedRef.current = true;
    isPlayingRef.current = false;
    setIsPlaying(false);
    setShowNotes(false);
    if (externalOnToggle && externalIsPlaying) {
      externalOnToggle(false);
    }
    cleanupAudio();
  };

  const playTone = (context, gainNode, frequency, duration, waveType) => {
    const oscillator = context.createOscillator();
    const noteGain = context.createGain();

    oscillator.type = waveType;
    oscillator.frequency.value = frequency;

    noteGain.gain.setValueAtTime(0.0001, context.currentTime);
    noteGain.gain.exponentialRampToValueAtTime(0.045, context.currentTime + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(
      0.022,
      context.currentTime + Math.max(duration - 0.08, 0.1),
    );
    noteGain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);

    oscillator.connect(noteGain);
    noteGain.connect(gainNode);

    oscillator.start();
    oscillator.stop(context.currentTime + duration + 0.02);

    currentOscillatorRef.current = oscillator;

    oscillator.onended = () => {
      if (currentOscillatorRef.current === oscillator) {
        currentOscillatorRef.current = null;
      }
      noteGain.disconnect();
      oscillator.disconnect();
    };
  };

  const finishMelody = () => {
    if (stopRequestedRef.current) return;
    isPlayingRef.current = false;
    setIsPlaying(false);
    setShowNotes(false);
    if (externalOnToggle) externalOnToggle(false);
    cleanupAudio();
  };

  const buildPerformance = () =>
    performancePlan.flatMap((section) => {
      const notes = baseMelody.map((note) => ({
        kind: "note",
        frequency: note.frequency * 2 ** (section.transpose / 12),
        duration: note.duration * section.tempo,
        wave: section.wave,
      }));

      if (section.restAfterMs > 0) {
        notes.push({
          kind: "rest",
          duration: section.restAfterMs / 1000,
        });
      }

      return notes;
    });

  const scheduleStep = (context, gainNode, queue, index) => {
    if (stopRequestedRef.current) return;

    if (index >= queue.length) {
      finishMelody();
      return;
    }

    const item = queue[index];

    if (item.kind === "note") {
      playTone(context, gainNode, item.frequency, item.duration, item.wave);
    }

    activeTimeoutRef.current = window.setTimeout(() => {
      scheduleStep(context, gainNode, queue, index + 1);
    }, item.duration * 1000);
  };

  const startMelody = async () => {
    if (isPlayingRef.current) return;

    stopRequestedRef.current = false;

    if (audioContextRef.current) {
      stopMelody();
    }

    isPlayingRef.current = true;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const masterGain = context.createGain();
    const filter = context.createBiquadFilter();

    masterGain.gain.value = 0.18;
    filter.type = "lowpass";
    filter.frequency.value = 1800;
    filter.Q.value = 0.75;

    masterGain.connect(filter);
    filter.connect(context.destination);

    audioContextRef.current = context;
    masterGainRef.current = masterGain;
    filterRef.current = filter;

    setIsPlaying(true);
    setShowNotes(true);
    if (externalOnToggle && !externalIsPlaying) {
      externalOnToggle(true);
    }

    await context.resume();
    const queue = buildPerformance();
    scheduleStep(context, masterGain, queue, 0);
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopMelody();
    } else {
      void startMelody();
    }
  };

  return (
    <section className="birthday-song-section-redesign" id="music">
      <div className="song-glow-orb" />

      <div className="birthday-song-shell-container">
        {/* Section Heading */}
        <motion.div
          className="birthday-song-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-pill-tag">
            <Music size={18} className="text-pink" />
            <span>A LITTLE BIRTHDAY TUNE FOR YOU</span>
          </div>

          <h2 className="section-title-serif">Happy Birthday, Sindhu! 💗</h2>

          <p className="birthday-song-subtitle">
            No birthday surprise is complete without this special tune playing in your honor ✨
          </p>
        </motion.div>

        {/* Player Card */}
        <motion.div
          className={`birthday-song-player-card ${isPlaying ? "is-playing" : ""}`}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(13, 3, 11, 0.45) 0%, rgba(13, 3, 11, 0.85) 100%), url(${sindhuMusicPhoto})`,
            backgroundPosition: "center 22%",
            backgroundSize: "cover",
          }}
        >
          {/* Animated Music Notes Overlay */}
          {showNotes && (
            <div className="music-floating-notes-layer" aria-hidden="true">
              <motion.span
                className="floating-note note-1"
                animate={{ y: [-10, -50], opacity: [0, 1, 0], x: [-10, 15] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                ♪
              </motion.span>
              <motion.span
                className="floating-note note-2"
                animate={{ y: [-10, -60], opacity: [0, 1, 0], x: [10, -20] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
              >
                ♫
              </motion.span>
              <motion.span
                className="floating-note note-3"
                animate={{ y: [-10, -55], opacity: [0, 1, 0], x: [-5, 10] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 1.2 }}
              >
                ♬
              </motion.span>
            </div>
          )}

          {/* Equalizer Visualizer Bars */}
          <div className="equalizer-bars-container">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                className={`equalizer-bar bar-${i}`}
                animate={{
                  height: isPlaying ? ["12px", `${Math.random() * 32 + 16}px`, "12px"] : "8px",
                }}
                transition={{
                  duration: 0.4 + (i % 3) * 0.15,
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="player-badge-status">
            <Volume2 size={16} className="text-pink" />
            <span>{isPlaying ? "Playing Birthday Melody ♪" : "Press Play Below"}</span>
          </div>

          <h3 className="player-title">For The Birthday Girl 💗</h3>

          <p className="player-hint">Enjoy a soft, sweet birthday melody crafted for your special day 💕</p>

          {/* Play/Stop Button */}
          <button type="button" className="song-play-main-btn" onClick={handleToggle}>
            {isPlaying ? (
              <>
                <Square size={18} fill="#fff" />
                <span>Stop Melody</span>
              </>
            ) : (
              <>
                <Play size={18} fill="#fff" />
                <span>Play Birthday Melody</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Message Below Player */}
        <motion.div
          className="birthday-song-message-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Sparkles size={20} className="text-gold mb-1" />
          <p>
            A tiny birthday tune for someone who deserves a whole lot of happiness. 💗
          </p>
          <p className="message-subtext">
            May this year bring you beautiful memories, big smiles and everything you’ve been wishing for. ✨
          </p>

          <a href="#final-surprise" className="song-next-btn-pill">
            <span>One Last Surprise 🎁</span>
            <ArrowDown size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default BirthdaySong;