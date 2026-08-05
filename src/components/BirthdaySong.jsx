import { useEffect, useRef, useState } from "react";
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

function BirthdaySong() {
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
        // oscillator may already be stopped
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

  const stopMelody = () => {
    stopRequestedRef.current = true;
    isPlayingRef.current = false;
    setIsPlaying(false);
    setShowNotes(false);
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
    if (stopRequestedRef.current) {
      return;
    }

    isPlayingRef.current = false;
    setIsPlaying(false);
    setShowNotes(false);
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
    if (stopRequestedRef.current) {
      return;
    }

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
    if (isPlayingRef.current) {
      return;
    }

    stopRequestedRef.current = false;

    if (audioContextRef.current) {
      stopMelody();
    }

    isPlayingRef.current = true;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

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

    await context.resume();

    const queue = buildPerformance();
    scheduleStep(context, masterGain, queue, 0);
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopMelody();
      return;
    }

    void startMelody();
  };

  return (
    <section className="birthday-song-section" id="music">
      <div className="birthday-song-heart birthday-song-heart-1">💗</div>
      <div className="birthday-song-heart birthday-song-heart-2">💗</div>
      <div className="birthday-song-heart birthday-song-heart-3">💗</div>

      <div className={`birthday-song-shell${isPlaying ? " is-playing" : ""}`}>
        <div className="birthday-song-heading">
          <span>🎵</span>

          <p>A LITTLE BIRTHDAY TUNE FOR YOU</p>

          <h2>Happy Birthday, Sindhu! 💗</h2>

          <p className="birthday-song-subtitle">
            No birthday surprise is complete without this little tune... ✨
          </p>
        </div>

        <div
          className={`birthday-song-player${isPlaying ? " is-playing" : ""}`}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(18, 4, 12, 0.12) 0%, rgba(18, 4, 12, 0.62) 100%), url(${sindhuMusicPhoto})`,
            backgroundPosition: "center 18%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {showNotes && (
            <>
              <span className="music-note note-1">♪</span>
              <span className="music-note note-2">♫</span>
              <span className="music-note note-3">♬</span>
            </>
          )}

          <div className="birthday-song-icon">🎶</div>

          <h3>For The Birthday Girl</h3>

          <p>Press play for a little birthday melody 💕</p>

          <button type="button" className="birthday-song-button" onClick={handleToggle}>
            {isPlaying ? "■ Stop Melody" : "▶ Play Birthday Melody"}
          </button>
        </div>

        <div className="birthday-song-message">
          <p>
            A tiny birthday tune for someone
            <br />
            who deserves a whole lot of happiness. 💗
          </p>

          <p>
            May this year bring you beautiful memories,
            <br />
            big smiles and everything you’ve been wishing for. ✨
          </p>
        </div>

        <a href="#final-surprise" className="birthday-song-next-btn">
          One Last Surprise 🎁 ↓
        </a>
      </div>
    </section>
  );
}

export default BirthdaySong;