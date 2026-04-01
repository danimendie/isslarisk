'use strict';

// ====================================================
// GSAP + ScrollTrigger init
// ====================================================
// (GSAP is loaded via CDN in each HTML file before this script)
// This file is loaded with defer, so DOM is ready

document.addEventListener('DOMContentLoaded', function() {

  // Register ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ---- Theme toggle ----
  (function() {
    // Apply saved theme immediately
    if (localStorage.getItem('issla-theme') === 'light') {
      document.body.classList.add('light');
    }

    // Create toggle button
    var btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle light/dark theme');
    btn.setAttribute('title', 'Toggle theme');
    btn.innerHTML =
      '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle cx="12" cy="12" r="5"/>' +
        '<line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>' +
        '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>' +
        '<line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>' +
        '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>' +
      '</svg>' +
      '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' +
      '</svg>';

    document.body.appendChild(btn);

    btn.addEventListener('click', function() {
      var isLight = document.body.classList.toggle('light');
      localStorage.setItem('issla-theme', isLight ? 'light' : 'dark');
    });
  })();

  // ---- Scroll progress bar ----
  var progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', function() {
      var scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      progressBar.style.width = (scrolled * 100) + '%';
    }, { passive: true });
  }

  // ---- Sticky header ----
  var header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ---- Mobile menu ----
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {

    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function() {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
      // Focus first menu link when opening
      if (isOpen) {
        var firstLink = mobileMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMobileMenu);
    });

    // Focus trap: keep Tab within menu when open
    mobileMenu.addEventListener('keydown', function(e) {
      if (!mobileMenu.classList.contains('open')) return;
      var focusable = Array.from(mobileMenu.querySelectorAll('a, button'));
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
        }
      }
      // Close on Escape
      if (e.key === 'Escape') { closeMobileMenu(); hamburger.focus(); }
    });

    // Also close on Escape from hamburger button
    hamburger.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // ---- Active nav ----
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #mobile-menu a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll-to-top button ----
  var scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetSel = anchor.getAttribute('href');
      if (targetSel === '#') return;
      var target = document.querySelector(targetSel);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    });
  });

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      // Close all open items
      document.querySelectorAll('.faq-item.open').forEach(function(openItem) {
        openItem.classList.remove('open');
        var ans = openItem.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });
      // Open this one if it was closed
      if (!isOpen) {
        item.classList.add('open');
        var answer = item.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ---- FAQ sidebar category nav ----
  var catBtns = document.querySelectorAll('.faq-cat-btn');
  if (catBtns.length > 0) {
    catBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var targetEl = document.getElementById(btn.dataset.target);
        if (targetEl) {
          window.scrollTo({
            top: targetEl.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      });
    });
    // Highlight on scroll with IntersectionObserver
    var categories = document.querySelectorAll('.faq-category[id]');
    if (typeof IntersectionObserver !== 'undefined' && categories.length > 0) {
      var faqObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            catBtns.forEach(function(b) {
              b.classList.toggle('active', b.dataset.target === entry.target.id);
            });
          }
        });
      }, { rootMargin: '-10% 0px -70% 0px' });
      categories.forEach(function(cat) { faqObserver.observe(cat); });
    }
  }

  // ---- Contact form ----
  var contactForm = document.getElementById('contact-form');
  var formSuccess = document.getElementById('form-success');
  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var nameField = contactForm.querySelector('#full-name');
      var orgField  = contactForm.querySelector('#organization');
      var emailField = contactForm.querySelector('#email');
      var name  = nameField  ? nameField.value.trim()  : '';
      var org   = orgField   ? orgField.value.trim()   : '';
      var email = emailField ? emailField.value.trim() : '';
      var valid = true;
      if (!name && nameField)  { nameField.style.borderColor  = 'rgba(201,168,76,0.6)'; valid = false; }
      else if (nameField)        nameField.style.borderColor  = '';
      if (!org && orgField)    { orgField.style.borderColor   = 'rgba(201,168,76,0.6)'; valid = false; }
      else if (orgField)         orgField.style.borderColor   = '';
      if (!email && emailField){ emailField.style.borderColor = 'rgba(201,168,76,0.6)'; valid = false; }
      else if (emailField)       emailField.style.borderColor = '';
      if (!valid) return;
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
      formSuccess.classList.add('visible');
    });
  }

  // ---- Counter animation ----
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0 && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    counters.forEach(function(el) {
      var target = parseFloat(el.dataset.count);
      var suffix = el.dataset.suffix || '';
      ScrollTrigger.create({
        trigger: el,
        once: true,
        onEnter: function() {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: function() {
              el.textContent = Math.round(this.targets()[0].val) + suffix;
            }
          });
        }
      });
    });
  }

  // ---- Scroll reveal (IntersectionObserver — reliable across all load contexts) ----

  // Single elements: .reveal
  if (typeof IntersectionObserver !== 'undefined') {
    var revealObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('.reveal').forEach(function(el) {
      el.classList.add('reveal-init');
      revealObs.observe(el);
    });

    // Staggered children: .reveal-stagger
    var staggerObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          Array.from(entry.target.children).forEach(function(child, i) {
            setTimeout(function() {
              child.classList.add('is-visible');
            }, i * 120);
          });
          staggerObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('.reveal-stagger').forEach(function(parent) {
      Array.from(parent.children).forEach(function(child) {
        child.classList.add('reveal-init');
      });
      staggerObs.observe(parent);
    });
  } else {
    // Fallback: show everything immediately
    document.querySelectorAll('.reveal, .reveal-stagger > *').forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  // ---- Cookie banner ----
  if (!localStorage.getItem('cookie-consent')) {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'flex';
      var acceptBtn  = banner.querySelector('#cookie-accept');
      var declineBtn = banner.querySelector('#cookie-decline');
      if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
          localStorage.setItem('cookie-consent', 'accepted');
          banner.style.display = 'none';
        });
      }
      if (declineBtn) {
        declineBtn.addEventListener('click', function() {
          localStorage.setItem('cookie-consent', 'declined');
          banner.style.display = 'none';
        });
      }
    }
  }

});
