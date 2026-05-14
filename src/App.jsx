import React, { useState } from "react";
import Navbar from "./components/sections/Navbar";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import { ContentProvider } from "./context/ContentContext";
import Separater from "./components/ui/Separater";
import ThreeScene from "./components/ui/ThreeScene";
import Loader from "./components/ui/Loader";

const App = () => {
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Default to dark

  return (
    <ContentProvider>
      <main className="w-full  bg-background flex flex-col items-center text-text gap-6 relative box-border">
        {/* Show loader only until Three.js is loaded */}
        {!threeLoaded && <Loader />}

        {/* Three.js background is always rendered */}
        <div className="fixed  h-screen w-full">
        <ThreeScene onLoaded={() => setThreeLoaded(true)} darkMode={darkMode} />

        </div>

        {/* Render rest of the app only after Three.js finishes loading */}
        {threeLoaded && (
          <>
                  <Home />
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <About />
            <Separater />
            <Projects />
            <Separater />
            <Contact />
            <Separater />
          </>
        )}
      </main>
    </ContentProvider>
  );
};

export default App;
