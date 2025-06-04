// Oyunlar sayfası için JavaScript kodları

document.addEventListener('DOMContentLoaded', function() {
    // Particles.js yükleme
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
                "color": "#00f0ff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
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

    // Oyun arama ve filtreleme fonksiyonları
    const searchInput = document.getElementById('game-search');
    const sortSelect = document.getElementById('game-sort');
    const categorySelect = document.getElementById('game-category');
    const gameCards = document.querySelectorAll('.game-card');
    
    // Arama fonksiyonu
    searchInput.addEventListener('input', filterGames);
    sortSelect.addEventListener('change', filterGames);
    categorySelect.addEventListener('change', filterGames);

    // Filtreleme ve sıralama fonksiyonu
    function filterGames() {
        const searchTerm = searchInput.value.toLowerCase();
        const sortValue = sortSelect.value;
        const categoryValue = categorySelect.value;
        
        // Önce görünürlüğü filtrele
        let visibleCount = 0;
        gameCards.forEach(card => {
            const title = card.querySelector('.game-title').textContent.toLowerCase();
            const category = card.dataset.category;
            
            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = categoryValue === 'all' || category === categoryValue;
            
            if (matchesSearch && matchesCategory) {
                card.classList.remove('hidden');
                visibleCount++;
                
                // Filtrelendiğinde animasyon ekle
                card.classList.add('filtered');
                setTimeout(() => {
                    card.classList.remove('filtered');
                }, 1000);
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Sonuç bulunamadı mesajını göster/gizle
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
        
        // Sıralama
        const visibleCards = Array.from(gameCards).filter(card => !card.classList.contains('hidden'));
        
        // Sıralama seçeneğine göre kartları sırala
        sortCards(visibleCards, sortValue);
    }
    
    // Kartları sıralama fonksiyonu
    function sortCards(cards, sortMethod) {
        const gamesContainer = document.querySelector('.games-container');
        
        cards.sort((a, b) => {
            switch(sortMethod) {
                case 'newest':
                    return new Date(b.dataset.date) - new Date(a.dataset.date);
                    
                case 'oldest':
                    return new Date(a.dataset.date) - new Date(b.dataset.date);
                    
                case 'alphabetical':
                    return a.querySelector('.game-title').textContent.localeCompare(
                        b.querySelector('.game-title').textContent
                    );
                    
                case 'reverse-alphabetical':
                    return b.querySelector('.game-title').textContent.localeCompare(
                        a.querySelector('.game-title').textContent
                    );
                    
                default:
                    return 0;
            }
        });
        
        // Sıralanmış kartları DOM'a yerleştir
        cards.forEach(card => {
            gamesContainer.appendChild(card);
        });
    }
    
    // Sonuç bulunamadı elemanını oluştur
    const noResultsElement = document.createElement('div');
    noResultsElement.className = 'no-results';
    noResultsElement.innerHTML = '<i class="fas fa-gamepad"></i>Aradığınız kriterlere uygun oyun bulunamadı.';
    document.querySelector('.games-container').appendChild(noResultsElement);
    
    // Yeni Oyun Ekle butonu için animasyon
    const addGameBtn = document.querySelector('.add-game-button');
    if (addGameBtn) {
        addGameBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Buton animasyonu
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // Bildirim göster
            showNotification('Yakında yeni oyun ekleme özelliği gelecek!');
        });
    }
    
    // Bildirim gösterme fonksiyonu
    function showNotification(message) {
        const notification = document.querySelector('.notification');
        notification.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
        notification.style.bottom = '30px';
        
        setTimeout(() => {
            notification.style.bottom = '-100px';
        }, 3000);
    }
    
    // Sayfa geçiş animasyonları
    const sidebarButtons = document.querySelectorAll('.sidebar-button');
    sidebarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('active')) {
                const pageTransition = document.querySelector('.page-transition');
                
                // Sayfa geçiş animasyonu
                pageTransition.style.transformOrigin = 'top';
                pageTransition.style.transform = 'scaleY(1)';
                
                setTimeout(() => {
                    // Normalde başka sayfaya yönlendirme olacağı için
                    // burada sadece animasyonu tersine çeviriyoruz
                    pageTransition.style.transformOrigin = 'bottom';
                    pageTransition.style.transform = 'scaleY(0)';
                }, 800);
            }
        });
    });
    
    // Sayfa yüklendiğinde animasyon
    const content = document.querySelector('.content');
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        content.style.transition = 'all 0.6s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 300);
});