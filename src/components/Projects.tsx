
import React from 'react';
import { data } from '@/data/portfolio-data';
import ProjectCard from './ProjectCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const Projects = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="projects" className="py-20">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl font-bold mb-10">Projects</h2>
        
        {!isMobile ? (
          // Desktop view - grid layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.items.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        ) : (
          // Mobile view - accordion layout
          <Accordion type="single" collapsible className="w-full">
            {data.projects.items.map((project, index) => (
              <AccordionItem key={index} value={`project-${index}`}>
                <AccordionTrigger className="py-4 text-left">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0"
                      style={{ backgroundColor: project.color }}
                    >
                      <img 
                        src={project.img} 
                        alt={project.project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-base">{project.project.title}</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-2 py-2">
                    {project.timeline && (
                      <div className="text-sm text-muted-foreground mb-3">{project.timeline}</div>
                    )}
                    
                    <p className="text-sm mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.skills.split(', ').map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 mt-4">
                      {project.project.link && (
                        <a 
                          href={project.project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary font-medium"
                        >
                          Visit Project
                        </a>
                      )}
                      
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary font-medium flex items-center gap-1"
                        >
                          <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                          </svg>
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
};

export default Projects;
