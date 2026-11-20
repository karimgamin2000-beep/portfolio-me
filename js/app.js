$(document).ready(function () {
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

    const label = visibles > 1 ? visibles + " projets affichés" : visibles + " projet affiché";
    $("#projets-compteur").text(label);
  });

  // 3. Modale de détail de projet
  $(".btn-details").on("click", function () {
    const $carte = $(this).closest(".projet");
    $("#modale-titre").text($carte.data("titre"));
    $("#modale-stack").text($carte.data("stack"));
    $("#modale-details").text($carte.data("details"));
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
    if (e.key === "Escape" && !$("#projet-modale").hasClass("hidden")) {
      fermerModale();
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
    $span.text("E-mail copié !");
    setTimeout(function () {
      $span.text(email);
    }, 2000);
  });

  // 6. Validation et feedback du formulaire de contact
  $("#contact-form").on("submit", function (e) {
    e.preventDefault();

    const nom = $("#nom").val().trim();
    const email = $("#email").val().trim();
    const message = $("#message").val().trim();
    const $feedback = $("#form-feedback");

    $feedback.removeClass("hidden bg-red-950/70 text-red-300 border border-red-800 bg-emerald-950/70 text-emerald-300 border-emerald-800");

    if (!nom || !email || !message) {
      $feedback
        .addClass("bg-red-950/70 text-red-300 border border-red-800")
        .text("Merci de remplir tous les champs avant d'envoyer.")
        .fadeIn(200);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      $feedback
        .addClass("bg-red-950/70 text-red-300 border border-red-800")
        .text("Veuillez saisir une adresse e-mail valide.")
        .fadeIn(200);
      return;
    }

    $feedback
      .addClass("bg-emerald-950/70 text-emerald-300 border border-emerald-800")
      .text("Merci " + nom + " ! Votre message a bien été enregistré (mode démo statique).")
      .fadeIn(200);

    this.reset();
  });
});
