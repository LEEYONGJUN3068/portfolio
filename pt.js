document.addEventListener("DOMContentLoaded", () => {
    /* 새로고침 시 최상단 이동 */
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    /* 연차 타이머 */
    function updateExperienceTime() {
        const startDate = new Date("2021-08-02T00:00:00");
        const now = new Date();
        let diff = now - startDate;

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        diff %= (1000 * 60 * 60 * 24 * 365);
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        diff %= (1000 * 60 * 60 * 24 * 30);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff %= (1000 * 60 * 60 * 24);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff %= (1000 * 60 * 60);
        const minutes = Math.floor(diff / (1000 * 60));
        diff %= (1000 * 60);
        const seconds = Math.floor(diff / 1000);

        document.getElementById("experience-time").textContent =
            `${years}년 ${months}개월 ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
        document.getElementById("experience-year").textContent =
            `${years}년 ${months}개월`;
    }
    updateExperienceTime();
    setInterval(updateExperienceTime, 1000);

    /* GSAP 스크롤 애니메이션 */
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".container",
            start: "top top",
            end: "+=200%",
            scrub: 0.5,
            pin: true
        }
    });

    // #text1, #text2, #text3에 대해 스크롤에 맞춰 애니메이션
    ["#text1", "#text2", "#text3"].forEach((text, index) => {
        tl.to(text, { opacity: 1, duration: 1 })
        .to(text, { opacity: 0, duration: 1 }, `+=${index === 0 ? 0.5 : 1}`);
    });

    ScrollTrigger.create({
        trigger: ".container",
        start: "top top",
        onEnterBack: () => gsap.to("#text1", { opacity: 1, duration: 0.5 }),
        onLeaveBack: () => gsap.to("#text1", { opacity: 0, duration: 0.5 })
    });

    /* 연차 타이머 투명도 조절 */
    function updateExperienceOpacity() {
        let text1Opacity = parseFloat(window.getComputedStyle(document.querySelector("#text1")).opacity);
        let experienceTimeOpacity = Math.min(0.2, Math.max(0, text1Opacity));
        
        document.getElementById("experience-time").style.opacity = experienceTimeOpacity;
    }
    
    window.addEventListener("scroll", () => requestAnimationFrame(updateExperienceOpacity));

    // #text1과 #experience-time의 초기 애니메이션 설정 (DOM 로드 시 보이기)
    gsap.fromTo("#text1", 
        { opacity: 0 }, // 시작 값
        { 
            opacity: 1,  // 끝 값
            duration: 1, // 애니메이션 시간
            ease: "power2.out", // 자연스러운 움직임
        }
    );

    gsap.fromTo("#experience-time", 
        { opacity: 0 }, // 시작 값
        { 
            opacity: 0.2,  // 끝 값
            duration: 1, // 애니메이션 시간
            ease: "power2.out", // 자연스러운 움직임
        }
    );

    /* 스크롤 화살표 애니메이션 */
    gsap.to(".arrow", {
        opacity: 1,
        y: 5,
        duration: 0.8,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

    window.addEventListener("scroll", () => {
        gsap.to("#scroll-indicator", { opacity: window.scrollY === 0 ? 1 : 0, duration: 0.5 });
    });
});
