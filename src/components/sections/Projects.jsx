import React, { useContext } from 'react';
import { ContentContext } from '../../context/ContentContext';
import ProjectCard from '../ui/ProjectCards';

const ProjectList = () => {
  const { projects } = useContext(ContentContext);

  if (!projects || projects.length === 0) {
    return <p>Loading projects...</p>;
  }

  return (
    <div className='home w-full flex flex-col justify-between bg-background text-text max-w-7xl  px-2 sm:px-6  px:2  gap-8 lg:py-8'>
      <h2 className='text-3xl animate-word-fade font-medium text-text-heading '>Project</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <div key={index} className="col-span-1">
          <ProjectCard {...project} />
        </div>
      ))}
      </div>
    </div>
  );
};

export default ProjectList;
