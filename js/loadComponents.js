async function loadNavbar() {
  const response = await fetch("richard-website/components/navbar.html");
  const html = await response.text();

  document.getElementById("navbar-placeholder").innerHTML = html;

  initNavigation();
}

async function loadFooter() {
  const response = await fetch("richard-website/components/footer.html");
  const html = await response.text();

  document.getElementById("footer-placeholder").innerHTML = html;
}

loadNavbar();
loadFooter();
