import HeroSection from '../../components/HeroSection'; // 실제 경로에 맞게 조정
import AboutSection from '../../components/AboutSection'; // 실제 경로에 맞게 조정
import ProjectsSection from '../../components/Projects/ProjectsSection'; // 실제 경로에 맞게 조정
import TechSection from '../../components/Tech/TechSection'; // 실제 경로에 맞게 조정
import ContactSection from '../../components/Contact/ContactSection'; // 실제 경로에 맞게 조정

function Home() {

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TechSection />
      <ContactSection />
    </>
  );
}

export default Home;
