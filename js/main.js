// Create animated stars
function createStars() {
  const cosmicElements = document.querySelector(".cosmic-elements");
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.className = "stars";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    cosmicElements.appendChild(star);
  }
}

// Testimonials slider functionality
class TestimonialSlider {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 4;
    this.autoplayInterval = null;
    this.isPaused = false;

    this.track = document.getElementById("testimonialTrack");
    this.slider = document.getElementById("testimonialSlider");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.dotsContainer = document.getElementById("sliderDots");

    this.init();
  }

  init() {
    this.createDots();
    this.bindEvents();
    this.startAutoplay();
    this.updateSlider();
  }

  createDots() {
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      dot.addEventListener("click", () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    this.slider.addEventListener("mouseenter", () => this.pauseAutoplay());
    this.slider.addEventListener("mouseleave", () => this.resumeAutoplay());
  }

  updateSlider() {
    const translateX = -this.currentSlide * 100;
    this.track.style.transform = `translateX(${translateX}%)`;

    // Update dots
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, 4000);
  }

  pauseAutoplay() {
    this.isPaused = true;
  }

  resumeAutoplay() {
    this.isPaused = false;
  }
}

// Form validation
class FormValidator {
  constructor() {
    this.form = document.getElementById("newsletterForm");
    this.nameField = document.getElementById("name");
    this.emailField = document.getElementById("email");
    this.nameError = document.getElementById("nameError");
    this.emailError = document.getElementById("emailError");

    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.nameField.addEventListener("blur", () => this.validateName());
    this.emailField.addEventListener("blur", () => this.validateEmail());
    this.nameField.addEventListener("input", () => this.clearError("name"));
    this.emailField.addEventListener("input", () => this.clearError("email"));
  }

  validateName() {
    const name = this.nameField.value.trim();
    if (name.length < 2) {
      this.showError(
        "name",
        "Please enter a valid name (at least 2 characters)"
      );
      return false;
    }
    this.clearError("name");
    return true;
  }

  validateEmail() {
    const email = this.emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showError("email", "Please enter a valid email address");
      return false;
    }
    this.clearError("email");
    return true;
  }

  showError(field, message) {
    if (field === "name") {
      this.nameField.classList.add("invalid");
      this.nameError.textContent = message;
      this.nameError.style.display = "block";
    } else if (field === "email") {
      this.emailField.classList.add("invalid");
      this.emailError.textContent = message;
      this.emailError.style.display = "block";
    }
  }

  clearError(field) {
    if (field === "name") {
      this.nameField.classList.remove("invalid");
      this.nameError.style.display = "none";
    } else if (field === "email") {
      this.emailField.classList.remove("invalid");
      this.emailError.style.display = "none";
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const isNameValid = this.validateName();
    const isEmailValid = this.validateEmail();

    if (isNameValid && isEmailValid) {
      // Success animation
      const submitBtn = this.form.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Welcome to the Universe! 🚀";
      submitBtn.style.background = "linear-gradient(45deg, #10b981, #059669)";

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = "linear-gradient(45deg, #7c3aed, #c2410c)";
        this.form.reset();
      }, 3000);
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  createStars();
  new TestimonialSlider();
  new FormValidator();
});
