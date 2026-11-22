$(document).ready(function () {
  let currentLang = localStorage.getItem("lang") || "en";
  let visibleProjectCount = $(".projet").length;

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || key;
  }

  function updateProjectCounter() {
    const template = visibleProjectCount > 1 ? t("projects_count_many") : t("projects_count_one");
    $("#projets-compteur").text(template.replace("{n}", String(visibleProjectCount)));
  }

  function applyLanguage(lang) {
    currentLang = lang === "fr" ? "fr" : "en";
    localStorage.setItem("lang", currentLang);
    $("html").attr("lang", currentLang);
    document.title = t("page_title");
    $("#lang-label").text(currentLang.toUpperCase());

    $("[data-i18n]").each(function () {
      const key = $(this).data("i18n");
      $(this).text(t(key));
    });

    $("[data-i18n-placeholder]").each(function () {
      const key = $(this).data("i18n-placeholder");
      $(this).attr("placeholder", t(key));
    });

    updateProjectCounter();
  }

  // Initialisation de la langue (EN par défaut)
  applyLanguage(currentLang);

  // Sélecteur de langue dropdown (display explicite pour compatibilité garantie)
  $("#lang-toggle").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const $menu = $("#lang-menu");
    const isOpen = $menu.is(":visible");
    if (isOpen) {
      $menu.hide();
      $(this).attr("aria-expanded", "false");
    } else {
      $menu.show();
      $(this).attr("aria-expanded", "true");
    }
  });

  $(".lang-option").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const selectedLang = $(this).data("set-lang");
    applyLanguage(selectedLang);
    $("#lang-menu").hide();
    $("#lang-toggle").attr("aria-expanded", "false");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest("#lang-switcher").length) {
      $("#lang-menu").hide();
      $("#lang-toggle").attr("aria-expanded", "false");
    }
  });

  // 0. Bascule mode clair / sombre (persisté dans localStorage)
  function syncThemeIcons() {
    const isLight = $("html").hasClass("light");
    if (isLight) {
      $("#icon-moon").removeClass("hidden");
      $("#icon-sun").addClass("hidden");
    } else {
      $("#icon-sun").removeClass("hidden");
      $("#icon-moon").addClass("hidden");
    }
  }
  syncThemeIcons();

  $("#theme-toggle").on("click", function () {
    $("html").toggleClass("light");
    const isLight = $("html").hasClass("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    syncThemeIcons();
  });

  // 1. Menu mobile toggle
  $("#menu-toggle").on("click", function () {
    const $menu = $("#mobile-menu");
    const isExpanded = $(this).attr("aria-expanded") === "true";
    $menu.slideToggle(200);
    $(this).attr("aria-expanded", String(!isExpanded));
  });

  $("#mobile-menu a").on("click", function () {
    $("#mobile-menu").slideUp(150);
    $("#menu-toggle").attr("aria-expanded", "false");
  });

  // 2. Filtrage dynamique des projets + mise à jour du compteur
  $(".filtre-btn").on("click", function () {
    const filtre = $(this).data("filtre");

    $(".filtre-btn")
      .removeClass("theme-pill-cta font-semibold")
      .addClass("border theme-surface theme-muted font-medium hover:text-[var(--text)]");
    $(this)
      .removeClass("border theme-surface theme-muted font-medium hover:text-[var(--text)]")
      .addClass("theme-pill-cta font-semibold");

    let visibles = 0;
    $(".projet").each(function () {
      const categorie = $(this).data("categorie");
      if (filtre === "tous" || categorie === filtre) {
        $(this).fadeIn(200);
        visibles += 1;
      } else {
        $(this).fadeOut(150);
      }
    });

    visibleProjectCount = visibles;
    updateProjectCounter();
  });

  // 3. Modale de détail de projet
  $(".btn-details").on("click", function () {
    const $carte = $(this).closest(".projet");
    const key = $carte.data("project-key");
    $("#modale-titre").text(t(key + "_title"));
    $("#modale-stack").text(t(key + "_stack"));
    $("#modale-details").text(t(key + "_details"));
    $("#modale-github").attr("href", $carte.data("github"));
    $("#projet-modale").removeClass("hidden").hide().fadeIn(180);
  });

  function fermerModale() {
    $("#projet-modale").fadeOut(150, function () {
      $(this).addClass("hidden");
    });
  }

  $("#modale-fermer, #modale-fermer-btn").on("click", fermerModale);
  $("#projet-modale").on("click", function (e) {
    if (e.target === this) {
      fermerModale();
    }
  });
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      if (!$("#projet-modale").hasClass("hidden")) {
        fermerModale();
      }
      $("#lang-menu").hide();
      $("#lang-toggle").attr("aria-expanded", "false");
    }
  });

  // 4. Bouton retour en haut + lien actif au scroll
  $(window).on("scroll", function () {
    const scrollPos = $(window).scrollTop();
    if (scrollPos > 280) {
      $("#btn-haut").removeClass("hidden").fadeIn(180);
    } else {
      $("#btn-haut").fadeOut(180);
    }

    $("section[id]").each(function () {
      const top = $(this).offset().top - 120;
      const bottom = top + $(this).outerHeight();
      const id = $(this).attr("id");
      if (scrollPos >= top && scrollPos < bottom) {
        $(".nav-link").removeClass("font-semibold underline underline-offset-4");
        $('.nav-link[href="#' + id + '"]').addClass("font-semibold underline underline-offset-4");
      }
    });
  });

  $("#btn-haut").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 350);
  });

  // 5. Copie de l'e-mail en un clic
  $("#copier-email").on("click", function () {
    const $span = $(this).find("span");
    const email = $(this).data("email");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
    }
    $span.text(t("email_copied"));
    setTimeout(function () {
      $span.text(email);
    }, 2000);
  });

  // 6. Envoi réel du formulaire de contact via FormSubmit (+ fallback mailto)
  $("#contact-form").on("submit", function (e) {
    e.preventDefault();

    const nom = $("#nom").val().trim();
    const email = $("#email").val().trim();
    const message = $("#message").val().trim();
    const $feedback = $("#form-feedback");
    const $submit = $("#contact-submit");
    const form = this;

    $feedback.removeClass("hidden bg-red-950/70 text-red-300 border border-red-800 bg-emerald-950/70 text-emerald-300 border-emerald-800");

    if (!nom || !email || !message) {
      $feedback
        .addClass("bg-red-950/70 text-red-300 border border-red-800")
        .text(t("contact_err_empty"))
        .fadeIn(200);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      $feedback
        .addClass("bg-red-950/70 text-red-300 border border-red-800")
        .text(t("contact_err_email"))
        .fadeIn(200);
      return;
    }

    $submit.prop("disabled", true).text(t("contact_sending"));

    fetch("https://formsubmit.co/ajax/karimgamin2000@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: nom,
        email: email,
        message: message,
        _subject: "Nouveau message depuis le portfolio KAK",
        _replyto: email,
        _captcha: "false",
      }),
    })
      .then(function (response) {
        return response.json().then(function (data) {
          return { ok: response.ok, data: data };
        });
      })
      .then(function (res) {
        if (!res.ok || res.data.success === "false" || res.data.success === false) {
          const msg = (res.data && res.data.message) || "";
          if (msg.toLowerCase().includes("activation")) {
            $feedback
              .addClass("bg-red-950/70 text-red-300 border border-red-800")
              .text(t("contact_err_activation"))
              .fadeIn(200);
            return;
          }
          throw new Error(msg || "Error");
        }
        $feedback
          .addClass("bg-emerald-950/70 text-emerald-300 border border-emerald-800")
          .text(t("contact_success").replace("{name}", nom))
          .fadeIn(200);
        form.reset();
      })
      .catch(function () {
        const subject = encodeURIComponent("Contact Portfolio KAK — " + nom);
        const body = encodeURIComponent("From: " + nom + " (" + email + ")\n\n" + message);
        $feedback
          .addClass("bg-red-950/70 text-red-300 border border-red-800")
          .html(
            t("contact_err_fallback") +
              ' <a class="underline font-semibold" href="mailto:karimgamin2000@gmail.com?subject=' +
              subject +
              "&body=" +
              body +
              '">' +
              t("contact_open_mail") +
              "</a>."
          )
          .fadeIn(200);
      })
      .finally(function () {
        $submit.prop("disabled", false).text(t("contact_submit"));
      });
  });
});
