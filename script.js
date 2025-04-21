document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// التحقق من تفضيلات النظام أو الإعدادات المحفوظة
const currentTheme = localStorage.getItem('theme') || 
                   (prefersDarkScheme.matches ? 'dark' : 'light');

// تطبيق الوضع المظلم إذا كان مفعلًا
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
}

// تبديل الوضع المظلم عند النقر
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
});

// إضافة تأثير سلس للتبديل
document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});