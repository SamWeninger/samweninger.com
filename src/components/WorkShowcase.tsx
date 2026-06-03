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
    <section id="work" ref={ref} className="section-pad border-t border-border/40">
      <div className="page-shell mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className={`reveal ${inView ? "visible" : ""}`}>
          <p className="label-caps mb-3">Selected projects</p>
          <h2 className="display-text text-[clamp(2.5rem,7vw,4.5rem)]">Things I've built</h2>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => scroll("left")}
            className="p-2.5 border border-border hover:border-foreground/30 transition-colors"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2.5 border border-border hover:border-foreground/30 transition-colors"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pl-4 sm:pl-6 lg:pl-[max(1.5rem,calc((100vw-1600px)/2+2.5rem))] pr-4 sm:pr-6 pb-2"
      >
        {data.projects.items.map((project, i) => (
          <article
            key={project.project.title}
            className={`work-card group w-[68vw] sm:w-[300px] lg:w-[320px] ${inView ? "visible" : ""} reveal`}
            style={{ transitionDelay: `${(i % 4) * 100 + 100}ms` }}
          >
            <div
              className="relative aspect-[5/4] overflow-hidden bg-muted/30 border border-border/50"
              style={{ backgroundColor: project.color === "white" ? undefined : project.color }}
            >
              <img
                src={project.img}
                alt={project.project.title}
                className="absolute inset-0 w-full h-full object-contain p-6 sm:p-8 transition-transform duration-500 group-hover:scale-[0.97]"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-foreground/90 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
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

            <div className="flex items-baseline justify-between gap-3 mt-2.5 px-0.5">
              <h3 className="font-display text-sm uppercase tracking-tight truncate">
                {project.project.title}
              </h3>
              {project.timeline && <span className="label-caps shrink-0">{project.timeline}</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WorkShowcase;
