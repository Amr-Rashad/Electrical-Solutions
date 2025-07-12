// Navbar Hide/Show on Scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('hidden')) {
        // Scrolling Down
        navbar.classList.add('hidden');
    } else if (currentScroll < lastScroll && navbar.classList.contains('hidden')) {
        // Scrolling Up
        navbar.classList.remove('hidden');
    }

    lastScroll = currentScroll;
});

// Counter Animation
const startCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Start counters when statistics section is in view
const statsSection = document.querySelector('.statistics-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    mirror: false
});

// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize Swiper
const heroSwiper = new Swiper('.hero-slider', {
    loop: true,
    effect: 'fade',
    speed: 1000,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Load Navbar and Footer
$(document).ready(function () {
    // Load Navbar
    $('#navbar-placeholder').load('components/navbar.html', function () {
        // Mobile Menu
        document.querySelector('.navbar-toggler').addEventListener('click', function () {
            this.classList.toggle('active');
        });
    });

    // Load Footer
    $('#footer').load('common/footer.html');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message. We will get back to you soon!');
        this.reset();
    });
}

// Newsletter form
const newsletterForm = document.querySelector('.footer-newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Add your newsletter subscription logic here
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
}

// Project image hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.querySelector('.project-overlay').style.opacity = '1';
    });
    card.addEventListener('mouseleave', function () {
        this.querySelector('.project-overlay').style.opacity = '0';
    });
});

//Solutions Slider

const solutionsTrack = document.getElementById('solutionsTrack');
const solutionsPrevBtn = document.querySelector('.solutions-btn.left');
const solutionsNextBtn = document.querySelector('.solutions-btn.right');
const solutionsDots = document.getElementById('solutionsDots');

let solutionsCards = Array.from(solutionsTrack.children);
let solutionsVisible = getSolutionsVisible();
let solutionsIndex = solutionsVisible;

function getSolutionsVisible() {
    const w = window.innerWidth;
    if (w <= 768) return 1;
    if (w <= 992) return 2;
    return 3;
}

function cloneSolutionsSlides() {
    const firstClones = solutionsCards.slice(0, solutionsVisible).map(el => el.cloneNode(true));
    const lastClones = solutionsCards.slice(-solutionsVisible).map(el => el.cloneNode(true));
    firstClones.forEach(el => solutionsTrack.appendChild(el));
    lastClones.reverse().forEach(el => solutionsTrack.insertBefore(el, solutionsTrack.firstChild));
}

function updateSolutionsPosition(animate = true) {
    const width = solutionsTrack.clientWidth / solutionsVisible;
    solutionsTrack.style.transition = animate ? 'transform 0.5s ease' : 'none';
    solutionsTrack.style.transform = `translateX(-${solutionsIndex * width}px)`;
}

function resetSolutionsLoop() {
    solutionsTrack.addEventListener('transitionend', () => {
        if (solutionsIndex >= solutionsCards.length + solutionsVisible) {
            solutionsIndex = solutionsVisible;
            updateSolutionsPosition(false);
        } else if (solutionsIndex < solutionsVisible) {
            solutionsIndex = solutionsCards.length;
            updateSolutionsPosition(false);
        }
    }, { once: true });
}

function updateSolutionsDots() {
    const allDots = solutionsDots.querySelectorAll('.solutions-dot');
    allDots.forEach(dot => dot.classList.remove('active'));
    let visibleIndex = (solutionsIndex - solutionsVisible) % solutionsCards.length;
    if (visibleIndex < 0) visibleIndex += solutionsCards.length;
    if (allDots[visibleIndex]) allDots[visibleIndex].classList.add('active');
}

function createSolutionsDots() {
    solutionsDots.innerHTML = '';
    for (let i = 0; i < solutionsCards.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('solutions-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            solutionsIndex = i + solutionsVisible;
            updateSolutionsPosition();
            updateSolutionsDots();
        });
        solutionsDots.appendChild(dot);
    }
}

solutionsPrevBtn.addEventListener('click', () => {
    solutionsIndex--;
    updateSolutionsPosition();
    resetSolutionsLoop();
    updateSolutionsDots();
});

solutionsNextBtn.addEventListener('click', () => {
    solutionsIndex++;
    updateSolutionsPosition();
    resetSolutionsLoop();
    updateSolutionsDots();
});

window.addEventListener('resize', () => {
    location.reload();
});

// Init
cloneSolutionsSlides();
updateSolutionsPosition(false);
createSolutionsDots();

// Products Carousel

const customTrack = document.getElementById('customCarouselTrack');
const customPrevBtn = document.querySelector('.prev-btn');
const customNextBtn = document.querySelector('.next-btn');
const customDots = document.getElementById('customCarouselDots');
let customCards = Array.from(customTrack.children);
let customVisible = getCustomVisible();
let customIndex = customVisible;

function getCustomVisible() {
    const w = window.innerWidth;
    if (w <= 768) return 1;
    if (w <= 992) return 3;
    return 4;
}

function customCloneSlides() {
    const firstClones = customCards.slice(0, customVisible).map(el => el.cloneNode(true));
    const lastClones = customCards.slice(-customVisible).map(el => el.cloneNode(true));
    firstClones.forEach(el => customTrack.appendChild(el));
    lastClones.reverse().forEach(el => customTrack.insertBefore(el, customTrack.firstChild));
}

function customUpdatePosition(animate = true) {
    const width = customTrack.clientWidth / customVisible;
    customTrack.style.transition = animate ? 'transform 0.5s ease' : 'none';
    customTrack.style.transform = `translateX(-${customIndex * width}px)`;
}

function customResetLoop() {
    customTrack.addEventListener('transitionend', () => {
        if (customIndex >= customCards.length + customVisible) {
            customIndex = customVisible;
            customUpdatePosition(false);
        } else if (customIndex < customVisible) {
            customIndex = customCards.length;
            customUpdatePosition(false);
        }
    }, { once: true });
}

function customUpdateDots() {
    const allDots = customDots.querySelectorAll('.custom-dot');
    allDots.forEach(dot => dot.classList.remove('active'));
    let visibleIndex = (customIndex - customVisible) % customCards.length;
    if (visibleIndex < 0) visibleIndex += customCards.length;
    if (allDots[visibleIndex]) allDots[visibleIndex].classList.add('active');
}

function customCreateDots() {
    customDots.innerHTML = '';
    for (let i = 0; i < customCards.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('custom-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            customIndex = i + customVisible;
            customUpdatePosition();
            customUpdateDots();
        });
        customDots.appendChild(dot);
    }
}

customPrevBtn.addEventListener('click', () => {
    customIndex--;
    customUpdatePosition();
    customResetLoop();
    customUpdateDots();
});

customNextBtn.addEventListener('click', () => {
    customIndex++;
    customUpdatePosition();
    customResetLoop();
    customUpdateDots();
});

window.addEventListener('resize', () => {
    location.reload(); // To recalculate on resize (can be improved if needed)
});

// Init carousel
customCloneSlides();
customUpdatePosition(false);
customCreateDots();

// Gallery lightbox
function openCustomLightbox(imgElement) {
    const lightbox = document.getElementById('custom-lightbox');
    const lightboxImage = document.getElementById('custom-lightbox-img');
    lightboxImage.src = imgElement.src;
    lightbox.style.display = 'flex';
}

function closeCustomLightbox() {
    document.getElementById('custom-lightbox').style.display = 'none';
}

//Solutions Clone
