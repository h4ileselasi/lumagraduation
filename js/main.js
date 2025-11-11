// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Luma Studios Website Initializing...");

  // Initialize all components
  initNavbar();
  initStatsCounter();
  initPackageSelection();
  initContactForm();
  initHorizontalScroll();

  console.log("Luma Studios Website Initialized Successfully!");
});

// ========== NAVBAR ==========
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-links a");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking on links
    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// ========== STATS COUNTER ==========
function initStatsCounter() {
  const counters = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));

  function animateCounter(counter) {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  }
}

// ========== PACKAGE SELECTION ==========
// ========== PACKAGE SELECTION ==========
function initPackageSelection() {
  const packageButtons = document.querySelectorAll(".pricing-card .btn");
  const packageInput = document.getElementById("package");
  const contactForm = document.querySelector(".contact-form");

  packageButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const packageName = this.getAttribute("data-package");

      if (packageInput) {
        packageInput.value = packageName + " Package";

        // Visual feedback
        packageInput.style.borderColor = "#10b981";
        packageInput.style.backgroundColor = "#f0f9ff";
        setTimeout(() => {
          packageInput.style.borderColor = "";
          packageInput.style.backgroundColor = "";
        }, 2000);
      }

      // Scroll to the CONTACT FORM, not just the section
      if (contactForm) {
        // First scroll to the contact section
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }

        // Then after a small delay, ensure the form is visible
        setTimeout(() => {
          contactForm.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 500);
      }
    });
  });
}
// ========== CONTACT FORM ==========
// ========== CONTACT FORM ==========
// ========== WHATSAPP CONTACT FORM ==========
// ========== WHATSAPP CONTACT FORM ==========
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) {
    console.log("Contact form not found");
    return;
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const whatsappNumber = document.getElementById("whatsapp").value;
    const package = document.getElementById("package").value || "Not Selected";
    const message = document.getElementById("message").value;

    // Package prices mapping
    const packagePrices = {
      "Bronze Package": 250,
      "Silver Package": 350,
      "Gold Package": 450,
      "Platinum Package": 550,
      "Family Package": 700,
    };

    // Calculate 50% deposit
    const packagePrice = packagePrices[package] || 0;
    const depositAmount = packagePrice * 0.5;

    // Create the WhatsApp message with payment instructions
    const whatsappMessage = `
📸 *LUMA STUDIO PHOTOGRAPHY BOOKING*

*Client Details:*
👤 Name: ${name}
📧 Email: ${email}
📱 WhatsApp: ${whatsappNumber}
📦 Selected Package: ${package}
💰 Package Price: GH₵ ${packagePrice}
💳 50% Deposit Required: GH₵ ${depositAmount}

*Client's Message:*
${message}

---

💳 *PAYMENT INSTRUCTIONS:*
Please make 50% installment payment of the selected package.

📱 *Mobile Money Details:*
Number: 0595048812
Name: Kelvin Darko

📸 *Please send payment screenshot for confirmation*

---

_Received from Luma Studios Website_
        `.trim();

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/233595048812?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // Show success message
    alert(
      "Thank you! Opening WhatsApp to send your booking details and payment instructions..."
    );

    // Reset form after a delay
    setTimeout(() => {
      contactForm.reset();
    }, 1000);
  });
}

// ========== HORIZONTAL SCROLL ==========
function initHorizontalScroll() {
  const scrollContainers = [
    ".portfolio-scroll",
    ".services-scroll",
    ".tips-scroll",
    ".pricing-scroll",
  ];

  scrollContainers.forEach((selector) => {
    const containers = document.querySelectorAll(selector);
    containers.forEach((container) => {
      setupMouseDragging(container);
    });
  });

  function setupMouseDragging(container) {
    let isDragging = false;
    let startX;
    let scrollLeft;

    const startDrag = (e) => {
      isDragging = true;
      container.style.cursor = "grabbing";
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const stopDrag = () => {
      isDragging = false;
      container.style.cursor = "grab";
    };

    const doDrag = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    // Mouse events
    container.addEventListener("mousedown", startDrag);
    container.addEventListener("mouseleave", stopDrag);
    container.addEventListener("mouseup", stopDrag);
    container.addEventListener("mousemove", doDrag);
  }
}

// Smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
