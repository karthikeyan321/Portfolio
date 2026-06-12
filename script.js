const themeToggle = document.getElementById('themeToggle');
const pageRoot = document.documentElement;
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

function applyTheme(theme) {
  pageRoot.setAttribute('data-theme', theme);
  themeToggle.innerText = theme === 'dark' ? '🌙' : '☀️';
}

function saveTheme(theme) {
  localStorage.setItem('portfolioTheme', theme);
}

function initTheme() {
  const storedTheme = localStorage.getItem('portfolioTheme');
  if (storedTheme) {
    applyTheme(storedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
}

themeToggle.addEventListener('click', () => {
  const nextTheme = pageRoot.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  saveTheme(nextTheme);
});

const revealElements = document.querySelectorAll('.section, .panel-card, .content-card, .profile-card, .project-card, .contact-info-card');
const observerOptions = { threshold: 0.1 };

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((element) => revealObserver.observe(element));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  feedback.textContent = 'Thank you! Your message has been prepared and will be sent shortly.';
  form.reset();
});

initTheme();
