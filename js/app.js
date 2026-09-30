(function () {
  const DESKTOP_ICONS = [
    { id: "projects", label: "Projects", glyph: "📁" },
    { id: "cv", label: "CV", glyph: "📄" },
    { id: "about", label: "About Me", glyph: "👤" },
    { id: "lab", label: "LAB", glyph: "🧪" },
    { id: "skills", label: "Skills", glyph: "📊" },
    { id: "journey", label: "Journey", glyph: "🧬" },
    { id: "garage", label: "Garage", glyph: "🏁" },
    { id: "github", label: "GitHub", glyph: "💻" },
    { id: "contact", label: "Contact", glyph: "✉️" },
    { id: "trash", label: "Trash", glyph: "🗑️" },
  ];

  function buildDesktopIcons() {
    const wrap = document.getElementById("icons");
    wrap.innerHTML = DESKTOP_ICONS.map((app) => `
      <button class="icon-btn" data-app="${app.id}" role="listitem" aria-label="Ouvrir ${app.label}">
        <span class="icon-glyph" aria-hidden="true">${app.glyph}</span>
        <span class="icon-label">${app.label}</span>
      </button>
    `).join("");

    wrap.querySelectorAll("[data-app]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.app === "trash") return openTrashEasterEgg();
        WindowManager.openWindow(btn.dataset.app);
      });
      btn.addEventListener("dblclick", (e) => e.preventDefault());
    });
  }

  function buildStartMenu() {
    const menu = document.getElementById("start-menu");
    const btn = document.getElementById("start-btn");
    menu.innerHTML = DESKTOP_ICONS.filter((a) => a.id !== "trash").map((app) => `
      <button data-app="${app.id}" role="menuitem"><span aria-hidden="true">${app.glyph}</span> ${app.label}</button>
    `).join("");

    function toggle(open) {
      menu.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
    }

    btn.addEventListener("click", () => toggle(menu.hidden));
    document.addEventListener("click", (e) => {
      if (!menu.hidden && !menu.contains(e.target) && e.target !== btn) toggle(false);
    });
    menu.querySelectorAll("[data-app]").forEach((item) => {
      item.addEventListener("click", () => {
        WindowManager.openWindow(item.dataset.app);
        toggle(false);
      });
    });
  }

  function startClock() {
    const clock = document.getElementById("clock");
    const tick = () => {
      clock.textContent = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    };
    tick();
    setInterval(tick, 15000);
  }

  // Easter egg simple : la corbeille contient un fichier caché
  function openTrashEasterEgg() {
    const id = "trash-egg";
    if (!WindowManager || document.querySelector('.window[aria-label="Trash"]')) {
      WindowManager.openWindow("trash");
      return;
    }
  }

  function registerTrashApp() {
    WindowManager.registerApp("trash", {
      title: "Trash",
      icon: "🗑️",
      width: 360,
      height: 260,
      render(container) {
        container.innerHTML = `
          <h2>Trash</h2>
          <p class="placeholder">Corbeille vide... ou presque.</p>
          <p style="margin-top:1rem; font-size:0.8rem; color:var(--text-dim)">
            Astuce : essaie <kbd>Ctrl/Cmd + Alt + P</kbd> quelque part sur le bureau.
          </p>
        `;
      },
    });
  }

  // Deuxième easter egg : raccourci clavier caché
  function registerKeyboardEasterEgg() {
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === "p") {
        WindowManager.registerApp("secret", {
          title: "???",
          icon: "🥚",
          width: 360,
          height: 220,
          render(container) {
            container.innerHTML = `<h2>Bien joué 🎉</h2><p>Tu as trouvé un easter egg caché. [Remplace ce message par ce que tu veux.]</p>`;
          },
        });
        WindowManager.openWindow("secret");
      }
    });
  }

  async function init() {
    buildDesktopIcons();
    buildStartMenu();
    startClock();
    registerTrashApp();
    registerKeyboardEasterEgg();
    await PortfolioData.init();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
