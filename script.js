
// Wedding landing page - Professional JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Configuration - Replace with actual URLs
    const CONFIG = {
        GOOGLE_FORM_URL: 'https://forms.google.com/your-form-id', // Replace with actual form
        SPOTIFY_PLAYLIST_URL: 'https://open.spotify.com/playlist/1t53Gjg8kKEvH8qxuESdy5?si=3133ff310e424648&pt=a48d5fd66ebfe8fc0427be082ad2197a', // Replace with actual playlist
        CEREMONY_ADDRESS: 'Torre Gallen, Burriana, Castellón, España',
        CELEBRATION_ADDRESS: 'Torre Gallen, Burriana, Castellón, España',
        BANK_ACCOUNTS: {
            isa: 'ES1234 5678 9012 3456 7890 1234',
            jose: 'ES9876 5432 1098 7654 3210 9876'
        }
    };

    // DOM Elements
    const rsvpBtn = document.getElementById('rsvp-btn');
    const musicBtn = document.getElementById('music-btn');

    // Initialize bank account display
    initBankAccount();

    // RSVP Button Handler
    if (rsvpBtn) {
        rsvpBtn.addEventListener('click', handleRSVPClick);
        rsvpBtn.href = CONFIG.GOOGLE_FORM_URL;
    }

    // Music Button Handler  
    if (musicBtn) {
        musicBtn.addEventListener('click', handleMusicClick);
        musicBtn.href = CONFIG.SPOTIFY_PLAYLIST_URL;
    }

    // RSVP Click Handler
    function handleRSVPClick(e) {
        e.preventDefault();

        // Add loading state
        addLoadingState(rsvpBtn, 'Abriendo formulario...');

        // Track interaction
        trackEvent('rsvp_click');

        // Open form
        setTimeout(() => {
            window.open(CONFIG.GOOGLE_FORM_URL, '_blank');
            showNotification('Formulario de confirmación abierto', 'success');
            removeLoadingState(rsvpBtn, '<i class="fas fa-check"></i> Confirmar Asistencia');
        }, 500);
    }

    // Music Click Handler
    function handleMusicClick(e) {
        e.preventDefault();

        // Add loading state
        addLoadingState(musicBtn, 'Abriendo Spotify...');

        // Track interaction
        trackEvent('music_click');

        // Open playlist
        setTimeout(() => {
            window.open(CONFIG.SPOTIFY_PLAYLIST_URL, '_blank');
            showNotification('Playlist de Spotify abierta', 'success');
            removeLoadingState(musicBtn, '<i class="fab fa-spotify"></i> Añadir Música');
        }, 500);
    }

    // Map functionality
    window.openMap = function(location) {
        const address = CONFIG.CEREMONY_ADDRESS; // Mismo lugar para todo
        const encodedAddress = encodeURIComponent(address);
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

        // Track interaction
        trackEvent('map_click', { location });

        window.open(mapsUrl, '_blank');
        showNotification('Ubicación abierta en Google Maps', 'info');
    };

    // Loading state management
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

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelectorAll('.notification');
        existing.forEach(n => n.remove());

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Styling
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

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    // Smooth scrolling for anchor links (solo para enlaces que no son del menú flotante)
    document.querySelectorAll('a[href^="#"]:not(.nav-item)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Validar que el targetId es válido antes de usar querySelector
            if (!targetId || targetId === '#' || targetId.length <= 1) {
                return; // No hacer nada para enlaces vacíos
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

    // Intersection Observer for animations
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

    // Observe animated elements
    document.querySelectorAll('.detail-card, .timeline-item').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Event tracking (placeholder for analytics)
    function trackEvent(eventName, properties = {}) {
        console.log('Event tracked:', eventName, properties);

        // Here you would integrate with your analytics service
        // Example: gtag('event', eventName, properties);
        // Example: analytics.track(eventName, properties);
    }

    // Performance optimization
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

    // Responsive image loading optimization
    function optimizeImages() {
        // Placeholder for lazy loading implementation if needed
        console.log('Images optimized for performance');
    }

    // Side navigation menu
    function initFloatingNav() {
        const navItems = document.querySelectorAll('.nav-item');

        if (navItems.length === 0) return;

        // Handle navigation clicks
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');

                // Validar que el targetId es válido
                if (!targetId || targetId === '#' || targetId.length <= 1 || !targetId.startsWith('#')) {
                    console.warn('Invalid target ID:', targetId);
                    return;
                }

                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Usar offset para mejor posicionamiento
                    const yOffset = -20;
                    const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });

                    // Update active state
                    navItems.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');

                    // Track navigation
                    trackEvent('nav_click', { section: this.dataset.section });
                } else {
                    console.warn('Target section not found:', targetId);
                }
            });
        });

        // Update active nav item on scroll - configuración mejorada
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
            threshold: [0.3, 0.7], // Múltiples umbrales para mejor detección
            rootMargin: '-15% 0px -15% 0px' // Márgenes simétricos
        });

        sections.forEach(section => {
            if (section.id) { // Solo observar secciones con ID válido
                observerNav.observe(section);
            }
        });
    }

    // Bank Account Management
    function initBankAccount() {
        const urlParams = new URLSearchParams(window.location.search);
        const invParam = urlParams.get('inv');

        let selectedAccount;

        if (invParam && CONFIG.BANK_ACCOUNTS[invParam.toLowerCase()]) {
            // Use specific account based on query param
            selectedAccount = CONFIG.BANK_ACCOUNTS[invParam.toLowerCase()];
            console.log(`Account selected for ${invParam}:`, selectedAccount);
        } else {
            // Random fallback if no valid param
            const accounts = Object.keys(CONFIG.BANK_ACCOUNTS);
            const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
            selectedAccount = CONFIG.BANK_ACCOUNTS[randomAccount];
            console.log(`Random fallback account (${randomAccount}):`, selectedAccount);
        }

        // Update the bank number in the DOM
        const bankNumberElement = document.querySelector('.bank-number');
        if (bankNumberElement) {
            bankNumberElement.textContent = selectedAccount;

            // Update note text
            const bankNoteElement = document.querySelector('.bank-note');
            if (bankNoteElement && invParam) {
                bankNoteElement.textContent = `Número de cuenta personalizado para ${invParam}`;
            }
        }

        // Track which account was shown
        trackEvent('bank_account_displayed', {
            param: invParam || 'random',
            account: selectedAccount.slice(-4) // Only last 4 digits for privacy
        });
    }

    // Initialize
    function init() {
        console.log('💕 Wedding landing page initialized');
        console.log('🎉 Ready for Isa & Jose wedding!');

        // Track page load
        trackEvent('page_load');

        // Optimize performance
        optimizeImages();

        // Initialize floating navigation
        initFloatingNav();
    }

    // Run initialization
    init();

    // Add keyboard shortcuts (Easter egg)
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to quick RSVP
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (rsvpBtn) {
                rsvpBtn.click();
            }
        }
    });

    // Share functionality (if needed)
    window.shareWedding = function() {
        if (navigator.share) {
            navigator.share({
                title: 'Boda Isa & Jose - 14 de Febrero 2026',
                text: 'Nos casamos y queremos celebrarlo contigo',
                url: window.location.href
            }).then(() => {
                trackEvent('share_success');
            }).catch(() => {
                // Fallback to clipboard
                copyToClipboard(window.location.href);
            });
        } else {
            copyToClipboard(window.location.href);
        }
    };

    // Clipboard utility
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Enlace copiado al portapapeles', 'success');
                trackEvent('link_copied');
            });
        } else {
            // Fallback
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

// Console welcome message
console.log(`
💕 Boda Isa & Jose
📅 14 de Febrero 2026
⏰ Mediodía
🎉 ¡Nos casamos!
`);
