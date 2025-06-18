import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/pages/Home/HeroSection.scss';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const section = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: 'top top',
      },
      defaults: { duration: 0.8, ease: 'power2.out' }
    });
  
    tl.from(headline.current, { y: 50, autoAlpha: 0, duration: 1 })
      .fromTo(sub.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, immediateRender: false },
        '-=0.6'
      )
      .fromTo(cta.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, immediateRender: false },
        '-=0.5'
      );
  
    gsap.to(arrow.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: 1.2,
      delay: 1.5
    });
  }, []);
  
  return (
    <section id="hero" ref={section} className="hero-section">
      <div className="hero-content">
        <h1 ref={headline}>안녕하세요</h1>
        <p ref={sub}>React</p>
        <a href="#projects" ref={cta} className="cta-btn">↓</a>
      </div>
      <div ref={arrow} className="scroll-arrow">↓</div>
    </section>
  );
};

export default HeroSection;
