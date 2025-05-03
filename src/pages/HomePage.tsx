
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Footer from '@/components/Footer';
import { ArrowUp } from 'lucide-react';

const HomePage = () => {
  // Set up scroll restoration
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Back to top button visibility
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full">
        <Hero />
        <Projects />
        <Experience />
        <div className="bg-[#f1f1f1] dark:bg-slate-800/20"> {/* Eggshell/off-white background for UofT section */}
          <Education />
        </div>
        
        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
