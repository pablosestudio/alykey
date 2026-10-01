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
    var language = document.documentElement.lang || "en";
    var message = cfg.whatsappMessages && (cfg.whatsappMessages[language] || cfg.whatsappMessages.en) || "";
    var text = encodeURIComponent(message);
    return "https://wa.me/" + number + (text ? "?text=" + text : "");
  }

  /* ---- Mobile menu ---------------------------------------------------- */
  function initMobileMenu() {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".mobile-nav");
    if (!toggle || !nav) return;
    var menuLabels = {
      en: ["Open menu", "Close menu"],
      es: ["Abrir menú", "Cerrar menú"],
      fr: ["Ouvrir le menu", "Fermer le menu"],
      uk: ["Відкрити меню", "Закрити меню"]
    };

    function setMenuOpen(isOpen) {
      nav.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      var labels = menuLabels[document.documentElement.lang] || menuLabels.en;
      toggle.setAttribute("aria-label", labels[isOpen ? 1 : 0]);
      document.body.classList.toggle("menu-open", isOpen);
    }

    toggle.addEventListener("click", function () {
      setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("pointerdown", function (event) {
      if (toggle.getAttribute("aria-expanded") === "true" && !nav.contains(event.target) && !toggle.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    window.addEventListener("pageshow", function () { setMenuOpen(false); });
    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 900px)").matches) setMenuOpen(false);
    });
  }

  /* ---- Contact form: prepare an email draft ---------------------------
     There is no form backend yet. Never show a false submission success;
     build a mailto draft and tell the visitor they must send it. */
  function initContactForm() {
    var form = document.querySelector("#contact-form");
    if (!form) return;
    var status = form.querySelector(".form-status");
    function message(key) {
      var language = document.documentElement.lang || "en";
      var messages = {
        invalid: { en: "Please check the highlighted fields and try again.", es: "Revisa los campos marcados e inténtalo de nuevo.", fr: "Veuillez vérifier les champs signalés et réessayer.", uk: "Перевірте позначені поля та спробуйте ще раз." },
        draft: {
          en: "Your email app should open with a draft. Review it and press Send; this website does not send the request automatically.",
          es: "Se debería abrir tu aplicación de correo con un borrador. Revísalo y pulsa Enviar; la web no transmite la solicitud automáticamente.",
          fr: "Votre application de messagerie devrait s'ouvrir avec un brouillon. Vérifiez-le puis cliquez sur Envoyer ; le site ne transmet pas automatiquement la demande.",
          uk: "У вашій поштовій програмі має відкритися чернетка. Перевірте її та натисніть «Надіслати»; сайт не надсилає запит автоматично."
        }
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

      var language = document.documentElement.lang || "en";
      var labels = {
        en: ["Name", "Email", "Phone", "Property location", "Service", "Preferred language", "Message"],
        es: ["Nombre", "Correo", "Teléfono", "Ubicación de la vivienda", "Servicio", "Idioma preferido", "Mensaje"],
        fr: ["Nom", "E-mail", "Téléphone", "Localisation du logement", "Service", "Langue préférée", "Message"],
        uk: ["Ім'я", "Електронна пошта", "Телефон", "Розташування житла", "Послуга", "Бажана мова", "Повідомлення"]
      }[language] || ["Name", "Email", "Phone", "Property location", "Service", "Preferred language", "Message"];
      var fields = ["name", "email", "phone", "location", "need", "language", "message"];
      var body = fields.map(function (field, index) {
        var input = form.elements.namedItem(field);
        return labels[index] + ": " + (input ? input.value.trim() : "");
      }).join("\n");
      var subjects = { en: "ALYKEY service enquiry", es: "Consulta sobre servicios de ALYKEY", fr: "Demande de renseignements sur ALYKEY", uk: "Запит щодо послуг ALYKEY" };
      window.location.href = "mailto:" + (cfg.email || "hello@alykey.es") + "?subject=" + encodeURIComponent(subjects[language] || subjects.en) + "&body=" + encodeURIComponent(body);
      status.textContent = message("draft");
      status.classList.add("is-visible");
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

  document.addEventListener("alykey:languagechange", function () {
    document.querySelectorAll("[data-config-whatsapp]").forEach(function (el) {
      el.setAttribute("href", whatsappUrl());
    });
  });
})();
