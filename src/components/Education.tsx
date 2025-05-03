import React from 'react';
import { data } from '@/data/portfolio-data';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const Education = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="education" className="py-20">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl font-bold mb-10">Education</h2>
        
        {!isMobile ? (
          // Desktop view - regular layout
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 lg:col-span-3 animate-fade-in">
              <div className="bg-card rounded-xl overflow-hidden card-shadow">
                <div className="aspect-square bg-[#E6F0FA] flex items-center justify-center p-6">
                  <img 
                    src={data.education.image} 
                    alt={data.education.school}
                    className="w-full h-auto"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{data.education.school}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{data.education.degree}</p>
                  <p className="text-sm mb-1">{data.education.major}</p>
                  <p className="text-sm font-medium">GPA: {data.education.gpa}</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-8 lg:col-span-9">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <h3 className="text-xl font-semibold mb-4">Relevant Coursework</h3>
                  <ul className="space-y-2">
                    {data.education.courses.map((course, index) => (
                      <li key={index} className="text-sm">
                        <a 
                          href={course.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="highlight"
                        >
                          {course.class}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-xl font-semibold mb-4">Awards & Honors</h3>
                  <ul className="space-y-2">
                    {data.education.awards.map((award, index) => (
                      <li key={index} className="text-sm">{award}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Mobile view - accordion layout
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="education-info">
              <AccordionTrigger className="py-4 text-left font-semibold">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E6F0FA] rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img 
                      src={data.education.image} 
                      alt={data.education.school}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{data.education.school}</h3>
                    <p className="text-xs text-muted-foreground">{data.education.degree}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-2 py-2">
                  <p className="text-sm mb-1">{data.education.major}</p>
                  <p className="text-sm font-medium mb-4">GPA: {data.education.gpa}</p>
                  
                  <h4 className="text-base font-semibold mb-2 mt-4">Relevant Coursework</h4>
                  <ul className="space-y-2">
                    {data.education.courses.map((course, index) => (
                      <li key={index} className="text-sm">
                        <a 
                          href={course.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="highlight"
                        >
                          {course.class}
                        </a>
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="text-base font-semibold mb-2 mt-4">Awards & Honors</h4>
                  <ul className="space-y-2">
                    {data.education.awards.map((award, index) => (
                      <li key={index} className="text-sm">{award}</li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </section>
  );
};

export default Education;
