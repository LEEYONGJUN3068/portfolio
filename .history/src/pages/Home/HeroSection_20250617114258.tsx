import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../../styles/pages/Home/HeroSection.scss';

const HeroSection: React.FC = () => {
  // 메인 콘텐츠 요소들을 위한 ref
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  // 배경의 점(dot) 요소들을 위한 ref 배열
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  // 배경에 생성할 점의 개수
  const numDots = 20; // 이 값을 조절하여 점의 밀도를 변경할 수 있습니다.

  useEffect(() => {
    // 텍스트 콘텐츠 애니메이션 타임라인
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });

    tl.fromTo(
        headline.current,
        { y: 50, autoAlpha: 0 }, // 초기 상태: y축 50px 아래, 투명
        { y: 0, autoAlpha: 1 }    // 최종 상태: 원래 위치, 불투명
      )
      .fromTo(
        sub.current,
        { y: 30, autoAlpha: 0 }, // 초기 상태: y축 30px 아래, 투명
        { y: 0, autoAlpha: 1 },  // 최종 상태: 원래 위치, 불투명
        '-=0.4' // 이전 애니메이션(headline) 종료 0.4초 전에 시작
      )
      .fromTo(
        cta.current,
        { scale: 0.8, autoAlpha: 0 }, // 초기 상태: 80% 크기, 투명
        { scale: 1, autoAlpha: 1 },   // 최종 상태: 100% 크기, 불투명
        '-=0.4' // 이전 애니메이션(sub) 종료 0.4초 전에 시작
      );

    // 스크롤 유도 화살표 애니메이션 (위아래로 움직임)
    gsap.to(arrow.current, {
      y: 10, // y축으로 10px 이동
      repeat: -1, // 무한 반복
      yoyo: true, // 애니메이션이 끝난 후 역방향으로 돌아옴 (왕복 움직임)
      ease: 'power1.inOut', // 부드러운 가속/감속
      duration: 1.2, // 한 사이클 지속 시간 1.2초
      delay: 1.5, // 컴포넌트 로드 후 1.5초 뒤 시작
    });

    // 배경 점 애니메이션
    dotRefs.current.forEach(dot => {
      if (dot) {
        gsap.to(dot, {
          x: gsap.utils.random(-15, 15), // SVG viewBox 기준 -15 ~ 15 단위로 X 이동
          y: gsap.utils.random(-15, 15), // SVG viewBox 기준 -15 ~ 15 단위로 Y 이동
          opacity: gsap.utils.random(0.1, 0.4), // 0.1 ~ 0.4 무작위 투명도 (은은하게)
          scale: gsap.utils.random(0.8, 1.2), // 0.8배 ~ 1.2배 무작위 크기
          duration: gsap.utils.random(8, 15), // 8초 ~ 15초 무작위 지속 시간 (매우 느리게)
          repeat: -1, // 무한 반복
          yoyo: true, // 왕복 움직임
          ease: 'sine.inOut', // 부드러운 가속/감속
          delay: gsap.utils.random(0, 5), // 0초 ~ 5초 무작위 시작 딜레이
        });
      }
    });

  }, []); // 컴포넌트가 처음 마운트될 때만 실행

  // SVG 배경에 렌더링할 점들을 생성
  const dots = Array.from({ length: numDots }).map((_, i) => (
    <line
  key={i}
  x1={gsap.utils.random(0, 100)} // 시작점 X
  y1={gsap.utils.random(0, 100)} // 시작점 Y
  x2={gsap.utils.random(0, 100)} // 끝점 X
  y2={gsap.utils.random(0, 100)} // 끝점 Y
  stroke="#4A5568" // 선 색상
  strokeWidth={gsap.utils.random(0.5, 1.5)} // 선 두께
  opacity={0.3}
  ref={el => (dotRefs.current[i] = el as SVGLineElement | null)} // 타입 변경
/>
  ));

  return (
    <section id="hero" className="hero-section">
      {/* 배경 SVG 컨테이너: 콘텐츠 뒤에 위치하고 마우스 이벤트 무시 */}
      <div className="hero-background-svg">
        {/*
          viewBox="0 0 100 100": SVG 내부 좌표계를 0~100으로 설정 (편의상)
          preserveAspectRatio="xMidYMid slice": SVG가 부모 크기에 맞춰 잘리거나 늘어나지 않고 비율을 유지하며 채움
        */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {dots} {/* 생성된 점들 렌더링 */}
        </svg>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="hero-content">
        <h1 ref={headline}>1234</h1>
        <p ref={sub}>456</p>
        <a href="#projects" ref={cta} className="cta-btn">
          789 ↓
        </a>
      </div>
      {/* 스크롤 유도 화살표 */}
      <div ref={arrow} className="scroll-arrow">↓</div>
    </section>
  );
};

export default HeroSection;