document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ===== TYPED.JS — effet machine à écrire ===== */
  if (typeof Typed !== "undefined") {
    new Typed("#typing", {
      strings: [
        "Technicien Fibre Optique FTTH",
        "Développeur Web",
        "Passionné d'Électronique",
        "Créateur d'expériences numériques"
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 400,
      loop: true,
      smartBackspace: true
    });
  }

  /* ===== PARTICLES.JS — fond animé néon ===== */
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 70, density: { enable: true, value_area: 900 } },
        color: { value: "#00d9ff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true, anim: { enable: true, speed: 0.6, opacity_min: 0.1 } },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 140, color: "#00d9ff", opacity: 0.25, width: 1 },
        move: { enable: true, speed: 1.4, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { grab: { distance: 160, line_linked: { opacity: 0.6 } }, push: { particles_nb: 3 } }
      },
      retina_detect: true
    });
  }

  /* ===== MENU — dropdown derrière les trois barres verticales ===== */
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuBtn.classList.toggle("is-open");
  });
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.classList.remove("is-open");
    });
  });

  /* ===== HEADER — effet au scroll ===== */
  const header = document.getElementById("site-header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
  });

  /* ===== SCROLL REVEAL — entrée/sortie ===== */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle("in", entry.isIntersecting));
  }, { threshold: 0.2 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ===== BARRES DE COMPÉTENCES — reveal au scroll ===== */
  const skillBars = document.querySelectorAll(".bar span");
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "none";
        void entry.target.offsetWidth;
        entry.target.style.animation = "load 1.6s ease forwards";
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ===== FORMULAIRE CONTACT — envoi réel vers contact.php ===== */
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector("button");
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Envoi en cours...";
      feedback.textContent = "";
      feedback.className = "form-feedback";

      try {
        const response = await fetch("contact.php", {
          method: "POST",
          body: new FormData(form)
        });
        const data = await response.json();

        if (data.success) {
          feedback.textContent = data.message || "Message envoyé ✓";
          feedback.classList.add("ok");
          form.reset();
        } else {
          feedback.textContent = data.message || "Une erreur est survenue.";
          feedback.classList.add("error");
        }
      } catch (err) {
        feedback.textContent = "Impossible d'envoyer le message pour le moment.";
        feedback.classList.add("error");
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  }

});
