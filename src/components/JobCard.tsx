
import React from 'react';

interface Job {
  img: string;
  color: string;
  company: string;
  role: string;
  location: string;
  timeline: string;
  description: string;
}

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard = ({ job, index }: JobCardProps) => {
  return (
    <div 
      className="flex flex-col md:flex-row gap-6 py-8 border-b border-border last:border-0 animate-slide-up"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="w-16 h-16 bg-card rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img 
          src={job.img} 
          alt={job.company}
          className="w-12 h-12 object-contain"
          style={{ backgroundColor: job.color }}
        />
      </div>
      
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
          <h3 className="text-xl font-semibold">{job.company}</h3>
          <p className="text-sm text-muted-foreground md:text-right">{job.timeline}</p>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
          <p className="font-medium">{job.role}</p>
          <span className="hidden md:inline text-muted-foreground">•</span>
          <p className="text-sm text-muted-foreground">{job.location}</p>
        </div>
        
        <p className="text-sm whitespace-pre-line">{job.description}</p>
      </div>
    </div>
  );
};

export default JobCard;
