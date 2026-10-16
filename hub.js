(() => {
  const redirectMap = {
    "#qualidade-conteudo": "qualidade-conteudo.html"
  };

  if (redirectMap[window.location.hash]) {
    window.location.replace(redirectMap[window.location.hash]);
    return;
  }

  const root = document.documentElement;
  const toggles = Array.from(document.querySelectorAll("#homeThemeToggle"));

  const getInitialTheme = () => {
    try {
      const savedTheme = localStorage.getItem("faqCompilerTheme");
      return savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
    } catch (error) {
      return "light";
    }
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    const isDark = theme === "dark";
    toggles.forEach((toggle) => {
      toggle.checked = isDark;
      toggle.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
    });

    try {
      localStorage.setItem("faqCompilerTheme", theme);
    } catch (error) {}
  };

  toggles.forEach((toggle) => {
    toggle.addEventListener("change", () => setTheme(toggle.checked ? "dark" : "light"));
  });

  setTheme(getInitialTheme());
})();
