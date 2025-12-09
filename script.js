document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds

    function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Calculate next slide index (loop back to 0 at the end)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to next slide
        slides[currentSlide].classList.add('active');
    }

    // Start the carousel interval
    setInterval(nextSlide, slideInterval);

    // Parallax effect for about section
    const parallaxElement = document.querySelector('.parallax-element');
    if (parallaxElement) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const aboutSection = document.querySelector('.about-section');
            
            if (aboutSection) {
                const sectionTop = aboutSection.offsetTop;
                const sectionHeight = aboutSection.offsetHeight;
                const windowHeight = window.innerHeight;
                const sectionCenter = sectionTop + (sectionHeight / 2);
                
                // Calculate parallax offset based on scroll position
                if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                    const distanceFromCenter = (scrolled + windowHeight / 2) - sectionCenter;
                    const parallaxOffset = distanceFromCenter * 0.2; // Adjust multiplier for speed
                    parallaxElement.style.transform = `translateY(${parallaxOffset}px)`;
                } else if (scrolled < sectionTop) {
                    parallaxElement.style.transform = 'translateY(0)';
                }
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
        
        // Initial call
        updateParallax();
    }
});