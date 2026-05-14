"use client";

import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./components/sections/Navbar";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import { ContentProvider } from "./context/ContentContext";
import ThreeScene from "./components/ui/ThreeScene";
import Loader from "./components/ui/Loader";

const App = () => {
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Default to dark
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(1);

  const sections = useMemo(
    () => [
      { key: "home", node: <Home /> },
      { key: "about", node: <About /> },
      { key: "projects", node: <Projects /> },
      { key: "contact", node: <Contact /> },
    ],
    []
  );

  useEffect(() => {
    const updateScrollState = () => {
      setScrollY(window.scrollY || 0);
      setViewportHeight(window.innerHeight || 1);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollProgress = scrollY / viewportHeight;
  const activeSectionIndex = Math.min(
    sections.length - 1,
    Math.max(0, Math.round(scrollProgress))
  );

  const getLayerStyle = (index) => {
    const offset = scrollProgress - index;
    const distance = Math.abs(offset);
    const clampedDistance = Math.min(distance, 1.5);
    const z = -clampedDistance * 900;
    const y = -offset * 48;
    const scale = 1 - Math.min(clampedDistance * 0.1, 0.25);
    const opacity = Math.max(0, 1 - clampedDistance * 1.3);
    const blur = Math.min(clampedDistance * 3, 6);

    return {
      transform: `translate3d(0, ${y}px, ${z}px) scale(${scale})`,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex: Math.max(1, 100 - Math.round(clampedDistance * 50)),
      pointerEvents: index === activeSectionIndex ? "auto" : "none",
    };
  };

  return (
    <ContentProvider>
      <main className="depth-scroll-root w-full bg-background text-text relative box-border">
        {/* Show loader only until Three.js is loaded */}
        {!threeLoaded && <Loader />}

        {/* Three.js background is always rendered */}
        <div className="fixed inset-0">
          <ThreeScene onLoaded={() => setThreeLoaded(true)} darkMode={darkMode} />
        </div>

        {/* Render depth-scroll app only after Three.js finishes loading */}
        {threeLoaded && (
          <>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

            <div className="depth-scroll-stage">
              {sections.map((section, index) => (
                <section
                  key={section.key}
                  className="depth-scroll-layer"
                  style={getLayerStyle(index)}
                >
                  <div className="depth-scroll-content">{section.node}</div>
                </section>
              ))}
            </div>

            <div
              className="depth-scroll-spacer"
              style={{ height: `${sections.length * 100}vh` }}
              aria-hidden="true"
            />
          </>
        )}
      </main>
    </ContentProvider>
  );
};

export default App;
