document.addEventListener('DOMContentLoaded', function() {

    const CONFIG = {
        GOOGLE_FORM_URL: 'https://forms.gle/Km3qdNWRmA1cBvoW7',
        SPOTIFY_PLAYLIST_URL: 'https://open.spotify.com/playlist/1t53Gjg8kKEvH8qxuESdy5?si=3133ff310e424648&pt=a48d5fd66ebfe8fc0427be082ad2197a',
        CEREMONY_ADDRESS: 'Torre Gallen, Burriana, Castellón, España',
        CELEBRATION_ADDRESS: 'Torre Gallen, Burriana, Castellón, España',
        GIFT_DATA: {
            alpha: 'RVM4NSAyMTAwIDc3MzkgNzExMyAwMDM3IDUwMjk=',
            beta: 'RVMzMiAwMTgyIDA1ODQgMzcwMiAwMTcyIDc1Mjc='
        }
    };

    const rsvpBtn = document.getElementById('rsvp-btn');
    const musicBtn = document.getElementById('music-btn');

    initGiftData();

    if (rsvpBtn) {
        rsvpBtn.addEventListener('click', handleRSVPClick);
        rsvpBtn.href = CONFIG.GOOGLE_FORM_URL;
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', handleMusicClick);
        musicBtn.href = CONFIG.SPOTIFY_PLAYLIST_URL;
    }

    function handleRSVPClick(e) {
        e.preventDefault();

        addLoadingState(rsvpBtn, 'Abriendo formulario...');

        trackEvent('rsvp_click');

        setTimeout(() => {
            window.open(CONFIG.GOOGLE_FORM_URL, '_blank');
            showNotification('Formulario de confirmación abierto', 'success');
            removeLoadingState(rsvpBtn, '<i class="fas fa-check"></i> Confirmar Asistencia');
        }, 500);
    }

    function handleMusicClick(e) {
        e.preventDefault();

        addLoadingState(musicBtn, 'Abriendo Spotify...');

        trackEvent('music_click');

        setTimeout(() => {
            window.open(CONFIG.SPOTIFY_PLAYLIST_URL, '_blank');
            showNotification('Playlist de Spotify abierta', 'success');
            removeLoadingState(musicBtn, '<i class="fab fa-spotify"></i> ¿Quieres añadir alguna canción para que suene en la fiesta?');
        }, 500);
    }

    window.openMap = function(location) {
        const address = CONFIG.CEREMONY_ADDRESS;
        const encodedAddress = encodeURIComponent(address);
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

        trackEvent('map_click', { location });

        window.open(mapsUrl, '_blank');
        showNotification('Ubicación abierta en Google Maps', 'info');
    };

    function addLoadingState(button, text) {
        button.classList.add('btn-loading');
        button.innerHTML = text;
        button.disabled = true;
    }

    function removeLoadingState(button, originalHTML) {
        button.classList.remove('btn-loading');
        button.innerHTML = originalHTML;
        button.disabled = false;
    }

    function showNotification(message, type = 'info') {
        const existing = document.querySelectorAll('.notification');
        existing.forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };

        notification.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 320px;
            word-wrap: break-word;
        `;

        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    document.querySelectorAll('a[href^="#"]:not(.nav-item)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (!targetId || targetId === '#' || targetId.length <= 1) {
                return;
            }

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const yOffset = -20;
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.detail-card, .timeline-item').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    function trackEvent(eventName, properties = {}) {
        console.log('Event tracked:', eventName, properties);

    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function optimizeImages() {
        console.log('Images optimized for performance');
    }

    function initFloatingNav() {
        const navItems = document.querySelectorAll('.nav-item');

        if (navItems.length === 0) return;

        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');

                if (!targetId || targetId === '#' || targetId.length <= 1 || !targetId.startsWith('#')) {
                    console.warn('Invalid target ID:', targetId);
                    return;
                }

                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const yOffset = -20;
                    const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });

                    navItems.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');

                    trackEvent('nav_click', { section: this.dataset.section });
                } else {
                    console.warn('Target section not found:', targetId);
                }
            });
        });

        const sections = document.querySelectorAll('section[id]');
        const observerNav = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const activeNav = document.querySelector(`.nav-item[href="#${sectionId}"]`);
                    if (activeNav) {
                        navItems.forEach(nav => nav.classList.remove('active'));
                        activeNav.classList.add('active');
                    }
                }
            });
        }, {
            threshold: [0.3, 0.7],
            rootMargin: '-15% 0px -15% 0px'
        });

        sections.forEach(section => {
            if (section.id) {
                observerNav.observe(section);
            }
        });
    }

    function decodeGiftInfo(encoded) {
        try {
            return atob(encoded);
        } catch (e) {
            return 'ES XXXX XXXX XXXX XXXX XXXX XXXX';
        }
    }

    function initGiftData() {
        const urlParams = new URLSearchParams(window.location.search);
        let invParam = urlParams.get('inv');

        let selectedAccount;
        let actualParam;

        if (invParam === 'a') {
            selectedAccount = CONFIG.GIFT_DATA.alpha;
            actualParam = 'a';
        } else if (invParam === 'b') {
            selectedAccount = CONFIG.GIFT_DATA.beta;
            actualParam = 'b';
        } else {
            // Sin query param, escoger aleatoriamente entre a o b
            const randomChoice = Math.random() < 0.5 ? 'a' : 'b';
            selectedAccount = randomChoice === 'a' ? CONFIG.GIFT_DATA.alpha : CONFIG.GIFT_DATA.beta;
            actualParam = randomChoice;
            console.log(`Random fallback account (${randomChoice}):`, decodeGiftInfo(selectedAccount));
        }

        const decodedAccount = decodeGiftInfo(selectedAccount);

        const bankNumberElement = document.querySelector('.bank-number');
        if (bankNumberElement) {
            bankNumberElement.textContent = decodedAccount;

            const bankNoteElement = document.querySelector('.bank-note');
            if (bankNoteElement) {
                bankNoteElement.textContent = `Número de cuenta para invitación ${actualParam.toUpperCase()}`;
            }
        }

        trackEvent('bank_account_displayed', {
            param: actualParam,
            account: decodedAccount.slice(-4)
        });
    }

    function init() {
        console.log('💕 Wedding landing page initialized');
        console.log('🎉 Ready for Isa & Jose wedding!');

        trackEvent('page_load');

        optimizeImages();

        initFloatingNav();
    }

    init();

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (rsvpBtn) {
                rsvpBtn.click();
            }
        }
    });

    window.shareWedding = function() {
        if (navigator.share) {
            navigator.share({
                title: 'Boda Isa & Jose - 14 de Febrero 2026',
                text: 'Nos casamos y queremos celebrarlo contigo',
                url: window.location.href
            }).then(() => {
                trackEvent('share_success');
            }).catch(() => {
                copyToClipboard(window.location.href);
            });
        } else {
            copyToClipboard(window.location.href);
        }
    };

    window.copyAccountNumber = function() {
        const bankNumberElement = document.querySelector('.bank-number');
        const copyBtn = document.querySelector('.copy-btn');
        
        if (bankNumberElement && copyBtn) {
            const accountNumber = bankNumberElement.textContent.trim();
            
            copyToClipboard(accountNumber);
            
            // Animación visual de éxito
            copyBtn.classList.add('copied');
            const icon = copyBtn.querySelector('i');
            const originalClass = icon.className;
            icon.className = 'fas fa-check';
            
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                icon.className = originalClass;
            }, 2000);

            trackEvent('account_number_copied', {
                account: accountNumber.slice(-4)
            });

            showNotification('Número de cuenta copiado', 'success');
        }
    };

    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Enlace copiado al portapapeles', 'success');
                trackEvent('link_copied');
            });
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Enlace copiado', 'success');
            trackEvent('link_copied');
        }
    }
});

console.log(`
💕 Boda Isa & Jose
📅 14 de Febrero 2026
⏰ Mediodía
🎉 ¡Nos casamos!
`);