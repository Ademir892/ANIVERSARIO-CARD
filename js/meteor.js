const Meteor = {
  config: {
    container: null,

    minDelay: 1000,
    maxDelay: 3000,

    minDuration: 1800,
    maxDuration: 2500,

    timerId: null,
    activeMeteor: null,
  },

  init() {
    this.config.container = document.getElementById("meteors");

    if (!this.config.container) {
      console.error('Meteor: elemento com id "meteors" não encontrado.');

      return;
    }

    this.scheduleNext();
  },

  scheduleNext() {
    const delay = this.random(this.config.minDelay, this.config.maxDelay);

    this.config.timerId = window.setTimeout(() => {
      this.spawn();
    }, delay);
  },

  spawn() {
    if (this.config.activeMeteor) {
      return;
    }

    const meteor = this.createMeteor();

    this.config.activeMeteor = meteor;
    this.config.container.appendChild(meteor);

    this.flashBackground();

    const duration = Number(
      meteor.style.getPropertyValue("--meteor-duration").replace("ms", ""),
    );

    window.setTimeout(() => {
      this.removeMeteor(meteor);
    }, duration);
  },

  createMeteor() {
    const meteor = document.createElement("div");
    const head = document.createElement("span");
    const tail = document.createElement("span");

    meteor.classList.add("meteor");
    head.classList.add("meteor-head");
    tail.classList.add("meteor-tail");

    meteor.appendChild(tail);
    meteor.appendChild(head);

    const startX = this.random(-250, window.innerWidth * 0.3);
    const startY = this.random(-120, window.innerHeight * 0.25);

    const travelDistance =
      Math.max(window.innerWidth, window.innerHeight) * 1.5;

    const angle = this.random(28, 42);
    const duration = this.random(
      this.config.minDuration,
      this.config.maxDuration,
    );

    meteor.style.left = `${startX}px`;
    meteor.style.top = `${startY}px`;

    meteor.style.setProperty("--meteor-distance", `${travelDistance}px`);

    meteor.style.setProperty("--meteor-angle", `${angle}deg`);

    meteor.style.setProperty("--meteor-duration", `${duration}ms`);

    meteor.style.setProperty(
      "--meteor-tail-length",
      `${this.random(140, 230)}px`,
    );

    meteor.style.setProperty(
      "--meteor-scale",
      this.randomFloat(0.8, 1.15).toFixed(2),
    );

    return meteor;
  },

  removeMeteor(meteor) {
    meteor.remove();

    this.config.activeMeteor = null;

    this.scheduleNext();
  },

  flashBackground() {
    const background = document.getElementById("background");

    if (!background) {
      return;
    }

    background.classList.add("meteor-flash");

    window.setTimeout(() => {
      background.classList.remove("meteor-flash");
    }, 180);
  },

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  },
};
