/* ==========================================================
   Shared components: navigation + footer
   Injected into every page via JS to keep HTML DRY.
   ========================================================== */

/**
 * Determines the relative prefix to the root based on current page depth.
 * e.g. "/education/" → "../",  "/" → "./"
 */
function rootPrefix() {
  const depth = window.location.pathname.replace(/\/+$/, '').split('/').length - 1;
  // GitHub user pages sit at root, project pages have one extra segment
  // For user sites (clemvst.github.io), path is like / or /education/
  if (depth <= 1) return './';
  return '../'.repeat(depth - 1);
}

/** Current page path for active link highlighting */
function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

function isActive(href) {
  const cur = currentPath();
  const target = href.replace(/\/+$/, '') || '/';
  if (target === '/') return cur === '/' || cur === '';
  return cur.startsWith(target);
}

/** Build the navigation HTML */
function renderNav() {
  const pages = [
    { label: 'Home', href: '/' },
    { label: 'Education', href: '/education/' },
    { label: 'Experience', href: '/experience/' },
    { label: 'Publications', href: '/publications/' },
    { label: 'Projects', href: '/projects/' },
  ];

  const linksHtml = pages.map(p =>
    `<a href="${p.href}" class="${isActive(p.href) ? 'active' : ''}">${p.label}</a>`
  ).join('');

  return `
  <nav class="site-nav" id="site-nav">
    <div class="nav-inner">
      <a href="/" class="nav-brand">Clémence Vast</a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" id="nav-links">${linksHtml}</div>
    </div>
  </nav>`;
}

/** Build the footer HTML */
function renderFooter() {
  const socials = [
    { icon: 'fa-brands fa-github', url: 'https://github.com/clemvst', label: 'GitHub' },
    { icon: 'fa-brands fa-linkedin', url: 'https://www.linkedin.com/in/clemence-vast/', label: 'LinkedIn' },
    { icon: 'fa-solid fa-graduation-cap', url: 'https://scholar.google.com/citations?user=oeesVzAAAAAJ', label: 'Scholar' },
  ];

  const socialHtml = socials.map(s =>
    `<a href="${s.url}" target="_blank" rel="noopener" title="${s.label}"><i class="${s.icon}"></i></a>`
  ).join('');

  const year = new Date().getFullYear();

  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-inner">
        <div>&copy; ${year} Clémence Vast</div>
        <div class="footer-social">${socialHtml}</div>
      </div>
    </div>
  </footer>`;
}

/** Inject nav + footer and wire up interactions */
document.addEventListener('DOMContentLoaded', () => {
  // Inject shared components
  document.getElementById('nav-placeholder')?.insertAdjacentHTML('afterend', renderNav());
  document.getElementById('nav-placeholder')?.remove();

  document.getElementById('footer-placeholder')?.insertAdjacentHTML('afterend', renderFooter());
  document.getElementById('footer-placeholder')?.remove();

  // Scroll shadow on nav
  const nav = document.getElementById('site-nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile toggle
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }
});
