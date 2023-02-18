function initNavigation() {
  const navigationLinks = document.querySelectorAll('[data-action="navigation-link-wrapper"]');
  const hash = window.location.hash;
  navigationLinks.forEach(link => {
    if (hash && link.getAttribute('data-nav-url') === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
    link.addEventListener('click', () => {
      navigationLinks.forEach(navigationLink => {
        if (link === navigationLink) {
          navigationLink.classList.add('active');
        } else {
          navigationLink.classList.remove('active');
        }
      });
    });
  });
}

export {
  initNavigation
}
