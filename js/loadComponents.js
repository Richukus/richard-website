async function loadNavbar() {
  const response = await fetch("/components/navbar.html");
  const html = await response.text();

  document.getElementById("navbar-placeholder").innerHTML = html;

  initNavigation();
}

loadNavbar();
