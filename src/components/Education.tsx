import { data } from "@/data/portfolio-data";
import { useInView } from "@/hooks/useInView";

const Education = () => {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="education" ref={ref} className="py-24 sm:py-32 px-5 sm:px-8 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className={`reveal ${inView ? "visible" : ""}`}>
          <p className="label-caps mb-4">Education</p>
          <h2 className="display-text text-[clamp(2rem,6vw,4rem)] mb-16">Undergrad</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className={`reveal reveal-delay-1 ${inView ? "visible" : ""}`}>
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 shrink-0 bg-[#E6F0FA] flex items-center justify-center">
                <img src={data.education.image} alt={data.education.school} className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h3 className="font-display text-2xl uppercase tracking-tight">{data.education.school}</h3>
                <p className="text-muted-foreground mt-2">{data.education.degree}</p>
                <p className="text-muted-foreground">{data.education.major}</p>
                <p className="mt-3 label-caps">GPA {data.education.gpa}</p>
              </div>
            </div>

            <ul className="mt-10 space-y-2">
              {data.education.awards.map((award) => (
                <li key={award} className="text-sm text-muted-foreground flex items-start gap-3">
                  <span className="text-foreground/30 mt-0.5">—</span>
                  {award}
                </li>
              ))}
            </ul>
          </div>

          <div className={`reveal reveal-delay-2 ${inView ? "visible" : ""}`}>
            <p className="label-caps mb-6">Notable courses</p>
            <ul className="space-y-3">
              {data.education.courses.map((course) => (
                <li key={course.class}>
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
