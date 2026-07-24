const MemoryRenderer = {
  render(memory) {
    if (!memory) {
      return this.renderNotFound();
    }

    const renderers = {
      "character-sheet": () => this.renderCharacterSheet(memory),

      placeholder: () => this.renderPlaceholder(memory),
    };

    const renderer = renderers[memory.type] ?? renderers.placeholder;

    return renderer();
  },

  renderCharacterSheet(memory) {
    const attributes = memory.attributes
      .map((attribute) => {
        return `
                    <article class="character-attribute">
                        <span
                            class="character-attribute__icon"
                            aria-hidden="true"
                        >
                            ${attribute.icon}
                        </span>

                        <div class="character-attribute__information">
                            <span class="character-attribute__label">
                                ${attribute.label}
                            </span>

                            <strong class="character-attribute__value">
                                ${attribute.value}
                            </strong>
                        </div>
                    </article>
                `;
      })
      .join("");

    return `
            <div class="character-sheet">
                <p class="character-sheet__description">
                    ${memory.description}
                </p>

                <div class="character-sheet__attributes">
                    ${attributes}
                </div>

                <div class="character-sheet__note">
                    ${memory.note}
                </div>
            </div>
        `;
  },

  renderPlaceholder(memory) {
    return `
            <div class="memory-placeholder">
                <p>
                    ${memory.description}
                </p>

                <span class="memory-placeholder__status">
                    Conteúdo em desenvolvimento
                </span>
            </div>
        `;
  },

  renderNotFound() {
    return `
            <div class="memory-placeholder">
                <p>
                    Esta memória parece ter se perdido
                    em alguma parte do universo.
                </p>
            </div>
        `;
  },
};
