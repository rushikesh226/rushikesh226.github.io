/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*==================== PORTFOLIO SWIPER (legacy - only if carousel is used) ====================*/
const portfolioContainer = document.querySelector(".portfolio__container.swiper-container");

if (portfolioContainer) {
  let swiperPortfolio = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },

  /* mousewheel: true,
  keyboard: true, */
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== CONTACT FORM VALIDATION ====================*/
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const contactFields = {
    name: contactForm.querySelector("#contact-name"),
    email: contactForm.querySelector("#contact-email"),
    mobile: contactForm.querySelector("#contact-mobile"),
    subject: contactForm.querySelector("#contact-subject"),
    message: contactForm.querySelector("#contact-message"),
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function getFieldValue(field) {
    return field.value.trim();
  }

  function isValidEmail(value) {
    return emailPattern.test(value);
  }

  function isValidPhone(value) {
    const digits = value.replace(/\D/g, "");

    if (digits.length === 10) {
      return /^[6-9]\d{9}$/.test(digits);
    }

    if (digits.length === 12 && digits.startsWith("91")) {
      return /^91[6-9]\d{9}$/.test(digits);
    }

    return digits.length >= 7 && digits.length <= 15;
  }

  function setFieldError(fieldName, message) {
    const field = contactFields[fieldName];
    const wrapper = field.closest(".contact__content");
    const errorEl = wrapper.querySelector(".contact__error");

    wrapper.classList.toggle("contact__content--invalid", Boolean(message));
    field.setAttribute("aria-invalid", message ? "true" : "false");
    errorEl.textContent = message || "";
  }

  function validateName() {
    const value = getFieldValue(contactFields.name);

    if (!value) {
      setFieldError("name", "Name is required.");
      return false;
    }

    if (value.length < 2) {
      setFieldError("name", "Name must be at least 2 characters.");
      return false;
    }

    setFieldError("name", "");
    return true;
  }

  function validateEmailOrPhone() {
    const email = getFieldValue(contactFields.email);
    const mobile = getFieldValue(contactFields.mobile);
    let isValid = true;

    if (!email && !mobile) {
      setFieldError("email", "Enter an email or mobile number.");
      setFieldError("mobile", "Enter an email or mobile number.");
      return false;
    }

    if (email && !isValidEmail(email)) {
      setFieldError("email", "Enter a valid email address.");
      isValid = false;
    } else {
      setFieldError("email", "");
    }

    if (mobile && !isValidPhone(mobile)) {
      setFieldError(
        "mobile",
        "Enter a valid mobile number (10-digit Indian or international)."
      );
      isValid = false;
    } else {
      setFieldError("mobile", "");
    }

    return isValid;
  }

  function validateSubject() {
    const value = getFieldValue(contactFields.subject);

    if (!value) {
      setFieldError("subject", "Subject is required.");
      return false;
    }

    if (value.length < 3) {
      setFieldError("subject", "Subject must be at least 3 characters.");
      return false;
    }

    setFieldError("subject", "");
    return true;
  }

  function validateMessage() {
    const value = getFieldValue(contactFields.message);

    if (!value) {
      setFieldError("message", "Description is required.");
      return false;
    }

    if (value.length < 10) {
      setFieldError("message", "Description must be at least 10 characters.");
      return false;
    }

    setFieldError("message", "");
    return true;
  }

  function validateForm() {
    const results = [
      validateName(),
      validateEmailOrPhone(),
      validateSubject(),
      validateMessage(),
    ];

    return results.every(Boolean);
  }

  const fieldValidators = {
    name: validateName,
    email: validateEmailOrPhone,
    mobile: validateEmailOrPhone,
    subject: validateSubject,
    message: validateMessage,
  };

  Object.entries(contactFields).forEach(([fieldName, field]) => {
    field.addEventListener("blur", fieldValidators[fieldName]);
    field.addEventListener("input", () => {
      if (field.closest(".contact__content").classList.contains("contact__content--invalid")) {
        fieldValidators[fieldName]();
      }
    });
  });

  contactForm.addEventListener("submit", (event) => {
    if (!validateForm()) {
      event.preventDefault();

      const firstInvalidField = contactForm.querySelector(
        ".contact__content--invalid .contact__input, .contact__content--invalid .contact__textarea"
      );

      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    }
  });
}
