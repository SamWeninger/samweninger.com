
import React from 'react';

interface Project {
  img: string;
  color: string;
  project: {
    title: string;
    link: string;
  };
  github: string;
  timeline: string;
  description: string;
  skills: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const isEven = index % 2 === 0;
  
  return (
    <div 
      className="group rounded-xl overflow-hidden card-shadow bg-card hover:shadow-lg transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={project.img} 
          alt={project.project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundColor: project.color }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold">
            {project.project.link ? (
              <a 
                href={project.project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="highlight"
              >
                {project.project.title}
              </a>
            ) : (
              project.project.title
            )}
          </h3>
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View code on GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          )}
        </div>
        
        {project.timeline && (
          <div className="text-sm text-muted-foreground mb-3">{project.timeline}</div>
        )}
        
        <p className="text-sm mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.skills.split(', ').map((skill, i) => (
            <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
