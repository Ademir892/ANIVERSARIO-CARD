const STAR_CONFIG = [
  {
    containerId: "stars-small",
    amount: 350,
    minSize: 1,
    maxSize: 2,
    minDuration: 2500,
    maxDuration: 5000,
  },
  {
    containerId: "stars-medium",
    amount: 120,
    minSize: 2,
    maxSize: 3,
    minDuration: 3000,
    maxDuration: 6000,
  },
  {
    containerId: "stars-big",
    amount: 30,
    minSize: 3,
    maxSize: 5,
    minDuration: 3500,
    maxDuration: 7000,
  },
];

const Background = {
  config: {
    parallaxStrength: {
      nebula: 2,
      small: 3,
      medium: 6,
      big: 10,
    },
  },

  layers: {
    nebula: null,
    small: null,
    medium: null,
    big: null,
  },

  init() {
    this.cacheLayers();
    this.createNebula();
    this.createStars();
    this.bindParallax();
  },

  cacheLayers() {
    this.layers.nebula = document.getElementById("nebula");
    this.layers.small = document.getElementById("stars-small");
    this.layers.medium = document.getElementById("stars-medium");
    this.layers.big = document.getElementById("stars-big");
  },

  createStars() {
    STAR_CONFIG.forEach((config) => {
      const container = document.getElementById(config.containerId);

      if (!container) {
        console.error(
          `Background: camada "${config.containerId}" não encontrada.`,
        );

        return;
      }

      this.generateStarLayer(container, config);
    });
  },

  generateStarLayer(container, config) {
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < config.amount; index++) {
      const star = this.createStar(config);

      fragment.appendChild(star);
    }

    container.appendChild(fragment);
  },

  createStar(config) {
    const star = document.createElement("span");

    const size = this.random(config.minSize, config.maxSize);

    const opacity = this.randomFloat(0.35, 1);
    const duration = this.random(config.minDuration, config.maxDuration);

    const delay = this.random(0, duration);

    const glow = Math.max(size * 3, 4);

    star.classList.add("star");

    star.style.left = `${this.randomFloat(0, 100)}%`;
    star.style.top = `${this.randomFloat(0, 100)}%`;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.opacity = opacity.toFixed(2);

    star.style.animationDuration = `${duration}ms`;
    star.style.animationDelay = `-${delay}ms`;

    star.style.boxShadow = `
            0 0 ${glow}px rgba(255, 255, 255, 0.8),
            0 0 ${glow * 2}px rgba(255, 255, 255, 0.35)
        `;

    return star;
  },

  createNebula() {
    if (!this.layers.nebula) {
      console.error('Background: elemento com id "nebula" não encontrado.');

      return;
    }

    const fragment = document.createDocumentFragment();

    const colors = [
      "rgba(95, 70, 180, 0.45)",
      "rgba(55, 110, 210, 0.35)",
      "rgba(170, 70, 160, 0.28)",
    ];

    for (let index = 0; index < 5; index++) {
      const cloud = document.createElement("span");

      const width = this.random(280, 650);
      const height = this.random(220, 520);

      cloud.classList.add("nebula-cloud");

      cloud.style.left = `${this.randomFloat(-10, 90)}%`;

      cloud.style.top = `${this.randomFloat(-10, 90)}%`;

      cloud.style.width = `${width}px`;
      cloud.style.height = `${height}px`;

      cloud.style.background = colors[this.random(0, colors.length - 1)];

      fragment.appendChild(cloud);
    }

    this.layers.nebula.appendChild(fragment);
  },

  bindParallax() {
    window.addEventListener("pointermove", (event) => {
      this.handleParallax(event);
    });
  },

  handleParallax(event) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const normalizedX = (event.clientX - centerX) / centerX;

    const normalizedY = (event.clientY - centerY) / centerY;

    this.moveLayer(
      this.layers.nebula,
      normalizedX,
      normalizedY,
      this.config.parallaxStrength.nebula,
    );

    this.moveLayer(
      this.layers.small,
      normalizedX,
      normalizedY,
      this.config.parallaxStrength.small,
    );

    this.moveLayer(
      this.layers.medium,
      normalizedX,
      normalizedY,
      this.config.parallaxStrength.medium,
    );

    this.moveLayer(
      this.layers.big,
      normalizedX,
      normalizedY,
      this.config.parallaxStrength.big,
    );
  },

  moveLayer(layer, x, y, strength) {
    if (!layer) {
      return;
    }

    const translateX = x * strength;
    const translateY = y * strength;

    layer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
  },

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  },
};
