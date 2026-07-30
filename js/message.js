const PersonalMessageExperience = {
  state: {
    activeContainer: null,
    openButton: null,
    executionId: 0,
  },

  init() {
    window.addEventListener("memory:opened", (event) => {
      const { memory } = event.detail;

      if (memory?.type !== "personal-message") {
        return;
      }

      this.start();
    });

    window.addEventListener("memory:closed", () => {
      this.cancel();
    });
  },

  start() {
    this.cancel();

    const container = document.querySelector("[data-personal-message]");

    const openButton = container?.querySelector("[data-message-open]");

    if (!container || !openButton) {
      console.warn("PersonalMessageExperience: elementos não encontrados.");

      return;
    }

    this.state.activeContainer = container;
    this.state.openButton = openButton;

    openButton.addEventListener("click", this.handleOpen, {
      once: true,
    });
  },

  handleOpen: () => {
    PersonalMessageExperience.reveal();
  },

  reveal() {
    const container = this.state.activeContainer;

    if (!container) {
      return;
    }

    const sealed = container.querySelector("[data-message-sealed]");

    const letter = container.querySelector("[data-personal-letter]");

    if (!sealed || !letter) {
      return;
    }

    sealed.classList.add("is-opening");

    window.setTimeout(() => {
      sealed.hidden = true;

      letter.setAttribute("aria-hidden", "false");

      letter.classList.add("is-revealed");

      letter.focus?.();
    }, 650);
  },

  cancel() {
    this.state.executionId++;

    if (this.state.openButton) {
      this.state.openButton.removeEventListener("click", this.handleOpen);
    }

    this.state.activeContainer = null;
    this.state.openButton = null;
  },
};
