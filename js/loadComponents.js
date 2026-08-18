async function loadNavbar() {
  const response = await fetch("components/navbar.html");
  const html = await response.text();

  document.getElementById("navbar-placeholder").innerHTML = html;

  initNavigation();
}

async function loadFooter() {
  const response = await fetch("components/footer.html");
  const html = await response.text();

  document.getElementById("footer-placeholder").innerHTML = html;
}

loadNavbar();
loadFooter();
