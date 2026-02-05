const chartData = [
    { label: '1', sessions: 50, page_views: 90 },
    { label: '2', sessions: 120, page_views: 180 },
    { label: '3', sessions: 200, page_views: 270 },
    { label: '4', sessions: 290, page_views: 350 },
    { label: '5', sessions: 380, page_views: 420 },
    { label: '6', sessions: 460, page_views: 490 }
];

/* 
// Generate chart bars
function generateChart() {
    const chartBars = document.getElementById('chartBars');
    if (!chartBars) return; // Only run on dashboard page
    
    // Calculate max value for scaling (rounded up to nearest 50 for nicer visual)
    const maxValue = 500;
    
    chartData.forEach(data => {
        const barGroup = document.createElement('div');
        barGroup.className = 'bar-group';
        
        // Create session bar
        const sessionBar = document.createElement('div');
        sessionBar.className = 'bar session-bar';
        const sessionHeight = (data.sessions / maxValue) * 100;
        sessionBar.style.height = `${sessionHeight}%`;
        
        // Create pageview bar
        const pageviewBar = document.createElement('div');
        pageviewBar.className = 'bar pageview-bar';
        const pageviewHeight = (data.page_views / maxValue) * 100;
        pageviewBar.style.height = `${pageviewHeight}%`;
        
        barGroup.appendChild(sessionBar);
        barGroup.appendChild(pageviewBar);
        chartBars.appendChild(barGroup);
    });
}
*/

// Animate numbers on page load
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize animations  
window.addEventListener('DOMContentLoaded', () => {
    // Generate chart (only on dashboard)
    // generateChart();
    
    // Animate stat values (dashboard and achievements pages)
    const statValues = document.querySelectorAll('.stat-value, .achievement-stat-number');
    statValues.forEach(stat => {
        const text = stat.textContent.replace(/[^0-9]/g, '');
        if (text) {
            const endValue = parseInt(text);
            stat.textContent = '0';
            setTimeout(() => {
                animateValue(stat, 0, endValue, 1500);
            }, 300);
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle-btn');
const sidebar = document.querySelector('.sidebar');
const body = document.querySelector('body');

// Create overlay if not exists
let overlay = document.querySelector('.sidebar-overlay');
if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    body.appendChild(overlay);
}

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    });
}

if (overlay) {
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        body.style.overflow = '';
    });
}

// Contact form submission (mailto mechanism)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        const mailtoLink = `mailto:affmuadzakun@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`)}`;
        
        window.location.href = mailtoLink;
        
        // Optional: show a small feedback before redirecting
        // alert('Membuka aplikasi email Anda...');
        // contactForm.reset();
    });
}

// Quick question buttons
const quickQuestionBtns = document.querySelectorAll('.quick-question-btn');
quickQuestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const chatInput = document.querySelector('.chat-input');
        if (chatInput) {
            chatInput.value = btn.textContent;
            chatInput.focus();
        }
    });
});

// Category filter buttons
const categoryBtns = document.querySelectorAll('.category-btn');
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        el.classList.add('ready'); // Prepare for animation
        observer.observe(el);
    });
});


