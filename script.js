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

// --- PARALLAX CODE START ---
const aboutSection = document.querySelector('.about-section');
const textBox = document.querySelector('.parallax-element');
const image = document.querySelector('.parallax-image');

// We check if we are on a large screen (> 768px)
// Parallax often breaks layout on mobile, so we usually disable it there
const isDesktop = window.matchMedia("(min-width: 768px)");

if (aboutSection && textBox && image) {
    
    function updateParallax() {
        // Only run on desktop
        if (!isDesktop.matches) {
            textBox.style.transform = 'translateY(0)';
            image.style.transform = 'translateY(0)';
            return;
        }

        // 1. Get the distance of the section from the top of the viewport
        const sectionTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // 2. Check if section is roughly in view (optimization)
        if (sectionTop < windowHeight && sectionTop > -aboutSection.offsetHeight) {
            
            // 3. The Math:
            // We multiply the position by a small decimal (speed).
            // A NEGATIVE number moves it UP (against scroll) -> feels "lighter" / "background"
            // A POSITIVE number moves it DOWN (with scroll) -> feels "heavier" / "foreground"
            
            // Text moves slightly fast
            const textSpeed = 0.1; 
            // Image moves slightly slower (creating depth)
            const imageSpeed = 0.03; 

            // We calculate movement. 
            // Note: We subtract a small offset (windowHeight * 0.1) to center the effect 
            // so they are aligned when they are near the center of the screen.
            const textMove = (sectionTop) * textSpeed;
            const imageMove = (sectionTop) * imageSpeed;

            textBox.style.transform = `translateY(${textMove}px)`;
            image.style.transform = `translateY(${imageMove}px)`;
        }
    }

    // Use requestAnimationFrame for smooth performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Run once on load to set initial positions
    updateParallax();
    
    // Update on resize in case screen size changes
    window.addEventListener('resize', updateParallax);
}
});