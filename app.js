// Global variables
let currentProject = 0;
let soundEnabled = true;
let gameBalance = 10000;
let stockPrice = 150.00;
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            initializeApp();
        }, 500);
    }, 2000);
});

// Initialize Application
function initializeApp() {
    setupNavigation();
    setupHeroAnimations();
    setupParticleEffects();
    setupCharts();
    setupProjectCarousel();
    setupSkillsAnimation();
    setupContactForm();
    setupTradingGame();
    setupSoundControls();
    setupKonamiCode();
    setupScrollAnimations();
    setupCounterAnimations();
}

// Navigation Setup
function setupNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');

    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetSection = dot.dataset.section;
            const target = document.getElementById(targetSection);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                playSound('click');
            }
        });
    });

    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach((section, index) => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (scrollPos >= top && scrollPos <= bottom) {
                navDots.forEach(dot => dot.classList.remove('active'));
                navDots[index].classList.add('active');
            }
        });
    });
}

// Hero Section Animations
function setupHeroAnimations() {
    const typingText = document.getElementById('typing-text');
    const roles = ['Quantitative Researcher', 'Software Developer', 'Financial Engineer', 'Data Scientist'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, typingSpeed);
    }

    setTimeout(typeWriter, 1000);

    // CTA Button Click
    document.querySelector('.cta-button').addEventListener('click', () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        playSound('whoosh');
    });
}

// Particle Effects
function setupParticleEffects() {
    const hero = document.querySelector('.hero-section');
    const shapes = document.querySelectorAll('.shape');

    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPercent = (clientX / innerWidth) * 100;
        const yPercent = (clientY / innerHeight) * 100;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (xPercent - 50) * speed * 0.1;
            const y = (yPercent - 50) * speed * 0.1;

            shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
        });
    });

    hero.addEventListener('mouseleave', () => {
        shapes.forEach(shape => {
            shape.style.transform = '';
        });
    });
}

// Charts Setup
function setupCharts() {
    // Sharpe Ratio Chart
    // Alpha Factor Performance Chart - Replace Sharpe Ratio Chart
    const ctx = document.getElementById('alphaFactorChart').getContext('2d');

    const alphaFactorChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Weight Factor',
                'Value Factor',
                'Used Data Fields',
                'Regular Alphas Submitted',
                'Super Alphas Submitted',
                'Regular Prod. Corr.',
                'Regular Self Corr.',
                'Super Prod. Corr.',
                'Super Self Corr.'
            ],
            datasets: [{
                type: 'bar',
                label: 'Factor Values & Counts',
                data: [9.99, 0.90, 135, 83, 5, null, null, null, null],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',   // Weight Factor
                    'rgba(54, 162, 235, 0.6)',   // Value Factor  
                    'rgba(75, 192, 192, 0.8)',   // Used Data Fields
                    'rgba(75, 192, 192, 0.6)',   // Regular Alphas
                    'rgba(75, 192, 192, 0.4)',   // Super Alphas
                    null, null, null, null
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    null, null, null, null
                ],
                borderWidth: 2,
                yAxisID: 'y'
            }, {
                type: 'line',
                label: 'Correlation Metrics',
                data: [null, null, null, null, null, 0.15, 0.31, 0.65, 0.42],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 3,
                fill: false,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 8,
                pointHoverRadius: 10,
                yAxisID: 'y1',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false,
                    text: 'Alpha Factor Performance Analytics',
                    font: {
                        size: 20,
                        weight: 'bold',
                        family: "'Segoe UI', 'Roboto', sans-serif"
                    },
                    color: '#2c3e50',
                    padding: 20
                },
                legend: {
                    position: 'top',
                    labels: {
                        padding: 20,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    mode: 'nearest',
                    intersect: true,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                if (context.dataset.label === 'Correlation Metrics') {
                                    label += context.parsed.y.toFixed(3);
                                } else {
                                    label += context.parsed.y.toLocaleString?.() || 'N/A';
                                }
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Overall Alpha Performance Metrics',
                        font: {
                            size: 14,
                            
                        },
                        color: '#ffffffff'
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Factor Values & Submission Counts',
                        font: {
                            size: 12,
                            
                        },
                        color: '#ffffff'
                    },
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Correlation Values (0-1)',
                        font: {
                            size: 12,
                        },
                        color: '#ffffff'
                    },
                    min: 0,
                    max: 1,
                    ticks: {
                        stepSize: 0.1,
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        drawOnChartArea: false,
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutCubic'
            }
        }
    });


    // Skills Radar Chart
    const skillsCtx = document.getElementById('skillsRadar');
    if (skillsCtx) {
        new Chart(skillsCtx, {
            type: 'radar',
            data: {
                labels: ['Python', 'JavaScript', 'React', 'Finance', 'Power BI', 'Data Analysis'],
                datasets: [{
                    label: 'Skill Level',
                    data: [95, 85, 90, 92, 88, 95],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#fff',
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#f5f5f5' }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: '#f5f5f5',
                            backdropColor: 'transparent'
                        },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#f5f5f5' }
                    }
                }
            }
        });
    }
}

// Project Carousel
function setupProjectCarousel() {
    const cards = document.querySelectorAll('.project-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    function showProject(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentProject = index;
        playSound('slide');
    }

    prevBtn.addEventListener('click', () => {
        const newIndex = currentProject === 0 ? cards.length - 1 : currentProject - 1;
        showProject(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        const newIndex = currentProject === cards.length - 1 ? 0 : currentProject + 1;
        showProject(newIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showProject(index));
    });

    // Auto-advance carousel
    setInterval(() => {
        const newIndex = currentProject === cards.length - 1 ? 0 : currentProject + 1;
        showProject(newIndex);
    }, 8000);
}

// Skills Animation
function setupSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.dataset.width;
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Contact Form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.classList.add('loading');
        playSound('send');

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        submitBtn.classList.remove('loading');

        // Show success message
        showNotification('Message sent successfully! 🚀', 'success');
        form.reset();

        // Reset floating labels
        const labels = form.querySelectorAll('.floating-label-text');
        labels.forEach(label => {
            label.style.top = '12px';
            label.style.fontSize = '16px';
            label.style.color = '#626c71';
        });
    });

    // Floating label animation
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const label = input.nextElementSibling;
            if (label) {
                label.style.top = '-20px';
                label.style.fontSize = '12px';
                label.style.color = '#21808d';
            }
        });

        input.addEventListener('blur', () => {
            if (input.value === '') {
                const label = input.nextElementSibling;
                if (label) {
                    label.style.top = '12px';
                    label.style.fontSize = '16px';
                    label.style.color = '#626c71';
                }
            }
        });
    });
}

// Trading Game
function setupTradingGame() {
    const gameContainer = document.getElementById('tradingGame');
    const balanceEl = document.getElementById('gameBalance');
    const priceEl = document.getElementById('stockPrice');
    const changeEl = document.getElementById('priceChange');
    const buyBtn = document.querySelector('.buy-btn');
    const sellBtn = document.querySelector('.sell-btn');
    const closeBtn = document.querySelector('.game-close');

    // Show game after delay
    setTimeout(() => {
        gameContainer.classList.remove('hidden');
    }, 5000);

    // Update stock price
    function updatePrice() {
        const change = (Math.random() - 0.5) * 5;
        stockPrice += change;
        stockPrice = Math.max(100, Math.min(200, stockPrice));

        const changePercent = (change / stockPrice * 100).toFixed(1);

        priceEl.textContent = stockPrice.toFixed(2);
        changeEl.textContent = (change >= 0 ? '+' : '') + changePercent + '%';
        changeEl.className = change >= 0 ? 'positive' : 'negative';
    }

    setInterval(updatePrice, 3000);

    buyBtn.addEventListener('click', () => {
        if (gameBalance >= stockPrice) {
            gameBalance -= stockPrice;
            balanceEl.textContent = gameBalance.toFixed(0);
            playSound('buy');
            showNotification('Stock purchased! 📈', 'success');
        }
    });

    sellBtn.addEventListener('click', () => {
        gameBalance += stockPrice;
        balanceEl.textContent = gameBalance.toFixed(0);
        playSound('sell');
        showNotification('Stock sold! 💰', 'info');
    });

    closeBtn.addEventListener('click', () => {
        gameContainer.classList.add('hidden');
    });
}

// Sound Controls
function setupSoundControls() {
    const soundBtn = document.getElementById('sound-btn');

    soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundBtn.textContent = soundEnabled ? '🔊' : '🔇';
        playSound('toggle');
    });
}

// Konami Code
function setupKonamiCode() {
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);

        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }

        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            showEasterEgg();
            konamiCode = [];
        }
    });
}

function showEasterEgg() {
    document.getElementById('easterEgg').classList.remove('hidden');
    playSound('achievement');
}

function closeEasterEgg() {
    document.getElementById('easterEgg').classList.add('hidden');
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.card, .timeline-item, .skill-item, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Counter Animations
function setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = progress * target;
        element.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

// Sound Effects
function playSound(type) {
    if (!soundEnabled) return;

    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const sounds = {
        click: { frequency: 800, duration: 100 },
        whoosh: { frequency: 400, duration: 300 },
        slide: { frequency: 600, duration: 150 },
        send: { frequency: 1000, duration: 200 },
        buy: { frequency: 1200, duration: 250 },
        sell: { frequency: 900, duration: 250 },
        toggle: { frequency: 500, duration: 100 },
        achievement: { frequency: 1500, duration: 500 }
    };

    const sound = sounds[type];
    if (!sound) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration / 1000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ade80' : type === 'error' ? '#f87171' : '#1FB8CD'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Market Region Interactions
document.addEventListener('DOMContentLoaded', () => {
    const marketRegions = document.querySelectorAll('.market-region');

    marketRegions.forEach(region => {
        region.addEventListener('click', () => {
            const market = region.dataset.market;
            showNotification(`Exploring ${market} market strategies! 🌍`, 'info');
            playSound('click');
        });
    });
});

// Dynamic Background based on time
function updateBackgroundByTime() {
    const hour = new Date().getHours();
    const hero = document.querySelector('.hero-section');

    if (hour >= 6 && hour < 12) {
        // Morning
        hero.style.background = 'linear-gradient(135deg, #1e3a8a, #3730a3)';
    } else if (hour >= 12 && hour < 18) {
        // Afternoon
        hero.style.background = 'linear-gradient(135deg, #1f2937, #374151)';
    } else {
        // Evening/Night
        hero.style.background = 'linear-gradient(135deg, #0f172a, #1e293b)';
    }
}

// Initialize time-based background
updateBackgroundByTime();

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    const shapes = document.querySelectorAll('.shape');

    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
});

// Expose global functions
window.closeEasterEgg = closeEasterEgg; 