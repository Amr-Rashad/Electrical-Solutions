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
// Features Slider
const track = document.getElementById("slider-track");
const leftBtn = document.querySelector(".slider-btn.left");
const rightBtn = document.querySelector(".slider-btn.right");
const dotsContainer = document.getElementById("slider-dots");

let cards = document.querySelectorAll(".slider-card");
const cardWidth = 390; // 360px + 2*15px margin
let index = 0;

// Clone first and last for infinite loop
const cloneFirst = cards[0].cloneNode(true);
const cloneLast = cards[cards.length - 1].cloneNode(true);
track.appendChild(cloneFirst);
track.insertBefore(cloneLast, track.firstChild);

cards = document.querySelectorAll(".slider-card");
index = 1;
track.style.transform = `translateX(-${cardWidth * index}px)`;

const realCount = cards.length - 2;
for (let i = 0; i < realCount; i++) {
    const dot = document.createElement("span");
    dot.className = 'slider-dot';
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i + 1));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".slider-dot");

function updateDots() {
    dots.forEach(d => d.classList.remove("active"));
    dots[(index - 1 + realCount) % realCount].classList.add("active");
}

function goToSlide(i) {
    index = i;
    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translateX(-${cardWidth * index}px)`;
    updateDots();
}

rightBtn.addEventListener("click", () => {
    index++;
    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translateX(-${cardWidth * index}px)`;
    updateDots();
});

leftBtn.addEventListener("click", () => {
    index--;
    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translateX(-${cardWidth * index}px)`;
    updateDots();
});

track.addEventListener("transitionend", () => {
    if (index === cards.length - 1) {
        track.style.transition = "none";
        index = 1;
        track.style.transform = `translateX(-${cardWidth * index}px)`;
    }
    if (index === 0) {
        track.style.transition = "none";
        index = cards.length - 2;
        track.style.transform = `translateX(-${cardWidth * index}px)`;
    }
});

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