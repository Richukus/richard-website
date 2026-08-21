const SITE_ROOT =
  window.location.hostname === "richukus.github.io" ? "/richard-website/" : "/";

async function loadNavbar() {
  const response = await fetch(`${SITE_ROOT}components/navbar.html`);

  if (!response.ok) {
    throw new Error(`Failed to load navbar: ${response.status}`);
  }

  const html = await response.text();

  document.getElementById("navbar-placeholder").innerHTML = html;

  initNavigation();
}

async function loadFooter() {
  const response = await fetch(`${SITE_ROOT}components/footer.html`);

  if (!response.ok) {
    throw new Error(`Failed to load footer: ${response.status}`);
  }

  const html = await response.text();

  document.getElementById("footer-placeholder").innerHTML = html;
}

loadNavbar();
loadFooter();
