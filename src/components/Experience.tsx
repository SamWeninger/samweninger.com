
import React from 'react';
import { data } from '@/data/portfolio-data';
import JobCard from './JobCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const Experience = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="experience" className="py-20 bg-secondary/30">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl font-bold mb-10">Work Experience</h2>
        
        {!isMobile ? (
          // Desktop view - normal layout
          <div className="bg-background rounded-xl p-6 md:p-8 card-shadow">
            {data.work.jobs.map((job, index) => (
              <JobCard key={index} job={job} index={index} />
            ))}
          </div>
        ) : (
          // Mobile view - accordion layout
          <Accordion type="single" collapsible className="w-full bg-background rounded-xl p-4 card-shadow">
            {data.work.jobs.map((job, index) => (
              <AccordionItem key={index} value={`job-${index}`} className="border-b border-border last:border-0">
                <AccordionTrigger className="py-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img 
                        src={job.img} 
                        alt={job.company}
                        className="w-8 h-8 object-contain"
                        style={{ backgroundColor: job.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">{job.company}</h3>
                      <p className="text-xs text-muted-foreground">{job.role}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-2 py-2">
                    <div className="flex flex-col gap-2 mb-4">
                      <p className="text-sm text-muted-foreground">{job.timeline}</p>
                      <p className="text-sm text-muted-foreground">{job.location}</p>
                    </div>
                    
                    <p className="text-sm whitespace-pre-line">{job.description}</p>
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

export default Experience;
