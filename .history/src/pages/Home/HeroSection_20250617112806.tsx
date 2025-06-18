// HeroSection.tsx (간단 예시)
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../../styles/pages/Home/HeroSection.scss'; // 기존 SCSS 유지

const HeroSection: React.FC = () => {
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  // 배경 요소들을 위한 ref (예: 5개의 점)
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    // 기존 텍스트 애니메이션
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });
    tl.fromTo(
        headline.current,
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1 }
      )
      .fromTo(
        sub.current,
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1 },
        '-=0.4'
      )
      .fromTo(
        cta.current,
        { scale: 0.8, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1 },
        '-=0.4'
      );

    // 스크롤 화살표 애니메이션
    gsap.to(arrow.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: 1.2,
      delay: 1.5,
    });

    // --- 새로운 배경 애니메이션 추가 ---
    dotRefs.current.forEach(dot => {
      if (dot) {
        gsap.to(dot, {
          x: gsap.utils.random(-100, 100), // -100px ~ +100px 무작위 X 이동
          y: gsap.utils.random(-100, 100), // -100px ~ +100px 무작위 Y 이동
          opacity: gsap.utils.random(0.3, 0.7), // 0.3 ~ 0.7 무작위 투명도
          scale: gsap.utils.random(0.8, 1.2), // 0.8 ~ 1.2 무작위 크기
          duration: gsap.utils.random(5, 10), // 5초 ~ 10초 무작위 지속 시간
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 2), // 0초 ~ 2초 무작위 딜레이
        });
      }
    });
    // --- 배경 애니메이션 끝 ---

  }, []);

  // SVG 배경을 위한 점들 (반복문으로 동적 생성도 가능)
  const numDots = 10; // 원하는 점의 개수
  const dots = Array.from({ length: numDots }).map((_, i) => (
    <circle
      key={i}
      cx={gsap.utils.random(0, 100)} // SVG 뷰박스 기준 상대적 위치
      cy={gsap.utils.random(0, 100)}
      r={gsap.utils.random(1, 3)} // 점의 반지름
      fill="#4A5568" // 점의 색상
      opacity={0.5} // 초기 투명도
      ref={el => (dotRefs.current[i] = el)}
    />
  ));

  return (
    <section id="hero" className="hero-section">
      {/* 배경 SVG 컨테이너 */}
      <div className="hero-background-svg">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {dots}
        </svg>
      </div>

      <div className="hero-content">
        <h1 ref={headline}>안녕하세요</h1>
        <p ref={sub}>1234</p>
        <a href="#projects" ref={cta} className="cta-btn">
          5678 ↓
        </a>
      </div>
      <div ref={arrow} className="scroll-arrow">↓</div>
    </section>
  );
};

export default HeroSection;