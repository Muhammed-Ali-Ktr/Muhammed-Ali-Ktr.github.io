// Particle.js Yapılandırması
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#ff6b00", "#00f0ff", "#ffffff"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ff6b00",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
});

// Sayfa yüklendiğinde yapılacak işlemler
document.addEventListener('DOMContentLoaded', function() {
    initSkillBars();
    initProjectCards();
    initSidebar();
    initTypingAnimation();
    initAvatarEffect();
    initPageTransitions();
});

// Beceri çubuklarını animasyonla doldur
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Proje kartları için hover efektleri
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const techTags = this.querySelectorAll('.project-tech span');
            techTags.forEach((tag, index) => {
                tag.style.transition = `transform 0.3s ease ${index * 0.05}s`;
                tag.style.transform = 'translateY(-3px)';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const techTags = this.querySelectorAll('.project-tech span');
            techTags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
            });
        });
    });
}

// Sidebar butonları ve sosyal medya ikonları için etkileşimler
function initSidebar() {
    const sidebarButtons = document.querySelectorAll('.sidebar-button');
    const socialIcons = document.querySelectorAll('.social-icon');
    
    // Aktif sayfa butonunu işaretlemek için
    const currentPage = window.location.pathname.split('/').pop();
    sidebarButtons.forEach(button => {
        const buttonLink = button.closest('a').getAttribute('href');
        if (buttonLink === currentPage) {
            button.classList.add('active');
        }
    });
    
    // Hover efektleri için
    sidebarButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.querySelector('i').style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.querySelector('i').style.transform = 'scale(1)';
            }
        });
    });
    
    // Sosyal medya ikonları için özel efektler
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) translateY(-5px) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Rastgele hareketlenme efekti
        setInterval(() => {
            const randomRotation = Math.random() * 8 - 4;
            icon.style.transform = `rotate(${randomRotation}deg)`;
            setTimeout(() => {
                if (!icon.matches(':hover')) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }, 500);
        }, 3000 + Math.random() * 2000);
    });
}

// Bio bölümü için yazı animasyonu
function initTypingAnimation() {
    const bioSection = document.querySelector('.bio-section');
    if (!bioSection) return;
    
    const text = bioSection.innerHTML;
    bioSection.innerHTML = '';
    
    let i = 0;
    const typingSpeed = 20;
    
    function typeWriter() {
        if (i < text.length) {
            bioSection.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Sadece sayfa ilk yüklendiğinde çalışsın
    const hasAnimated = sessionStorage.getItem('bioAnimated');
    if (!hasAnimated) {
        typeWriter();
        sessionStorage.setItem('bioAnimated', 'true');
    } else {
        bioSection.innerHTML = text;
    }
}

// Avatar için özel hover efektleri
function initAvatarEffect() {
    const avatar = document.querySelector('.avatar');
    const levelBadge = document.querySelector('.level-badge');
    
    if (!avatar || !levelBadge) return;
    
    avatar.addEventListener('mouseenter', function() {
        levelBadge.style.transform = 'scale(1.2) rotate(15deg)';
        levelBadge.style.boxShadow = '0 0 15px rgba(255, 107, 0, 0.9)';
    });
    
    avatar.addEventListener('mouseleave', function() {
        levelBadge.style.transform = 'scale(1)';
        levelBadge.style.boxShadow = '0 0 10px rgba(255, 107, 0, 0.7)';
    });
    
    // Avatar için rastgele efekt
    setInterval(() => {
        avatar.style.transform = 'scale(1.05)';
        setTimeout(() => {
            avatar.style.transform = 'scale(1)';
        }, 300);
    }, 5000);
}

// Sayfa geçişleri için animasyonlar
function initPageTransitions() {
    const pageTransition = document.querySelector('.page-transition');
    const sidebarLinks = document.querySelectorAll('.sidebar-buttons a');
    
    if (!pageTransition) return;
    
    // Sayfa ilk yüklendiğinde
    pageTransition.style.opacity = '1';
    setTimeout(() => {
        pageTransition.style.opacity = '0';
    }, 500);
    
    // Link tıklamalarında
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            pageTransition.style.opacity = '1';
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
}

// Bildirim gösterme fonksiyonu
function showNotification(message, type = 'info') {
    const notification = document.querySelector('.notification');
    if (!notification) return;
    
    notification.textContent = message;
    notification.className = 'notification show ' + type;
    
    setTimeout(() => {
        notification.className = 'notification';
    }, 3000);
}

// Sayfa kaydırma efekti
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, index) => {
        const delay = index * 0.1;
        const topPosition = category.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (topPosition < windowHeight - 100) {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        } else {
            category.style.opacity = '0';
            category.style.transform = 'translateY(50px)';
        }
    });
});

// Easter Egg - Konami Kodu
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiPosition = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiPosition]) {
        konamiPosition++;
        
        if (konamiPosition === konamiCode.length) {
            activateEasterEgg();
            konamiPosition = 0;
        }
    } else {
        konamiPosition = 0;
    }
});

function activateEasterEgg() {
    document.body.style.transition = 'all 1s';
    document.body.style.background = 'radial-gradient(ellipse at center, #ff6b00 0%, #0f0f15 70%)';
    
    setTimeout(() => {
        document.body.style.background = '';
        showNotification('Tebrikler! Gizli modu buldunuz!', 'success');
        
        // Glitch efekti ekle
        const title = document.querySelector('.title-glitch');
        if (title) {
            title.style.animation = 'glitch 0.3s infinite';
            setTimeout(() => {
                title.style.animation = 'glitch 5s infinite';
            }, 3000);
        }
    }, 2000);
}

// Becerilerin karşılaştırmasını yapan fonksiyon
function compareSkills(skill1, skill2) {
    const progressElements = document.querySelectorAll('.skill-progress');
    let skill1Progress, skill2Progress;
    
    progressElements.forEach(element => {
        const parentItem = element.closest('.skill-item');
        const skillName = parentItem.querySelector('.skill-name').textContent;
        
        if (skillName === skill1) {
            skill1Progress = parseInt(element.getAttribute('data-progress'));
        } else if (skillName === skill2) {
            skill2Progress = parseInt(element.getAttribute('data-progress'));
        }
    });
    
    if (skill1Progress && skill2Progress) {
        const difference = skill1Progress - skill2Progress;
        const message = difference > 0 ? 
            `${skill1} seviyeniz ${skill2}'den %${difference} daha yüksek` : 
            `${skill2} seviyeniz ${skill1}'den %${Math.abs(difference)} daha yüksek`;
        
        showNotification(message, 'info');
    }
}

// Rastgele ipucu gösterme özelliği
const tips = [
    "En sevdiğim programlama dili Python!",
    "Galeri sayfasında gizli özellikler var.",
    "Konami kodunu denediniz mi?",
    "Profilimi güncellemek için iletişim sayfasını kullanabilirsiniz.",
    "Becerilerimi sürekli geliştiriyorum!"
];

function showRandomTip() {
    const randomIndex = Math.floor(Math.random() * tips.length);
    showNotification(tips[randomIndex], 'tip');
}

// Rastgele ipucu gösterme zamanlaması
setTimeout(() => {
    showRandomTip();
}, 30000); // 30 saniye sonra

// Aktif sayfa işaretlemesi için URL kontrolü
function markActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const buttons = document.querySelectorAll('.sidebar-button');
    
    buttons.forEach(button => {
        const buttonTarget = button.getAttribute('data-target');
        if (
            (buttonTarget === 'home' && (currentPage === 'index.html' || currentPage === 'emr.html')) ||
            (buttonTarget === 'gallery' && currentPage === 'galeri.html') ||
            (buttonTarget === 'system' && currentPage === 'sistem.html') ||
            (buttonTarget === 'code' && currentPage === 'programlarım.html') ||
            (buttonTarget === 'schedule' && currentPage === 'randevu.html') ||
            (buttonTarget === 'games' && currentPage === 'oyunlar.html') ||
            (buttonTarget === 'contact' && currentPage === 'iletisim.html')
        ) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Sayfa yüklendiğinde aktif sayfayı işaretle
document.addEventListener('DOMContentLoaded', markActivePage);