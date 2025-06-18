import { useEffect } from 'react';
import HeroSection from '../Home/HeroSection';
import AboutSection from '../Home/AboutSection';
import ProjectsSection from '../Home/ProjectsSection';
import TechSection from '../Home/TechSection';
import ContactSection from '../Home/ContactSection';
import { gsap } from 'gsap'; // ScrollTrigger 사용을 위해 임포트
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // ScrollTrigger 사용을 위해 임포트

interface HomeProps {
  scrollToSection: (sectionId: string) => void;
}

function Home({ scrollToSection }: HomeProps) {

  useEffect(() => {
    const sections = [
      document.getElementById('hero'),    // 'hero' -> 'hero-section'으로 수정
      document.getElementById('about'),   // 'about' -> 'about-section'으로 수정
      document.getElementById('projects'),// 'projects' -> 'projects-section'으로 수정
      document.getElementById('tech'),    // 'tech' -> 'tech-section'으로 수정
      document.getElementById('contact')  // 'contact' -> 'contact-section'으로 수정
    ].filter(Boolean) as HTMLElement[]; // null이 아닌 요소만 필터링하고 HTMLElement[]로 단언

    // 모든 섹션이 화면에 표시되면 스크롤 스냅을 적용합니다.
    if (sections.length > 0) {

      const sectionScrollPositions = sections.map(section => section.offsetTop);

      ScrollTrigger.create({
        snap: {
          snapTo: sectionScrollPositions, // 명시적으로 스냅할 대상 요소들을 배열로 지정
          duration: {min: 0.5, max: 0.8}, // 스냅 애니메이션 지속 시간 (짧게 설정)
          ease: "power2.inOut", // 부드러운 스냅 애니메이션 이징
          // delay: 0.1, // (선택 사항) 스크롤 후 약간의 딜레이
          // start: "top top", // (선택 사항) 스냅 시작 위치. 기본값으로 두는 경우가 많습니다.
          // end: "bottom bottom", // (선택 사항) 스냅 종료 위치.
        },
        markers: true
      });
    } // <--- 이 '}'가 누락되어 있었습니다!

    // 컴포넌트 언마운트 시 ScrollTrigger 인스턴스를 정리하여 메모리 누수를 방지합니다.
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []); // <--- 여기는 useEffect의 닫는 괄호와 의존성 배열입니다.

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