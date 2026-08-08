/* =========================================================
   PORTFOLIO SCRIPT
   1. Page loader
   2. Navbar: sticky, scrollspy, mobile menu
   3. Dark / Light mode toggle (+ localStorage)
   4. Smooth scroll for nav links
   5. Scroll reveal animation
   6. Skill progress bar animation
   7. Contact form handling (demo only)
   8. Back to top button
   9. Auto update footer year
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. PAGE LOADER ---------- */
  const loader = document.getElementById('loader');
  
  const hideLoader = () => {
    if (loader) {
      setTimeout(() => loader.classList.add('hidden'), 400);
    }
  };

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }

  /* ---------- 2. NAVBAR & NAVIGATION ---------- */
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Sticky navbar background on scroll
  const handleNavbarScroll = () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
  };
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // Mobile hamburger toggle + Aksesibilitas aria-expanded
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && hamburger) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Scrollspy: highlight active nav link based on section in view
  const setActiveLink = () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${current}`);
    });
  };
  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  /* ---------- 3. DARK / LIGHT MODE TOGGLE ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    });
  }

  /* ---------- 4. SMOOTH SCROLL FOR NAV LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- 5. SCROLL REVEAL ANIMATION ---------- */
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback jika browser lama tidak mendukung IntersectionObserver
    revealTargets.forEach(el => el.classList.add('revealed'));
  }

  /* ---------- 6. SKILL PROGRESS BAR ANIMATION ---------- */
  const skillBars = document.querySelectorAll('.skill-progress');

  if ('IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percent = bar.getAttribute('data-percent') || '0';
          bar.style.width = `${percent}%`;
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  } else {
    // Fallback
    skillBars.forEach(bar => {
      const percent = bar.getAttribute('data-percent') || '0';
      bar.style.width = `${percent}%`;
    });
  }

  /* ---------- 7. CONTACT FORM (Demo submission) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (formStatus) {
        formStatus.textContent = 'Mengirim pesan...';
      }

      // Simulasi pengiriman form (Opsional: ganti dengan Fetch API ke EmailJS / Formspree)
      setTimeout(() => {
        if (formStatus) {
          formStatus.textContent = 'Terima kasih! Pesan Anda telah terkirim.';
        }
        contactForm.reset();
        setTimeout(() => {
          if (formStatus) formStatus.textContent = '';
        }, 4000);
      }, 900);
    });
  }

  /* ---------- 8. BACK TO TOP BUTTON ---------- */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 9. FOOTER YEAR ---------- */
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});