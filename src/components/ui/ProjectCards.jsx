import { Link } from 'lucide-react';
import React from 'react';
import GlowBackground from './GlowBackground';

const ProjectCard = ({ title, date, tech, thumbnail, body ,link, description}) => {
  // Convert date object to a string using toLocaleDateString
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    // <div className=" bg-white/5 backdrop-blur-xl shadow-lg min-w-2xs  rounded-lg border-1 overflow-hidden p-4 hover:bg-secondary/10 transition duration-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]">
   <div className=" display flex relative">
      <GlowBackground/>

       <div className=" bg-white/5 backdrop-blur-xl shadow-lg min-w-2xs  rounded-lg  overflow-hidden p-4 hover:bg-secondary/10 transition duration-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]">
      <img src={thumbnail} alt={title} className="w-full aspect-[5/2] object-cover" />
      <div className="">
        <div className="flex flex-col gap-8">
        <h3 className="text-xl font-semibold text-text"><a href={link}>{title}</a></h3>
        <p className="text-sm text-text mt-2  w-full bg-white/5 backdrop-blur-xl shadow-lg min-w-2xs  rounded-lg   overflow-hidden p-4 hover:bg-secondary/10 transition duration-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]">{description}</p>
     </div>
       
      </div>
    </div>

   </div>
  );
};

export default ProjectCard;
