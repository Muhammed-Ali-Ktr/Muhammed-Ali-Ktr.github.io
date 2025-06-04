// İletişim sayfası için JavaScript kodları
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

    // Form gönderim işlemini ele alalım
    const contactForm = document.getElementById('contact-form');
    const notification = document.querySelector('.notification');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form elemanlarını alalım
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Basit doğrulama
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                highlightError(nameInput);
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (subjectInput.value.trim() === '') {
                highlightError(subjectInput);
                isValid = false;
            } else {
                removeError(subjectInput);
            }
            
            if (messageInput.value.trim() === '') {
                highlightError(messageInput);
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // Form başarıyla gönderildi
                showSuccess();
                
                // Formu sıfırlayalım
                contactForm.reset();
            }
        });
    }
    
    // Form hatasını vurgulama
    function highlightError(input) {
        input.classList.add('form-error');
        input.classList.remove('form-success');
        
        // Hatayı 1 saniye sonra kaldıralım
        setTimeout(() => {
            input.classList.remove('form-error');
        }, 1000);
    }
    
    // Hata sınıfını kaldırma
    function removeError(input) {
        input.classList.remove('form-error');
    }
    
    // E-posta doğrulama
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Başarı mesajını gösterme
    function showSuccess() {
        notification.innerHTML = '<i class="fas fa-check-circle"></i> Mesajınız başarıyla gönderildi!';
        notification.style.background = 'rgba(76, 175, 80, 0.9)';
        notification.style.bottom = '30px';
        
        // Form içindeki elemanları başarılı olarak işaretleyelim
        const formElements = contactForm.querySelectorAll('input, textarea');
        formElements.forEach(element => {
            element.classList.add('form-success');
        });
        
        // 3 saniye sonra bildirimi gizleyelim
        setTimeout(() => {
            notification.style.bottom = '-100px';
            
            // Başarı sınıflarını kaldıralım
            setTimeout(() => {
                formElements.forEach(element => {
                    element.classList.remove('form-success');
                });
            }, 500);
        }, 3000);
    }
    
    // Arka planda yıldızlar ekleyelim
    function createStars() {
        const starsContainer = document.getElementById('particles-js');
        const starsCount = 20;
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.classList.add('night-stars');
            
            // Rastgele pozisyon
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            starsContainer.appendChild(star);
        }
    }
    
    // Yıldızları oluşturalım
    createStars();
    
    // İletişim bilgilerinde hover efekti
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Form elemanlarına odaklanıldığında etki
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateX(5px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateX(0)';
        });
    });
    
    // Sosyal medya bağlantılarına hover efekti
    const socialLinks = document.querySelectorAll('.social-media-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
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