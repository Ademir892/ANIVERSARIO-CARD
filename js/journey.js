const Journey = {
  elements: {
    modal: null,
    dialog: null,
    title: null,
    content: null,
    planets: [],
    closeButtons: [],
  },

  memories: {
    manual: {
      title: "Manual da Mariana",
      content: `
                <p>
                    Arquivo em construção.
                </p>

                <p>
                    Esta área reunirá informações essenciais
                    para compreender uma criatura rara,
                    caótica e extremamente carismática.
                </p>
            `,
    },

    bugs: {
      title: "Bugs conhecidos",
      content: `
                <p>
                    Alguns comportamentos inesperados já foram identificados.
                </p>

                <p>
                    A equipe de desenvolvimento decidiu não corrigi-los
                    porque fazem parte da experiência.
                </p>
            `,
    },

    achievements: {
      title: "Conquistas desbloqueadas",
      content: `
                <p>
                    O histórico de conquistas ainda está sendo atualizado.
                </p>

                <p>
                    Novas recompensas serão liberadas
                    conforme a história avançar.
                </p>
            `,
    },

    missions: {
      title: "Missões futuras",
      content: `
                <p>
                    Existem aventuras aguardando autorização.
                </p>

                <p>
                    Algumas envolvem viagens, filmes,
                    comida e decisões questionáveis.
                </p>
            `,
    },

    terminal: {
      title: "Terminal do amor",
      content: `
                <p>
                    Sistema inicializado com sucesso.
                </p>

                <p>
                    Aguardando comandos...
                </p>
            `,
    },

    message: {
      title: "Para você",
      content: `
                <p>
                    Algumas mensagens precisam esperar
                    o momento certo para serem reveladas.
                </p>
            `,
    },
  },

  init() {
    this.cacheElements();

    if (!this.elements.modal) {
      console.error('Journey: modal com id "memoryModal" não encontrado.');

      return;
    }

    this.bindEvents();
  },

  cacheElements() {
    this.elements.modal = document.getElementById("memoryModal");

    this.elements.dialog = this.elements.modal?.querySelector(
      ".memory-modal__dialog",
    );

    this.elements.title = document.getElementById("memoryModalTitle");

    this.elements.content = document.getElementById("memoryModalContent");

    this.elements.planets = [...document.querySelectorAll("[data-memory]")];

    this.elements.closeButtons = [
      ...document.querySelectorAll("[data-modal-close]"),
    ];
  },

  bindEvents() {
    this.elements.planets.forEach((planet) => {
      planet.addEventListener("click", () => {
        this.open(planet.dataset.memory);
      });
    });

    this.elements.closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.close();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });
  },

  open(memoryId) {
    const memory = this.memories[memoryId];

    if (!memory) {
      console.warn(`Journey: memória "${memoryId}" não encontrada.`);

      return;
    }

    this.render(memory);

    this.elements.modal.classList.add("is-open");

    this.elements.modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    window.requestAnimationFrame(() => {
      this.elements.dialog.focus();
    });
  },

  close() {
    this.elements.modal.classList.remove("is-open");

    this.elements.modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
  },

  render(memory) {
    this.elements.title.textContent = memory.title;

    this.elements.content.innerHTML = memory.content;
  },

  isOpen() {
    return this.elements.modal.classList.contains("is-open");
  },
};
