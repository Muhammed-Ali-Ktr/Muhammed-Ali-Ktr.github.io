document.addEventListener('DOMContentLoaded', function() {
    
    // Particles.js konfigürasyonu
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
                "value": "#ff6b00"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
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
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });


    // Animate stats counters
    const animateCounters = () => {
        const statValues = document.querySelectorAll('.stat-value');
        const speed = 200; // Lower = faster
        
        statValues.forEach(statValue => {
            const target = parseInt(statValue.getAttribute('data-count'));
            const count = parseInt(statValue.textContent);
            const increment = target / speed;
            
            if (count < target) {
                statValue.textContent = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                statValue.textContent = target;
                statValue.classList.add('animated');
            }
        });
    };

    // Run counters when section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        observer.observe(statsContainer);
    }

    // Hardware section hover effects
    const hardwareSections = document.querySelectorAll('.hardware-section');
    hardwareSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            const icon = section.querySelector('i');
            icon.style.animation = 'iconPulse 0.5s ease';
            setTimeout(() => {
                icon.style.animation = 'iconPulse 2s infinite';
            }, 500);
        });
    });

    // Follow button click effect
    const followButton = document.querySelector('.follow-button');
    if (followButton) {
        followButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            followButton.appendChild(ripple);
            
            // Get click position
            const rect = followButton.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Position ripple
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
                
                // Show notification
                showNotification('Daha fazla bilgi için sosyal medya hesaplarımı ziyaret edin!', 'info');
            }, 1000);
        });
    }

    // Notification function
    function showNotification(message, type) {
        const notification = document.querySelector('.notification');
        if (!notification) return;
        
        notification.innerHTML = `
            <i class="fas fa-${type === 'info' ? 'info-circle' : 'exclamation-circle'}"></i>
            ${message}
        `;
        
        notification.style.bottom = '20px';
        
        setTimeout(() => {
            notification.style.bottom = '-100px';
        }, 3000);
    }

    // Page transition effect
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition) {
        pageTransition.style.transform = 'scaleY(0)';
        pageTransition.style.transformOrigin = 'top';
        
        window.addEventListener('beforeunload', () => {
            pageTransition.style.transform = 'scaleY(1)';
            pageTransition.style.transformOrigin = 'bottom';
        });
    }

    // Add ripple effect CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(10);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});



// Fare Hareketleri
document.addEventListener('DOMContentLoaded', function() {
    // Mevcut kodlarınız...
    
    // Yumuşak kaydırma efekti ekleme
    function setupSmoothScrolling() {
        // Kaydırma hızını ayarlayın (daha yüksek = daha hızlı)
        const scrollSpeed = 1.2;
        let isScrolling = false;
        
        // Fare tekerleği olayını dinle
        window.addEventListener('wheel', function(e) {
            // Eğer animasyon devam ediyorsa yeni kaydırmayı engelle
            if (isScrolling) {
                e.preventDefault();
                return;
            }
            
            // Varsayılan kaydırmayı engelle
            e.preventDefault();
            
            // Kaydırma yönünü belirle
            const delta = e.deltaY || e.detail || e.wheelDelta;
            const direction = delta > 0 ? 1 : -1;
            
            // Yeni scroll pozisyonunu hesapla
            const startPosition = window.pageYOffset;
            const targetPosition = startPosition + (window.innerHeight * 0.8 * direction);
            const duration = 800; // milisaniye cinsinden animasyon süresi
            
            // Animasyon başlangıç zamanı
            let startTime = null;
            
            // Animasyon fonksiyonu
            function animateScroll(currentTime) {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // Yumuşak geçiş için easing fonksiyonu
                const easeProgress = easeInOutCubic(progress);
                const newPosition = startPosition + (targetPosition - startPosition) * easeProgress;
                
                window.scrollTo(0, newPosition);
                
                if (timeElapsed < duration) {
                    isScrolling = true;
                    requestAnimationFrame(animateScroll);
                } else {
                    isScrolling = false;
                }
            }
            
            // Animasyonu başlat
            requestAnimationFrame(animateScroll);
        }, { passive: false });
        
        // Easing fonksiyonu (yumuşak geçiş için)
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        
        // Touchpad ve trackpad için daha iyi destek
        window.addEventListener('scroll', function() {
            isScrolling = false;
        }, { passive: true });
    }
    
    // Kaydırma fonksiyonunu çağır
    setupSmoothScrolling();
    
});