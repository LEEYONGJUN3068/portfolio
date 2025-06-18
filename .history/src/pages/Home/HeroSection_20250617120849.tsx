import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../../styles/pages/Home/HeroSection.scss';

const HeroSection: React.FC = () => {
  // 메인 콘텐츠 요소들을 위한 ref
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  // 배경 도형 요소들을 위한 ref 배열 (SVG Graphics Elements)
  const numShapes = 25; // 배경에 생성할 도형의 개수 (조절 가능)
  const shapeRefs = useRef<(SVGGraphicsElement | null)[]>( // SVGCircleElement, SVGRectElement, SVGLineElement, SVGPathElement의 상위 타입
    Array(numShapes).fill(null)
  );

  useEffect(() => {
    // 텍스트 콘텐츠 등장 애니메이션 타임라인
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

    // 스크롤 유도 화살표 애니메이션
    gsap.to(arrow.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: 1.2,
      delay: 1.5,
    });

    // 배경 도형 애니메이션
    shapeRefs.current.forEach(shape => {
      if (shape) { // 도형 요소가 null이 아닐 때만 애니메이션을 적용합니다.
        gsap.to(shape, {
          x: gsap.utils.random(-30, 30), // x축으로 -30 ~ 30 단위 무작위 이동
          y: gsap.utils.random(-30, 30), // y축으로 -30 ~ 30 단위 무작위 이동
          rotation: gsap.utils.random(0, 360), // 0도 ~ 360도 무작위 회전
          opacity: gsap.utils.random(0.05, 0.2), // 0.05 ~ 0.2 무작위 투명도 (매우 은은하게)
          scale: gsap.utils.random(0.8, 1.2), // 크기를 0.8배 ~ 1.2배 무작위로 변경
          duration: gsap.utils.random(10, 20), // 한 애니메이션 사이클이 10초 ~ 20초 동안 지속 (매우 느리게)
          repeat: -1, // 무한 반복
          yoyo: true, // 애니메이션이 끝난 후 역방향으로 돌아옴 (왕복 움직임)
          ease: 'sine.inOut', // 부드러운 가속/감속 곡선
          delay: gsap.utils.random(0, 10), // 0초 ~ 10초 무작위 시작 딜레이
        });
      }
    });

  }, []); // 컴포넌트가 처음 마운트될 때만 이 효과를 실행합니다.

  // SVG 배경에 렌더링할 코딩 심볼 도형들을 생성합니다.
  const shapes = Array.from({ length: numShapes }).map((_, i) => {
    const randomSymbolType = i % 3; // 0, 1, 2 반복 (꺾쇠, 중괄호, 슬래시)
    const randomSize = gsap.utils.random(8, 25); // 도형의 기본 크기 (조절 가능)

    // 각 도형의 초기 위치를 SVG viewBox (0~100) 내에서 무작위로 설정합니다.
    const initialX = gsap.utils.random(0, 100);
    const initialY = gsap.utils.random(0, 100);

    // 도형의 색상을 정의합니다. (배경색과 잘 어울리는 은은한 색상)
    const shapeColor = '#4A5568'; // 짙은 회색 계열

    let svgElement;
    // 타입 단언을 위한 변수
    let refType: SVGGraphicsElement | null = null;

    if (randomSymbolType === 0) { // 꺾쇠 괄호 (< >)
      // <path d="..."> 속성으로 꺾쇠 모양을 정의합니다.
      // 크기와 위치에 따라 d 속성 값을 조절합니다.
      const pathData = `M${initialX - randomSize / 2},${initialY} 
                        L${initialX},${initialY - randomSize / 2} 
                        L${initialX + randomSize / 2},${initialY} 
                        L${initialX},${initialY + randomSize / 2} Z`;
      svgElement = (
        <path
          d={pathData}
          fill="none" // 채우기 없음
          stroke={shapeColor} // 선 색상
          strokeWidth={gsap.utils.random(0.5, 1.5)} // 선 두께
          opacity={0.15} // 초기 투명도
          ref={el => { refType = el; }} // ref 할당
        />
      );
    } else if (randomSymbolType === 1) { // 중괄호 ({ })
      // 간략화된 중괄호 모양
      const pathData = `M${initialX},${initialY - randomSize / 2} 
                        C${initialX - randomSize / 4},${initialY - randomSize / 2},
                          ${initialX - randomSize / 2},${initialY - randomSize / 4},
                          ${initialX - randomSize / 2},${initialY}
                        C${initialX - randomSize / 2},${initialY + randomSize / 4},
                          ${initialX - randomSize / 4},${initialY + randomSize / 2},
                          ${initialX},${initialY + randomSize / 2}`;
      svgElement = (
        <path
          d={pathData}
          fill="none"
          stroke={shapeColor}
          strokeWidth={gsap.utils.random(0.5, 1.5)}
          opacity={0.15}
          ref={el => { refType = el; }}
        />
      );
    } else { // 슬래시 (/)
      // 간단한 선으로 슬래시 표현
      svgElement = (
        <line
          x1={initialX - randomSize / 2}
          y1={initialY + randomSize / 2}
          x2={initialX + randomSize / 2}
          y2={initialY - randomSize / 2}
          stroke={shapeColor}
          strokeWidth={gsap.utils.random(0.5, 1.5)}
          opacity={0.15}
          ref={el => { refType = el; }}
        />
      );
    }

    return (
      <g
        key={i}
        ref={el => {
          if (shapeRefs.current) {
            shapeRefs.current[i] = el as SVGGElement | null; // <g>는 SVGGraphicsElement의 하위 타입
          }
        }}
        // <g> 태그의 초기 위치를 무작위로 설정
        transform={`translate(${initialX} ${initialY})`}
        opacity={0.1} // g 그룹의 초기 투명도 (전체 그룹에 적용)
      >
        {svgElement} {/* 생성된 심볼 도형을 그룹 안에 포함 */}
      </g>
    );
  });

  return (
    <section id="hero" className="hero-section">
      {/* 배경 SVG 컨테이너: 메인 콘텐츠 뒤에 위치하고 마우스 이벤트를 무시합니다. */}
      <div className="hero-background-svg">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {shapes} {/* 생성된 도형 그룹들을 렌더링합니다. */}
        </svg>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="hero-content">
        <h1 ref={headline}>123</h1> {/* 텍스트 변경 */}
        <p ref={sub}>456</p> {/* 텍스트 변경 */}
        <a href="#projects" ref={cta} className="cta-btn">
          789 ↓
        </a> {/* 텍스트 변경 */}
      </div>
      {/* 스크롤 유도 화살표 */}
      <div ref={arrow} className="scroll-arrow">↓</div>
    </section>
  );
};

export default HeroSection;
