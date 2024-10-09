function loadNavBar() {
  document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");

    fetch("navBar.html")
      .then((response) => response.text())
      .then((data) => {
        header.innerHTML = data;
        responsiveNav();
      })
      .catch((error) => console.error("Error loading navbar:", error));
  });
}

function responsiveNav() {
  const menuIcon = document.querySelector(".menu-icon");
  const navMenu = document.querySelector(".navMenu");
  const servicesItem = document.querySelector(".services-item");
  const servicesDropdown = document.querySelector(".services-dropdown");
  const serviceCategories = document.querySelectorAll(".service-category");
  const serviceContents = document.querySelectorAll(".service-content");

  if (!menuIcon || !navMenu || !servicesItem || !servicesDropdown) {
    console.error("Required navbar elements not found.");
    return;
  }

  // Toggle mobile menu
  menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuIcon.innerHTML = navMenu.classList.contains("active")
      ? '<i class="ri-close-line"></i>'
      : '<i class="ri-menu-line"></i>';
  });

  // Toggle services dropdown
  servicesItem.addEventListener("click", (e) => {
    e.preventDefault();
    servicesDropdown.classList.toggle("active");
  });

  // Handle service category clicks
  serviceCategories.forEach((category) => {
    category.addEventListener("click", () => {
      const service = category.getAttribute("data-service");
      serviceCategories.forEach((cat) => cat.classList.remove("active"));
      serviceContents.forEach((content) => content.classList.remove("active"));
      category.classList.add("active");
      document.getElementById(service).classList.add("active");
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !servicesItem.contains(e.target) &&
      !servicesDropdown.contains(e.target)
    ) {
      servicesDropdown.classList.remove("active");
    }
  });

  // Adjust services dropdown width
  const adjustDropdownWidth = () => {
    const navbar = document.querySelector(".navbar");
    if (navbar && servicesDropdown) {
      const navbarWidth = navbar.offsetWidth;
      servicesDropdown.style.width = `${navbarWidth}px`;
    }
  };

  // Wait for the navbar to be loaded before adjusting the dropdown width
  const checkNavbarLoaded = setInterval(() => {
    if (document.querySelector(".navbar")) {
      clearInterval(checkNavbarLoaded);
      adjustDropdownWidth();
      window.addEventListener("resize", adjustDropdownWidth);
    }
  }, 100);
}

// Call loadNavBar to start the process
loadNavBar();

function loadFooter() {
  document.addEventListener("DOMContentLoaded", function () {
    const footer = document.getElementById("footer");

    fetch("footer.html") // Fetch the navBar.html file
      .then((response) => response.text()) // Parse it as text
      .then((data) => {
        footer.innerHTML = data; // Insert the navbar HTML into the header
        // Call responsiveNav only after the navbar is loaded
        responsiveNav();
      })
      .catch((error) => console.error("Error loading navbar:", error));
  });
}
loadFooter();
