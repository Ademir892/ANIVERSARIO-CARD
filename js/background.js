const Background = {
  init() {
    this.createNebula();
    this.createStars();
    this.createMeteors();
  },

  createNebula() {
    // Implementaremos depois
  },

  createStars() {
    this.generateLayer("stars-small", 350, 1, 2);

    this.generateLayer("stars-medium", 120, 2, 3);

    this.generateLayer("stars-big", 30, 3, 5);
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
        const size = Math.random() * (max - min) + min;

        // 2. brilho
        const glow = size * 4;

        // 3. aplica brilho
        star.style.boxShadow = `0 0 ${glow}px rgba(255,255,255,.8)`;

        // 4. aplica tamanho
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // 5. posição
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        // 6. opacidade
        star.style.opacity = (Math.random() * 0.6 + 0.4).toFixed(2);

        // 7. animação
        const duration = (Math.random() * 4 + 2).toFixed(2);

        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${(Math.random() * 5).toFixed(2)}s`;

        layer.appendChild(star);

    }

}
};
