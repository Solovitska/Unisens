

(function () {
  'use strict';

  /* ---- Scroll-Trigger für Animationen ---- */
  const revealEls = document.querySelectorAll('[data-animate]');
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible'); // Sichtbar machen
            io.unobserve(e.target);               // Nur einmal beobachten
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---- Navbar beim Scrollen ---- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 40); // Klasse hinzufügen, wenn gescrollt
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile Navigation ---- */
  const toggle = document.getElementById('navToggle');
  const overlay = document.getElementById('navOverlay');
  if (toggle && overlay) {
    toggle.addEventListener('click', () => {
      const open = overlay.classList.toggle('is-open');        // Overlay öffnen/schließen
      toggle.classList.toggle('is-active', open);             // Toggle aktiv/inaktiv
      document.body.style.overflow = open ? 'hidden' : '';    // Scrollen blockieren, wenn offen
    });

    overlay.querySelectorAll('.nav__overlay-link').forEach((link) => {
      link.addEventListener('click', () => {
        overlay.classList.remove('is-open');
        toggle.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Smooth Scroll für Anker-Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // Abstand für fixierte Navbar
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
