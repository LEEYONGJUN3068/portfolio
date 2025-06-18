import HeroSection from '../Home/HeroSection';
import AboutSection from '../Home/AboutSection';
import ProjectsSection from '../Home/ProjectsSection';
import TechSection from '../Home/TechSection';
import ContactSection from '../Home/ContactSection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function Home() {
  return (
    <>
      <HeroSection></HeroSection>
      <AboutSection></AboutSection>
      <ProjectsSection></ProjectsSection>
      <TechSection></TechSection>
      <ContactSection></ContactSection>
    </>
  );
}

export default Home;