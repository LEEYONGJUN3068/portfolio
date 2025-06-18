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

    console.log("Found sections (after fix):", sections);
    if (sections.length < 5) { // 5개의 섹션이 모두 찾아지지 않았다면 경고 (다시 5개로 나와야 함)
        console.warn("WARNING: Not all sections were found after fix!");
    }

    if (sections.length > 0) {
      // --- 헤더 높이 변수 추가 (Header의 실제 높이로 변경해야 합니다!) ---
      const headerHeight = 0; // 여기에 Header 컴포넌트의 실제 높이 (픽셀)를 입력하세요.
                              // 예: const headerHeight = 80; // (Header 높이가 80px인 경우)
      // --- 여기까지 ---

      const sectionScrollPositions = sections.map(section => {
        // 섹션의 offsetTop에서 헤더 높이만큼 빼서 실제 스크롤 위치를 조정합니다.
        return section.offsetTop - headerHeight; 
      });

      // --- 디버깅 로그 확인 (offsetTop이 100vh 배수에 가까워졌는지) ---
      console.log("Section scroll positions (offsetTop adjusted):", sectionScrollPositions);
      // --- 여기까지 ---

      ScrollTrigger.create({
        snap: {
          snapTo: sectionScrollPositions, 
          duration: {min: 0.5, max: 0.8}, 
          ease: "power2.inOut", 
        },
        markers: true 
      });
    }

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