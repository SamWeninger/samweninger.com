import { data } from "@/data/portfolio-data";
import { useInView } from "@/hooks/useInView";

const revealDelays = ["100ms", "150ms", "200ms", "250ms", "300ms", "350ms", "400ms", "450ms"];

const Moments = () => {
  const { ref, inView } = useInView(0.08);

  return (
    <section id="moments" ref={ref} className="py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`reveal ${inView ? "visible" : ""} mb-16 sm:mb-20`}>
          <p className="label-caps mb-4">Life & places</p>
          <h2 className="display-text text-[clamp(2.5rem,8vw,6rem)]">Moments</h2>
          <p className="mt-6 max-w-xl text-muted-foreground text-lg leading-relaxed">
            {data.home.intro}
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5">
          {data.moments.map((moment, i) => (
            <figure
              key={moment.img}
              className={`photo-frame break-inside-avoid mb-4 sm:mb-5 ${inView ? "visible" : ""} reveal`}
              style={{ transitionDelay: revealDelays[i] }}
            >
              <img
                src={moment.img}
                alt={moment.location}
                loading="lazy"
                className="!object-contain bg-muted/50"
              />
              <figcaption className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none">
                <p className="text-white/90 text-sm font-medium">{moment.location}</p>
                <p className="text-white/50 text-xs mt-0.5 tracking-wide">{moment.year}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Moments;
