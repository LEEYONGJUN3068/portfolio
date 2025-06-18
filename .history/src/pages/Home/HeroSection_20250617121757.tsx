import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../../styles/pages/Home/HeroSection.scss';

const HeroSection: React.FC = () => {
  // 메인 콘텐츠 요소들을 위한 ref
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  // 배경의 코드 심볼 요소들을 위한 ref 배열 (각 심볼을 담을 div)
  const numSymbols = 30; // 배경에 생성할 심볼의 개수 (조절 가능)
  const symbolRefs = useRef<(HTMLDivElement | null)[]>(
    // numSymbols 길이만큼 null로 채워진 배열로 초기화
    Array(numSymbols).fill(null)
  );

  // 코드와 관련된 심볼 문자열 배열
  const codeSymbols = ['</>', '{}', '[]', '()', ';', '=', '//', '*'];

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

    // 배경 코드 심볼 애니메이션
    // 각 심볼 요소를 무작위로 이동, 회전, 투명도 및 크기 변경합니다.
    symbolRefs.current.forEach(symbolElement => {
      if (symbolElement) { // 심볼 요소가 null이 아닐 때만 애니메이션을 적용합니다.
        gsap.to(symbolElement, {
          x: gsap.utils.random(-50, 50), // x축으로 -50 ~ 50vw 단위 무작위 이동
          y: gsap.utils.random(-50, 50), // y축으로 -50 ~ 50vh 단위 무작위 이동
          rotation: gsap.utils.random(-360, 360), // -360도 ~ 360도 무작위 회전
          opacity: gsap.utils.random(0.02, 0.1), // 0.02 ~ 0.1 무작위 투명도 (매우 은은하게)
          scale: gsap.utils.random(0.5, 1.5), // 크기를 0.5배 ~ 1.5배 무작위로 변경
          duration: gsap.utils.random(15, 30), // 한 애니메이션 사이클이 15초 ~ 30초 동안 지속 (매우 느리게)
          repeat: -1, // 무한 반복
          yoyo: true, // 애니메이션이 끝난 후 역방향으로 돌아옴 (왕복 움직임)
          ease: 'sine.inOut', // 부드러운 가속/감속 곡선
          delay: gsap.utils.random(0, 15), // 0초 ~ 15초 무작위 시작 딜레이
        });
      }
    });

  }, []); // 컴포넌트가 처음 마운트될 때만 이 효과를 실행합니다.

  // 배경에 렌더링할 코드 심볼 요소들을 생성합니다.
  const backgroundSymbols = Array.from({ length: numSymbols }).map((_, i) => {
    // codeSymbols 배열에서 무작위로 심볼을 선택합니다.
    const randomSymbol = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
    const randomFontSize = gsap.utils.random(20, 60); // 심볼의 무작위 글꼴 크기

    return (
      <div
        key={i} // React 리스트 렌더링을 위한 고유 key
        className="code-symbol"
        style={{
          // 초기 위치를 뷰포트 너비/높이 내에서 무작위로 설정합니다.
          // 이 위치는 GSAP의 'x', 'y' (translate) 애니메이션의 시작점이 됩니다.
          left: `${gsap.utils.random(0, 100)}vw`, 
          top: `${gsap.utils.random(0, 100)}vh`,  
          fontSize: `${randomFontSize}px`,
          color: '#4A5568', // 심볼의 색상 (은은한 짙은 회색)
          opacity: 0, // 초기 투명도 (GSAP이 애니메이션으로 나타나게 함)
        }}
        // ref 콜백을 사용하여 실제 DOM 요소를 symbolRefs 배열에 저장합니다.
        ref={el => (symbolRefs.current[i] = el)}
      >
        {randomSymbol} {/* 선택된 코드 심볼을 렌더링 */}
      </div>
    );
  });

  return (
    <section id="hero" className="hero-section">
      {/* 코드 심볼 배경 컨테이너 */}
      <div className="code-symbol-background">
        {backgroundSymbols} {/* 생성된 심볼 요소들을 렌더링합니다. */}
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
