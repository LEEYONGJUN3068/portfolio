import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../../styles/pages/Home/HeroSection.scss';

const HeroSection: React.FC = () => {
  // 메인 콘텐츠 요소들을 위한 ref
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  // 배경의 그룹(g) 요소들을 위한 ref 배열 (라인은 이 g 안에 들어갑니다)
  const numDots = 20; // 생성할 선의 개수 (조절 가능)
  const dotRefs = useRef<(SVGGElement | null)[]>( // 타입을 SVGGElement로 변경!
    Array(numDots).fill(null)
  );

  // 텍스트 스크램블링을 위한 캐릭터 셋
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|:;"<>,.?/~`';

  // 텍스트 스크램블링 함수
  const scrambleText = (target: HTMLElement | null, text: string, duration: number, delay: number = 0) => {
    if (!target) return;
    const splitText = text.split('').map(char => {
      const span = document.createElement('span');
      span.innerText = char;
      return span;
    });
    target.innerHTML = '';
    splitText.forEach(span => target.appendChild(span));

    gsap.to(splitText, {
      duration: duration,
      delay: delay,
      ease: 'power1.out',
      stagger: {
        each: 0.05,
        from: 'random',
      },
      onUpdate: function() {
        splitText.forEach((span, i) => {
          if (this.progress() < 1) {
            span.innerText = chars[gsap.utils.random(0, chars.length - 1, 1)];
          } else {
            span.innerText = text[i];
          }
        });
      },
      onComplete: function() {
        splitText.forEach((span, i) => {
          span.innerText = text[i];
        });
      }
    });
  };


  useEffect(() => {
    // 메인 텍스트 콘텐츠 애니메이션 타임라인
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });

    // 1. 헤드라인 스크램블 애니메이션 호출
    scrambleText(headline.current, "안녕하세요, 퍼블리셔 OOO입니다.", 1.5, 0.5);

    // 2. sub 텍스트 등장 애니메이션
    tl.fromTo(
        sub.current,
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1 },
        '>=2'
      )
      // 3. CTA 버튼 등장 애니메이션
      .fromTo(
        cta.current,
        { scale: 0.8, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1 },
        '-=0.4'
      );

    // 4. 스크롤 유도 화살표 애니메이션
    gsap.to(arrow.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: 1.2,
      delay: 1.5,
    });

    // 배경 선 애니메이션 (이제 <g> 태그를 애니메이션합니다)
    dotRefs.current.forEach(gElement => { // 변수 이름을 'gElement'로 변경
      if (gElement) {
        gsap.to(gElement, { // <g> 태그를 애니메이션 대상으로 지정
          x: gsap.utils.random(-15, 15), // x축으로 -15 ~ 15 단위 무작위 이동
          y: gsap.utils.random(-15, 15), // y축으로 -15 ~ 15 단위 무작위 이동
          opacity: gsap.utils.random(0.1, 0.4),
          // <g> 태그에는 strokeWidth가 직접 적용되지 않습니다.
          // 대신 <line> 태그 자체의 strokeWidth를 애니메이션하거나,
          // 여기에 scale을 적용하여 선을 늘리거나 줄이는 효과를 낼 수 있습니다.
          scale: gsap.utils.random(0.8, 1.2), // g 태그의 scale을 애니메이션
          duration: gsap.utils.random(8, 15),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 5),
        });
      }
    });

  }, []);

  // SVG 배경에 렌더링할 선들을 생성 (각 선을 <g> 태그로 감쌉니다)
  const dots = Array.from({ length: numDots }).map((_, i) => (
    <g
      key={i}
      // 각 <g> 태그에 ref를 연결합니다.
      ref={el => (dotRefs.current[i] = el as SVGGElement | null)}
      // <g> 태그의 초기 위치를 무작위로 설정 (선이 그려질 위치)
      // 이 값들은 GSAP에서 transform될 때 시작점이 됩니다.
      transform={`translate(${gsap.utils.random(0, 100)} ${gsap.utils.random(0, 100)})`}
      opacity={0.3} // g 그룹의 초기 투명도
    >
      <line
        x1={gsap.utils.random(-10, 10)} // g 내부에서 선의 상대적 시작점
        y1={gsap.utils.random(-10, 10)}
        x2={gsap.utils.random(-10, 10)} // g 내부에서 선의 상대적 끝점
        y2={gsap.utils.random(-10, 10)}
        stroke="#4A5568" // 선 색상
        strokeWidth={gsap.utils.random(0.5, 1.5)} // 선 두께
      />
    </g>
  ));

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background-svg">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {dots}
        </svg>
      </div>

      <div className="hero-content">
        <h1 ref={headline}></h1>
        <p ref={sub}>SCSS · JavaScript · GSAP · React</p>
        <a href="#projects" ref={cta} className="cta-btn">
          프로젝트 보러가기 ↓
        </a>
      </div>
      <div ref={arrow} className="scroll-arrow">↓</div>
    </section>
  );
};

export default HeroSection;