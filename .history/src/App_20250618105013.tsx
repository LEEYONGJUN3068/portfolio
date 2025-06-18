import './App.css';
import Header from './components/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';

function App() {

  // 섹션으로 부드럽게 스크롤하는 유틸리티 함수 (Header 버튼 등에 사용)
  const scrollToSection = (sectionId: string) => {
    gsap.to(window, {
      duration: 1.5, // 스크롤 애니메이션 지속 시간 (초)
      scrollTo: {
        y: `#${sectionId}`, // 스크롤할 대상 ID
        offset: 0 // 섹션 상단에서 얼마나 떨어질지 (0은 딱 맞게)
      } as any, // <-- 이 부분이 수정되었습니다! 'scrollTo' 객체를 'any'로 단언
      ease: "power2.inOut" // 스크롤 애니메이션 이징
    });
  };

  return (
    <>
      <Header></Header>
        <Routes>
          <Route path="/" element={<Home scrollToSection={scrollToSection}/>}/>
        </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
