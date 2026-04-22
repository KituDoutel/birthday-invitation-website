(function() {
    "use strict";

    // ---------- INISIALISASI AOS (Animate On Scroll) ----------
    AOS.init({
        duration: 800,
        once: false,
        mirror: true,
        offset: 50
    });

    // ---------- KONFIGURASAUN LORON EVENTU ----------
    const eventDate = new Date(2026, 3, 26, 19, 0, 0);
    const whatsappNumber = '+67076309628';

    // ---------- KONTADOR TEMPU ----------
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate.getTime() - now;

        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            // Tampilkan confetti saat acara sudah tiba
            showConfetti();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (86400000)) / (3600000));
        const minutes = Math.floor((distance % 3600000) / 60000);
        const seconds = Math.floor((distance % 60000) / 1000);

        daysEl.textContent = days < 10 ? '0' + days : days;
        hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // ---------- PARTIKEL BACKGROUND ----------
    function createParticles() {
        const container = document.getElementById('particles');
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 10 + 5;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.background = `rgba(${230 + Math.random() * 20}, ${180 + Math.random() * 30}, ${200 + Math.random() * 30}, ${0.2 + Math.random() * 0.3})`;
            
            container.appendChild(particle);
        }
    }
    
    createParticles();

    // ---------- CONFETTI ANIMATION ----------
    function showConfetti() {
        const container = document.getElementById('confettiContainer');
        const colors = ['#e6b8c6', '#ffb3c6', '#ffc8dd', '#b8e0d4', '#d4c4e8', '#ffe5b4', '#ffd0dd'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = (Math.random() * 12 + 6) + 'px';
                confetti.style.height = (Math.random() * 12 + 6) + 'px';
                confetti.style.animationDelay = (Math.random() * 2) + 's';
                confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
                
                container.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 6000);
            }, i * 50);
        }
    }

    // Tampilkan confetti saat halaman dimuat (opsional)
    setTimeout(() => showConfetti(), 500);

    // ---------- INTEGRASAUN WHATSAPP ----------
    const rsvpForm = document.getElementById('rsvpForm');
    const feedbackDiv = document.getElementById('formFeedback');
    const guestNameInput = document.getElementById('guestName');

    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = guestNameInput.value.trim();
        const attendanceRadio = document.querySelector('input[name="attendance"]:checked');
        
        feedbackDiv.textContent = '';

        if (!name) {
            feedbackDiv.textContent = '❌ Favor prenxe Ita-nia naran kompletu.';
            feedbackDiv.style.color = '#b15e7c';
            return;
        }

        if (!attendanceRadio) {
            feedbackDiv.textContent = '❌ Favor hili estatutu prezensa.';
            feedbackDiv.style.color = '#b15e7c';
            return;
        }

        const attendance = attendanceRadio.value;

        const message = `Olá! Ha'u hakarak konfirma prezensa ba aniversáriu Ryana Duta Lopes.%0A%0A*Naran:* ${encodeURIComponent(name)}%0A*Prezensa:* ${encodeURIComponent(attendance)}%0A%0AObrigada! 🎂✨`;
        
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        
        feedbackDiv.innerHTML = `✅ Obrigada, <strong>${name}</strong>! Ita sei dirije ba WhatsApp atu haruka konfirmasaun. 🎉`;
        feedbackDiv.style.color = '#25D366';
        
        // Tampilkan confetti saat kirim RSVP
        showConfetti();
        
        window.open(whatsappUrl, '_blank');
        
        // Reset form setelah 3 detik
        setTimeout(() => {
            rsvpForm.reset();
            feedbackDiv.textContent = '';
        }, 3000);
    });

    // ---------- SHARE FUNCTION ----------
    window.shareEvent = function() {
        const eventDetails = `🎂 Konvite Aniversáriu Ryana Duta Lopes%0A%0A📅 Loron: Domingo, 26 Abríl 2026%0A🕐 Oras: 19:00 OTL%0A📍 Fatin: Suai Loro Beach, Suai, Timor-Leste%0A%0AKonfirma Ita-nia prezensa! 🎉`;
        const shareUrl = `https://wa.me/?text=${eventDetails}`;
        window.open(shareUrl, '_blank');
        
        // Tampilkan confetti saat share
        showConfetti();
    };

    // ---------- CLEANUP ----------
    window.addEventListener('beforeunload', function() {
        clearInterval(countdownInterval);
    });

    // Tambahkan efek hover pada semua card
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

})();