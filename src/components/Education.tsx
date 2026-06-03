import { data } from "@/data/portfolio-data";
import { useInView } from "@/hooks/useInView";

const Education = () => {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="education" ref={ref} className="section-pad border-t border-border/40">
      <div className="page-shell">
        <div className={`reveal ${inView ? "visible" : ""} mb-10`}>
          <p className="label-caps mb-3">Education</p>
          <h2 className="display-text text-[clamp(2rem,6vw,3.5rem)]">Undergrad</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className={`reveal reveal-delay-1 ${inView ? "visible" : ""}`}>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 shrink-0 bg-[#E6F0FA] flex items-center justify-center">
                <img src={data.education.image} alt={data.education.school} className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight">{data.education.school}</h3>
                <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">{data.education.degree}</p>
                <p className="text-muted-foreground text-sm sm:text-base">{data.education.major}</p>
                <p className="mt-2 label-caps">GPA {data.education.gpa}</p>
              </div>
            </div>

            <ul className="mt-8 space-y-1.5">
              {data.education.awards.map((award) => (
                <li key={award} className="text-sm text-muted-foreground flex items-start gap-3">
                  <span className="text-foreground/30 mt-0.5">—</span>
                  {award}
                </li>
              ))}
            </ul>
          </div>

          <div className={`reveal reveal-delay-2 ${inView ? "visible" : ""}`}>
            <p className="label-caps mb-4">Notable courses</p>
            <ul className="columns-1 sm:columns-2 gap-x-8 space-y-2">
              {data.education.courses.map((course) => (
                <li key={course.class} className="break-inside-avoid">
                  <a
                    href={course.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-accent transition-colors link-underline"
                  >
                    {course.class}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
