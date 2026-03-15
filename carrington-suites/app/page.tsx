import Hero from "./components/Hero";
import Intro from "./components/Intro";
import ResidencesSlider from "./components/ResidencesSlider";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main>

      <Hero />

      <Intro />

      <ResidencesSlider />

      <Experience />

      <Testimonials />

    </main>
  );
}