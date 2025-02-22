
import { data } from "@/data/content";
import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, MessageSquare, Trophy } from "lucide-react";

declare global {
  interface Window {
    goatcounter?: {
      count: (opts: { path: string; title: string; event: boolean }) => void;
      get_query: (path: string, callback: (data: any) => void) => void;
    };
  }
}

const Index = () => {
  const [activeImage, setActiveImage] = useState(0);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [pageViews, setPageViews] = useState<number | null>(null);

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
    const email = "samweninger" + "@" + "gmail.com";
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
        return <MessageSquare className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-16 gap-8">
            {[
              { title: "Home", id: "home" },
              { title: "Work", id: "work" },
              { title: "Projects", id: "projects" },
              { title: "Education", id: "education" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-primary hover:text-accent transition-colors duration-200"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      <div className="container px-4 py-16 mx-auto flex-grow">
        <motion.div
          id="home"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 pt-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {data.home.fName} {data.home.lName}
          </h1>
          <p className="text-lg md:text-xl text-secondary mb-8">
            {data.home.description}
          </p>
          {pageViews !== null && (
            <p className="text-sm text-gray-600 mb-4">
              👀 {pageViews} page views
            </p>
          )}
          <div className="flex justify-center gap-4">
            {Object.entries(data.footer).map(([platform, link]) => (
              <a
                key={platform}
                href={platform === 'message' ? '#' : link}
                onClick={platform === 'message' ? handleMessageClick : undefined}
                target={platform === 'message' ? undefined : "_blank"}
                rel={platform === 'message' ? undefined : "noopener noreferrer"}
                className="text-primary hover:text-accent transition-colors duration-200 flex items-center gap-2"
              >
                {getIconForPlatform(platform)}
                <span>{platform}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {data.home.pics.map((pic, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg aspect-[4/3]"
              onMouseEnter={() => setActiveImage(index)}
            >
              <img
                src={pic.img}
                alt={pic.text}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
                  pic.text.includes("Oregon Coast") ? "object-top" : "object-center"
                }`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm">{pic.text}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="space-y-16">
          <section id="work">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Work Experience</h2>
            <div className="space-y-8">
              {data.work.jobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 rounded-lg bg-muted"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={job.img}
                      alt={job.company}
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h3 className="font-bold">{job.company}</h3>
                      <p className="text-secondary">{job.role}</p>
                    </div>
                  </div>
                  <p className="text-secondary mb-2">{job.location}</p>
                  <p className="text-sm text-secondary mb-4">{job.timeline}</p>
                  <p className="text-sm">{job.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="projects">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {data.projects.items.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 rounded-lg bg-muted"
                >
                  <div className="relative h-36 mb-4">
                    <img
                      src={project.img}
                      alt={project.project.title}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <h3 className="font-bold mb-2">{project.project.title}</h3>
                  <p className="text-sm text-secondary mb-4">{project.timeline}</p>
                  <p className="text-sm mb-4">{project.description}</p>
                  <div className="flex gap-4">
                    {project.project.link && (
                      <a
                        href={project.project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        View Project
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="education">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Education</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-lg bg-muted"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={data.education.image}
                  alt={data.education.school}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h3 className="font-bold">{data.education.school}</h3>
                  <p className="text-secondary">{data.education.degree}</p>
                </div>
              </div>
              <p className="text-secondary mb-2">{data.education.major}</p>
              <p className="text-sm text-secondary mb-4">GPA: {data.education.gpa}</p>
              
              <h4 className="font-bold mb-2">Notable Courses</h4>
              <div className="grid md:grid-cols-2 gap-2 mb-4">
                {data.education.courses.map((course, index) => (
                  <a
                    key={index}
                    href={course.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-accent transition-colors duration-200"
                  >
                    {course.class}
                  </a>
                ))}
              </div>

              <h4 className="font-bold mb-2">Awards</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {data.education.awards.map((award, index) => (
                  <li key={index}>{award}</li>
                ))}
              </ul>
            </motion.div>
          </section>
        </div>
      </div>
      
      <footer className="py-8 bg-muted mt-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-secondary">
            Developed by {data.home.fName} {data.home.lName} © 2022
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
