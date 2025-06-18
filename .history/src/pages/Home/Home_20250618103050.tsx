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
    // 섹션들을 참조할 배열 (모든 섹션을 여기에 추가)
    // React.Children.toArray를 사용하여 자식 요소들을 배열로 변환합니다.
    // 각 섹션 컴포넌트가 <section> 태그를 렌더링하고,
    // 그 <section> 태그에 ref를 연결하여 ScrollTrigger의 targets로 사용합니다.
    const sections = [
      document.getElementById('hero'),
      document.getElementById('about'),
      document.getElementById('projects'),
      document.getElementById('tech'),
      document.getElementById('contact')
    ].filter(Boolean) as HTMLElement[]; // null이 아닌 요소만 필터링하고 HTMLElement[]로 단언

    // 모든 섹션이 화면에 표시되면 스크롤 스냅을 적용합니다.
    if (sections.length > 0) {
      ScrollTrigger.create({
        // 스크롤 스냅을 적용할 대상 섹션들을 지정합니다.
        // snap: {
        //   snapTo: sections, // 이 배열의 요소들로 스크롤이 스냅됩니다.
        //   duration: {min: 0.5, max: 1}, // 스냅 애니메이션의 최소/최대 지속 시간
        //   ease: "power2.inOut" // 스냅 애니메이션 이징
        // },
        // 또는 간단하게 뷰포트 높이 기준으로 스냅
        snap: 1, // 뷰포트 높이(100vh) 단위로 스냅합니다. 각 섹션이 100vh일 때 최적입니다.
        
        // markers: true // 디버깅용 마커를 표시합니다. 실제 배포 시에는 제거하세요.
      });
    })

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