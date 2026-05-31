import { useState } from "react";
import { data } from "@/data/portfolio-data";
import { useInView } from "@/hooks/useInView";

const Career = () => {
  const { ref, inView } = useInView(0.1);
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="career" ref={ref} className="py-24 sm:py-32 px-5 sm:px-8 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className={`reveal ${inView ? "visible" : ""} mb-16`}>
          <p className="label-caps mb-4">Experience</p>
          <h2 className="display-text text-[clamp(2.5rem,8vw,5rem)]">Where I've worked</h2>
        </div>

        <div className="divide-y divide-border">
          {data.work.jobs.map((job, i) => {
            const isOpen = expanded === i;
            return (
              <div
                key={job.company}
                className={`reveal ${inView ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full py-8 sm:py-10 flex items-start gap-6 sm:gap-10 text-left group"
                >
                  <span className="label-caps w-8 shrink-0 mt-1">{String(i + 1).padStart(2, "0")}</span>

                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 overflow-hidden flex items-center justify-center border border-border"
                    style={{ backgroundColor: job.color }}
                  >
                    <img src={job.img} alt={job.company} className="w-full h-full object-contain p-1.5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                      <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight group-hover:text-foreground/70 transition-colors">
                        {job.company}
                      </h3>
                      <span className="label-caps">{job.timeline}</span>
                    </div>
                    <p className="text-muted-foreground mt-1">
                      {job.role} · {job.location}
                    </p>
                  </div>

                  <span className="hidden sm:block label-caps mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    isOpen ? "max-h-96 opacity-100 pb-8" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-[4.5rem] sm:pl-[7.5rem] pr-4 max-w-2xl">
                    <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                    {job.skills && (
                      <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground/70">
                        {job.skills}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Career;
