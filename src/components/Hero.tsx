import { data } from "@/data/portfolio-data";

const previewPhotos = data.moments.slice(0, 6);

const Hero = () => {
  return (
    <section id="top" className="relative min-h-[88svh] flex flex-col justify-between overflow-hidden hero-mesh">
      <div className="page-shell flex-1 flex flex-col justify-center pt-24 pb-8">
        <p className="label-caps mb-4 animate-slide-up">Portfolio / 2026</p>

        <h1 className="display-text text-[clamp(3rem,12vw,9.5rem)] animate-slide-up">
          <span className="block">{data.home.fName}</span>
          <span className="block text-muted-foreground ml-[0.15em]">{data.home.lName}</span>
        </h1>

        <p
          className="mt-6 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          {data.home.tagline}
        </p>
      </div>

      <div className="page-shell pb-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2 pb-5">
          {previewPhotos.map((photo, i) => (
            <a
              key={photo.img}
              href="#moments"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#moments")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hero-thumb aspect-[4/5] overflow-hidden bg-muted"
              style={{ animationDelay: `${400 + i * 80}ms` }}
            >
              <img src={photo.img} alt="" className="w-full h-full object-cover" />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 animate-fade-in">
          <span className="label-caps">Scroll to explore</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
