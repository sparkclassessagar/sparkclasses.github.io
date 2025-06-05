// Function to switch language based on selected option
function switchLang(lang) {
    const elements = document.querySelectorAll('[data-en], [data-hi]');
    elements.forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
}

// DOMContentLoaded ensures the script runs after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language to English
    const langSelect = document.getElementById('lang');
    if (langSelect) {
        langSelect.value = 'en';
        switchLang('en');
    }


    // NEW SLIDER IMPLEMENTATION JAVASCRIPT
    const sliderWrapper = document.querySelector('.new-slider-wrapper');
    const sliderContainer = document.querySelector('.new-slider-container');
    const sliderItems = document.querySelectorAll('.new-slider-item');
    const navContainer = document.querySelector('.new-slider-nav');

    // Check if slider elements exist before proceeding
    if (sliderWrapper && sliderContainer && sliderItems.length > 0 && navContainer) {
        const slideCount = sliderItems.length;
        let currentIndex = 0;
        let startTouchX = 0;
        let endTouchX = 0;

        // Function to update the slider position
        function updateSliderPosition() {
            const offset = -currentIndex * 100; // Move by 100% for each slide
            sliderWrapper.style.transform = `translateX(${offset}%)`;
            updateNavDots();
        }

        // Function to update navigation dots
        function updateNavDots() {
            const dots = document.querySelectorAll('.new-slider-nav-dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Create navigation dots
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('new-slider-nav-dot');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSliderPosition();
            });
            navContainer.appendChild(dot);
        }

        // Touch event listeners for swipe functionality
        sliderContainer.addEventListener('touchstart', (e) => {
            startTouchX = e.touches[0].clientX;
        });

        sliderContainer.addEventListener('touchmove', (e) => {
            endTouchX = e.touches[0].clientX;
        });

        sliderContainer.addEventListener('touchend', () => {
            const swipeThreshold = 50; // Minimum pixels for a recognized swipe

            if (startTouchX - endTouchX > swipeThreshold) {
                // Swiped left (move to next slide)
                currentIndex = (currentIndex + 1) % slideCount;
            } else if (startTouchX - endTouchX < -swipeThreshold) {
                // Swiped right (move to previous slide)
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            }
            updateSliderPosition();
        });

        // Initialize slider position and dots
        updateSliderPosition();
    }
    // END NEW SLIDER IMPLEMENTATION JAVASCRIPT

    // ANIMATION LOGIC
    const animationContainer = document.getElementById('animation-container');

    if (animationContainer) {
        const animationTypes = [
            { class: 'physics-particle', content: '', duration: 4000 },
            { class: 'chemistry-bubble', content: '', duration: 3000 },
            { class: 'math-shape', content: '', duration: 5000 },
            { class: 'math-number', content: 'Σ', duration: 4000 }, // Sigma for math
            { class: 'math-number', content: 'π', duration: 4000 },  // Pi for math
            { class: 'math-number', content: '∫', duration: 4000 }, // Integral for math
            { class: 'physics-particle', content: '', duration: 4500 },
            { class: 'chemistry-bubble', content: '', duration: 3500 },
            { class: 'math-shape', content: '', duration: 5500 }
        ];

        function createRandomAnimation() {
            const type = animationTypes[Math.floor(Math.random() * animationTypes.length)];
            const element = document.createElement('div');
            element.classList.add('animated-element', type.class);

            // Set random position within the viewport
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Ensure elements appear fully within the viewport initially
            const elementSize = 50; // Approximate max size of an animated element
            element.style.left = `${Math.random() * (viewportWidth - elementSize)}px`;
            element.style.top = `${Math.random() * (viewportHeight - elementSize)}px`;

            if (type.content) {
                element.textContent = type.content;
            }

            animationContainer.appendChild(element);

            // Remove element after animation duration to prevent clutter
            setTimeout(() => {
                element.remove();
            }, type.duration);
        }

        // Start generating animations periodically (e.g., every 2 seconds)
        setInterval(createRandomAnimation, 2000);
    }
    // END ANIMATION LOGIC
});