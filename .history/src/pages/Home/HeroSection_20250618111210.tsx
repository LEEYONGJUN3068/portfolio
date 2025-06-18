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
  const numSymbols = 20; // 배경에 생성할 심볼의 개수 (조절 가능)
  const symbolRefs = useRef<(HTMLDivElement | null)[]>(
    Array(numSymbols).fill(null) // numSymbols 길이만큼 null로 채워진 배열로 초기화
  );

  // 코드와 관련된 심볼 문자열 배열
  const codeSymbols = ['</>', '{}', '[]', '()', ';', '=', '//', '*'];

  useEffect(() => {
    // 텍스트 콘텐츠 등장 애니메이션 타임라인
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
    gsap.to(arrow.current, {
      y: 10,       // y축으로 10px 이동
      repeat: -1,  // 무한 반복
      yoyo: true,  // 애니메이션이 끝난 후 역방향으로 돌아옴 (왕복 움직임)
      ease: 'power1.inOut', // 부드러운 가속/감속 곡선
      duration: 1.2, // 한 사이클 지속 시간 1.2초
      delay: 1.5,    // 컴포넌트 로드 후 1.5초 뒤에 애니메이션 시작
    });

    // 배경 코드 심볼 애니메이션 (gsap.fromTo로 변경하여 초기 등장과 반복 애니메이션을 명확히 함)
    symbolRefs.current.forEach(symbolElement => {
      if (symbolElement) { // 심볼 요소가 null이 아닐 때만 애니메이션을 적용합니다.
        const initialX = parseFloat(symbolElement.style.left || '0');
        const initialY = parseFloat(symbolElement.style.top || '0');
        const randomScale = gsap.utils.random(0.5, 1.5);
        const randomRotation = gsap.utils.random(-360, 360);
        const randomOpacityTarget = gsap.utils.random(0.1, 0.4); // 더욱 눈에 띄는 투명도 범위

        // 각 심볼의 개별 타임라인 생성
        const symbolTl = gsap.timeline({
          repeat: -1, // 무한 반복
          yoyo: true, // 왕복 움직임
          ease: 'sine.inOut', // 부드러운 가속/감속
          delay: gsap.utils.random(0, 15) // 무작위 딜레이로 비동기적인 움직임 연출
        });

        symbolTl
          // 초기 등장 애니메이션 (투명하게 시작해서 목표 투명도까지 나타남)
          .fromTo(
            symbolElement,
            {
              opacity: 0,
              x: initialX + gsap.utils.random(-100, 100), // 초기 등장 위치를 랜덤하게 더 멀리 설정
              y: initialY + gsap.utils.random(-100, 100),
              scale: 0, // 초기 크기 0
              rotation: gsap.utils.random(-180, 180) // 초기 회전
            },
            {
              opacity: randomOpacityTarget,
              x: initialX, // 원래 위치로 이동
              y: initialY,
              scale: randomScale, // 원래 크기 (또는 랜덤 스케일)
              rotation: randomRotation, // 원래 회전
              duration: 2, // 등장 애니메이션 시간
              ease: 'power2.out'
            }
          )
          // 등장 후의 반복적인 움직임 애니메이션
          .to(symbolElement, {
            x: initialX + gsap.utils.random(-150, 150), // 현재 위치에서 추가적인 무작위 이동
            y: initialY + gsap.utils.random(-150, 150),
            rotation: gsap.utils.random(-360, 360), // 추가 회전
            opacity: gsap.utils.random(0.1, 0.4), // 깜빡임 효과 (미묘한 투명도 변화)
            scale: gsap.utils.random(0.8, 1.2), // 크기 변화
            duration: gsap.utils.random(15, 30), // 움직임 애니메이션 시간
            ease: 'sine.inOut'
          });
      }
    });

  }, []); // 컴포넌트가 처음 마운트될 때만 이 효과를 실행합니다.

  // 배경에 렌더링할 코드 심볼 요소들을 생성합니다.
  const backgroundSymbols = Array.from({ length: numSymbols }).map((_, i) => {
    // codeSymbols 배열에서 무작위로 심볼을 선택합니다.
    const randomSymbol = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
    const randomFontSize = gsap.utils.random(20, 60); // 심볼의 무작위 글꼴 크기

    // `left`와 `top`은 초기 배치에만 사용하고, 애니메이션은 `x`, `y`로 GSAP에 맡깁니다.
    // CSS에서 `opacity`를 0으로 설정하여 초기 로딩 시 보이지 않게 합니다.
    return (
      <div
        key={i} // React 리스트 렌더링을 위한 고유 key
        className="code-symbol"
        style={{
          left: `${gsap.utils.random(0, 100)}vw`, // 뷰포트 너비 기준으로 초기 X 위치
          top: `${gsap.utils.random(0, 100)}vh`,  // 뷰포트 높이 기준으로 초기 Y 위치
          fontSize: `${randomFontSize}px`,
          color: '#A0AEC0', // 심볼의 색상을 더 밝게 변경하여 어두운 배경에 잘 보이도록 함
        }}
        // ref 콜백을 사용하여 실제 DOM 요소를 symbolRefs 배열에 저장합니다.
        ref={(el: HTMLDivElement | null) => {
          // symbolRefs.current가 항상 배열임을 보장 (useRef 초기화 시점)
          // TypeScript에게 el이 HTMLDivElement 또는 null 임을 명시
          (symbolRefs.current as (HTMLDivElement | null)[])[i] = el;
        }}
      >
        {randomSymbol} {/* 선택된 코드 심볼을 렌더링 */}
      </div>
    );
  });

  return (
    <section id="hero">
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
