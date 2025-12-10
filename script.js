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
    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    // --- PARALLAX EFFECT FOR ABOUT SECTION ---
    const pandanImage = document.querySelector('.pandan-image');
    const aboutContentBox = document.querySelector('.about-content-box');
    const aboutSection = document.querySelector('.about-section');
    
    function updateParallax() {
        if (!aboutSection) return;
        
        const scrolled = window.pageYOffset;
        const sectionTop = aboutSection.offsetTop;
        const sectionHeight = aboutSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Check if section is in view
        if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            // Parallax for pandan image (moves slower, creating depth)
            if (pandanImage) {
                const imageSpeed = 0.15;
                const imageYPos = (scrolled - sectionTop + windowHeight) * imageSpeed;
                pandanImage.style.transform = `translateY(${imageYPos}px)`;
            }
            
            // Parallax for about content box (moves faster)
            if (aboutContentBox) {
                const contentSpeed = 0.1;
                const contentYPos = -(scrolled - sectionTop + windowHeight) * contentSpeed;
                aboutContentBox.style.transform = `translateY(${contentYPos}px)`;
            }
        }
    }

    // --- SCROLL PROGRESS BAR ---
    const scrollProgress = document.querySelector('.scroll-progress');
    
    function updateScrollProgress() {
        if (!scrollProgress) return;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollableHeight = documentHeight - windowHeight;
        
        if (scrollableHeight > 0) {
            const progress = (scrollTop / scrollableHeight) * 100;
            scrollProgress.style.width = `${Math.min(progress, 100)}%`;
        }
    }

    // --- NAV BUTTON FADE ON SCROLL ---
    const heroSection = document.querySelector('.hero');
    const navButtons = document.querySelectorAll('.nav-btn:not(.primary-btn)');
    
    function updateNavButtons() {
        if (!heroSection) return;
        
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add 'scrolled' class when past hero section
        if (scrollTop > heroBottom - 100) {
            navButtons.forEach(btn => btn.classList.add('scrolled'));
        } else {
            navButtons.forEach(btn => btn.classList.remove('scrolled'));
        }
    }

    // Use requestAnimationFrame for smooth performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                updateScrollProgress();
                updateNavButtons();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initialize on load
    updateParallax();
    updateScrollProgress();
    updateNavButtons();
    
    // Update on resize
    window.addEventListener('resize', () => {
        updateParallax();
        updateScrollProgress();
        updateNavButtons();
    });
});