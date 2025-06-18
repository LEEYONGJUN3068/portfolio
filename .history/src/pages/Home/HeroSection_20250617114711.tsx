import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../../styles/pages/Home/HeroSection.scss';

const HeroSection: React.FC = () => {
  // 메인 콘텐츠 요소들을 위한 ref
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

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
            // 무작위 문자 할당
            span.innerText = chars[gsap.utils.random(0, chars.length - 1, 1)];
          } else {
            // 애니메이션 완료 후 최종 텍스트 설정 (안전 장치)
            span.innerText = text[i];
          }
        });
      },
      onComplete: function() {
        // 애니메이션 완료 후 다시 한번 최종 텍스트 설정
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
    // "안녕하세요, 퍼블리셔 OOO입니다." 문구가 1.5초 동안, 0.5초 딜레이 후 스크램블 시작
    scrambleText(headline.current, "안녕하세요, 퍼블리셔 OOO입니다.", 1.5, 0.5);

    // 2. sub 텍스트 등장 애니메이션
    // 헤드라인 스크램블 애니메이션의 총 지속 시간 (duration + delay) 후에 시작하도록 조정
    // 1.5초(duration) + 0.5초(delay) = 2초 후에 sub 텍스트 애니메이션 시작
    tl.fromTo(
        sub.current,
        { y: 30, autoAlpha: 0 }, // 시작: y축 30px 아래, 투명
        { y: 0, autoAlpha: 1 },  // 끝: 원래 위치, 불투명
        '>=2' // 이전(스크램블) 애니메이션이 끝나고 2초 후에 시작 (정확한 시간 지정)
      )
      // 3. CTA 버튼 등장 애니메이션
      .fromTo(
        cta.current,
        { scale: 0.8, autoAlpha: 0 }, // 시작: 80% 크기, 투명
        { scale: 1, autoAlpha: 1 },   // 끝: 100% 크기, 불투명
        '-=0.4' // 이전(sub) 애니메이션 종료 0.4초 전에 시작 (겹쳐서 실행)
      );

    // 4. 스크롤 유도 화살표 애니메이션
    gsap.to(arrow.current, {
      y: 10,       // y축으로 10px 이동
      repeat: -1,  // 무한 반복
      yoyo: true,  // 애니메이션이 끝난 후 역방향으로 돌아옴 (왕복 움직임)
      ease: 'power1.inOut', // 부드러운 가속/감속 곡선
      duration: 1.2, // 한 사이클 지속 시간 1.2초
      delay: 1.5,    // 컴포넌트 로드 후 1.5초 뒤 시작
    });

  }, []); // 컴포넌트가 처음 마운트될 때만 이 효과를 실행

  // SVG 배경 관련 코드 삭제 (선 애니메이션 없음)
  // return 부분에서 hero-background-svg div도 제거

  return (
    <section id="hero" className="hero-section">
      {/* 배경 SVG 관련 div 제거 */}

      {/* 메인 콘텐츠 영역 */}
      <div className="hero-content">
        {/* h1은 JS에서 내용을 채우므로 비워둠 */}
        <h1 ref={headline}></h1> 
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