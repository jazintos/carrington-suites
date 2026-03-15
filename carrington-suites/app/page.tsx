import Hero from "./components/Hero";
import Intro from "./components/Intro";
import ResidencesSlider from "./components/ResidencesSlider";
import ParallaxImage from "./components/ParallaxImage";
import Experience from "./components/Experience";
import Lifestyle from "./components/Lifestyle";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main>

      <Hero />

      <Intro />

      <ResidencesSlider />

      <ParallaxImage />

      <Experience />

      <Lifestyle />

      <Gallery />

      <Testimonials />

    </main>
  );
}