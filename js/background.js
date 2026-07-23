const STAR_CONFIG = {
  SMALL: 350,
  MEDIUM: 120,
  LARGE: 30,
  NEBULAS: 4,
};

const Background = {
  init() {
    this.createNebula();
    this.createStars();
    this.createMeteors();

    this.parallax();
  },

  createNebula() {
    const nebula = document.getElementById("nebula");

    const colors = ["#3B82F6", "#8B5CF6", "#0EA5E9", "#9333EA"];

    for (let i = 0; i < 4; i++) {
      const cloud = document.createElement("div");

      cloud.className = "nebula-cloud";

      const size = this.random(350, 700);

      cloud.style.width = `${size}px`;
      cloud.style.height = `${size}px`;

      cloud.style.left = `${this.random(0, 90)}%`;
      cloud.style.top = `${this.random(0, 90)}%`;

      cloud.style.background = colors[i];

      nebula.appendChild(cloud);
    }
  },

  createStars() {
    this.generateLayer("stars-small", STAR_CONFIG.SMALL, 1, 2);
    this.generateLayer("stars-medium", STAR_CONFIG.MEDIUM, 2, 3);
    this.generateLayer("stars-big", STAR_CONFIG.LARGE, 3, 5);
  },

  createMeteors() {
    // Implementaremos depois
  },

  generateLayer(id, quantity, min, max) {
    const layer = document.getElementById(id);

    for (let i = 0; i < quantity; i++) {
      const star = document.createElement("span");

      star.className = "star";

      // 1. tamanho
      const size = this.random(min, max);

      // 2. brilho
      const glow = size * 4;

      // 3. aplica brilho
      star.style.boxShadow = `0 0 ${glow}px rgba(255,255,255,.8)`;

      // 4. aplica tamanho
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      // 5. posição
      star.style.left = `${this.random(0, 100)}%`;
      star.style.top = `${this.random(0, 100)}%`;

      // 6. opacidade
      star.style.opacity = this.random(0.4, 1).toFixed(2);

      // 7. animação
      const duration = this.random(2, 6).toFixed(2);
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${this.random(0, 5).toFixed(2)}s`;

      layer.appendChild(star);
    }
  },
  random(min, max) {
    return Math.random() * (max - min) + min;
  },
  parallax() {
    window.addEventListener("mousemove", (event) => {
      const x = Math.max(
        -0.5,
        Math.min(0.5, event.clientX / window.innerWidth - 0.5),
      );

      const y = Math.max(
        -0.5,
        Math.min(0.5, event.clientY / window.innerHeight - 0.5),
      );
      this.moveLayer("nebula", x, y, 8);

      this.moveLayer("stars-small", x, y, 4);

      this.moveLayer("stars-medium", x, y, 8);

      this.moveLayer("stars-big", x, y, 14);
    });
  },

  moveLayer(id, x, y, intensity) {
    const layer = document.getElementById(id);

    layer.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
  },
};
