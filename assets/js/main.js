// 1) Footer year (guarded)
(() => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// 2) Mobile nav toggle + close on link click
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));

  // Close when a nav link is clicked (mobile)
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    setOpen(false);
  });
})();

// 3) Reveal on scroll (with unobserve + fallback)
(() => {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  els.forEach(el => io.observe(el));
})();

// 4) Active link highlight (throttled)
(() => {
  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('#primary-nav a[href^="#"]')];
  if (!sections.length || !links.length) return;

  let ticking = false;
  const setActive = () => {
    ticking = false;
    // pick the last section whose top is within the viewport offset
    const offset = 90;
    let index = sections.findIndex(sec => sec.getBoundingClientRect().top > offset);
    if (index === -1) index = sections.length;
    const id = sections[Math.max(0, index - 1)].id;

    links.forEach(a => a.removeAttribute('aria-current'));
    const active = document.querySelector(`#primary-nav a[href="#${id}"]`);
    if (active) active.setAttribute('aria-current', 'page');
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(setActive);
      ticking = true;
    }
  };

  document.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.addEventListener('load', setActive);
  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    links.forEach(a => a.removeAttribute('aria-current'));
    const active = document.querySelector(`#primary-nav a[href="#${id}"]`);
    if (active) active.setAttribute('aria-current', 'page');
  });
})();

// 5) About tabs (keyboard + image sync, no focus jump on init)
(() => {
  document.querySelectorAll('[data-tabs]').forEach(tabs => {
    const tabButtons = tabs.querySelectorAll('[role="tab"]');
    const panels = tabs.querySelectorAll('[role="tabpanel"]');
    if (!tabButtons.length || !panels.length) return;
    const heroImg = document.getElementById('about-illustration');

    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

    const updateIllustration = (idx) => {
      if (!heroImg) return;
      const src = (panels[idx] && panels[idx].dataset.img) || (tabButtons[idx] && tabButtons[idx].dataset.img);
      if (src && heroImg.getAttribute('src') !== src) heroImg.setAttribute('src', src);
    };

    const activate = (idx, moveFocus = true) => {
      idx = clamp(idx, 0, Math.min(tabButtons.length, panels.length) - 1);
      tabButtons.forEach((b, i) => {
        const on = i === idx;
        b.setAttribute('aria-selected', on);
        b.tabIndex = on ? 0 : -1;
        if (panels[i]) {
          panels[i].hidden = !on;
          panels[i].classList.toggle('is-active', on);
        }
      });
      updateIllustration(idx);
      if (moveFocus) tabButtons[idx].focus();
      tabs.dataset.activeIndex = String(idx);
    };

    tabButtons.forEach((b, i) => {
      b.addEventListener('click', () => activate(i));
      b.addEventListener('keydown', (e) => {
        const last = tabButtons.length - 1;
        let next = null;
        if (e.key === 'ArrowRight') next = i === last ? 0 : i + 1;
        if (e.key === 'ArrowLeft')  next = i === 0 ? last : i - 1;
        if (e.key === 'Home')       next = 0;
        if (e.key === 'End')        next = last;
        if (e.key === 'Enter' || e.key === ' ') next = i; // activate current
        if (next !== null) { e.preventDefault(); activate(next); }
      });
    });

    // Initialize without moving focus
    panels.forEach((p, i) => p.hidden = i !== 0);
    tabButtons.forEach((b, i) => b.tabIndex = i === 0 ? 0 : -1);
    updateIllustration(0);
  });
})();

// 6) Gentle form status (guarded + clears after nav)
(() => {
  function enhanceForm(formId, statusId) {
    const form = document.getElementById(formId);
    const status = statusId ? document.getElementById(statusId) : null;
    if (!form) return;
    form.addEventListener('submit', () => {
      if (status) {
        status.textContent = 'Sending…';
        // In case of immediate redirect, this will be replaced by the new page.
        setTimeout(() => { if (status) status.textContent = ''; }, 4000);
      }
    }, { once: true });
  }
  enhanceForm('newsletter', 'newsletter-status');
  enhanceForm('contact-form', 'contact-status');
})();
