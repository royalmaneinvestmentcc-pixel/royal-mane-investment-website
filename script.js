/* ============================================
   ROYAL MANE INVESTMENT CC - JAVASCRIPT
   Navigation, Form Handling, Animations
   ============================================ */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Update active nav link
    updateActiveNavLink();
    window.addEventListener('hashchange', updateActiveNavLink);
});

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Form Handling
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Collect form data
    const data = {
        name: formData.get('name'),
        organisation: formData.get('organisation'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        reason: formData.get('reason'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Validate email
    if (!isValidEmail(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Log form submission (in production, this would send to a backend)
    console.log('Form submitted:', data);
    
    // Store in localStorage for demonstration
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push(data);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    
    // Show success message
    showFormSuccessMessage(form);
    
    // Reset form
    form.reset();
}

function handlePartnershipForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const data = {
        organisationName: formData.get('organisationName'),
        contactPerson: formData.get('contactPerson'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        partnershipType: formData.get('partnershipType'),
        description: formData.get('description'),
        timestamp: new Date().toISOString()
    };
    
    if (!isValidEmail(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    if (!data.organisationName || !data.email || !data.description) {
        alert('Please fill in all required fields.');
        return;
    }
    
    console.log('Partnership form submitted:', data);
    
    const submissions = JSON.parse(localStorage.getItem('partnershipSubmissions') || '[]');
    submissions.push(data);
    localStorage.setItem('partnershipSubmissions', JSON.stringify(submissions));
    
    showFormSuccessMessage(form);
    form.reset();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormSuccessMessage(form) {
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.textContent = '✓ Message Sent Successfully!';
    button.style.backgroundColor = '#28a745';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
    }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animation classes to elements
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('[data-animate]');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add scroll event listener for navbar background
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Initiative card interactivity
function setupInitiativeCards() {
    const cards = document.querySelectorAll('.init-card, .service-card');
    cards.forEach(card => {
        card.style.cursor = 'pointer';
    });
}

document.addEventListener('DOMContentLoaded', setupInitiativeCards);

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (navbar && !navbar.contains(event.target) && navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Keyboard accessibility - ESC to close menu
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Article/Insights filtering
function filterInsights(category) {
    const articles = document.querySelectorAll('.article-card');
    articles.forEach(article => {
        if (category === 'all' || article.getAttribute('data-category') === category) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Search functionality
function searchArticles(query) {
    const articles = document.querySelectorAll('.article-card');
    const normalizedQuery = query.toLowerCase();
    
    articles.forEach(article => {
        const title = article.getAttribute('data-title').toLowerCase();
        const category = article.getAttribute('data-category').toLowerCase();
        
        if (title.includes(normalizedQuery) || category.includes(normalizedQuery)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

// Add search to page if search input exists
const searchInput = document.getElementById('insightSearch');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        searchArticles(e.target.value);
    });
}

// Lazy load images
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counters when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                entry.target.classList.add('animated');
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => counterObserver.observe(counter));
});

// Toggle partnership modal or form visibility
function togglePartnershipForm() {
    const formContainer = document.getElementById('partnershipFormContainer');
    if (formContainer) {
        formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
    }
}

// Prevent form submission if button text is loading
function preventDoubleSubmit(form) {
    const button = form.querySelector('button[type="submit"]');
    if (button.disabled) return false;
    
    button.disabled = true;
    button.textContent = 'Sending...';
    
    setTimeout(() => {
        button.disabled = false;
        button.textContent = 'Send Message';
    }, 3000);
    
    return true;
}

// Export functions for external use
window.handleContactForm = handleContactForm;
window.handlePartnershipForm = handlePartnershipForm;
window.filterInsights = filterInsights;
window.searchArticles = searchArticles;
window.togglePartnershipForm = togglePartnershipForm;
window.preventDoubleSubmit = preventDoubleSubmit;
