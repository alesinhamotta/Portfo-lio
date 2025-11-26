// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// ===================================
// SMOOTH SCROLL
// ===================================
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
    });// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// ===================================
// SMOOTH SCROLL
// ===================================
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

// ===================================
// TYPING EFFECT
// ===================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.skill-card, .project-card, .value-card, .contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===================================
// CONTACT FORM HANDLING - INTEGRAÇÃO COM FLASK
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Disable submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
        
        // Send data to Flask backend
        fetch('/contato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: name,
                email: email,
                assunto: subject,
                mensagem: message
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            return response.json();
        })
        .then(data => {
            const formMessage = document.getElementById('formMessage');
            
            if (data.sucesso) {
                // Success
                formMessage.className = 'alert alert-success mt-4';
                formMessage.innerHTML = `
                    <i class="fas fa-check-circle me-2"></i>
                    <strong>Mensagem enviada com sucesso!</strong><br>
                    ${data.mensagem}
                `;
                
                // Reset form
                contactForm.reset();
            } else {
                // Error
                formMessage.className = 'alert alert-warning mt-4';
                formMessage.innerHTML = `
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    <strong>Aviso:</strong><br>
                    ${data.mensagem}
                `;
            }
            
            formMessage.style.display = 'block';
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        })
        .catch(error => {
            const formMessage = document.getElementById('formMessage');
            formMessage.className = 'alert alert-danger mt-4';
            formMessage.innerHTML = `
                <i class="fas fa-times-circle me-2"></i>
                <strong>Erro ao enviar mensagem:</strong><br>
                ${error.message}
            `;
            formMessage.style.display = 'block';
            console.error('Erro:', error);
        })
        .finally(() => {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    });
}

// ===================================
// PROGRESS BAR ANIMATION
// ===================================
const progressBars = document.querySelectorAll('.progress-bar');
if (progressBars.length > 0) {
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s ease';
                    progressBar.style.width = width;
                }, 100);
                progressObserver.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// ===================================
// SCROLL INDICATOR
// ===================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
    
    // Hide scroll indicator when scrolling down
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c👩‍💻 Olá! Bem-vindo ao meu portfólio!', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Desenvolvido com HTML, CSS, JavaScript, Bootstrap e Flask', 'color: #06b6d4; font-size: 14px;');
console.log('%c💜 Alessandra Motta - AI & Machine Learning Developer', 'color: #ec4899; font-size: 14px;');
});

// ===================================
// TYPING EFFECT
// ===================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.skill-card, .project-card, .value-card, .contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Show success message
        const formMessage = document.getElementById('formMessage');
        formMessage.className = 'alert alert-success mt-4';
        formMessage.style.display = 'block';
        formMessage.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>Mensagem enviada com sucesso!</strong><br>
            Obrigada pelo contato, ${name}! Responderei em breve no e-mail ${email}.
        `;
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, subject, message });
    });
}

// ===================================
// PROGRESS BAR ANIMATION
// ===================================
const progressBars = document.querySelectorAll('.progress-bar');
if (progressBars.length > 0) {
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s ease';
                    progressBar.style.width = width;
                }, 100);
                progressObserver.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// ===================================
// SCROLL INDICATOR
// ===================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
    
    // Hide scroll indicator when scrolling down
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// ===================================
// PARTICLE BACKGROUND (Optional Enhancement)
// ===================================
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        heroSection.appendChild(particle);
    }
}

// Uncomment to enable particles
// createParticles();

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c👩‍💻 Olá! Bem-vindo ao meu portfólio!', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Desenvolvido com HTML, CSS, JavaScript e Bootstrap', 'color: #06b6d4; font-size: 14px;');
console.log('%c💜 Alessandra Motta - AI & Machine Learning Developer', 'color: #ec4899; font-size: 14px;');
// ===================================
// SOCIAL ICONS WITH FONT AWESOME
// ===================================
document.addEventListener("DOMContentLoaded", function () {
    const socialLinks = document.querySelector('.social-links');
    if (socialLinks) {
        socialLinks.innerHTML = `
            <a href="https://github.com/alesinhamotta" target="_blank" class="social-icon" title="GitHub">
                <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/alessandra-motta-3390b0341/" target="_blank" class="social-icon" title="LinkedIn">
                <i class="fab fa-linkedin-in"></i>
            </a>
        `;
    }
});