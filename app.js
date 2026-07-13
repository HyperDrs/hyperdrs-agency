/**
 * HYPERDRS Agency Interactive Script
 * Handles navigation, portfolio categorization, contact audit form,
 * and page scroll observations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initPortfolioFilter();
  initContactForm();
  initScrollReveal();
});

/**
 * Header Scroll Effects
 */
function initHeaderScroll() {
  const header = document.querySelector('header');
  const scrollThreshold = 40;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05)';
      header.style.padding = '0.75rem 0';
    } else {
      header.style.boxShadow = 'none';
      header.style.padding = '1rem 0';
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

/**
 * Mobile Navigation Toggle Overlay
 */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('open');
    if (navMenu.classList.contains('open')) {
      mobileToggle.innerHTML = '&#10005;'; // Close symbol (X)
    } else {
      mobileToggle.innerHTML = '&#9776;'; // Menu symbol (hamburger)
    }
  });

  // Close menu when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.innerHTML = '&#9776;';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && e.target !== mobileToggle) {
      navMenu.classList.remove('open');
      mobileToggle.innerHTML = '&#9776;';
    }
  });
}

/**
 * Portfolio Filtering
 */
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterVal = button.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px) scale(0.95)';
        
        setTimeout(() => {
          if (filterVal === 'all' || cardCategory === filterVal) {
            card.style.display = 'block';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            });
          } else {
            card.style.display = 'none';
          }
        }, 200);
      });
    });
  });
}

/**
 * Contact/Audit Form Validation & Response
 */
function initContactForm() {
  const form = document.getElementById('audit-form');
  const successBox = document.getElementById('form-success-box');

  if (!form || !successBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('owner-name').value.trim();
    const email = document.getElementById('store-email').value.trim();
    const storeName = document.getElementById('store-name').value.trim();
    const storeCount = document.getElementById('store-count').value;

    if (!name || !email || !storeName || !storeCount) {
      alert('Please fill out all required fields.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Analyzing Store Data...';

    // Simulate marketing audit generation
    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      
      successBox.style.display = 'block';
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Automatically hide audit generation message
      setTimeout(() => {
        successBox.style.display = 'none';
      }, 7000);
    }, 2000);
  });
}

/**
 * Scroll Reveal Effects via IntersectionObserver
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    observer.observe(el);
  });
}
