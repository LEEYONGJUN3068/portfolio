import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // ScrollTrigger 플러그인 임포트

// GSAP 플러그인 등록: ScrollTrigger를 사용하기 위해 필수적입니다.
gsap.registerPlugin(ScrollTrigger);

import '../../styles/pages/Home/HeroSection.scss';

const HeroSection: React.FC = () => {
  // 메인 콘텐츠 요소들을 위한 ref
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  // 배경의 그룹(g) 요소들을 위한 ref 배열 (각 g 태그 안에 선이 들어갑니다)
  const numLines = 20; // 배경에 생성할 선 그룹의 개수 (조절 가능)
  const lineGroupRefs = useRef<(SVGGElement | null)[]>(
    // numLines만큼의 길이를 가진 null로 채워진 배열로 초기화합니다.
    Array(numLines).fill(null)
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

    // 배경 선 그룹 애니메이션 및 패럴랙스 스크롤 효과
    // 각 선 그룹(<g> 태그)이 무작위로 움직이고 투명도 및 크기가 변하도록 설정합니다.
    lineGroupRefs.current.forEach(gElement => {
      if (gElement) { // gElement가 null이 아닐 때만 애니메이션을 적용합니다.
        gsap.to(gElement, {
          // x, y를 사용하여 그룹 자체를 이동시킵니다. (translate)
          x: gsap.utils.random(-30, 30), // x축으로 -30 ~ 30 단위 무작위 이동
          y: gsap.utils.random(-30, 30), // y축으로 -30 ~ 30 단위 무작위 이동
          opacity: gsap.utils.random(0.1, 0.4), // 0.1 ~ 0.4 무작위 투명도 (은은하게)
          scale: gsap.utils.random(0.8, 1.2), // 그룹의 크기를 0.8배 ~ 1.2배 무작위로 변경
          duration: gsap.utils.random(8, 15), // 한 애니메이션 사이클이 8초 ~ 15초 동안 지속 (매우 느리게)
          repeat: -1, // 무한 반복
          yoyo: true, // 애니메이션이 끝난 후 역방향으로 돌아옴 (왕복 움직임)
          ease: 'sine.inOut', // 부드러운 가속/감속 곡선
          delay: gsap.utils.random(0, 5), // 0초 ~ 5초 무작위 시작 딜레이

          // --- 패럴랙스 스크롤 효과 설정 ---
          scrollTrigger: {
            trigger: "#hero",        // "#hero" 섹션이 스크롤 트리거 역할을 합니다.
            start: "top top",        // Hero Section의 상단이 뷰포트 상단에 닿을 때 애니메이션 시작
            end: "bottom top",       // Hero Section의 하단이 뷰포트 상단에 닿을 때 애니메이션 종료
            scrub: 1,                // 스크롤과 애니메이션을 부드럽게 동기화합니다 (1초 지연).
            // markers: true // 디버깅용 마커를 표시합니다. 실제 배포 시에는 이 줄을 제거하세요.
          },
          // yPercent: 스크롤되는 동안 요소를 Y축으로 상대적으로 이동시킵니다.
          // 각 선마다 다른 속도와 방향으로 움직여 더 다채로운 패럴랙스 효과를 만듭니다.
          yPercent: gsap.utils.random(-50, 50)
          // --- 패럴랙스 스크롤 효과 끝 ---
        });
      }
    });

  }, []); // 컴포넌트가 처음 마운트될 때만 이 효과를 실행합니다.

  // SVG 배경에 렌더링할 선들을 생성합니다. 각 선은 <g> (그룹) 태그로 감쌉니다.
  const lines = Array.from({ length: numLines }).map((_, i) => (
    <g
      key={i} // React 리스트 렌더링을 위한 고유 key
      // 각 <g> 태그에 ref를 연결하여 GSAP이 이 그룹을 조작할 수 있도록 합니다.
      ref={(el: SVGGElement | null) => {
        if (lineGroupRefs.current) { // lineGroupRefs.current가 유효한지 확인합니다.
          lineGroupRefs.current[i] = el;
        }
      }}
      // <g> 태그의 초기 위치를 무작위로 설정합니다. (선의 기본 위치)
      // 이 값들은 나중에 GSAP의 'x', 'y' (translate) 애니메이션의 시작점이 됩니다.
      transform={`translate(${gsap.utils.random(0, 100)} ${gsap.utils.random(0, 100)})`}
      opacity={0.3} // g 그룹의 초기 투명도
    >
      {/* g 그룹 내부에 실제 SVG <line> 요소를 정의합니다. */}
      {/* <line>의 x1, y1, x2, y2는 <g> 그룹의 좌표계를 기준으로 합니다. */}
      <line
        x1={gsap.utils.random(-10, 10)} // 선의 시작점 x좌표 (그룹 내 상대적)
        y1={gsap.utils.random(-10, 10)} // 선의 시작점 y좌표 (그룹 내 상대적)
        x2={gsap.utils.random(-10, 10)} // 선의 끝점 x좌표 (그룹 내 상대적)
        y2={gsap.utils.random(-10, 10)} // 선의 끝점 y좌표 (그룹 내 상대적)
        stroke="#4A5568" // 선 색상 (짙은 회색 계열)
        strokeWidth={gsap.utils.random(0.5, 1.5)} // 선의 초기 두께
      />
    </g>
  ));

  return (
    <section id="hero" className="hero-section">
      {/* 배경 SVG 컨테이너: 메인 콘텐츠 뒤에 위치하고 마우스 이벤트를 무시합니다. */}
      <div className="hero-background-svg">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {lines} {/* 생성된 선 그룹들을 렌더링합니다. */}
        </svg>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="hero-content">
        <h1 ref={headline}>안녕하세요, 퍼블리셔 OOO입니다.</h1>
        <p ref={sub}>SCSS · JavaScript · GSAP · React</p>
        <a href="#projects" ref={cta} className="cta-btn">
          프로젝트 보러가기 ↓
        </a>
      </div>
      {/* 스크롤 유도 화살표 */}
      <div ref={arrow} className="scroll-arrow">↓</div>
    </section>
  );
};

export default HeroSection;
