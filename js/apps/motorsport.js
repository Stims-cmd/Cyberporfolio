(function () {
  function render(container) {
    const data = PortfolioData.store.motorsport;
    if (!data || !data.events.length) {
      container.innerHTML = `<p class="placeholder">Ajoute tes événements dans data/motorsport.json.</p>`;
      return;
    }
    const roleLabel = (id) => data.roles.find((r) => r.id === id)?.label || id;
    const skillLabel = (id) => data.skillsCatalog.find((s) => s.id === id)?.label || id;

    container.innerHTML = `
      <h2>Garage — Rallye &amp; Sport Automobile</h2>
      <p>${data.roles.map((r) => `<span class="tag">${r.label}</span>`).join("")}</p>

      <h2>Timeline</h2>
      <div class="card-list">
        ${data.events.map((ev) => `
          <div class="card">
            <button class="card-open" data-event="${ev.id}">
              <div class="meta">${ev.date} · ${ev.location} · ${roleLabel(ev.role)}</div>
              <h3>${ev.name}</h3>
              <div class="desc">${ev.description}</div>
            </button>
          </div>
        `).join("")}
      </div>
      <div id="motorsport-detail"></div>
    `;

    container.querySelectorAll("[data-event]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const ev = data.events.find((e) => e.id === btn.dataset.event);
        const panel = container.querySelector("#motorsport-detail");
        panel.innerHTML = `
          <div class="card" style="margin-top:1rem">
            <h3>${ev.name}</h3>
            <p class="meta">${roleLabel(ev.role)} · ${ev.date} · ${ev.location}</p>
            <p class="desc">${ev.experience}</p>
            <p>${(ev.skills || []).map((s) => `<span class="tag">${skillLabel(s)}</span>`).join("")}</p>
            <p class="placeholder">${ev.photos?.length ? "" : "Galerie photo à venir."}</p>
          </div>
        `;
        panel.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  WindowManager.registerApp("garage", {
    title: "Garage",
    icon: "🏁",
    width: 560,
    height: 480,
    theme: "garage",
    render,
  });
})();
