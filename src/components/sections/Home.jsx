import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ContentContext } from "../../context/ContentContext";
import Buttons from "../ui/Buttons";
import ThreeScene from "../ui/ThreeScene";
import GlowBackground from "../ui/GlowBackground";

const Home = () => {
  const content = useContext(ContentContext);
  const home = content.home;

  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768); // e.g., 768px for tablets and up
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!home) return <p>Loading...</p>;

  return (
    <section className="home h-screen pt-20 w-full flex flex-col lg:flex-row justify-between bg-transparent text-text max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-6 ">
      
      {/* Text content */}
      <div className="home-content flex-1 self-center lg:py-25 flex py-4 flex-col gap-6 max-w-2xl relative">
        {/* <img src="svg/Me.svg" alt="" width={100}/> */}
         
        <h1 className="font-bold text-4xl sm:text-5xl flex flex-wrap gap-2 text-text-heading">
          {`Hi, I am ${home.metadata.name}`.split(" ").map((word, i) => (
            <span
              key={i}
              className="animate-word-fade inline-block"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <span className={word === home.metadata.name ? "text-text-heading" : ""}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        <h2 className="text-4xl text-text_subheading">{home.metadata.profile}</h2>

        <div className="   bg-white/5 backdrop-blur-xl shadow-lg min-w-2xs  rounded-lg  p-4 relative">
        <ReactMarkdown>{home.body}</ReactMarkdown>
        <GlowBackground />
        </div>
        <div className="flex gap-8">

        <Buttons label="Resume" />
        <Buttons label="Contact " />
        
        </div>
      </div>

      {/* 3D Section (conditionally rendered) */}
      {isLargeScreen && (
        <section className="flex-1 flex">
          <div className="relative w-full h-full flex-none">
           <GlowBackground />
           
          </div>
        </section>
      )}
    </section>
  );
};

export default Home;
