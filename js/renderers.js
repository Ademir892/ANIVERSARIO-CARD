const MemoryRenderer = {
  render(memory) {
    if (!memory) {
      return this.renderNotFound();
    }

    const renderers = {
      "character-sheet": () => this.renderCharacterSheet(memory),

      "issue-list": () => this.renderIssueList(memory),

      "achievement-list": () => this.renderAchievementList(memory),

      "mission-list": () => this.renderMissionList(memory),

      "personal-message": () => this.renderPersonalMessage(memory),

      terminal: () => this.renderTerminal(memory),

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

  renderTerminal(memory) {
    return `
    <section
      class="love-terminal"
      data-terminal
      aria-label="${memory.title}"
    >
      <header class="love-terminal__header">
        <div
          class="love-terminal__controls"
          aria-hidden="true"
        >
          <span
            class="
              love-terminal__control
              love-terminal__control--close
            "
          ></span>

          <span
            class="
              love-terminal__control
              love-terminal__control--minimize
            "
          ></span>

          <span
            class="
              love-terminal__control
              love-terminal__control--maximize
            "
          ></span>
        </div>

        <span class="love-terminal__title">
          ${memory.version}
        </span>

        <span
          class="love-terminal__connection"
          aria-label="Conexão ativa"
          title="Conexão ativa"
        ></span>
      </header>

      <div
        class="love-terminal__screen"
        data-terminal-screen
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        <div class="love-terminal__history">
          <span class="love-terminal__initializing">
            Aguardando inicialização...
          </span>
        </div>
      </div>
    </section>
  `;
  },

  renderMissionList(memory) {
    if (!Array.isArray(memory.missions)) {
      console.error("MemoryRenderer: lista de missões não encontrada.", memory);

      return this.renderNotFound();
    }

    const completed = memory.progress?.completed ?? 0;

    const total = memory.progress?.total ?? memory.missions.length;

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const missions = memory.missions
      .map((mission) => {
        const isSecret = mission.status === "secret";

        const title = isSecret ? "Missão classificada" : mission.title;

        const description = isSecret
          ? `
          Os detalhes desta missão ainda
          permanecem protegidos pelo sistema.
        `
          : mission.description;

        const requirement = mission.requirement
          ? `
          <div class="mission-card__requirement">
            <span>Requisito</span>

            <strong>
              ${mission.requirement}
            </strong>
          </div>
        `
          : "";

        return `
        <article
          class="
            mission-card
            mission-card--${mission.status}
          "
        >
          <div class="mission-card__marker">
            <span
              class="mission-card__icon"
              aria-hidden="true"
            >
              ${mission.icon}
            </span>

            <span
              class="
                mission-card__connector
                mission-card__connector--${mission.status}
              "
              aria-hidden="true"
            ></span>
          </div>

          <div class="mission-card__information">
            <header class="mission-card__header">
              <div>
                <span class="mission-card__id">
                  ${mission.id}
                </span>

                <h3 class="mission-card__title">
                  ${title}
                </h3>
              </div>

              <span
                class="
                  mission-card__status
                  mission-card__status--${mission.status}
                "
              >
                ${mission.statusLabel}
              </span>
            </header>

            <p class="mission-card__description">
              ${description}
            </p>

            ${requirement}

            <footer class="mission-card__footer">
              <div>
                <span>Categoria</span>

                <strong>
                  ${mission.category}
                </strong>
              </div>

              <div>
                <span>Recompensa</span>

                <strong>
                  ${mission.reward}
                </strong>
              </div>
            </footer>
          </div>
        </article>
      `;
      })
      .join("");

    return `
    <div class="mission-list">
      <p class="mission-list__description">
        ${memory.description}
      </p>

      <section
        class="mission-progress"
        aria-label="${completed} de ${total} missões concluídas"
      >
        <div class="mission-progress__header">
          <span>Progresso da campanha</span>

          <strong>
            ${completed} / ${total}
          </strong>
        </div>

        <div
          class="mission-progress__track"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="${total}"
          aria-valuenow="${completed}"
        >
          <span
            class="mission-progress__value"
            style="--mission-progress: ${percentage}%"
          ></span>
        </div>

        <span class="mission-progress__percentage">
          ${percentage}% concluído
        </span>
      </section>

      <div class="mission-list__items">
        ${missions}
      </div>

      <div class="mission-list__note">
        ${memory.note}
      </div>
    </div>
  `;
  },

  renderPersonalMessage(memory) {
    const paragraphs = Array.isArray(memory.paragraphs)
      ? memory.paragraphs
          .map(
            (paragraph, index) => `
            <p
              class="personal-letter__paragraph"
              style="--paragraph-index: ${index}"
            >
              ${paragraph}
            </p>
          `,
          )
          .join("")
      : "";

    return `
    <section
      class="personal-message"
      data-personal-message
    >
      <div
        class="personal-message__sealed"
        data-message-sealed
      >
        <div
          class="personal-message__seal"
          aria-hidden="true"
        >
          <span>
            ${memory.sealedMessage?.icon ?? "✦"}
          </span>
        </div>

        <span class="personal-message__label">
          ${memory.sealedMessage?.label ?? ""}
        </span>

        <p class="personal-message__description">
          ${memory.sealedMessage?.description ?? ""}
        </p>

        <button
          class="personal-message__open-button"
          type="button"
          data-message-open
        >
          <span>
            ${memory.sealedMessage?.buttonLabel ?? "Abrir mensagem"}
          </span>

          <span aria-hidden="true">
            →
          </span>
        </button>
      </div>

      <article
        class="personal-letter"
        data-personal-letter
        aria-hidden="true"
      >
        <header class="personal-letter__header">
          <span class="personal-letter__eyebrow">
            ${memory.eyebrow ?? ""}
          </span>

          <h2 class="personal-letter__title">
            ${memory.title ?? ""}
          </h2>
        </header>

        <p class="personal-letter__introduction">
          ${memory.introduction ?? ""}
        </p>

        <div class="personal-letter__content">
          ${paragraphs}
        </div>

        <blockquote class="personal-letter__highlight">
          <span aria-hidden="true">“</span>

          <p>
            ${memory.highlight ?? ""}
          </p>

          <span aria-hidden="true">”</span>
        </blockquote>

        <p class="personal-letter__closing">
          ${memory.closing ?? ""}
        </p>

        <footer class="personal-letter__signature">
          <span>
            ${memory.signature?.text ?? ""}
          </span>

          <strong>
            ${memory.signature?.name ?? ""}
          </strong>
        </footer>

        <div class="personal-letter__final-message">
          <span aria-hidden="true">✦</span>

          <p>
            ${memory.finalMessage ?? ""}
          </p>

          <span aria-hidden="true">✦</span>
        </div>
      </article>
    </section>
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
