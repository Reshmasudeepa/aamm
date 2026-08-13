import { useState } from "react";
import "./App.css";

import BackgroundParticles from "./components/BackgroundParticles";
import LightboxModal from "./components/LightboxModal";
import Navbar from "./components/Navbar";
import SurpriseScreen from "./components/SurpriseScreen";
import BirthdayHero from "./components/BirthdayHero";
import Message from "./components/Message";
import Memories from "./components/Memories";
import SpecialThings from "./components/SpecialThings";
import Music from "./components/Music";
import BirthdaySong from "./components/BirthdaySong";
import FinalSurprise from "./components/FinalSurprise";

function App() {
  const [surpriseOpened, setSurpriseOpened] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);

  const handleOpenLightbox = (item) => {
    setLightboxItem(item);
  };

  const handleCloseLightbox = () => {
    setLightboxItem(null);
  };

  const handleToggleAudio = (state) => {
    if (typeof state === "boolean") {
      setIsAudioPlaying(state);
    } else {
      setIsAudioPlaying((prev) => !prev);
    }
  };

  return (
    <div className="birthday-app-root">
      {/* Global Ambient Background Particles */}
      <BackgroundParticles />

      {!surpriseOpened ? (
        <SurpriseScreen onOpen={() => setSurpriseOpened(true)} />
      ) : (
        <>
          {/* Top Sticky Navigation Bar */}
          <Navbar
            isAudioPlaying={isAudioPlaying}
            onToggleAudio={() => handleToggleAudio()}
          />

          <main className="birthday-site-main">
            <BirthdayHero />

            <Message onOpenLightbox={handleOpenLightbox} />

            <Memories onOpenLightbox={handleOpenLightbox} />

            <SpecialThings />

            <Music onOpenLightbox={handleOpenLightbox} />

            <BirthdaySong
              externalIsPlaying={isAudioPlaying}
              externalOnToggle={handleToggleAudio}
            />

            <FinalSurprise />
          </main>
        </>
      )}

      {/* Global Fullscreen Lightbox Modal */}
      <LightboxModal item={lightboxItem} onClose={handleCloseLightbox} />
    </div>
  );
}

export default App;