const themeButtons = Array.from(document.querySelectorAll("[data-theme-choice]"));
const validThemes = new Set(["dark", "light", "geo"]);

function getSavedTheme() {
  try {
    return window.localStorage?.getItem("portfolio-theme");
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    window.localStorage?.setItem("portfolio-theme", theme);
  } catch {
    // Theme switching should still work in browsers that block localStorage.
  }
}

function applyTheme(theme) {
  const nextTheme = validThemes.has(theme) ? theme : "dark";

  document.body.dataset.theme = nextTheme;
  saveTheme(nextTheme);

  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeChoice === nextTheme;
    button.setAttribute("aria-pressed", String(isActive));
  });
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.themeChoice);
  });
});

applyTheme(getSavedTheme());
