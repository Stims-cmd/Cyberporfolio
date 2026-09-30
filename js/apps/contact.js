(function () {
  function render(container) {
    container.innerHTML = `
      <h2>Contact</h2>
      <div class="card-list">
        <a class="card" style="display:block; text-decoration:none" href="mailto:ton.email@example.com">
          <h3>Email</h3><div class="desc">ton.email@example.com</div>
        </a>
        <a class="card" style="display:block; text-decoration:none" href="https://github.com/ton-pseudo" target="_blank" rel="noopener">
          <h3>GitHub</h3><div class="desc">@ton-pseudo</div>
        </a>
        <a class="card" style="display:block; text-decoration:none" href="https://linkedin.com/in/ton-pseudo" target="_blank" rel="noopener">
          <h3>LinkedIn</h3><div class="desc">[À compléter]</div>
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
