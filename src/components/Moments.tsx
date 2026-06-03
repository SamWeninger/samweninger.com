import { useCallback, useEffect, useMemo, useState } from "react";
import { data } from "@/data/portfolio-data";
import { useInView } from "@/hooks/useInView";

const revealDelays = ["100ms", "150ms", "200ms", "250ms", "300ms", "350ms", "400ms", "450ms", "500ms"];

type Moment = (typeof data.moments)[number];

/** Assign each photo to whichever column is shortest (by cumulative aspect ratio). */
function packIntoColumns(items: Moment[], aspects: Record<string, number>, columnCount: number) {
  const cols: Moment[][] = Array.from({ length: columnCount }, () => []);
  const heights = Array(columnCount).fill(0);

  for (const item of items) {
    let target = 0;
    for (let i = 1; i < columnCount; i++) {
      if (heights[i] < heights[target]) target = i;
    }
    cols[target].push(item);
    heights[target] += aspects[item.img] ?? 1;
  }

  return cols;
}

const MomentCard = ({
  moment,
  delay,
  inView,
  onAspect,
}: {
  moment: Moment;
  delay: string;
  inView: boolean;
  onAspect: (src: string, ratio: number) => void;
}) => (
  <figure
    className={`photo-frame moments-item ${inView ? "visible" : ""} reveal`}
    style={{ transitionDelay: delay }}
  >
    <img
      src={moment.img}
      alt={moment.location}
      loading="lazy"
      onLoad={(e) => onAspect(moment.img, e.currentTarget.naturalHeight / e.currentTarget.naturalWidth)}
      className="bg-muted/30"
    />
    <figcaption className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none">
      <p className="text-white/90 text-sm font-medium">{moment.location}</p>
      <p className="text-white/50 text-xs mt-0.5 tracking-wide">{moment.year}</p>
    </figcaption>
  </figure>
);

const Moments = () => {
  const { ref, inView } = useInView(0.08);
  const [aspects, setAspects] = useState<Record<string, number>>({});
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setColumnCount(mq.matches ? 3 : 2);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const onAspect = useCallback((src: string, ratio: number) => {
    setAspects((prev) => (prev[src] === ratio ? prev : { ...prev, [src]: ratio }));
  }, []);

  const columns = useMemo(() => {
    const merged = Object.fromEntries(
      data.moments.map((m) => [m.img, aspects[m.img] ?? 1])
    );
    return packIntoColumns(data.moments, merged, columnCount);
  }, [aspects, columnCount]);

  return (
    <section id="moments" ref={ref} className="section-pad border-t border-border/40">
      <div className="page-shell">
        <div
          className={`reveal ${inView ? "visible" : ""} grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 mb-10 lg:mb-12 items-end`}
        >
          <div>
            <p className="label-caps mb-3">Life & places</p>
            <h2 className="display-text text-[clamp(2.5rem,7vw,5rem)]">Moments</h2>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed lg:pb-1">
            {data.home.intro}
          </p>
        </div>

        <div className="moments-masonry">
          {columns.map((col, colIndex) => (
            <div key={colIndex} className="moments-column">
              {col.map((moment) => {
                const i = data.moments.findIndex((m) => m.img === moment.img);
                return (
                  <MomentCard
                    key={moment.img}
                    moment={moment}
                    delay={revealDelays[i] ?? "450ms"}
                    inView={inView}
                    onAspect={onAspect}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Moments;
