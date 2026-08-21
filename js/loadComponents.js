const script = document.currentScript;

const scriptURL = new URL(script.src);

const SITE_ROOT = new URL("../", scriptURL);

async function loadNavbar() {
  const response = await fetch(new URL("components/navbar.html", SITE_ROOT));

  if (!response.ok) {
    throw new Error(`Failed to load navbar: ${response.status}`);
  }

  const html = await response.text();

  document.getElementById("navbar-placeholder").innerHTML = html;

  initNavigation();
}

async function loadFooter() {
  const response = await fetch(new URL("components/footer.html", SITE_ROOT));

  if (!response.ok) {
    throw new Error(`Failed to load footer: ${response.status}`);
  }

  const html = await response.text();

  document.getElementById("footer-placeholder").innerHTML = html;
}

loadNavbar();
loadFooter();
