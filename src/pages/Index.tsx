import { data } from "@/data/content";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect, useContext, createContext } from "react";
import { ArrowRight, ExternalLink, Github, Linkedin, Mail, MapPin, Clock, Trophy, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

declare global {
  interface Window {
    goatcounter?: {
      count: (opts: { path: string; title: string; event: boolean }) => void;
      get_query: (path: string, callback: (data: any) => void) => void;
    };
  }
}

// Context for managing which collapsible is open
type CollapsibleContextType = {
  openId: string | null;
  setOpenId: (id: string | null) => void;
};

const CollapsibleContext = createContext<CollapsibleContextType>({
  openId: null,
  setOpenId: () => {},
});

// Mobile collapsible component
const MobileCollapsible = ({ 
  id,
  title, 
  subtitle, 
  timeline, 
  location, 
  children, 
  defaultOpen = false 
}: { 
  id: string;
  title: string; 
  subtitle?: string; 
  timeline?: string; 
  location?: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
}) => {
  const { openId, setOpenId } = useContext(CollapsibleContext);
  const isOpen = openId === id;
  const isMobile = useIsMobile();

  useEffect(() => {
    if (defaultOpen && !isMobile) {
      setOpenId(id);
    }
  }, [defaultOpen, isMobile, id, setOpenId]);

  const toggleOpen = () => {
    if (isOpen) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  if (!isMobile) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-start gap-2 mb-4">
          <div>
            <h3 className="font-bold text-xl">{title}</h3>
            {subtitle && <p className="text-gray-600 font-medium">{subtitle}</p>}
          </div>
          {(timeline || location) && (
            <div className="text-right text-sm text-gray-500 flex-shrink-0">
              {timeline && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{timeline}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          )}
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="w-full">
      <button 
        onClick={toggleOpen} 
        className="w-full flex justify-between items-start gap-2 py-3"
      >
        <div className="text-left">
          <h3 className="font-bold text-lg">{title}</h3>
          {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
        </div>
        <div className="flex items-center">
          {timeline && (
            <div className="text-xs text-gray-500 mr-2">{timeline}</div>
          )}
          {isOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Index = () => {
  const [activeImage, setActiveImage] = useState(0);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pageViews, setPageViews] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const [openCollapsibleId, setOpenCollapsibleId] = useState<string | null>(null);

  useEffect(() => {
    // Wait for GoatCounter to load
    const checkGoatCounter = setInterval(() => {
      if (window.goatcounter?.get_query) {
        clearInterval(checkGoatCounter);
        
        // Get total page views using GoatCounter's JavaScript API
        window.goatcounter.get_query('count', (data: any) => {
          const total = data.count.reduce((sum: number, item: any) => sum + item.count, 0);
          setPageViews(total);
        });
      }
    }, 1000);

    // Cleanup interval
    return () => clearInterval(checkGoatCounter);
  }, []);

  scrollY.onChange((latest) => {
    setVisible(latest > 100);
  });

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = "sweninger99" + "@" + "gmail.com";
    window.location.href = `mailto:${email}?subject=Hello from your website`;
  };

  const getIconForPlatform = (platform: string) => {
    switch (platform) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'hockey':
        return <Trophy className="w-5 h-5" />;
      case 'message':
        return <Mail className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const menuItems = [
    { title: "Home", id: "home" },
    { title: "Work", id: "work" },
    { title: "Projects", id: "projects" },
    { title: "Education", id: "education" },
  ];

  return (
    <CollapsibleContext.Provider value={{ openId: openCollapsibleId, setOpenId: setOpenCollapsibleId }}>
      <div className="min-h-screen bg-white text-black flex flex-col">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: visible ? 0 : -100 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="font-bold text-lg">SW</div>
              
              {isMobile ? (
                <div className="block">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2"
                  >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-8">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-black hover:text-gray-600 transition-colors duration-200 text-sm font-medium"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-white z-40 pt-20 px-6"
            >
              <div className="flex flex-col space-y-6 pt-6">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-black text-2xl font-medium border-b border-gray-100 pb-4"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto flex-grow px-4">
          <motion.div
            id="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between py-24 md:py-32 gap-10"
          >
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                Hello! I'm {data.home.fName} {data.home.lName}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {data.home.description}
              </p>
              {pageViews !== null && (
                <p className="text-sm text-gray-400 mb-6">
                  👀 {pageViews} page views
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                {Object.entries(data.footer).map(([platform, link]) => (
                  <a
                    key={platform}
                    href={platform === 'message' ? '#' : link}
                    onClick={platform === 'message' ? handleMessageClick : undefined}
                    target={platform === 'message' ? undefined : "_blank"}
                    rel={platform === 'message' ? undefined : "noopener noreferrer"}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    {getIconForPlatform(platform)}
                    <span className="capitalize">{platform}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {data.home.pics.map((pic, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="relative overflow-hidden rounded-lg aspect-square shadow-card"
                >
                  <img
                    src={pic.img}
                    alt={pic.text}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-xs">{pic.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-24">
            <section id="work" className="py-10">
              <h2 className="section-title text-2xl md:text-3xl">Work Experience</h2>
              <div className="space-y-8">
                {data.work.jobs.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="card-hover group p-6 md:p-8 rounded-xl bg-white border border-gray-100 shadow-card relative"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center">
                        <img
                          src={job.img}
                          alt={job.company}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <MobileCollapsible 
                          id={`job-${index}`}
                          title={job.company} 
                          subtitle={job.role}
                          timeline={job.timeline} 
                          location={job.location}
                          defaultOpen={index === 0}
                        >
                          <p className="text-sm text-gray-600">{job.description}</p>
                        </MobileCollapsible>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="projects" className="py-10">
              <h2 className="section-title text-2xl md:text-3xl">Projects</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {data.projects.items.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="card-hover group overflow-hidden rounded-xl bg-white border border-gray-100 shadow-card"
                  >
                    <div className="project-image-container h-48 overflow-hidden bg-gray-50">
                      <img
                        src={project.img}
                        alt={project.project.title}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="p-6">
                      <MobileCollapsible 
                        id={`project-${index}`}
                        title={project.project.title} 
                        timeline={project.timeline}
                        defaultOpen={!isMobile}
                      >
                        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                        
                        {project.skills && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.skills.split(", ").map((skill, i) => (
                                <span 
                                  key={i} 
                                  className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex gap-4 mt-4">
                          {project.project.link && (
                            <a
                              href={project.project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium"
                            >
                              View Project
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium"
                            >
                              GitHub
                              <Github className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </MobileCollapsible>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="education" className="py-10">
              <h2 className="section-title text-2xl md:text-3xl">Education</h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card-hover group p-6 md:p-8 rounded-xl bg-white border border-gray-100 shadow-card"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center">
                    <img
                      src={data.education.image}
                      alt={data.education.school}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <MobileCollapsible 
                      id="education"
                      title={data.education.school} 
                      subtitle={`${data.education.degree}, ${data.education.major}`}
                      defaultOpen={false}
                    >
                      <div className="text-sm mb-3 inline-block bg-black text-white px-3 py-1 rounded-full">
                        GPA: {data.education.gpa}
                      </div>
                      
                      <div className="mt-6 grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">Notable Courses</h4>
                          <div className="space-y-2">
                            {data.education.courses.map((course, index) => (
                              <a
                                key={index}
                                href={course.code}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm block hover:text-black text-gray-600 transition-colors hover:underline"
                              >
                                • {course.class}
                              </a>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">Awards</h4>
                          <ul className="space-y-2">
                            {data.education.awards.map((award, index) => (
                              <li key={index} className="text-sm text-gray-600">• {award}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </MobileCollapsible>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </div>
        
        <footer className="mt-20 py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                © 2022 {data.home.fName} {data.home.lName}
              </p>
              
              <div className="flex gap-6">
                {Object.entries(data.footer).map(([platform, link]) => (
                  platform !== 'message' && (
                    <a
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-black transition-colors"
                      aria-label={platform}
                    >
                      {getIconForPlatform(platform)}
                    </a>
                  )
                ))}
                <a
                  href="#"
                  onClick={handleMessageClick}
                  className="text-gray-500 hover:text-black transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </CollapsibleContext.Provider>
  );
};

export default Index;
