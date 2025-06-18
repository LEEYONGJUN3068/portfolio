import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../../styles/pages/Home/HeroSection.scss';

const HeroSection: React.FC = () => {
  // 메인 콘텐츠 요소들을 위한 ref
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  // 배경 도형 요소들을 위한 ref 배열 (SVG 그룹 요소들)
  const numShapes = 25; // 배경에 생성할 도형의 개수 (조절 가능)
  const shapeRefs = useRef<(SVGGElement | null)[]>( // <g> 태그를 참조하므로 SVGGElement 타입 사용
    Array(numShapes).fill(null) // numShapes 만큼의 길이를 가진 null로 채워진 배열로 초기화
  );

  useEffect(() => {
    // 텍스트 콘텐츠 등장 애니메이션 타임라인
    // 헤드라인, 서브 텍스트, CTA 버튼이 순차적으로 나타나도록 설정합니다.
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });

    tl.fromTo(
        headline.current,
        { y: 50, autoAlpha: 0 }, // 시작 상태: y축 50px 아래에서 투명하게 시작
        { y: 0, autoAlpha: 1 }    // 최종 상태: 원래 위치에서 불투명하게 나타남
      )
      .fromTo(
        sub.current,
        { y: 30, autoAlpha: 0 }, // 시작 상태: y축 30px 아래에서 투명하게 시작
        { y: 0, autoAlpha: 1 },  // 최종 상태: 원래 위치에서 불투명하게 나타남
        '-=0.4' // 이전 애니메이션(headline)이 끝나기 0.4초 전에 시작 (겹쳐서 실행)
      )
      .fromTo(
        cta.current,
        { scale: 0.8, autoAlpha: 0 }, // 시작 상태: 80% 크기에서 투명하게 시작
        { scale: 1, autoAlpha: 1 },   // 최종 상태: 100% 크기에서 불투명하게 나타남
        '-=0.4' // 이전 애니메이션(sub)이 끝나기 0.4초 전에 시작 (겹쳐서 실행)
      );

    // 스크롤 유도 화살표 애니메이션
    // 화살표가 y축으로 위아래로 반복 움직이도록 설정합니다.
    gsap.to(arrow.current, {
      y: 10,       // y축으로 10px 이동
      repeat: -1,  // 무한 반복
      yoyo: true,  // 애니메이션이 끝난 후 역방향으로 돌아옴 (왕복 움직임)
      ease: 'power1.inOut', // 부드러운 가속/감속 곡선
      duration: 1.2, // 한 사이클 지속 시간 1.2초
      delay: 1.5,    // 컴포넌트 로드 후 1.5초 뒤에 애니메이션 시작
    });

    // 배경 도형 애니메이션
    shapeRefs.current.forEach(gElement => {
      if (gElement) { // 도형 요소가 null이 아닐 때만 애니메이션을 적용합니다.
        gsap.to(gElement, {
          // x, y를 사용하여 그룹 전체를 무작위로 이동시킵니다.
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
    // 0: 꺾쇠 괄호 (>) 모양, 1: 중괄호 ({) 모양, 2: 슬래시 (/) 모양을 순환하며 생성
    const randomSymbolType = i % 3; 
    const randomSize = gsap.utils.random(8, 25); // 도형의 기본 크기 (조절 가능)

    // 각 도형 그룹의 초기 위치를 SVG viewBox (0~100) 내에서 무작위로 설정합니다.
    const initialX = gsap.utils.random(0, 100);
    const initialY = gsap.utils.random(0, 100);

    const shapeColor = '#4A5568'; // 도형의 색상 (짙은 회색 계열)

    let svgChildElement;

    if (randomSymbolType === 0) { // 꺾쇠 괄호 (>) 심볼
      // '>' 모양의 SVG path 데이터 정의
      svgChildElement = (
        <path
          d={`M0,0 L${randomSize},${randomSize / 2} L0,${randomSize}`}
          fill="none" // 채우기 없음
          stroke={shapeColor} // 선 색상
          strokeWidth={gsap.utils.random(0.5, 1.5)} // 선 두께
        />
      );
    } else if (randomSymbolType === 1) { // 중괄호 ({) 심볼 (간략화된 형태)
      // '{' 모양의 SVG path 데이터 정의 (왼쪽 절반만)
      const braceWidth = randomSize / 3;
      const braceHeight = randomSize;
      svgChildElement = (
        <path
          d={`M${braceWidth},0 C0,0 0,${braceHeight / 2} ${braceWidth},${braceHeight / 2} C0,${braceHeight / 2} 0,${braceHeight} ${braceWidth},${braceHeight}`}
          fill="none"
          stroke={shapeColor}
          strokeWidth={gsap.utils.random(0.5, 1.5)}
        />
      );
    } else { // 슬래시 (/) 심볼
      // '/' 모양의 SVG line 데이터 정의
      svgChildElement = (
        <line
          x1={0} y1={randomSize} // 선의 시작점 (그룹 내 상대적)
          x2={randomSize} y2={0} // 선의 끝점 (그룹 내 상대적)
          stroke={shapeColor}
          strokeWidth={gsap.utils.random(0.5, 1.5)}
        />
      );
    }

    return (
      <g
        key={i} // React 리스트 렌더링을 위한 고유 key
        // 각 <g> 태그에 ref를 연결하여 GSAP이 이 그룹을 조작할 수 있도록 합니다.
        ref={(el: SVGGElement | null) => {
          if (shapeRefs.current) { // shapeRefs.current가 유효한지 확인합니다.
            shapeRefs.current[i] = el;
          }
        }}
        // <g> 태그의 초기 위치를 무작위로 설정합니다.
        // 이 위치는 GSAP의 'x', 'y' (translate) 애니메이션의 시작점이 됩니다.
        transform={`translate(${initialX} ${initialY})`}
        opacity={0.1} // g 그룹의 초기 투명도 (전체 그룹에 적용, 매우 은은하게)
      >
        {svgChildElement} {/* 생성된 심볼 도형을 그룹 안에 포함 */}
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
