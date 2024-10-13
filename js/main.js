//responsiveNav-------------------------
function responsiveNav() {
  const menuIcon = document.querySelector(".menu-icon");
  const navMenu = document.querySelector(".navMenu");
  const allProductsLink = document.querySelector(".allProducts");
  const servicesDropdown = document.querySelector(".services-dropdown");
  const serviceCategories = document.querySelectorAll(".service-category");
  const serviceContents = document.querySelectorAll(".service-content");

  if (!menuIcon || !navMenu || !allProductsLink || !servicesDropdown) {
    console.error("Required navbar elements not found.");
    return;
  }

  let isMenuOpen = false;
  let isDropdownOpen = false;

  // Toggle mobile menu
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle("active", isMenuOpen);
    menuIcon.innerHTML = isMenuOpen
      ? '<i class="ri-close-line"></i>'
      : '<i class="ri-menu-line"></i>';
    console.log("Mobile menu toggled. Active state:", isMenuOpen);
  });

  // Toggle services dropdown
  allProductsLink.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isMenuOpen) {
      isDropdownOpen = !isDropdownOpen;
      servicesDropdown.classList.toggle("active", isDropdownOpen);
      console.log("Services dropdown clicked. New state:", isDropdownOpen);
    }
  });

  // Handle service category clicks
  serviceCategories.forEach((category) => {
    category.addEventListener("click", () => {
      const service = category.getAttribute("data-service");
      serviceCategories.forEach((cat) => cat.classList.remove("active"));
      serviceContents.forEach((content) => content.classList.remove("active"));
      category.classList.add("active");
      document.getElementById(service).classList.add("active");
      console.log("Service category clicked:", service);
    });
  });

  // Close dropdown and menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !allProductsLink.contains(e.target) &&
      !servicesDropdown.contains(e.target) &&
      !menuIcon.contains(e.target) &&
      !navMenu.contains(e.target)
    ) {
      isDropdownOpen = false;
      isMenuOpen = false;
      servicesDropdown.classList.remove("active");
      navMenu.classList.remove("active");
      menuIcon.innerHTML = '<i class="ri-menu-line"></i>';
      console.log("Dropdown and menu closed by outside click.");
    }
  });

  // Prevent clicks inside the dropdown from closing it
  servicesDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("Click inside dropdown prevented from propagating");
  });

  // Prevent clicks inside the mobile menu from closing it
  navMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("Click inside mobile menu prevented from propagating");
  });

  // Adjust services dropdown width
  const adjustDropdownWidth = () => {
    const navbar = document.querySelector(".navBar");
    if (navbar && servicesDropdown) {
      const navbarWidth = navbar.offsetWidth;
      servicesDropdown.style.width = `${navbarWidth}px`;
      console.log("Dropdown width adjusted to:", navbarWidth);
    }
  };

  adjustDropdownWidth();
  window.addEventListener("resize", adjustDropdownWidth);
}
responsiveNav();

// technologyWeUse-------------------------
function technologyWeUse() {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");

    const techButtons = document.querySelectorAll(".tech-btn");
    const techContents = document.querySelectorAll(".tech-content");

    console.log("Number of buttons:", techButtons.length);
    console.log("Number of content divs:", techContents.length);

    function updateContent(tech) {
      console.log("Updating content for:", tech);

      techButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-tech") === tech);
      });

      techContents.forEach((content) => {
        content.classList.toggle("active", content.id === tech);
      });

      console.log(
        "Active button:",
        document.querySelector(".tech-btn.active")?.getAttribute("data-tech")
      );
      console.log(
        "Active content:",
        document.querySelector(".tech-content.active")?.id
      );
    }

    document
      .getElementById("tech-buttons")
      .addEventListener("click", function (event) {
        if (event.target.classList.contains("tech-btn")) {
          const tech = event.target.getAttribute("data-tech");
          console.log("Button clicked:", tech);
          updateContent(tech);
        }
      });

    // Initialize with the first button's content
    updateContent(techButtons[0].getAttribute("data-tech"));
  });
}
technologyWeUse();

//webdebvelopment process------------------------

function WebDevelopmentProcess() {
  document.querySelectorAll(".process-btn").forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and contents
      document
        .querySelectorAll(".process-btn, .process-content")
        .forEach((el) => {
          el.classList.remove("active");
        });

      // Add active class to clicked button
      this.classList.add("active");

      // Add active class to corresponding content
      const processId = this.getAttribute("data-process");
      const contentElement = document.getElementById(processId);

      if (contentElement) {
        contentElement.classList.add("active");
        console.log(`Activated content for ${processId}`);
      } else {
        console.error(`Content element not found for ${processId}`);
      }
    });
  });
}
WebDevelopmentProcess();

// TypingWord------------------------------------
function typeWord() {
  const words = [
    "Website Development",
    "Software Development",
    "ERP Solutions",
    "Creative Design",
    "Social Media Marketing",
    "SEO",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let currentWord = "";
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 1500;

  function type() {
    const targetElement = document.querySelector(".typing-text");

    if (!targetElement) {
      console.error("Target element '.typing-text' not found.");
      return;
    }

    if (isDeleting) {
      currentWord = currentWord.slice(0, -1);
      targetElement.textContent = currentWord;
      charIndex--;
    } else {
      if (words[wordIndex]) {
        currentWord += words[wordIndex][charIndex];
        targetElement.textContent = currentWord;
        charIndex++;
      }
    }

    if (!isDeleting && charIndex === words[wordIndex].length) {
      isDeleting = true;
      setTimeout(type, pauseTime);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }
  }

  type();
}
typeWord();

// Counter--------------------------------------------
function counter() {
  function animateCounter(id, start, end, duration, symbol = "") {
    const obj = document.getElementById(id);
    if (!obj) {
      console.error(`Element with id '${id}' not found.`);
      return;
    }

    let current = start;
    const range = end - start;
    const increment = range / (duration / 10);
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(interval);
        obj.textContent = Math.round(current) + symbol;
      } else {
        obj.textContent = Math.round(current);
      }
    }, 10);
  }

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Counter section is visible, starting animations");
        animateCounter("happyClients", 1, 999, 2000, "+");
        animateCounter("completeProjects", 1, 1999, 2000, "+");
        animateCounter("experience", 1, 10, 2000, "yr+");
        animateCounter("runningProjects", 1, 20, 2000, "+");
        animateCounter("reviews", 1, 555, 2000, "+");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const counterSection = document.querySelector(".CounterSec");
  if (counterSection) {
    console.log("Counter section found, observing");
    observer.observe(counterSection);
  } else {
    console.error("Counter section not found");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, setting up counter");
  counter();
});

//slider/swiperJS--------------------------------
function slider() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}
slider();

//pricingCrads---------------------
function pricingCards() {
  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".pricing-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        cards.forEach((c) => c.classList.remove("active"));
        this.classList.add("active");
      });

      card.addEventListener("click", function () {
        cards.forEach((c) => c.classList.remove("active"));
        this.classList.add("active");
      });
    });
  });
}
pricingCards();

// ScrollReveal-------------------------------------
ScrollReveal().reveal(".ScrollTop ,h1,h2,h3,h4,h5,h6", {
  duration: 1000,
  origin: "top",
  distance: "100px",
  delay: 500,
});

ScrollReveal().reveal(".ScrollLeft", {
  duration: 1000,
  origin: "left",
  distance: "100px",
  delay: 500,
});

ScrollReveal().reveal(".ScrollRight", {
  duration: 1000,
  origin: "right",
  distance: "100px",
  delay: 500,
});

ScrollReveal().reveal(" .ScrollBottom", {
  duration: 1500,
  delay: 1000,
  origin: "bottom",
  distance: "100px",
});
