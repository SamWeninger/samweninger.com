import { useRef } from "react";
import { data } from "@/data/portfolio-data";
import { useInView } from "@/hooks/useInView";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

const WorkShowcase = () => {
  const { ref, inView } = useInView(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="work" ref={ref} className="py-24 sm:py-32 border-t border-border/50">
      <div className="px-5 sm:px-8 max-w-7xl mx-auto">
        <div className={`reveal ${inView ? "visible" : ""} flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12`}>
          <div>
            <p className="label-caps mb-4">Selected projects</p>
            <h2 className="display-text text-[clamp(2.5rem,8vw,5rem)]">Things I've built</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-3 border border-border hover:border-foreground/30 transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 border border-border hover:border-foreground/30 transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-5 sm:px-8 pb-4"
      >
        {data.projects.items.map((project, i) => (
          <article
            key={project.project.title}
            className={`work-card group w-[72vw] sm:w-[340px] lg:w-[360px] ${inView ? "visible" : ""} reveal`}
            style={{ transitionDelay: `${(i % 4) * 100 + 100}ms` }}
          >
            <div
              className="relative aspect-[5/4] overflow-hidden bg-muted/30 border border-border/50"
              style={{ backgroundColor: project.color === "white" ? undefined : project.color }}
            >
              <img
                src={project.img}
                alt={project.project.title}
                className="absolute inset-0 w-full h-full object-contain p-8 sm:p-10 transition-transform duration-500 group-hover:scale-[0.97]"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-foreground/90 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.skills.split(", ").map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-border/80 text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  {project.project.link && (
                    <a
                      href={project.project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider hover:text-accent transition-colors"
                    >
                      Visit
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-wider hover:text-accent transition-colors"
                    >
                      Source
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-3 mt-3 px-0.5">
              <h3 className="font-display text-sm sm:text-base uppercase tracking-tight truncate">
                {project.project.title}
              </h3>
              {project.timeline && (
                <span className="label-caps shrink-0">{project.timeline}</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WorkShowcase;
