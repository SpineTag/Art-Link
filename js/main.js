// /c:/Users/user/Documents/Art Link/Js/main.js
(() => {
    // Config
    const AUTO_SLIDE_INTERVAL_MS = 7000;

    // Elements
    const slides = Array.from(document.querySelectorAll(".slide"));
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");

    // State
    let index = 0;
    let autoSlideId = null;

    // Helpers
    function showSlide(i) {
        slides.forEach((slide, idx) => {
            slide.style.transform = `translateX(${100 * (idx - i)}%)`;
        });

        const img = slides[i].querySelector("img");
        if (img && window.gsap) {
            gsap.fromTo(
                img,
                { scale: 1.1, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
            );
        }
    }

    function goNext() {
        index = (index + 1) % slides.length;
        showSlide(index);
    }

    function goPrev() {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideId = setInterval(goNext, AUTO_SLIDE_INTERVAL_MS);
    }

    function stopAutoSlide() {
        if (autoSlideId !== null) {
            clearInterval(autoSlideId);
            autoSlideId = null;
        }
    }

    function attachListeners() {
        if (nextBtn) nextBtn.addEventListener("click", () => { goNext(); startAutoSlide(); });
        if (prevBtn) prevBtn.addEventListener("click", () => { goPrev(); startAutoSlide(); });

        // Pause auto-slide while hovering slides
        slides.forEach((slide) => {
            slide.addEventListener("mouseenter", stopAutoSlide);
            slide.addEventListener("mouseleave", startAutoSlide);
        });
    }

    // Init after full load to ensure images/CSS are ready (keeps original behavior)
    window.addEventListener("load", () => {
        // Always add loaded class for navbar fade-in (needed on all pages)
        document.body.classList.add("loaded");

        // Only initialize slider if slides exist
        if (slides.length) {
            // initial layout + animation
            showSlide(index);
            attachListeners();
            startAutoSlide();
        }
    });
})();
// Navbar scroll behavior
window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");
    if (window.scrollY > 60) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
});

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        menuToggle.classList.toggle("active");
    });
}