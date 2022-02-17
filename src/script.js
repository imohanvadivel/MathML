function $(a, b = document) {
  return b.querySelector(a);
}

function hasMathMLSupport() {
  var ua = navigator.userAgent;
  var isGecko =
    ua.indexOf("Gecko") > -1 &&
    ua.indexOf("KHTML") === -1 &&
    ua.indexOf("Trident") === -1;
  var isWebKit = ua.indexOf("AppleWebKit") > -1 && ua.indexOf("Chrome") === -1;

  if (isGecko || isWebKit) {
    $(".browser-support").style.display = "none";
  } else {
    let script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://unpkg.com/mathjax@3.1.4/es5/mml-chtml.js"
    );
    document.head.appendChild(script);
  }
}

hasMathMLSupport();

class DarkMode {
  constructor(el, namespace, setMetaTheme) {
    this.root = document.querySelector("html");
    if (namespace) this.namespace = namespace;
    if (setMetaTheme) this.setMetaTheme = setMetaTheme;
    this.label = "darkMode";
    this.InitializeTheme();
    el.addEventListener("click", () => this.toggleTheme());
  }

  InitializeTheme() {
    if (this.namespace) this.label = `${this.namespace}-darkMode`;
    let theme = localStorage.getItem(this.label);

    if (theme === "false" || theme == null) {
      this.setLightMode();
      if (this.setMetaTheme) this.setMeta("light");
    } else {
      this.setDarkMode();
      if (this.setMetaTheme) this.setMeta("dark");
    }
  }

  setMeta(theme) {
    let meta = document.querySelector('html meta[name="theme-color"]');
    if (!meta) {
      let meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document
        .querySelector("head")
        .insertAdjacentHTML(
          "beforeend",
          `<meta name="theme-color" content="${
            theme === "dark" ? "#191919" : "#ffffff"
          }" />`
        );
      return;
    }

    meta.insertAdjacentHTML(
      "afterend",
      `<meta name="theme-color" content="${
        theme === "dark" ? "#191919" : "#ffffff"
      }" />`
    );
    meta.remove();
  }

  toggleTheme() {
    let theme = localStorage.getItem(this.label);
    if (theme === "false") {
      this.setDarkMode();
      if (this.setMetaTheme) this.setMeta("dark");
    } else {
      this.setLightMode();
      if (this.setMetaTheme) this.setMeta("light");
    }
  }

  setDarkMode() {
    this.root.classList.add("dark");
    localStorage.setItem(this.label, true);
    if (this.setMetaTheme) this.setMeta("dark");
  }

  setLightMode() {
    this.root.classList.remove("dark");
    localStorage.setItem(this.label, false);
    if (this.setMetaTheme) this.setMeta("light");
  }
}

new DarkMode($("#darkMode-toggle"), "mathml", true);
