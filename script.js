
// Wedding website functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // RSVP Button functionality
    const rsvpBtn = document.getElementById('rsvp-btn');
    const musicBtn = document.getElementById('music-btn');
    
    // Replace these URLs with the actual Google Form and Spotify playlist links
    const GOOGLE_FORM_URL = 'https://forms.google.com/your-form-id'; // Replace with actual form URL
    const SPOTIFY_PLAYLIST_URL = 'https://open.spotify.com/playlist/your-playlist-id'; // Replace with actual playlist URL
    
    // RSVP button click handler
    if (rsvpBtn) {
        rsvpBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Open Google Form
            window.open(GOOGLE_FORM_URL, '_blank');
            
            // Show confirmation message
            showNotification('¡Gracias! Te redirigimos al formulario de confirmación.', 'success');
        });
        
        // Update the href attribute with the actual form URL
        rsvpBtn.href = GOOGLE_FORM_URL;
    }
    
    // Music button click handler
    if (musicBtn) {
        musicBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Open Spotify playlist
            window.open(SPOTIFY_PLAYLIST_URL, '_blank');
            
            // Show confirmation message
            showNotification('¡Genial! Te redirigimos a la playlist de Spotify.', 'success');
        });
        
        // Update the href attribute with the actual playlist URL
        musicBtn.href = SPOTIFY_PLAYLIST_URL;
    }
    
    // Map button functionality
    window.openMap = function() {
        const address = 'Iglesia de San Valentín, Calle de los Enamorados, 123, Madrid, España';
        const encodedAddress = encodeURIComponent(address);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        
        window.open(googleMapsUrl, '_blank');
        showNotification('Abriendo ubicación en Google Maps...', 'info');
    };
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 1000;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Smooth scrolling for any internal links
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
    
    // Add intersection observer for animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe all cards and timeline items
        document.querySelectorAll('.info-card, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Add loading state to buttons
    function addLoadingState(button, originalText) {
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }
    
    // Copy to clipboard functionality for address
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Dirección copiada al portapapeles', 'success');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Dirección copiada al portapapeles', 'success');
        }
    }
    
    console.log('🎉 ¡Página de boda de Isa & Jose cargada correctamente!');
    console.log('💕 ¡Que vivan los novios!');
});

// Add some wedding-themed console messages
console.log(`
    💕 ¡Bienvenido a la boda de Isa & Jose! 💕
    📅 14 de Febrero de 2026
    ⏰ Al mediodía
    💒 ¡Te esperamos!
`);

// Easter egg: Konami code for confetti
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        createHeartConfetti();
        showNotification('¡💕 ¡Felicidades por encontrar el código secreto! 💕!', 'success');
    }
});

// Heart confetti effect
function createHeartConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}vw;
                font-size: ${Math.random() * 20 + 15}px;
                z-index: 9999;
                pointer-events: none;
                animation: fall ${Math.random() * 3 + 2}s linear forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 5000);
        }, i * 100);
    }
}

// Add CSS for confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);
