const MemoryRenderer = {
  render(memory) {
    if (!memory) {
      return this.renderNotFound();
    }

    const renderers = {
      "character-sheet": () => this.renderCharacterSheet(memory),

      "issue-list": () => this.renderIssueList(memory),

      "achievement-list": () => this.renderAchievementList(memory),

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

  renderIssueList(memory) {
    const issues = memory.issues
      .map((issue) => {
        return `
                <article class="issue-card">
                    <header class="issue-card__header">
                        <div class="issue-card__identity">
                            <span
                                class="issue-card__icon"
                                aria-hidden="true"
                            >
                                ${issue.icon}
                            </span>

                            <div>
                                <span class="issue-card__id">
                                    ${issue.id}
                                </span>

                                <h3 class="issue-card__title">
                                    ${issue.title}
                                </h3>
                            </div>
                        </div>

                        <span
                            class="
                                issue-card__status
                                issue-card__status--${issue.status}
                            "
                        >
                            ${issue.statusLabel}
                        </span>
                    </header>

                    <p class="issue-card__description">
                        ${issue.description}
                    </p>

                    <footer class="issue-card__footer">
                        <span>
                            Severidade
                        </span>

                        <strong>
                            ${issue.severity}
                        </strong>
                    </footer>
                </article>
            `;
      })
      .join("");

    return `
        <div class="issue-list">
            <p class="issue-list__description">
                ${memory.description}
            </p>

            <div class="issue-list__items">
                ${issues}
            </div>

            <div class="issue-list__note">
                ${memory.note}
            </div>
        </div>
    `;
  },

  renderAchievementList(memory) {
    if (!Array.isArray(memory.achievements)) {
      console.error(
        "MemoryRenderer: lista de conquistas não encontrada.",
        memory,
      );

      return this.renderNotFound();
    }

    const unlocked = memory.progress?.unlocked ?? 0;

    const total = memory.progress?.total ?? memory.achievements.length;

    const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;

    const achievements = memory.achievements
      .map((achievement) => {
        //const isLocked = achievement.status === "locked";

        const isSecret = achievement.status === "secret";

        const title = isSecret ? "Conquista secreta" : achievement.title;

        return `
        <article
          class="
            achievement-card
            achievement-card--${achievement.status}
          "
        >
          <div class="achievement-card__icon">
            <span aria-hidden="true">
              ${achievement.icon}
            </span>
          </div>

          <div class="achievement-card__information">
            <header class="achievement-card__header">
              <div>
                <span class="achievement-card__id">
                  ${achievement.id}
                </span>

                <h3 class="achievement-card__title">
                  ${title}
                </h3>
              </div>

              <span
                class="
                  achievement-card__status
                  achievement-card__status--${achievement.status}
                "
              >
                ${achievement.statusLabel}
              </span>
            </header>

            <p class="achievement-card__description">
              ${achievement.description}
            </p>

            <footer class="achievement-card__footer">
              <span>
                ${achievement.date}
              </span>

              <strong>
                ${achievement.rarity}
              </strong>
            </footer>
          </div>
        </article>
      `;
      })
      .join("");

    return `
    <div class="achievement-list">
      <p class="achievement-list__description">
        ${memory.description}
      </p>

      <section
        class="achievement-progress"
        aria-label="${unlocked} de ${total} conquistas desbloqueadas"
      >
        <div class="achievement-progress__header">
          <span>Progresso geral</span>

          <strong>
            ${unlocked} / ${total}
          </strong>
        </div>

        <div
          class="achievement-progress__track"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="${total}"
          aria-valuenow="${unlocked}"
        >
          <span
            class="achievement-progress__value"
            style="--achievement-progress: ${percentage}%"
          ></span>
        </div>

        <span class="achievement-progress__percentage">
          ${percentage}% concluído
        </span>
      </section>

      <div class="achievement-list__items">
        ${achievements}
      </div>

      <div class="achievement-list__note">
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
