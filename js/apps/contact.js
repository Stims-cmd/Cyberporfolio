(function () {
  function render(container) {
    container.innerHTML = `
      <h2>Contact</h2>
      <div class="card-list">
        <a class="card" style="display:block; text-decoration:none" href="mailto:simon.duchanaud@orange.fr">
          <h3>Email</h3><div class="desc">simon.duchanaud@orange.fr</div>
        </a>
        <a class="card" style="display:block; text-decoration:none" href="https://github.com/stims-cmd" target="_blank" rel="noopener">
          <h3>GitHub</h3><div class="desc">@stims-cmd</div>
        </a>
        <a class="card" style="display:block; text-decoration:none" href="https://linkedin.com/in/simon-duchanaud" target="_blank" rel="noopener">
          <h3>LinkedIn</h3><div class="desc">Simon DUCHANAUD</div>
        </a>
      </div>
    `;
  }

  WindowManager.registerApp("contact", {
    title: "Contact",
    icon: "✉️",
    width: 400,
    height: 360,
    render,
  });
})();
