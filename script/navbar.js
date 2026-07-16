const injectNavbar = () => {
    const navSpace = document.getElementById('navbar-placeholder');

    if (navSpace) {
        navSpace.innerHTML = `
        <nav class="custom-navbar">
          <div class="container-fluid">
            <div class="nav-grid">
              
              <div class="nav-left">
                <a class="custom-brand" href="index.html">
                  <span style="font-size:1.6rem;">🦖</span>
                  <span>RAWW FACTOR</span>
                </a>
              </div>

              <div class="nav-center">
                  <div class="custom-nav-links">
                    <a class="custom-nav-link" href="index.html">Home</a>
                    <a class="custom-nav-link" href="dinoShop.html">Shop</a>
                    <a class="custom-nav-link" href="aboutUs.html">About</a>
                    <a class="custom-nav-link" href="contactUs.html">Contact</a>
                  </div>
              </div>

              <div class="nav-right">
                <div class="search-wrapper">
                    <input class="custom-search" type="search" placeholder="Search...">
                </div>
                <div class="nav-icons">
                    <a href="shoppingCart.html" class="nav-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>
                    </a>

                    <div id="auth-area">
                        <a href="login.html" class="nav-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/></svg>
                        </a>
                    </div>
                </div>
              </div>

            </div>
          </div>
        </nav>`;
    }
};

injectNavbar();

// Highlight the current page in the navbar
// window.location.pathname gives us current page filename
// e.g. "/dinoShop.html" — we match it against each nav link's href
(function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.custom-nav-link');
    links.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active-nav-link');
        }
    });
})();