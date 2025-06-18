import React from 'react'; // useEffect, gsap, ScrollTrigger 임포트 제거
import HeroSection from '../../components/HeroSection'; // 실제 경로에 맞게 조정
import AboutSection from '../../components/AboutSection'; // 실제 경로에 맞게 조정
import ProjectsSection from '../../components/Projects/ProjectsSection'; // 실제 경로에 맞게 조정
import TechSection from '../../components/Tech/TechSection'; // 실제 경로에 맞게 조정
import ContactSection from '../../components/Contact/ContactSection'; // 실제 경로에 맞게 조정

// interface HomeProps 제거 (scrollToSection 프롭스를 더 이상 받지 않음)

function Home() {

  // useEffect 블록과 모든 스크롤 스냅 로직 제거
  // useEffect(() => { /* ... */ }, []);

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
