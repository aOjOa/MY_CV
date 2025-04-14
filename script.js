document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use system preference
  const currentTheme = localStorage.getItem('theme') || 
                       (prefersDarkScheme.matches ? 'dark' : 'light');
  
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
  
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
  
  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkills() {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }
  
  document.addEventListener('contextmenu', function(e) {
    if (e.target.classList.contains('protected-image')) {
      e.preventDefault();
      showAlert('This image is protected by copyright. Please contact me for official copies.');
    }
  });

  // وظائف عرض وإغلاق الشهادات في Modal
  function showCertificateModal(imageSrc) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalCertificateImage');
    
    modal.style.display = "block";
    modalImg.src = imageSrc;
    document.body.style.overflow = "hidden";
  }

  function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // إغلاق عند النقر خارج الصورة
  window.onclick = function(event) {
    const modal = document.getElementById('certificateModal');
    if (event.target === modal) {
      closeCertificateModal();
    }
  }

  // عرض تنبيه
  function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    
    setTimeout(() => {
      alertBox.classList.add('fade-out');
      setTimeout(() => alertBox.remove(), 500);
    }, 2000);
  }

  // Intersection Observer - معدل ليشمل حماية الشهادات
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'skills') {
          animateSkills();
        }
        // إضافة تأثير للشهادات عند الظهور
        if (entry.target.classList.contains('certificate-item')) {
          entry.target.classList.add('certificate-visible');
        }
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);
  
  // مراقبة جميع الأقسام بالإضافة لعناصر الشهادات
  document.querySelectorAll('.section, .certificate-item').forEach(element => {
    observer.observe(element);
  });

  // Form submission - بقى كما هو
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }
});