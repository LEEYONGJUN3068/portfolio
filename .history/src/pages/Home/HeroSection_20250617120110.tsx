import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../../styles/pages/Home/HeroSection.scss';

const HeroSection: React.FC = () => {
  // 메인 콘텐츠 요소들을 위한 ref
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  // 배경 도형 요소들을 위한 ref 배열 (원, 사각형 혼합)
  const numShapes = 25; // 배경에 생성할 도형의 개수 (조절 가능)
  const shapeRefs = useRef<(SVGCircleElement | SVGRectElement | null)[]>(
    // numShapes 길이만큼 null로 채워진 배열로 초기화합니다.
    Array(numShapes).fill(null)
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
    shapeRefs.current.forEach(shape => {
      if (shape) { // 도형 요소가 null이 아닐 때만 애니메이션을 적용합니다.
        gsap.to(shape, {
          // x, y를 사용하여 도형을 무작위로 이동시킵니다.
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

  // SVG 배경에 렌더링할 도형들을 생성합니다. (원과 사각형을 섞어서)
  const shapes = Array.from({ length: numShapes }).map((_, i) => {
    // 짝수 인덱스는 원, 홀수 인덱스는 사각형으로 생성하여 다양한 도형을 만듭니다.
    const isCircle = i % 2 === 0; 
    const randomSize = gsap.utils.random(5, 15); // 도형의 기본 크기 (반지름 또는 너비/높이)

    // 각 도형의 초기 위치를 SVG viewBox (0~100) 내에서 무작위로 설정합니다.
    const initialX = gsap.utils.random(0, 100);
    const initialY = gsap.utils.random(0, 100);

    // 도형의 색상을 정의합니다. (배경색과 잘 어울리는 은은한 색상)
    const shapeColor = '#4A5568'; // 짙은 회색 계열

    if (isCircle) {
      return (
        <circle
          key={i} // React 리스트 렌더링을 위한 고유 key
          cx={initialX} // 원의 중심 X좌표
          cy={initialY} // 원의 중심 Y좌표
          r={randomSize / 2} // 원의 반지름
          fill={shapeColor} // 원의 채우기 색상
          opacity={0.1} // 원의 초기 투명도
          // ref 콜백을 사용하여 실제 DOM 요소를 shapeRefs 배열에 저장
          ref={(el: SVGCircleElement | null) => {
            if (shapeRefs.current) {
              shapeRefs.current[i] = el;
            }
          }}
        />
      );
    } else {
      return (
        <rect
          key={i} // React 리스트 렌더링을 위한 고유 key
          x={initialX - randomSize / 2} // 사각형의 좌상단 X좌표 (중심 기준 조절)
          y={initialY - randomSize / 2} // 사각형의 좌상단 Y좌표 (중심 기준 조절)
          width={randomSize} // 사각형의 너비
          height={randomSize} // 사각형의 높이
          fill={shapeColor} // 사각형의 채우기 색상
          opacity={0.1} // 사각형의 초기 투명도
          // ref 콜백을 사용하여 실제 DOM 요소를 shapeRefs 배열에 저장
          ref={(el: SVGRectElement | null) => {
            if (shapeRefs.current) {
              shapeRefs.current[i] = el;
            }
          }}
        />
      );
    }
  });

  return (
    <section id="hero" className="hero-section">
      {/* 배경 SVG 컨테이너: 메인 콘텐츠 뒤에 위치하고 마우스 이벤트를 무시합니다. */}
      <div className="hero-background-svg">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {shapes} {/* 생성된 도형들을 렌더링합니다. */}
        </svg>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="hero-content">
        <h1 ref={headline}>123</h1> {/* 의미 없는 텍스트로 변경 */}
        <p ref={sub}>456</p> {/* 의미 없는 텍스트로 변경 */}
        <a href="#projects" ref={cta} className="cta-btn">
          789 ↓
        </a> {/* 의미 없는 텍스트로 변경 */}
      </div>
      {/* 스크롤 유도 화살표 */}
      <div ref={arrow} className="scroll-arrow">↓</div>
    </section>
  );
};

export default HeroSection;
