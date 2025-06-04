document.addEventListener('DOMContentLoaded', function() {
    // Particles.js yapılandırması
    initParticles();

    // DOM elementleri
    const galleryGrid = document.querySelector('.gallery-grid');
    const controlBtns = document.querySelectorAll('.control-btn');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const photoModal = document.querySelector('.photo-modal');
    const addPhotoModal = document.querySelector('.add-photo-modal');
    const shareModal = document.querySelector('.share-modal');
    const toastNotification = document.querySelector('.toast-notification');
    const uploadPreviewContainer = document.getElementById('uploadPreviewContainer');
    const previewImage = document.getElementById('previewImage');
    const photoUploadForm = document.getElementById('photoUploadForm');

    // Mevcut sayfa ve yükleme durumu
    let currentPage = 1;
    let isLoading = false;
    let activeFilter = 'all';

    // Galeri filtreleme
    controlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Aktif sınıfını kaldır
            controlBtns.forEach(b => b.classList.remove('active'));
            // Tıklanan butona aktif sınıfını ekle
            this.classList.add('active');
            
            // Filtre değerini al
            activeFilter = this.getAttribute('data-filter');
            
            // Filtrelemeyi uygula
            filterGallery(activeFilter);
        });
    });

    // Galeri filtreleme fonksiyonu
    function filterGallery(filter) {
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                // Görünür animasyonu
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // Gizleme animasyonu
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // Daha fazla fotoğraf yükleme
    loadMoreBtn.addEventListener('click', function() {
        if (isLoading) return;
        
        isLoading = true;
        loadMoreBtn.querySelector('span').style.display = 'none';
        loadMoreBtn.querySelector('i').style.display = 'inline-block';
        
        // Simüle edilmiş yükleme
        setTimeout(() => {
            loadMorePhotos();
            isLoading = false;
            loadMoreBtn.querySelector('span').style.display = 'inline-block';
            loadMoreBtn.querySelector('i').style.display = 'none';
        }, 1500);
    });

    // Yeni fotoğrafları yükleme fonksiyonu
    function loadMorePhotos() {
        currentPage++;
        
        // Bu normalde sunucudan yeni veri almak için AJAX isteği olurdu
        // Burada demo amaçlı statik olarak 3 kart ekleniyor
        const categories = ['tech', 'gaming', 'personal'];
        const titles = [
            'Yazılım Projesi', 'Yeni Oyun Denemesi', 'Kahve Keyfi',
            'Kod Maratonu', 'Turnuva Hazırlığı', 'Hafta Sonu Gezisi'
        ];
        const descriptions = [
            'Yeni bir yazılım projesi üzerinde çalışırken...',
            'Bu hafta çıkan oyunu test ederken çok eğlendim!',
            'Şehrin en güzel kafesinde keyifli bir mola.',
            'Tüm gece yeni web projemiz için kod yazarken.',
            'Büyük e-spor turnuvası öncesi son hazırlıklar.',
            'Arkadaşlarımla birlikte doğa yürüyüşünde çekilmiş bir kare.'
        ];
        
        // Demo için rasgele içerik oluştur
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * 3);
            const category = categories[randomIndex];
            const title = titles[Math.floor(Math.random() * titles.length)];
            const description = descriptions[Math.floor(Math.random() * descriptions.length)];
            const likeCount = Math.floor(Math.random() * 50) + 5;
            const day = Math.floor(Math.random() * 30) + 1;
            
            // Yeni galeri elemanı oluştur
            const newItem = document.createElement('div');
            newItem.className = 'gallery-item';
            newItem.setAttribute('data-category', category);
            
            newItem.innerHTML = `
                <div class="gallery-card">
                    <div class="card-image">
                        <img src="/api/placeholder/800/600" alt="${title}">
                        <div class="card-overlay">
                            <div class="card-actions">
                                <button class="action-btn view-btn"><i class="fas fa-eye"></i></button>
                                <button class="action-btn like-btn"><i class="far fa-heart"></i> <span class="like-count">${likeCount}</span></button>
                                <button class="action-btn share-btn"><i class="fas fa-share-alt"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${title}</h3>
                        <p class="card-text">${description}</p>
                        <div class="card-meta">
                            <span class="card-date"><i class="far fa-calendar-alt"></i> ${day} Nisan, 2025</span>
                            <span class="card-tag ${category}-tag">${categoryToText(category)}</span>
                        </div>
                    </div>
                </div>
            `;
            
            galleryGrid.appendChild(newItem);
            
            // Animasyon için opacity ile başlat
            newItem.style.opacity = '0';
            newItem.style.transform = 'translateY(20px)';
            
            // Bu yeni elemanı da dinleyicilere ekle
            addCardEventListeners(newItem);
            
            // Filtre uyguluysa yeni elemanları kontrol et
            if (activeFilter !== 'all' && newItem.getAttribute('data-category') !== activeFilter) {
                newItem.style.display = 'none';
            }
            
            // Görünür animasyonu
            setTimeout(() => {
                if (activeFilter === 'all' || newItem.getAttribute('data-category') === activeFilter) {
                    newItem.style.opacity = '1';
                    newItem.style.transform = 'translateY(0)';
                }
            }, 50 * i);
        }
        
        // Son sayfada daha fazla gösterme
        if (currentPage >= 3) {
            loadMoreBtn.style.display = 'none';
            showToast('Tüm fotoğraflar yüklendi');
        }
    }

    // Kategori adını metin olarak döndürme
    function categoryToText(category) {
        switch(category) {
            case 'tech': return 'Teknoloji';
            case 'gaming': return 'Oyun';
            case 'personal': return 'Kişisel';
            default: return category;
        }
    }

    // Fotoğraf görüntüleme modalını açma
    function openPhotoModal(card) {
        const modalImage = photoModal.querySelector('.modal-image img');
        const modalTitle = photoModal.querySelector('.modal-title');
        const modalDescription = photoModal.querySelector('.modal-description');
        const modalLikeCount = photoModal.querySelector('.modal-like-count');
        
        // Kart bilgilerini al
        const cardImage = card.querySelector('.card-image img').src;
        const title = card.querySelector('.card-title').textContent;
        const description = card.querySelector('.card-text').textContent;
        const likeCount = card.querySelector('.like-count').textContent;
        
        // Modal bilgilerini doldur
        modalImage.src = cardImage;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalLikeCount.textContent = likeCount;
        
        // Modalı göster
        photoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Açılış animasyonu
        setTimeout(() => {
            photoModal.style.opacity = '1';
        }, 10);
    }

    // Tüm kartlara olay dinleyicileri ekleme
    function addCardEventListeners(container) {
        // Görüntüleme butonları
        const viewBtns = container.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = this.closest('.gallery-card');
                openPhotoModal(card);
            });
        });
        
        // Beğeni butonları
        const likeBtns = container.querySelectorAll('.like-btn');
        likeBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const likeCount = this.querySelector('.like-count');
                const currentLikes = parseInt(likeCount.textContent);
                
                // Beğeni ikonu değişimi
                const heartIcon = this.querySelector('i');
                if (heartIcon.classList.contains('far')) {
                    heartIcon.classList.remove('far');
                    heartIcon.classList.add('fas');
                    heartIcon.style.color = '#ff0080';
                    likeCount.textContent = currentLikes + 1;
                    showToast('Fotoğraf beğenildi');
                } else {
                    heartIcon.classList.remove('fas');
                    heartIcon.classList.add('far');
                    heartIcon.style.color = '';
                    likeCount.textContent = currentLikes - 1;
                    showToast('Beğeni kaldırıldı');
                }
            });
        });
        
        // Paylaş butonları
        const shareBtns = container.querySelectorAll('.share-btn');
        shareBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                openShareModal();
            });
        });
        
        // Kart tıklaması (resim görüntüleme için)
        const cards = container.querySelectorAll('.gallery-card');
        cards.forEach(card => {
            card.addEventListener('click', function() {
                openPhotoModal(this);
            });
        });
    }

    // İlk yüklemede kartlara dinleyicileri ekle
    addCardEventListeners(document.querySelector('.gallery-grid'));

    // Fotoğraf modalını kapatma
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            closeAllModals();
        });
    });

    // Esc tuşu ile modalları kapatma
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Tüm modalları kapatma fonksiyonu
    function closeAllModals() {
        photoModal.style.opacity = '0';
        addPhotoModal.style.opacity = '0';
        shareModal.style.opacity = '0';
        
        setTimeout(() => {
            photoModal.style.display = 'none';
            addPhotoModal.style.display = 'none';
            shareModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    // Modal içine tıklayınca kapatılmasını engelleme
    const modalContainers = document.querySelectorAll('.modal-container');
    modalContainers.forEach(container => {
        container.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Modalın dışına tıklayınca kapatma
    const modals = [photoModal, addPhotoModal, shareModal];
    modals.forEach(modal => {
        modal.addEventListener('click', function() {
            closeAllModals();
        });
    });

    // Modal beğeni butonu
    const modalLikeBtn = document.querySelector('.modal-like-btn');
    modalLikeBtn.addEventListener('click', function() {
        const likeCount = this.querySelector('.modal-like-count');
        const currentLikes = parseInt(likeCount.textContent);
        
        // Beğeni ikonu değişimi
        const heartIcon = this.querySelector('i');
        if (heartIcon.classList.contains('far')) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            heartIcon.style.color = '#ff0080';
            likeCount.textContent = currentLikes + 1;
            showToast('Fotoğraf beğenildi');
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            heartIcon.style.color = '';
            likeCount.textContent = currentLikes - 1;
            showToast('Beğeni kaldırıldı');
        }
    });

    // Modal paylaş butonu
    const modalShareBtn = document.querySelector('.modal-share-btn');
    modalShareBtn.addEventListener('click', function() {
        photoModal.style.opacity = '0';
        setTimeout(() => {
            photoModal.style.display = 'none';
            openShareModal();
        }, 300);
    });

    // Paylaş modalını açma
    function openShareModal() {
        shareModal.style.display = 'flex';
        setTimeout(() => {
            shareModal.style.opacity = '1';
        }, 10);
    }

    // Sosyal medya paylaşım butonları
    const shareOptions = document.querySelectorAll('.share-option');
    shareOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('copy-link')) {
                // Bağlantıyı kopyalama simülasyonu
                showToast('Bağlantı panoya kopyalandı');
            } else {
                // Sosyal medya paylaşımı simülasyonu
                const platform = this.querySelector('span').textContent;
                showToast(`${platform} üzerinde paylaşılıyor...`);
            }
            
            setTimeout(() => {
                closeAllModals();
            }, 1000);
        });
    });

    // Fotoğraf ekleme modalını açma
    const addPhotoBtn = document.querySelector('.add-photo-btn');
    addPhotoBtn.addEventListener('click', function() {
        addPhotoModal.style.display = 'flex';
        setTimeout(() => {
            addPhotoModal.style.opacity = '1';
        }, 10);
    });

    // Fotoğraf yükleme önizleme
    uploadPreviewContainer.addEventListener('click', function() {
        // Gerçek bir uygulama olsaydı, burada input file açılırdı
        // Şimdilik simülasyon için rastgele fotoğraf gösterelim
        previewImage.src = `/api/placeholder/800/600?random=${Math.random()}`;
        previewImage.style.display = 'block';
        uploadPreviewContainer.style.display = 'none';
    });

    // Fotoğraf formu gönderme
    photoUploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('photoTitle').value;
        const description = document.getElementById('photoDescription').value;
        const category = document.getElementById('photoCategory').value;
        
        if (!title || previewImage.style.display === 'none') {
            showToast('Lütfen başlık ekleyin ve bir fotoğraf seçin');
            return;
        }
        
        // Yükleme simülasyonu
        showToast('Fotoğraf yükleniyor...');
        
        setTimeout(() => {
            // Yeni fotoğrafı galeriye ekle
            const newItem = document.createElement('div');
            newItem.className = 'gallery-item';
            newItem.setAttribute('data-category', category);
            
            newItem.innerHTML = `
                <div class="gallery-card">
                    <div class="card-image">
                        <img src="${previewImage.src}" alt="${title}">
                        <div class="card-overlay">
                            <div class="card-actions">
                                <button class="action-btn view-btn"><i class="fas fa-eye"></i></button>
                                <button class="action-btn like-btn"><i class="far fa-heart"></i> <span class="like-count">0</span></button>
                                <button class="action-btn share-btn"><i class="fas fa-share-alt"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${title}</h3>
                        <p class="card-text">${description || 'Yeni yüklenen fotoğraf'}</p>
                        <div class="card-meta">
                            <span class="card-date"><i class="far fa-calendar-alt"></i> Bugün</span>
                            <span class="card-tag ${category}-tag">${categoryToText(category)}</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Yeni fotoğrafı en başa ekle
            galleryGrid.insertBefore(newItem, galleryGrid.firstChild);
            
            // Animasyon için opacity ile başlat
            newItem.style.opacity = '0';
            newItem.style.transform = 'translateY(-20px)';
            
            // Bu yeni elemanı da dinleyicilere ekle
            addCardEventListeners(newItem);
            
            // Filtre uyguluysa yeni elemanları kontrol et
            if (activeFilter !== 'all' && category !== activeFilter) {
                newItem.style.display = 'none';
            } else {
                // Görünür animasyonu
                setTimeout(() => {
                    newItem.style.opacity = '1';
                    newItem.style.transform = 'translateY(0)';
                }, 50);
            }
            
            // Formu resetle
            photoUploadForm.reset();
            previewImage.style.display = 'none';
            uploadPreviewContainer.style.display = 'flex';
            
            // Modal kapat
            closeAllModals();
            
            // Başarı bildirimi
            showToast('Fotoğraf başarıyla yüklendi');
        }, 1500);
    });

    // İptal butonları
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    cancelButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            closeAllModals();
        });
    });

    // Yorum gönderme
    const commentSubmit = document.querySelector('.comment-submit');
    const commentInput = document.querySelector('.comment-input');
    
    commentSubmit.addEventListener('click', function() {
        const comment = commentInput.value.trim();
        
        if (!comment) return;
        
        // Yeni yorum ekle
        const commentsList = document.querySelector('.comments-list');
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        
        newComment.innerHTML = `
            <div class="comment-avatar">
                <img src="/api/placeholder/40/40" alt="Kullanıcı">
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">Siz</span>
                    <span class="comment-time">Şimdi</span>
                </div>
                <p class="comment-text">${comment}</p>
                <div class="comment-actions">
                    <button class="comment-like"><i class="far fa-heart"></i> 0</button>
                    <button class="comment-reply">Yanıtla</button>
                </div>
            </div>
        `;
        
        commentsList.prepend(newComment);
        commentInput.value = '';
        
        // Yorum beğeni butonları için dinleyici
        addCommentLikeListeners(newComment);
        
        showToast('Yorumunuz eklendi');
    });

    // Mevcut yorumlara beğeni olayı ekleme
    function addCommentLikeListeners(container) {
        const commentLikes = container.querySelectorAll('.comment-like');
        
        commentLikes.forEach(btn => {
            btn.addEventListener('click', function() {
                const heartIcon = this.querySelector('i');
                const likeText = this.textContent.trim();
                const likeCount = parseInt(likeText.match(/\d+/)[0]);
                
                if (heartIcon.classList.contains('far')) {
                    heartIcon.classList.remove('far');
                    heartIcon.classList.add('fas');
                    heartIcon.style.color = '#ff0080';
                    this.textContent = '';
                    this.appendChild(heartIcon);
                    this.append(` ${likeCount + 1}`);
                } else {
                    heartIcon.classList.remove('fas');
                    heartIcon.classList.add('far');
                    heartIcon.style.color = '';
                    this.textContent = '';
                    this.appendChild(heartIcon);
                    this.append(` ${likeCount - 1}`);
                }
            });
        });
    }

    // İlk yüklemede mevcut yorumlara beğeni olayı ekleme
    addCommentLikeListeners(document.querySelector('.comments-list'));

    // Toast bildirimi gösterme
    function showToast(message) {
        const toastMessage = toastNotification.querySelector('.toast-message');
        toastMessage.textContent = message;
        
        // Toast'u görünür yap
        toastNotification.style.bottom = '30px';
        
        // Toast'u gizle
        setTimeout(() => {
            toastNotification.style.bottom = '-100px';
        }, 3000);
    }

    // Toast kapatma butonu
    const toastClose = document.querySelector('.toast-close');
    toastClose.addEventListener('click', function() {
        toastNotification.style.bottom = '-100px';
    });

    // Particles.js başlatma
    function initParticles() {
        if (window.particlesJS) {
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
        }
    }

    // Sayfa geçiş animasyonu
    const pageTransition = document.querySelector('.page-transition');
    const sidebarButtons = document.querySelectorAll('.sidebar-button');
    
    sidebarButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!this.querySelector('a')) {
                e.preventDefault();
                
                const target = this.getAttribute('data-target');
                
                pageTransition.style.opacity = '1';
                setTimeout(() => {
                    window.location.href = `${target}.html`;
                }, 500);
            }
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