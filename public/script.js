document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: { enable: true, value_area: 800 }
            },
            color: { value: '#ffffff' },
            shape: {
                type: 'circle',
                stroke: { width: 0, color: '#000000' },
                polygon: { nb_sides: 5 }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

    // 2. Handle Form Submission
    const form = document.getElementById('subscribeForm');
    const msgDiv = document.getElementById('formMessage');
    const popup = document.getElementById('successPopup');
    const closeBtn = document.getElementById('closePopupBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('emailInput').value;
        const submitBtn = document.getElementById('submitBtn');
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';
        msgDiv.textContent = '';
        msgDiv.className = 'form-message';

        try {
            // Encode data for Netlify Forms
            const formattedData = new URLSearchParams(new FormData(form)).toString();

            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formattedData
            });

            if (response.ok) {
                // Show success popup animation
                popup.classList.add('active');
                form.reset();
            } else {
                msgDiv.textContent = 'Subscription failed. Please try again.';
                msgDiv.classList.add('message-error');
            }
        } catch (error) {
            console.error('Error:', error);
            msgDiv.textContent = 'Network error. Please try again later.';
            msgDiv.classList.add('message-error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Subscribe';
        }
    });

    // Close Popup Logic
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    });

});
