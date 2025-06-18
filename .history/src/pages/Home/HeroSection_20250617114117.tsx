import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../../styles/pages/Home/HeroSection.scss';

const HeroSection: React.FC = () => {
  // ... (기존 headline, sub, cta, arrow ref 선언)

  const numDots = 20;
  // dotRefs 타입을 SVGLineElement로 변경
  const dotRefs = useRef<(SVGLineElement | null)[]>(
    Array(numDots).fill(null)
  );

  useEffect(() => {
    // ... (기존 텍스트 애니메이션 및 스크롤 화살표 애니메이션)

    // 배경 선 애니메이션
    dotRefs.current.forEach(line => { // 변수 이름을 'dot'에서 'line'으로 변경 (가독성)
      if (line) {
        gsap.to(line, {
          // --- 이 부분이 변경되었습니다! ---
          x1: gsap.utils.random(-15, 15), // x1 좌표를 무작위로 이동
          y1: gsap.utils.random(-15, 15), // y1 좌표를 무작위로 이동
          x2: gsap.utils.random(-15, 15), // x2 좌표를 무작위로 이동
          y2: gsap.utils.random(-15, 15), // y2 좌표를 무작위로 이동
          // --- 여기까지 ---
          opacity: gsap.utils.random(0.1, 0.4),
          // scale은 line 요소에 직접 적용되지 않지만, strokeWidth 등으로 효과 대체 가능
          // scale: gsap.utils.random(0.8, 1.2), // 라인에는 scale 대신 strokeWidth를 조절할 수 있습니다.
          strokeWidth: gsap.utils.random(0.5, 2.5), // 선 두께를 애니메이션
          duration: gsap.utils.random(8, 15),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 5),
        });
      }
    });

  }, []);

  // SVG 배경에 렌더링할 선들을 생성
  const dots = Array.from({ length: numDots }).map((_, i) => (
    <line
      key={i}
      // 초기 위치는 여전히 0~100 사이에서 무작위로 설정합니다.
      x1={gsap.utils.random(0, 100)}
      y1={gsap.utils.random(0, 100)}
      x2={gsap.utils.random(0, 100)}
      y2={gsap.utils.random(0, 100)}
      stroke="#4A5568"
      strokeWidth={gsap.utils.random(0.5, 1.5)}
      opacity={0.3}
      ref={el => (dotRefs.current[i] = el as SVGLineElement | null)}
    />
  ));

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background-svg">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {dots}
        </svg>
      </div>
      <div className="hero-content">
        <h1 ref={headline}>hi</h1>
        <p ref={sub}>123</p>
        <a href="#projects" ref={cta} className="cta-btn">
          456 ↓
        </a>
      </div>
      <div ref={arrow} className="scroll-arrow">↓</div>
    </section>
  );
};

export default HeroSection;