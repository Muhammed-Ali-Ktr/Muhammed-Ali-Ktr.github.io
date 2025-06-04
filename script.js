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

    // İstatistik sayı animasyonu
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCount = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        
        // Gözlemci ile görünür olduğunda animasyonu başlat
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(stat);
            }
        });
        
        observer.observe(stat);
    });

    // Buton etkileşimleri
    const buttons = document.querySelectorAll('.sidebar-button');
    const transition = document.querySelector('.page-transition');
    const notification = document.querySelector('.notification');
    const followBtn = document.querySelector('.follow-button');
    const likeBtn = document.querySelector('.like-button');
    
    // Butonlara tıklama olayları
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            navigateTo(target);
        });
    });
    
    // Sayfa geçiş fonksiyonu
    function navigateTo(target) {
        // Geçiş animasyonunu başlat
        transition.style.transform = 'scaleY(1)';
        transition.style.transformOrigin = 'bottom';
        
        // 400ms sonra bildirimi göster
        setTimeout(() => {
            let message = '';
            let icon = '';
            
            switch(target) {
                case 'home':
                    message = 'Ana Sayfaya Yönlendiriliyorsunuz';
                    icon = 'fa-home';
                    break;
                case 'gallery':
                    message = 'Resim Galerisi Açılıyor';
                    icon = 'fa-images';
                    break;
                case 'schedule':
                    message = 'Yayın Programı Yükleniyor';
                    icon = 'fa-calendar-alt';
                    break;
                case 'games':
                    message = 'Oynadığım Oyunlar Listesi';
                    icon = 'fa-gamepad';
                    break;
                case 'contact':
                    message = 'İletişim Sayfası Açılıyor';
                    icon = 'fa-envelope';
                    break;
            }
            
            notification.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
            notification.style.bottom = '30px';
            
            // 2 saniye sonra bildirimi gizle ve geçişi tamamla
            setTimeout(() => {
                notification.style.bottom = '-100px';
                
                // Gerçek uygulamada burada sayfa yönlendirmesi yapılır
                // window.location.href = target + '.html';
                
                // Geçiş animasyonunu tersine çevir
                setTimeout(() => {
                    transition.style.transform = 'scaleY(0)';
                    transition.style.transformOrigin = 'top';
                }, 500);
            }, 2000);
        }, 400);
    }
    
    // Takip Et butonu
    followBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Buton animasyonu
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
        
        // Bildirim göster
        notification.innerHTML = '<i class="fas fa-heart"></i> Takip ettiğiniz için teşekkürler!';
        notification.style.bottom = '30px';
        
        setTimeout(() => {
            notification.style.bottom = '-100px';
        }, 3000);
    });

    // Beğen butonu
    likeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Buton animasyonu
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
        
        // Bildirim göster
        notification.innerHTML = '<i class="fas fa-heart"></i> Beğendiğiniz için teşekkürler!';
        notification.style.bottom = '30px';
        
        setTimeout(() => {
            notification.style.bottom = '-100px';
        }, 3000);
    });
    
    // Fare hareketine göre 3D efekti
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const profileCard = document.querySelector('.profile-card');
        if (profileCard) {
            profileCard.style.transform = `perspective(1000px) rotateY(${x * 10 - 5}deg) rotateX(${y * -10 + 5}deg)`;
        }
    });
    
    // Sosyal medya ikonlarına tooltip efekti
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) translateY(-5px)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Yazı yazma animasyonu için
    const typingElements = document.querySelectorAll('.typing-animation');
    typingElements.forEach((el, index) => {
        // Animasyon gecikmesini ayarla
        el.style.animationDelay = `${index * 1.5}s`;
        
        // Animasyon bittiğinde sınır çizgisini kaldır
        el.addEventListener('animationend', () => {
            el.style.borderRight = 'none';
            el.style.whiteSpace = 'normal';
        });
    });
});

// index.html ana sayfa butonu
document.addEventListener("DOMContentLoaded", function () {
  const buton = document.getElementById("anasayfa");

  buton.addEventListener("click", function () {
    window.location.href = "index.html"; // Gitmek istediğin sayfanın yolu
  });
});

// galeri.html galeri butonu
document.addEventListener("DOMContentLoaded", function () {
  const buton = document.getElementById("galeri");

  buton.addEventListener("click", function () {
    window.location.href = "galeri.html"; // Gitmek istediğin sayfanın yolu
  });
});

// sytem.html sistem butonu
document.addEventListener("DOMContentLoaded", function () {
  const buton = document.getElementById("sistem");

  buton.addEventListener("click", function () {
    window.location.href = "system.html"; // Gitmek istediğin sayfanın yolu
  });
});

// programlarım.html programlarım butonu
document.addEventListener("DOMContentLoaded", function () {
  const buton = document.getElementById("programlarım");

  buton.addEventListener("click", function () {
    window.location.href = "programlarım.html"; // Gitmek istediğin sayfanın yolu
  });
});

// randevu.html randevu butonu
document.addEventListener("DOMContentLoaded", function () {
  const buton = document.getElementById("randevu");

  buton.addEventListener("click", function () {
    window.location.href = "randevu.html"; // Gitmek istediğin sayfanın yolu
  });
});

// oyunlar.html oyunlar butonu
document.addEventListener("DOMContentLoaded", function () {
  const buton = document.getElementById("oyunlar");

  buton.addEventListener("click", function () {
    window.location.href = "oyunlar.html"; // Gitmek istediğin sayfanın yolu
  });
});

// iletisim.html iletişim butonu
document.addEventListener("DOMContentLoaded", function () {
  const buton = document.getElementById("iletişim");

  buton.addEventListener("click", function () {
    window.location.href = "iletisim.html"; // Gitmek istediğin sayfanın yolu
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