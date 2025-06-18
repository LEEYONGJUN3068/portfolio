import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../../styles/pages/Home/HeroSection.scss';

const HeroSection: React.FC = () => {
  // 메인 콘텐츠 요소들을 위한 ref
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  // 배경 깜빡임 효과를 위한 오버레이 ref
  const blinkOverlayRef = useRef<HTMLDivElement>(null);

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
        '-=0.4' // 이전 애니메이션(headline)이 끝나기 0.4초 전에 시작
      )
      .fromTo(
        cta.current,
        { scale: 0.8, autoAlpha: 0 }, // 시작 상태: 80% 크기에서 투명하게 시작
        { scale: 1, autoAlpha: 1 },   // 최종 상태: 100% 크기에서 불투명하게 나타남
        '-=0.4' // 이전 애니메이션(sub)이 끝나기 0.4초 전에 시작
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

    // 배경 깜빡임 효과 애니메이션
    if (blinkOverlayRef.current) {
      gsap.to(blinkOverlayRef.current, {
        // opacity를 0.05에서 0.15 사이로 무작위로 깜빡입니다.
        opacity: gsap.utils.random(0.05, 0.15),
        duration: gsap.utils.random(0.1, 0.3), // 매우 짧은 지속 시간
        repeat: -1, // 무한 반복
        yoyo: true, // 역방향으로 돌아와서 자연스러운 깜빡임
        ease: 'power1.inOut', // 부드러운 가속/감속
        delay: gsap.utils.random(0, 0.5) // 무작위 딜레이로 비동기적인 깜빡임 연출
      });
    }

  }, []); // 컴포넌트가 처음 마운트될 때만 이 효과를 실행합니다.

  return (
    <section id="hero" className="hero-section">
      {/* 배경 깜빡임 오버레이 */}
      <div ref={blinkOverlayRef} className="blink-overlay"></div>

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
