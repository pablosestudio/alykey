/**
 * ALYKEY — shared site behaviour
 * Runs on every page. No build step, no dependencies.
 */
(function () {
  "use strict";
  var cfg = window.siteConfig || {};

  /* ---- Inject config-driven values --------------------------------- */
  function applyConfig() {
    // Plain text fields, e.g. <span data-config="email"></span>
    document.querySelectorAll("[data-config]").forEach(function (el) {
      var value = resolvePath(cfg, el.getAttribute("data-config"));
      if (value) el.textContent = value;
    });

    // href-producing fields
    document.querySelectorAll("[data-config-tel]").forEach(function (el) {
      el.setAttribute("href", "tel:" + cfg.phoneHref);
    });
    document.querySelectorAll("[data-config-mailto]").forEach(function (el) {
      el.setAttribute("href", "mailto:" + cfg.email);
    });
    document.querySelectorAll("[data-config-whatsapp]").forEach(function (el) {
      el.setAttribute("href", whatsappUrl());
    });
  }

  function resolvePath(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : null;
    }, obj);
  }

  function whatsappUrl() {
    var number = cfg.whatsappNumber || "";
    var text = encodeURIComponent(cfg.whatsappMessage || "");
    return "https://wa.me/" + number + (text ? "?text=" + text : "");
  }

  /* ---- Mobile menu ---------------------------------------------------- */
  function initMobileMenu() {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".mobile-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---- Contact form (front-end only for V1) ---------------------------
     There is no backend yet. On submit we validate, then show a success
     state. Before launch, point this at a real endpoint — see README.md
     → "Before you publish" for options (Formspree, Getform, a small
     serverless function, etc). */
  function initContactForm() {
    var form = document.querySelector("#contact-form");
    if (!form) return;
    var status = form.querySelector(".form-status");
    function message(key) {
      var language = document.documentElement.lang || "en";
      var messages = {
        invalid: { en: "Please check the highlighted fields and try again.", es: "Revisa los campos marcados e inténtalo de nuevo.", fr: "Veuillez vérifier les champs signalés et réessayer.", uk: "Перевірте позначені поля та спробуйте ще раз." },
        success: { en: "Thank you. We'll get back to you as soon as possible.", es: "Gracias. Te responderemos lo antes posible.", fr: "Merci. Nous vous répondrons dès que possible.", uk: "Дякуємо. Ми відповімо вам якомога швидше." }
      };
      return messages[key][language] || messages[key].en;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var isEmpty = input.type === "checkbox" ? !input.checked : !input.value.trim();
        var isBadEmail = input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        if (isEmpty || isBadEmail) {
          valid = false;
          if (field) field.classList.add("has-error");
        } else if (field) {
          field.classList.remove("has-error");
        }
      });

      status.classList.remove("is-visible", "is-success", "is-error");

      if (!valid) {
        status.textContent = message("invalid");
        status.classList.add("is-visible", "is-error");
        return;
      }

      // V1: no backend wired up yet. Replace this block once a form
      // endpoint is connected (see README.md).
      status.textContent = message("success");
      status.classList.add("is-visible", "is-success");
      form.reset();
    });
  }

  function setYear() {
    var el = document.querySelector("#year");
    if (el) el.textContent = new Date().getFullYear();
  }

  function prefillNeed() {
    var select = document.querySelector("#need");
    if (!select) return;
    var params = new URLSearchParams(window.location.search);
    var need = params.get("need");
    if (need && Array.from(select.options).some(function (o) { return o.value === need; })) {
      select.value = need;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    initMobileMenu();
    initContactForm();
    setYear();
    prefillNeed();
  });
})();
