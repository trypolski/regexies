const navigationLinkWrappers = document.querySelectorAll('[data-action="navigation-link-wrapper"]');

function initNavigation() {
  const hash = window.location.hash;
  navigationLinkWrappers.forEach(link => {
    if (hash && link.getAttribute('data-nav-url') === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
    link.addEventListener('click', handleNavigationLinkClick);
  });
  const titleLinks = document.querySelectorAll('[data-action="content-title-link"]');
  titleLinks.forEach(titleLink => {
    titleLink.addEventListener('click', handleNavigationLinkClick);
  });
}

function handleNavigationLinkClick(e) {
  const newHash = e.target.dataset.navUrl;
  navigationLinkWrappers.forEach(navigationLink => {
    const linkHash = navigationLink.dataset.navUrl;
    if (linkHash === newHash) {
      navigationLink.classList.add('active');
    } else {
      navigationLink.classList.remove('active');
    }
  });
}

export {
  initNavigation
}
