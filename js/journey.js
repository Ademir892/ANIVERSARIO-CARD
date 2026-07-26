const Journey = {
  elements: {
    modal: null,
    dialog: null,
    eyebrow: null,
    title: null,
    content: null,
    planets: [],
    closeButtons: [],
  },

  state: {
    activePlanet: null,
    lastFocusedElement: null,
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

    this.elements.eyebrow = this.elements.modal?.querySelector(
      ".memory-modal__eyebrow",
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
        this.open(planet.dataset.memory, planet);
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

  open(memoryId, planet) {
    const memory = MemoryRepository.get(memoryId);

    if (!memory) {
      console.warn(`Journey: memória "${memoryId}" não encontrada.`);

      return;
    }

    this.state.activePlanet = planet;
    this.state.lastFocusedElement = document.activeElement;

    this.render(memory);

    planet.classList.add("is-active");

    this.elements.modal.classList.add("is-open");

    this.elements.modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    window.requestAnimationFrame(() => {
      this.elements.dialog.focus();
    });
    window.dispatchEvent(
      new CustomEvent("memory:opened", {
        detail: {
          memory,
          memoryId,
        },
      }),
    );
  },

  close() {
    this.elements.modal.classList.remove("is-open");

    this.elements.modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    this.state.activePlanet?.classList.remove("is-active");

    this.state.lastFocusedElement?.focus();

    this.state.activePlanet = null;
    this.state.lastFocusedElement = null;

    window.dispatchEvent(new CustomEvent("memory:closed"));
  },

  render(memory) {
    this.elements.eyebrow.textContent = memory.eyebrow;

    this.elements.title.textContent = memory.title;

    this.elements.content.innerHTML = MemoryRenderer.render(memory);
  },

  isOpen() {
    return this.elements.modal.classList.contains("is-open");
  },
};
