import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
// TextPlugin은 Club GreenSock 회원 전용이지만, 여기서는 유사 효과를 직접 구현합니다.
// import { TextPlugin } from 'gsap/TextPlugin';
// gsap.registerPlugin(TextPlugin); // TextPlugin 사용 시 필요

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
    Array(numDots).fill(null)
  );

  // 텍스트 스크램블링을 위한 캐릭터 셋
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|:;"<>,.?/~`';

  // 텍스트 스크램블링 함수
  // target: 스크램블할 DOM 요소
  // text: 최종적으로 보여줄 텍스트
  // duration: 스크램블 애니메이션 지속 시간
  // delay: 스크램블 애니메이션 시작 딜레이
  const scrambleText = (target: HTMLElement | null, text: string, duration: number, delay: number = 0) => {
    if (!target) return;

    // 각 글자를 <span>으로 감싸서 DOM에 추가
    const splitText = text.split('').map(char => {
      const span = document.createElement('span');
      span.innerText = char;
      return span;
    });
    target.innerHTML = ''; // 기존 내용 지우기
    splitText.forEach(span => target.appendChild(span));

    gsap.to(splitText, {
      duration: duration,
      delay: delay,
      ease: 'power1.out',
      stagger: {
        each: 0.05, // 각 글자 애니메이션 간의 딜레이
        from: 'random', // 무작위 순서로 애니메이션
      },
      onUpdate: function() {
        splitText.forEach((span, i) => {
          if (this.progress() < 1) { // 애니메이션이 완료되기 전까지
            span.innerText = chars[gsap.utils.random(0, chars.length - 1, 1)];
          } else {
            span.innerText = text[i]; // 애니메이션 완료 후 최종 텍스트 설정
          }
        });
      },
      onComplete: function() {
        splitText.forEach((span, i) => {
          span.innerText = text[i]; // 최종적으로 다시 한번 확인 (간혹 타이밍 문제로 마지막 프레임이 아닐 수 있음)
        });
      }
    });
  };


  useEffect(() => {
    // 텍스트 콘텐츠 애니메이션 타임라인
    // headline은 scrambleText 함수로 처리
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });

    // 헤드라인 스크램블 애니메이션 호출
    scrambleText(headline.current, "안녕하세요, 퍼블리셔 OOO입니다.", 1.5, 0.5); // 1.5초 동안 0.5초 딜레이 후

    tl.fromTo( // headline 애니메이션이 끝난 후에 실행되도록 지연
        sub.current,
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1 },
        // headline 스크램블 애니메이션 duration + delay 후에 시작하도록 조정
        // 여기서는 대략 1.5초 + 0.5초 = 2초 후에 시작하도록
        '>=2' // 이전 애니메이션이 끝나고 2초 후에 시작 (정확한 시간 지정)
      )
      .fromTo(
        cta.current,
        { scale: 0.8, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1 },
        '-=0.4' // sub 애니메이션 종료 0.4초 전에 시작
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

    // 배경 선 애니메이션
    dotRefs.current.forEach(line => {
      if (line) {
        gsap.to(line, {
          x1: gsap.utils.random(-15, 15),
          y1: gsap.utils.random(-15, 15),
          x2: gsap.utils.random(-15, 15),
          y2: gsap.utils.random(-15, 15),
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
      x1={gsap.utils.random(0, 100)}
      y1={gsap.utils.random(0, 100)}
      x2={gsap.utils.random(0, 100)}
      y2={gsap.utils.random(0, 100)}
      stroke="#4A5568"
      strokeWidth={gsap.utils.random(0.5, 1.5)}
      opacity={0.3}
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