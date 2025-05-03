
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { data } from '@/data/portfolio-data';

type NavItemProps = {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
};

const NavItem = ({ href, children, onClick }: NavItemProps) => (
  <li>
    <a 
      href={href} 
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        onClick();
      }}
      className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors duration-200 relative highlight"
    >
      {children}
    </a>
  </li>
);

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8 ${
        isScrolled 
          ? 'py-4 bg-background/80 backdrop-blur-md shadow-sm' 
          : 'py-6'
      }`}
    >
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <a 
          href="#home" 
          className="text-xl font-bold tracking-tight"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          sam.
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-1">
            <NavItem href="#projects" onClick={closeMobileMenu}>Projects</NavItem>
            <NavItem href="#experience" onClick={closeMobileMenu}>Experience</NavItem>
            <NavItem href="#education" onClick={closeMobileMenu}>Education</NavItem>
            
            <li className="flex items-center space-x-3 ml-2">
              {/* GitHub link removed from here */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-accent transition-colors duration-200"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          {/* GitHub link removed from here too */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors duration-200"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-end justify-center gap-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 translate-y-2' : 'w-6'}`}></span>
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-6 rotate-45 -translate-y-2' : 'w-5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg md:hidden animate-fade-in">
            <nav className="container py-5">
              <ul className="flex flex-col space-y-4">
                <NavItem href="#projects" onClick={closeMobileMenu}>Projects</NavItem>
                <NavItem href="#experience" onClick={closeMobileMenu}>Experience</NavItem>
                <NavItem href="#education" onClick={closeMobileMenu}>Education</NavItem>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
