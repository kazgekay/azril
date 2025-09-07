function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        if (width) {
            // Add staggered delay for each bar
            setTimeout(() => {
                bar.style.width = width + '%';
                console.log(`Animating bar ${index + 1} to ${width}%`); // Debug log
            }, index * 200 + 500); // Staggered animation
        }
    });
}

// Improved function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    // Element is considered "in viewport" if any part of it is visible
    return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= windowHeight &&
        rect.left <= windowWidth
    );
}

// Alternative: Check if element is at least 50% visible
function isElementHalfVisible(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Check if at least 50% of the element is visible
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const elementHeight = rect.bottom - rect.top;
    
    return visibleHeight / elementHeight >= 0.3; // 30% visible
}

// Function to handle scroll and trigger animation
let animationTriggered = false; // Flag to prevent multiple animations

function handleScroll() {
    if (animationTriggered) return; // Prevent multiple triggers
    
    const progressSection = document.querySelector('.progress-grid');
    const skillsSection = document.querySelector('#skills');
    
    // Try multiple selectors
    const targetElement = progressSection || skillsSection;
    
    if (targetElement) {
        console.log('Target element found:', targetElement); // Debug log
        
        if (isElementHalfVisible(targetElement)) {
            console.log('Element is visible, starting animation'); // Debug log
            animationTriggered = true;
            animateProgressBars();
            // Remove event listener after animation is triggered
            window.removeEventListener('scroll', handleScroll);
        }
    } else {
        console.log('Target element not found'); // Debug log
    }
}

// Function to manually trigger animation (for testing)
function forceAnimation() {
    console.log('Force animation triggered');
    animateProgressBars();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up progress bars');
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Also check immediately in case section is already visible
    setTimeout(() => {
        handleScroll();
    }, 1000);
    
    // Fallback: Force animation after 3 seconds for testing
    setTimeout(() => {
        if (!animationTriggered) {
            console.log('Fallback: Force starting animation');
            forceAnimation();
        }
    }, 3000);
});

// Also try with window load event
window.addEventListener('load', function() {
    console.log('Window loaded');
    setTimeout(() => {
        if (!animationTriggered) {
            handleScroll();
        }
    }, 1500);
});

// Manual trigger function that can be called from browser console for debugging
window.testProgressBars = function() {
    console.log('Manual test triggered');
    animationTriggered = false; // Reset flag
    animateProgressBars();
};
