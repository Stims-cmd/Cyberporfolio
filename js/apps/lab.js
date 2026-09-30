(function () {
  function render(container) {
    const items = PortfolioData.store.lab;
    container.innerHTML = `
      <h2>LAB</h2>
      <p class="placeholder">Espace d'expérimentation — prototypes, tests, curiosité technique.</p>
      ${!items.length ? `<p class="placeholder">Ajoute des expériences dans data/lab.json.</p>` : `
        <div class="card-list">
          ${items.map((e) => `
            <div class="card">
              <h3>${e.title}</h3>
              <div class="meta">${e.technology}</div>
              <dl class="section-detail">
                <dt>Objectif</dt><dd>${e.objective}</dd>
                <dt>Résultat</dt><dd>${e.result}</dd>
                <dt>Appris</dt><dd>${e.learned}</dd>
              </dl>
              ${e.github ? `<a class="btn secondary" href="${e.github}" target="_blank" rel="noopener">GitHub</a>` : ""}
            </div>
          `).join("")}
        </div>
      `}
    `;
  }

  WindowManager.registerApp("lab", {
    title: "LAB",
    icon: "🧪",
    width: 520,
    height: 460,
    render,
  });
})();
