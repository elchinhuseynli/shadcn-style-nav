// Dropdown Class - Handles dropdown menu functionality
class Dropdown {
  constructor(trigger, menu, mode = "click") {
    this.trigger = trigger;
    this.menu = menu;
    this.mode = mode;
    this.isOpen = false;
    this.closeTimeout = null;
    this.init();
  }

  init() {
    if (this.mode === "hover") {
      // Desktop hover behavior
      this.trigger.addEventListener("mouseenter", () => {
        clearTimeout(this.closeTimeout);
        this.open();
      });

      this.trigger.addEventListener("mouseleave", () => {
        this.closeTimeout = setTimeout(() => this.close(), 150);
      });

      this.menu.addEventListener("mouseenter", () => {
        clearTimeout(this.closeTimeout);
      });

      this.menu.addEventListener("mouseleave", () => {
        this.closeTimeout = setTimeout(() => this.close(), 150);
      });
    } else {
      // Mobile click behavior
      this.trigger.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggle();
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!this.trigger.contains(e.target) && !this.menu.contains(e.target)) {
          this.close();
        }
      });
    }
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.menu.classList.add("active");
    this.isOpen = true;
  }

  close() {
    this.menu.classList.remove("active");
    this.isOpen = false;
  }
}

// MobileMenu Class - Handles mobile menu toggle
class MobileMenu {
  constructor(toggleButton, menu) {
    this.toggleButton = toggleButton;
    this.menu = menu;
    this.overlay = document.getElementById("mobileOverlay");
    this.isOpen = false;
    this.init();
  }

  init() {
    this.toggleButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Close when clicking on overlay
    if (this.overlay) {
      this.overlay.addEventListener("click", () => {
        this.close();
      });
    }

    // Close when clicking outside the menu
    document.addEventListener("click", (e) => {
      if (
        this.isOpen &&
        !this.menu.contains(e.target) &&
        !this.toggleButton.contains(e.target)
      ) {
        this.close();
      }
    });

    // Close mobile menu when window is resized to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.menu.classList.add("active");
    this.toggleButton.classList.add("active");
    if (this.overlay) {
      this.overlay.classList.add("active");
    }
    this.isOpen = true;
  }

  close() {
    this.menu.classList.remove("active");
    this.toggleButton.classList.remove("active");
    if (this.overlay) {
      this.overlay.classList.remove("active");
    }
    this.isOpen = false;
  }
}

// Navbar Class - Main navbar controller
class Navbar {
  constructor() {
    this.dropdowns = [];
    this.mobileMenu = null;
    this.init();
  }

  init() {
    this.initializeDropdowns();
    this.initializeMobileMenu();
  }

  initializeDropdowns() {
    // Initialize desktop dropdowns with hover
    const desktopDropdownTriggers = document.querySelectorAll(
      "#desktopMenu .dropdown-trigger"
    );
    desktopDropdownTriggers.forEach((trigger) => {
      const dropdownId = trigger.dataset.dropdown;
      const menu = document.getElementById(`${dropdownId}-dropdown`);
      if (menu) {
        this.dropdowns.push(new Dropdown(trigger, menu, "hover"));
      }
    });

    // Initialize mobile dropdowns with click
    const mobileDropdownTriggers = document.querySelectorAll(
      "#mobileMenu .dropdown-trigger"
    );
    mobileDropdownTriggers.forEach((trigger) => {
      const dropdownId = trigger.dataset.dropdown;
      const menu = document.getElementById(`${dropdownId}-dropdown`);
      if (menu) {
        this.dropdowns.push(new Dropdown(trigger, menu, "click"));
      }
    });
  }

  initializeMobileMenu() {
    const toggleButton = document.getElementById("mobileToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    if (toggleButton && mobileMenu) {
      this.mobileMenu = new MobileMenu(toggleButton, mobileMenu);
    }
  }
}

// Initialize the navbar when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Navbar();
});
