import React, { useState, useEffect } from 'react';
import { data } from '@/data/portfolio-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const totalImages = data.home.pics.length;
  const [activeIndices, setActiveIndices] = useState([0, 1, 2].map(i => i % totalImages));
  const [isAnimating, setIsAnimating] = useState(false);

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setActiveIndices(prev => {
      return prev.map(idx => (idx + 1) % totalImages);
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setActiveIndices(prev => {
      return prev.map(idx => (idx - 1 + totalImages) % totalImages);
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-20 pb-16">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="block mb-2">{data.home.fName}</span>
              <span className="block">{data.home.lName}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">{data.home.description}</p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover-scale inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg transition-colors"
              >
                View Projects
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              
              <a 
                href={data.footer.github}
                target="_blank"
                rel="noopener noreferrer" 
                className="hover-scale inline-flex items-center gap-2 px-6 py-3 border border-primary bg-transparent text-foreground font-medium rounded-lg transition-colors hover:bg-primary/5"
              >
                GitHub
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-5 flex justify-center md:justify-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col items-center w-full max-w-lg lg:max-w-2xl xl:max-w-3xl">
              <div className="relative w-full h-[60vw] max-h-[32rem] aspect-square cursor-pointer">
                <div className="photo-collage-container relative w-full h-full">
                  {/* Photo collage with 3 overlapping images */}
                  {activeIndices.map((imgIndex, idx) => (
                    <div 
                      key={`${imgIndex}-${idx}`} 
                      className="absolute rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ease-in-out card-shadow"
                      style={{ 
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        zIndex: 10 - idx,
                        opacity: 1,
                        transform: `translate(${idx * 2}vw, ${idx * 2}vw) scale(${1 - idx * 0.05}) rotate(${idx === 0 ? '-3deg' : idx === 1 ? '0deg' : '3deg'})`,
                      }}
                    >
                      <img 
                        src={data.home.pics[imgIndex].img} 
                        alt={data.home.pics[imgIndex].text} 
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-center">
                        {data.home.pics[imgIndex].text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-6 z-20">
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="bg-background/70 backdrop-blur-sm hover:bg-background p-2 rounded-full shadow-md text-foreground transition-colors"
                  aria-label="Previous image"
                  disabled={isAnimating}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="bg-background/70 backdrop-blur-sm hover:bg-background p-2 rounded-full shadow-md text-foreground transition-colors"
                  aria-label="Next image"
                  disabled={isAnimating}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
