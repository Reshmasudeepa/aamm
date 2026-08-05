import { useState } from "react";
import "./App.css";

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

  return (
    <>
      {!surpriseOpened ? (
        <SurpriseScreen
          onOpen={() => setSurpriseOpened(true)}
        />
      ) : (
        <main className="birthday-site">
          <BirthdayHero />

          <Message />

          <Memories />

          <SpecialThings />

          <Music />

          <BirthdaySong />

          <FinalSurprise />
        </main>
      )}
    </>
  );
}

export default App;