import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Moments from "@/components/Moments";
import WorkShowcase from "@/components/WorkShowcase";
import Career from "@/components/Career";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Moments />
        <WorkShowcase />
        <Career />
        <Education />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
