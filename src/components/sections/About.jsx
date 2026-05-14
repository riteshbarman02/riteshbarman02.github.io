import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { ContentContext } from "../../context/ContentContext";
import GlowBackground from "../ui/GlowBackground";

const About = () => {
  const { about } = useContext(ContentContext);

  if (!about) return <p>Loading...</p>;

  const { metadata, body } = about;
  const skills = metadata?.skills || [];

  return (
    <div className='home w-full flex flex-col justify-between bg-transparent text-text max-w-7xl mx-auto px-2 sm:px-6 gap-8 lg:py-8'>
      <h2 className='text-3xl animate-word-fade font-medium text-text-heading mb-8'>
        About
      </h2>

      <div className='flex flex-col lg:flex-row justify-between items-center gap-8'>
        {/* Profile Image with Glow */}
        <div className="relative">
          <GlowBackground />
          <img
            className="rounded-full aspect-square"
            src="svg/Me.svg"
            alt="Ritesh"
            width="150px"
          />
        </div>

        {/* About Description + Skills */}
        <div className="flex-1 flex flex-col gap-6">
          <ReactMarkdown>{body}</ReactMarkdown>

          {skills.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-text-heading mb-3">Skills</h3>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <li
                    key={idx}
                    className="bg-muted border border-border text-sm font-medium text-text px-3 py-1 rounded-full"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
