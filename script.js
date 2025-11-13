
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}


const typingText = document.querySelector('.typing-text');
const phrases = [
    'Siber Güvenlik Öğrencisi',
    'Web Geliştirici',
    'Bilgisayar Mühendisi',
    'Güvenlik Meraklısı'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

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


const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeObserver.observe(element);
});


const particlesContainer = document.getElementById('particles');

const techShapes = ['●', '◆', '▲', '■', '⬡', '⬢', '{}', '<>', '/>', '< />', '01', '10', '0', '1'];
const techIcons = ['fa-code', 'fa-terminal', 'fa-lock', 'fa-shield-alt', 'fa-bug', 'fa-server', 'fa-network-wired', 'fa-microchip'];

function createTechParticle() {
    const particle = document.createElement('div');
    particle.classList.add('tech-particle');

    const isIcon = Math.random() > 0.5;

    if (isIcon) {
        const icon = document.createElement('i');
        icon.className = `fas ${techIcons[Math.floor(Math.random() * techIcons.length)]}`;
        particle.appendChild(icon);
        particle.classList.add('particle-icon');
    } else {
        particle.textContent = techShapes[Math.floor(Math.random() * techShapes.length)];
        particle.classList.add('particle-shape');
    }

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    const size = Math.random() * 20 + 10;
    particle.style.fontSize = size + 'px';

    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 5;

    particle.style.animation = `techFloat ${duration}s ${delay}s infinite ease-in-out`;

    particlesContainer.appendChild(particle);
}

const particleCount = 40;
for (let i = 0; i < particleCount; i++) {
    createTechParticle();
}

const canvas = document.createElement('canvas');
canvas.id = 'particle-canvas';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '0';
particlesContainer.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawConnections() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = document.querySelectorAll('.tech-particle');
    const particlePositions = [];

    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        particlePositions.push({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        });
    });

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const lineColor = isDark ? 'rgba(129, 140, 248, 0.2)' : 'rgba(102, 126, 234, 0.2)';

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;

    for (let i = 0; i < particlePositions.length; i++) {
        for (let j = i + 1; j < particlePositions.length; j++) {
            const dx = particlePositions[i].x - particlePositions[j].x;
            const dy = particlePositions[i].y - particlePositions[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(particlePositions[i].x, particlePositions[i].y);
                ctx.lineTo(particlePositions[j].x, particlePositions[j].y);
                ctx.globalAlpha = 1 - (distance / 150);
                ctx.stroke();
            }
        }
    }
}

function animateConnections() {
    drawConnections();
    requestAnimationFrame(animateConnections);
}

animateConnections();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const observer = new MutationObserver(() => {
    drawConnections();
});

observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
});

const techStyle = document.createElement('style');
techStyle.textContent = `
    @keyframes techFloat {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.6;
        }
        25% {
            transform: translate(80px, -80px) rotate(90deg);
            opacity: 0.8;
        }
        50% {
            transform: translate(-60px, -150px) rotate(180deg);
            opacity: 0.4;
        }
        75% {
            transform: translate(-120px, -60px) rotate(270deg);
            opacity: 0.7;
        }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 0.6;
        }
        50% {
            transform: scale(1.2);
            opacity: 1;
        }
    }
`;
document.head.appendChild(techStyle);


const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px var(--shadow)';
    } else {
        navbar.style.boxShadow = '0 2px 10px var(--shadow)';
    }

    lastScroll = currentScroll;
});

const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
});


document.querySelectorAll('.stat-card, .skill-category').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});


const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    statsObserver.observe(card);
});


const techIconsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const icons = entry.target.querySelectorAll('.tech-icon');
            icons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.style.opacity = '1';
                    icon.style.transform = 'scale(1)';
                }, index * 100);
            });
            techIconsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.tech-icons').forEach(container => {
    const icons = container.querySelectorAll('.tech-icon');
    icons.forEach(icon => {
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0)';
        icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    techIconsObserver.observe(container);
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 800);
    }
});

const footerYear = document.querySelector('.footer p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${currentYear} Sude Nur Atasoy. Tüm hakları saklıdır.`;
}


window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';


const translations = {
    tr: {
        hero_description: 'Siber Güvenlik & Web Geliştirme Meraklısı',
        btn_explore: 'Keşfet',
        btn_contact: 'İletişim',

        about_title: 'Hakkımda',
        about_p1: 'Merhaba! Ben <span class="highlight">Sude Nur Atasoy</span>. Son sınıf Bilgisayar Mühendisliği öğrencisiyim. Algoritmalar, veri yapıları ve makine öğrenimi konularında güçlü bir altyapıya sahibim.',
        about_p2: 'C, Java, Python ,Php  ve C# dillerini kullanarak çeşitli projeler geliştirdim. React.js, Next.js ve Angular gibi modern web teknolojileriyle web uygulamaları geliştirdim; ayrıca C# ile masaüstü yazılımlar oluşturdum. Python ile gerçek dünya verileri üzerinde veri analizi ve makine öğrenimi modelleme deneyimi edindim.',
        about_p3: 'Siber güvenliğe büyük bir ilgi duyuyorum. 2025 Türkiye <span class="highlight">Siber Vatan Programı</span> kapsamında 120 saatlik ileri seviye eğitimi tamamladım ve ayrıca <span class="highlight">Siber Vatan Bootcamp</span> programına katılarak proje tabanlı uygulamalarla yetkinliklerimi geliştirdim.',
        education: 'Bilgisayar Mühendisliği',
        job_title_1: 'Yazılım Geliştirme Destek Görevlisi',
        job_title_2: 'Frontend Web Developer',
        certificates: 'Sertifikalar',
        cert_text: 'Certified Associate Penetration Tester (CAPT), Türkiye Siber Vatan Programı 2025, Database Programming with SQL, Database Design with Oracle',

        skills_title: 'Yetenekler & İlgi Alanları',
        skill_cyber: 'Siber Güvenlik',
        skill_web: 'Web Geliştirme',
        skill_tools: 'Araçlar & Teknolojiler',
        skill_network: 'Ağ Güvenliği',
        skill_pentest: 'Sızma Testleri',
        skill_security: 'Güvenlik Analizi',
        skill_framework: 'Frontend Framework\'ler',
        skill_responsive: 'Responsive Tasarım',

        contact_title: 'İletişim',
        contact_heading: 'Hadi Birlikte Çalışalım!',
        contact_text: 'Yeni projeler, iş birlikleri veya sadece merhaba demek için benimle iletişime geçebilirsiniz.',
        email_text: 'E-posta',

        footer_text: '© 2024 Sude Nur Atasoy. Tüm hakları saklıdır.',

        typing_1: 'Siber Güvenlik Öğrencisi',
        typing_2: 'Web Geliştirici',
        typing_3: 'Bilgisayar Mühendisi',
        typing_4: 'Güvenlik Meraklısı'
    },
    en: {
        hero_description: 'Cybersecurity & Web Development Enthusiast',
        btn_explore: 'Explore',
        btn_contact: 'Contact',

        about_title: 'About',
        about_p1: 'Hello! I\'m <span class="highlight">Sude Nur Atasoy</span>. I\'m a senior Computer Engineering student. I have a strong foundation in algorithms, data structures, and machine learning.',
        about_p2: 'I have developed various projects using C, Java, Python,Php, and C#. I built web applications with modern web technologies like React.js, Next.js, and Angular; I also created desktop software with C#. I gained experience in data analysis and machine learning modeling on real-world data with Python.',
        about_p3: 'I have a great interest in cybersecurity. I completed 120 hours of advanced training as part of the 2025 Turkey <span class="highlight">Siber Vatan Program</span> and also participated in the <span class="highlight">Siber Vatan Bootcamp</span> program, developing my skills through project-based applications.',
        education: 'Computer Engineering',
        job_title_1: 'Software Development Support Officer',
        job_title_2: 'Frontend Web Developer',
        certificates: 'Certificates',
        cert_text: 'Certified Associate Penetration Tester (CAPT), Turkey Siber Vatan Program 2025, Database Programming with SQL, Database Design with Oracle',

        skills_title: 'Skills & Interests',
        skill_cyber: 'Cybersecurity',
        skill_web: 'Web Development',
        skill_tools: 'Tools & Technologies',
        skill_network: 'Network Security',
        skill_pentest: 'Penetration Testing',
        skill_security: 'Security Analysis',
        skill_framework: 'Frontend Frameworks',
        skill_responsive: 'Responsive Design',

        contact_title: 'Contact',
        contact_heading: 'Let\'s Work Together!',
        contact_text: 'Feel free to reach out for new projects, collaborations, or just to say hello.',
        email_text: 'Email',

        footer_text: '© 2024 Sude Nur Atasoy. All rights reserved.',

        typing_1: 'Cybersecurity Student',
        typing_2: 'Web Developer',
        typing_3: 'Computer Engineer',
        typing_4: 'Security Enthusiast'
    }
};

const languageToggle = document.getElementById('languageToggle');
let currentLang = localStorage.getItem('language') || 'tr';

document.documentElement.setAttribute('lang', currentLang);
updateLanguage(currentLang);

languageToggle.addEventListener('click', () => {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    localStorage.setItem('language', currentLang);
    document.documentElement.setAttribute('lang', currentLang);
    updateLanguage(currentLang);
    updateTypingPhrases(currentLang);
});

function updateLanguage(lang) {
    const langText = languageToggle.querySelector('.lang-text');
    langText.textContent = lang === 'tr' ? 'EN' : 'TR';

    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-tr]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
}

function updateTypingPhrases(lang) {
    phrases.length = 0;
    phrases.push(
        translations[lang].typing_1,
        translations[lang].typing_2,
        translations[lang].typing_3,
        translations[lang].typing_4
    );
    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;
}
