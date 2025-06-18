import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../../styles/pages/Home/HeroSection.scss';

const HeroSection: React.FC = () => {
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });

    // fromTo를 사용하여 시작과 끝 상태를 명시적으로 지정
    tl.fromTo(
        headline.current,
        { y: 50, autoAlpha: 0 }, // From (시작 상태)
        { y: 0, autoAlpha: 1 }    // To (최종 상태)
      )
      .fromTo(
        sub.current,
        { y: 30, autoAlpha: 0 }, // From
        { y: 0, autoAlpha: 1 },  // To
        '-=0.4'
      )
      .fromTo(
        cta.current,
        { scale: 0.8, autoAlpha: 0 }, // From
        { scale: 1, autoAlpha: 1 },   // To
        '-=0.4'
      );

    gsap.to(arrow.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: 2,
      delay: 1.5,
    });
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <h1 ref={headline}>안녕하세요, 퍼블리셔 OOO입니다.</h1>
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