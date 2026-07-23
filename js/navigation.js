const Navigation = {
  config: {
    button: null,
    hero: null,
    journey: null,
    transitionDuration: 900,
  },

  init() {
    this.config.button = document.getElementById("enterButton");
    this.config.hero = document.getElementById("hero");
    this.config.journey = document.getElementById("journey");

    if (!this.config.button) {
      console.error('Navigation: botão com id "enterButton" não encontrado.');

      return;
    }

    if (!this.config.hero) {
      console.error('Navigation: seção com id "hero" não encontrada.');

      return;
    }

    if (!this.config.journey) {
      console.error('Navigation: seção com id "journey" não encontrada.');

      return;
    }

    this.bindEvents();
  },

  bindEvents() {
    this.config.button.addEventListener("click", () => {
      this.startJourney();
    });
  },

  startJourney() {
    if (document.body.classList.contains("journey-started")) {
      return;
    }

    document.body.classList.add("journey-started");

    this.config.button.disabled = true;

    this.startBackgroundZoom();

    window.setTimeout(() => {
      this.showJourney();
    }, this.config.transitionDuration);
  },

  startBackgroundZoom() {
    const background = document.getElementById("background");

    if (!background) {
      return;
    }

    background.classList.add("background-traveling");
  },

  showJourney() {
    this.config.hero.hidden = true;

    this.config.journey.classList.add("journey-visible");

    this.config.journey.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  },
};
