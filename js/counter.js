// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // Animation duration in milliseconds
    const step = 50; // Update interval in milliseconds
    const increment = (target * step) / duration;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, step);
}

// Start counter animation when element is in viewport
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}

// Initialize Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    
    // Observe all counter elements
    document.querySelectorAll('.counter').forEach(counter => {
        observer.observe(counter);
    });
});
