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

    // 배경 선 애니메이션
    dotRefs.current.forEach(line => {
      if (line) {
        gsap.to(line, {
          // --- 이 부분이 변경되었습니다! ---
          // x1, y1, x2, y2 대신 translateX와 translateY를 사용합니다.
          // SVG 요소의 중심을 기준으로 움직이므로, 초기 x1/y1/x2/y2 값은 그대로 둡니다.
          x: gsap.utils.random(-15, 15), // x축으로 -15 ~ 15 단위 무작위 이동 (translateX)
          y: gsap.utils.random(-15, 15), // y축으로 -15 ~ 15 단위 무작위 이동 (translateY)
          // --- 여기까지 ---
          opacity: gsap.utils.random(0.1, 0.4),
          strokeWidth: gsap.utils.random(0.5, 2.5),
          duration: gsap.utils.random(8, 15),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 5),
        });
      }
    });

  }, []);

  const dots = Array.from({ length: numDots }).map((_, i) => (
    <line
      key={i}
      // 초기 위치를 SVG viewBox (0~100) 내에서 무작위로 설정
      // 이 값들은 고정된 채로, 위 GSAP에서 transform을 통해 움직입니다.
      x1={gsap.utils.random(0, 100)}
      y1={gsap.utils.random(0, 100)}
      x2={gsap.utils.random(0, 100)}
      y2={gsap.utils.random(0, 100)}
      stroke="#4A5568" // 선 색상 (짙은 회색 계열)
      strokeWidth={gsap.utils.random(0.5, 1.5)} // 선의 초기 두께
      opacity={0.3} // 선의 초기 투명도
      ref={el => (dotRefs.current[i] = el as SVGLineElement | null)}
    />
  ));

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background-svg">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {dots}
        </svg>
      </div>

      <div className="hero-content">
        <h1 ref={headline}></h1> {/* 내용 비워둠 (JS에서 채움) */}
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