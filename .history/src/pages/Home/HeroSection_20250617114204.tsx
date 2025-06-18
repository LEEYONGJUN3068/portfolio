import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../../styles/pages/Home/HeroSection.scss';

const HeroSection: React.FC = () => {
  // 메인 콘텐츠 요소들을 위한 ref
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  // 배경의 선(line) 요소들을 위한 ref 배열
  const numDots = 20; // 생성할 선의 개수 (조절 가능)
  const dotRefs = useRef<(SVGLineElement | null)[]>(
    Array(numDots).fill(null) // numDots 만큼의 길이를 가진 null로 채워진 배열로 초기화
  );

  useEffect(() => {
    // 텍스트 콘텐츠 애니메이션 타임라인
    // headline, sub, cta가 순차적으로 나타나도록 설정
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });

    tl.fromTo(
        headline.current,
        { y: 50, autoAlpha: 0 }, // 시작: y축 50px 아래, 투명
        { y: 0, autoAlpha: 1 }    // 끝: 원래 위치, 불투명
      )
      .fromTo(
        sub.current,
        { y: 30, autoAlpha: 0 }, // 시작: y축 30px 아래, 투명
        { y: 0, autoAlpha: 1 },  // 끝: 원래 위치, 불투명
        '-=0.4' // 이전 애니메이션(headline) 종료 0.4초 전에 시작
      )
      .fromTo(
        cta.current,
        { scale: 0.8, autoAlpha: 0 }, // 시작: 80% 크기, 투명
        { scale: 1, autoAlpha: 1 },   // 끝: 100% 크기, 불투명
        '-=0.4' // 이전 애니메이션(sub) 종료 0.4초 전에 시작
      );

    // 스크롤 유도 화살표 애니메이션
    // 화살표가 y축으로 위아래로 반복 움직이도록 설정
    gsap.to(arrow.current, {
      y: 10,       // y축으로 10px 이동
      repeat: -1,  // 무한 반복
      yoyo: true,  // 애니메이션이 끝난 후 역방향으로 돌아옴 (왕복 움직임)
      ease: 'power1.inOut', // 부드러운 가속/감속 곡선
      duration: 1.2, // 한 사이클 지속 시간 1.2초
      delay: 1.5,    // 컴포넌트 로드 후 1.5초 뒤 시작
    });

    // 배경 선 애니메이션
    // 각 선이 무작위로 움직이고 투명도와 두께가 변하도록 설정
    dotRefs.current.forEach(line => {
      if (line) { // line 요소가 null이 아닐 때만 애니메이션 적용
        gsap.to(line, {
          x1: gsap.utils.random(-15, 15), // x1 좌표를 무작위로 이동
          y1: gsap.utils.random(-15, 15), // y1 좌표를 무작위로 이동
          x2: gsap.utils.random(-15, 15), // x2 좌표를 무작위로 이동
          y2: gsap.utils.random(-15, 15), // y2 좌표를 무작위로 이동
          opacity: gsap.utils.random(0.1, 0.4), // 0.1 ~ 0.4 무작위 투명도 (은은하게)
          strokeWidth: gsap.utils.random(0.5, 2.5), // 0.5px ~ 2.5px 무작위 선 두께
          duration: gsap.utils.random(8, 15), // 8초 ~ 15초 무작위 지속 시간 (매우 느리게)
          repeat: -1, // 무한 반복
          yoyo: true, // 왕복 움직임
          ease: 'sine.inOut', // 부드러운 가속/감속
          delay: gsap.utils.random(0, 5), // 0초 ~ 5초 무작위 시작 딜레이
        });
      }
    });

  }, []); // 컴포넌트가 처음 마운트될 때만 이 효과를 실행

  // SVG 배경에 렌더링할 선들을 생성
  const dots = Array.from({ length: numDots }).map((_, i) => (
    <line
      key={i} // React 리스트 렌더링을 위한 고유 key
      // 초기 위치를 SVG viewBox (0~100) 내에서 무작위로 설정
      x1={gsap.utils.random(0, 100)}
      y1={gsap.utils.random(0, 100)}
      x2={gsap.utils.random(0, 100)}
      y2={gsap.utils.random(0, 100)}
      stroke="#4A5568" // 선 색상 (짙은 회색 계열)
      strokeWidth={gsap.utils.random(0.5, 1.5)} // 선의 초기 두께
      opacity={0.3} // 선의 초기 투명도
      // ref 콜백을 사용하여 실제 DOM 요소를 dotRefs 배열에 저장
      // TypeScript가 SVGCircleElement를 추론할 수 있도록 SVGLineElement로 타입 단언
      ref={el => (dotRefs.current[i] = el as SVGLineElement | null)}
    />
  ));

  return (
    <section id="hero" className="hero-section">
      {/* 배경 SVG 컨테이너: 메인 콘텐츠 뒤에 위치하고 마우스 이벤트를 무시 */}
      <div className="hero-background-svg">
        {/*
          viewBox="0 0 100 100": SVG 내부 좌표계를 0~100으로 설정하여 편의성 증대
          preserveAspectRatio="xMidYMid slice": SVG가 부모 크기에 맞춰 잘리거나 늘어나지 않고 비율을 유지하며 영역을 채움
        */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {dots} {/* 생성된 선들 렌더링 */}
        </svg>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="hero-content">
        <h1 ref={headline}>안녕하세요, 퍼블리셔 OOO입니다.</h1> {/* 기존 텍스트 유지 */}
        <p ref={sub}>SCSS · JavaScript · GSAP · React</p> {/* 기존 텍스트 유지 */}
        <a href="#projects" ref={cta} className="cta-btn">
          프로젝트 보러가기 ↓
        </a> {/* 기존 텍스트 유지 */}
      </div>
      {/* 스크롤 유도 화살표 */}
      <div ref={arrow} className="scroll-arrow">↓</div>
    </section>
  );
};

export default HeroSection;