import { data } from "@/data/portfolio-data";

const previewPhotos = data.moments.slice(0, 5);

const Hero = () => {
  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden hero-mesh">
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-8 pt-28 pb-12 max-w-7xl mx-auto w-full">
        <p className="label-caps mb-6 animate-slide-up">Portfolio / 2026</p>

        <h1 className="display-text text-[clamp(3.5rem,15vw,11rem)] animate-slide-up">
          <span className="block">{data.home.fName}</span>
          <span className="block text-muted-foreground ml-[0.15em]">{data.home.lName}</span>
        </h1>

        <p
          className="mt-8 max-w-md text-lg sm:text-xl text-muted-foreground leading-relaxed animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          {data.home.tagline}
        </p>
      </div>

      <div className="relative z-10 px-5 sm:px-8 pb-8 max-w-7xl mx-auto w-full">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto hide-scrollbar pb-6">
          {previewPhotos.map((photo, i) => (
            <a
              key={photo.img}
              href="#moments"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#moments")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex-shrink-0 w-20 h-24 sm:w-28 sm:h-36 overflow-hidden bg-muted opacity-70 hover:opacity-100 transition-opacity duration-300"
              style={{ animationDelay: `${400 + i * 80}ms` }}
            >
              <img src={photo.img} alt="" className="w-full h-full object-cover" />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 animate-fade-in">
          <span className="label-caps">Scroll to explore</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
