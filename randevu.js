// Particles.js konfigürasyonu
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
                "speed": 1,
                "direction": "none",
                "random": true,
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
});

// Canlı saat ve tarih fonksiyonu
function güncelleZaman() {
    const şimdi = new Date();
    
    // Saat, dakika, saniye
    const saat = String(şimdi.getHours()).padStart(2, '0');
    const dakika = String(şimdi.getMinutes()).padStart(2, '0');
    const saniye = String(şimdi.getSeconds()).padStart(2, '0');
    
    // HTML elementlerine değerleri atama
    document.getElementById('saat').textContent = saat;
    document.getElementById('dakika').textContent = dakika;
    document.getElementById('saniye').textContent = saniye;
    
    // Tarih bilgisi
    const günler = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    
    const gün = şimdi.getDate();
    const ay = aylar[şimdi.getMonth()];
    const yıl = şimdi.getFullYear();
    const haftaGünü = günler[şimdi.getDay()];
    
    document.getElementById('tarih').textContent = `${gün} ${ay} ${yıl}, ${haftaGünü}`;
}

// Saati her saniye güncelle
setInterval(güncelleZaman, 1000);
güncelleZaman(); // Sayfa yüklendiğinde hemen çalıştır

// Takvim Oluşturma Fonksiyonları
class Takvim {
    constructor(takvimElementId, ayElementId, öncekiAyBtnId, sonrakiAyBtnId, saatlerElementId, formElementId, tip) {
        this.takvimElement = document.getElementById(takvimElementId);
        this.ayElement = document.getElementById(ayElementId);
        this.öncekiAyBtn = document.getElementById(öncekiAyBtnId);
        this.sonrakiAyBtn = document.getElementById(sonrakiAyBtnId);
        this.saatlerElement = document.getElementById(saatlerElementId);
        this.formElement = document.getElementById(formElementId);
        this.tip = tip;
        
        this.şuAnkiTarih = new Date();
        this.seçilenTarih = null;
        this.seçilenSaat = null;
        
        this.güncelAy = this.şuAnkiTarih.getMonth();
        this.güncelYıl = this.şuAnkiTarih.getFullYear();
        
        this.olaylarıEkle();
        this.takvimOluştur();
    }
    
    olaylarıEkle() {
        this.öncekiAyBtn.addEventListener('click', () => this.öncekiAy());
        this.sonrakiAyBtn.addEventListener('click', () => this.sonrakiAy());
        
        // Saat slotları için event listener'lar
        this.saatlerElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('saat-slot') && !e.target.classList.contains('dolu')) {
                // Seçili olan varsa temizle
                const öncekiSeçili = this.saatlerElement.querySelector('.secili');
                if (öncekiSeçili) {
                    öncekiSeçili.classList.remove('secili');
                }
                
                // Yeni seçilen saati işaretle
                e.target.classList.add('secili');
                this.seçilenSaat = e.target.textContent;
                
                // Form göster
                this.formElement.style.display = 'block';
                
                // Sayfayı formun olduğu yere kaydır
                this.formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    takvimOluştur() {
        // Ay başlığını güncelle
        const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
        this.ayElement.textContent = `${aylar[this.güncelAy]} ${this.güncelYıl}`;
        
        // Takvimi temizle
        this.takvimElement.innerHTML = '';
        
        // Ayın ilk gününü ve son gününü hesapla
        const ilkGün = new Date(this.güncelYıl, this.güncelAy, 1);
        const sonGün = new Date(this.güncelYıl, this.güncelAy + 1, 0);
        
        // Ayın ilk gününün hangi gün olduğunu bul (0: Pazar, 1: Pazartesi, ...)
        let başlangıçGünü = ilkGün.getDay();
        // Pazartesi'den başlamak için düzenleme (0: Pazartesi, 1: Salı, ..., 6: Pazar)
        başlangıçGünü = başlangıçGünü === 0 ? 6 : başlangıçGünü - 1;
        
        // Önceki ayın son günlerini hesapla
        const öncekiAySonGünü = new Date(this.güncelYıl, this.güncelAy, 0).getDate();
        
        // Boş günleri (önceki ayın son günleri) ekle
        for (let i = başlangıçGünü - 1; i >= 0; i--) {
            const gün = document.createElement('div');
            gün.classList.add('gün', 'devre-disi');
            gün.textContent = öncekiAySonGünü - i;
            this.takvimElement.appendChild(gün);
        }
        
        // Bugünün tarihi
        const bugün = new Date();
        const bugünYıl = bugün.getFullYear();
        const bugünAy = bugün.getMonth();
        const bugünGün = bugün.getDate();
        
        // Ayın günlerini ekle
        for (let i = 1; i <= sonGün.getDate(); i++) {
            const gün = document.createElement('div');
            gün.classList.add('gün');
            gün.textContent = i;
            
            // Bugünün tarihini işaretle
            if (i === bugünGün && this.güncelAy === bugünAy && this.güncelYıl === bugünYıl) {
                gün.classList.add('bugun');
            }
            
            // Geçmiş günleri devre dışı bırak
            const tarih = new Date(this.güncelYıl, this.güncelAy, i);
            if (tarih < new Date(bugünYıl, bugünAy, bugünGün)) {
                gün.classList.add('devre-disi');
            } else {
                // Rastgele durumlar (gerçek bir sistemde bu veriler API'den alınır)
                const durum = this.rastgeleDurum();
                if (durum) {
                    const durumNoktası = document.createElement('span');
                    durumNoktası.classList.add('durum-noktası', durum);
                    gün.appendChild(durumNoktası);
                }
                
                // Gün seçimi için olay ekle
                gün.addEventListener('click', () => {
                    if (!gün.classList.contains('devre-disi')) {
                        // Daha önce seçili olan günü temizle
                        const öncekiSeçili = this.takvimElement.querySelector('.secili');
                        if (öncekiSeçili) {
                            öncekiSeçili.classList.remove('secili');
                        }
                        
                        // Yeni seçilen günü işaretle
                        gün.classList.add('secili');
                        
                        // Seçilen tarihi kaydet
                        this.seçilenTarih = new Date(this.güncelYıl, this.güncelAy, i);
                        
                        // Saatler bölümünü görünür yap ve rastgele dolu saatleri güncelle
                        this.saatleriGüncelle();
                    }
                });
            }
            
            this.takvimElement.appendChild(gün);
        }
        
        // Sonraki ayın ilk günlerini hesapla ve ekle
        const toplamHücre = 42; // 6 satır x 7 sütun
        const kalan = toplamHücre - (başlangıçGünü + sonGün.getDate());
        
        for (let i = 1; i <= kalan; i++) {
            const gün = document.createElement('div');
            gün.classList.add('gün', 'devre-disi');
            gün.textContent = i;
            this.takvimElement.appendChild(gün);
        }
    }
    
    öncekiAy() {
        this.güncelAy--;
        if (this.güncelAy < 0) {
            this.güncelAy = 11;
            this.güncelYıl--;
        }
        this.takvimOluştur();
    }
    
    sonrakiAy() {
        this.güncelAy++;
        if (this.güncelAy > 11) {
            this.güncelAy = 0;
            this.güncelYıl++;
        }
        this.takvimOluştur();
    }
    
    rastgeleDurum() {
        const durum = Math.floor(Math.random() * 4); // 0-3 arası rastgele sayı
        
        switch (durum) {
            case 0: return 'müsait';
            case 1: return 'kısmen-dolu';
            case 2: return 'dolu';
            default: return null; // Bazı günlerde durum gösterme
        }
    }
    
    saatleriGüncelle() {
        // Saatler bölümünü göster
        this.saatlerElement.parentElement.style.display = 'block';
        
        // Tüm saat slotlarını temizle
        const saatSlotları = this.saatlerElement.querySelectorAll('.saat-slot');
        
        // Her saat slotu için rastgele dolu/boş durumu ata
        saatSlotları.forEach(slot => {
            // Mevcut tüm sınıfları kaldır (secili ve dolu)
            slot.classList.remove('secili', 'dolu');
            
            // Rastgele bazı saatleri dolu olarak işaretle
            if (Math.random() < 0.3) { // %30 olasılıkla dolu
                slot.classList.add('dolu');
            }
        });
        
        // Scrollu saatler bölümüne getir
        this.saatlerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    getSeçilenTarih() {
        return this.seçilenTarih;
    }
    
    getSeçilenSaat() {
        return this.seçilenSaat;
    }
    
    getTip() {
        return this.tip;
    }
}

// Sayfa yüklendiğinde çalışacak kod
document.addEventListener('DOMContentLoaded', function() {
    // Takvim nesnelerini oluştur
    const yazılımTakvim = new Takvim(
        'yazılım-takvim',
        'takvim-ay',
        'önceki-ay',
        'sonraki-ay',
        'yazılım-saatler',
        'yazılım-form',
        'Yazılım Danışmanlığı'
    );
    
    const oyunTakvim = new Takvim(
        'oyun-takvim',
        'oyun-takvim-ay',
        'oyun-önceki-ay',
        'oyun-sonraki-ay',
        'oyun-saatler',
        'oyun-form',
        'Oyun Geliştirme'
    );
    
    // Yazılım randevu formu gönderme
    document.getElementById('yazılım-gönder').addEventListener('click', function() {
        const ad = document.getElementById('yazılım-ad').value;
        const email = document.getElementById('yazılım-email').value;
        const telefon = document.getElementById('yazılım-telefon').value;
        const konu = document.getElementById('yazılım-konu').value;
        
        // Form validasyonu
        if (!ad || !email || !telefon || !konu) {
            gösterBildirim('Lütfen tüm alanları doldurunuz', 'fa-exclamation-triangle');
            return;
        }
        
        if (!yazılımTakvim.getSeçilenTarih() || !yazılımTakvim.getSeçilenSaat()) {
            gösterBildirim('Lütfen tarih ve saat seçiniz', 'fa-exclamation-triangle');
            return;
        }
        
        // Başarılı randevu oluşturma
        randevuOluştur(
            yazılımTakvim.getTip(),
            yazılımTakvim.getSeçilenTarih(),
            yazılımTakvim.getSeçilenSaat(),
            ad,
            email,
            konu
        );
    });
    
    // Oyun randevu formu gönderme
    document.getElementById('oyun-gönder').addEventListener('click', function() {
        const ad = document.getElementById('oyun-ad').value;
        const email = document.getElementById('oyun-email').value;
        const telefon = document.getElementById('oyun-telefon').value;
        const konu = document.getElementById('oyun-konu').value;
        
        // Form validasyonu
        if (!ad || !email || !telefon || !konu) {
            gösterBildirim('Lütfen tüm alanları doldurunuz', 'fa-exclamation-triangle');
            return;
        }
        
        if (!oyunTakvim.getSeçilenTarih() || !oyunTakvim.getSeçilenSaat()) {
            gösterBildirim('Lütfen tarih ve saat seçiniz', 'fa-exclamation-triangle');
            return;
        }
        
        // Başarılı randevu oluşturma
        randevuOluştur(
            oyunTakvim.getTip(),
            oyunTakvim.getSeçilenTarih(),
            oyunTakvim.getSeçilenSaat(),
            ad,
            email,
            konu
        );
    });
    
    // Yeni randevu butonu
    document.getElementById('yeni-randevu').addEventListener('click', function() {
        // Randevu özetini gizle
        document.getElementById('randevu-özeti').style.display = 'none';
        
        // Randevu bölümlerini göster
        document.querySelector('.randevu-bölümleri').style.display = 'grid';
        
        // Formu sıfırla
        document.getElementById('yazılım-ad').value = '';
        document.getElementById('yazılım-email').value = '';
        document.getElementById('yazılım-telefon').value = '';
        document.getElementById('yazılım-konu').value = '';
        document.getElementById('yazılım-detay').value = '';
        
        document.getElementById('oyun-ad').value = '';
        document.getElementById('oyun-email').value = '';
        document.getElementById('oyun-telefon').value = '';
        document.getElementById('oyun-konu').value = '';
        document.getElementById('oyun-detay').value = '';
        
        // Sayfayı en üste kaydır
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

function randevuOluştur(tip, tarih, saat, ad, email, konu) {
    // Tarihi formatlama
    const günler = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    
    const gün = tarih.getDate();
    const ay = aylar[tarih.getMonth()];
    const yıl = tarih.getFullYear();
    const haftaGünü = günler[tarih.getDay()];
    
    const formatlıTarih = `${gün} ${ay} ${yıl}, ${haftaGünü}`;
    
    // Özet bilgileri güncelle
    document.getElementById('özet-tür').textContent = tip;
    document.getElementById('özet-tarih').textContent = formatlıTarih;
    document.getElementById('özet-saat').textContent = saat;
    document.getElementById('özet-ad').textContent = ad;
    document.getElementById('özet-email').textContent = email;
    document.getElementById('özet-konu').textContent = konu;
    
    // Randevu bölümlerini gizle
    document.querySelector('.randevu-bölümleri').style.display = 'none';
    
    // Özet bölümünü göster
    document.getElementById('randevu-özeti').style.display = 'block';
    
    // Sayfayı özet bölümüne kaydır
    document.getElementById('randevu-özeti').scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Başarılı bildirim göster
    gösterBildirim('Randevunuz başarıyla oluşturuldu!', 'fa-check-circle');
}

// Bildirim gösterme fonksiyonu
function gösterBildirim(mesaj, ikon) {
    const bildirim = document.querySelector('.notification');
    
    // İkon ve mesajı ayarla
    bildirim.innerHTML = `<i class="fas ${ikon}"></i> ${mesaj}`;
    
    // Bildirimi göster
    bildirim.style.bottom = '20px';
    
    // 3 saniye sonra bildirimi gizle
    setTimeout(() => {
        bildirim.style.bottom = '-100px';
    }, 3000);
}

// Sayfa geçiş animasyonu (diğer sayfalara geçişlerde kullanılabilir)
function sayfaGeçişi(hedefSayfa) {
    const geçiş = document.querySelector('.page-transition');
    geçiş.style.transformOrigin = 'top';
    geçiş.style.transform = 'scaleY(1)';
    
    setTimeout(() => {
        window.location.href = hedefSayfa;
    }, 700);
}