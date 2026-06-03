import { useState } from "react";
import { data } from "@/data/portfolio-data";
import { useInView } from "@/hooks/useInView";

const Career = () => {
  const { ref, inView } = useInView(0.1);
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="career" ref={ref} className="section-pad border-t border-border/40">
      <div className="page-shell">
        <div className={`reveal ${inView ? "visible" : ""} mb-10`}>
          <p className="label-caps mb-3">Experience</p>
          <h2 className="display-text text-[clamp(2.5rem,7vw,4.5rem)]">Where I've worked</h2>
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
                  className="w-full py-6 sm:py-8 flex items-start gap-4 sm:gap-8 text-left group"
                >
                  <span className="label-caps w-7 shrink-0 mt-1">{String(i + 1).padStart(2, "0")}</span>

                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 shrink-0 overflow-hidden flex items-center justify-center ${
                      job.color === "white" ? "border border-border" : ""
                    }`}
                    style={{ backgroundColor: job.color }}
                  >
                    <img
                      src={job.img}
                      alt={job.company}
                      className={`w-full h-full object-contain ${job.color === "white" ? "p-1.5" : "p-0"}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                      <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight group-hover:text-foreground/70 transition-colors">
                        {job.company}
                      </h3>
                      <span className="label-caps">{job.timeline}</span>
                    </div>
                    <p className="text-muted-foreground mt-0.5 text-sm sm:text-base">
                      {job.role} · {job.location}
                    </p>
                  </div>

                  <span className="hidden sm:block label-caps mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-[3.75rem] sm:pl-[6.5rem] lg:pl-[7rem] pr-4 max-w-3xl">
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{job.description}</p>
                    {job.skills && (
                      <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground/70">{job.skills}</p>
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
