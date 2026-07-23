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

            star.classList.add("star");

            const size = Math.random() * (max - min) + min;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;

            star.style.opacity = (Math.random() * 0.6 + 0.4).toFixed(2);

            layer.appendChild(star);

        }

    }

};