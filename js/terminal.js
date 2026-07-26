const TerminalExperience = {
  selectors: {
    terminal: "[data-terminal]",
    screen: "[data-terminal-screen]",
    history: ".love-terminal__history",
  },

  typingSpeed: 52,
  outputDelay: 220,
  commandDelay: 650,

  executionId: 0,

  init() {
    window.addEventListener("memory:opened", (event) => {
      const { memory } = event.detail;

      if (memory?.type !== "terminal") {
        return;
      }

      this.start(memory);
    });

    window.addEventListener("memory:closed", () => {
      this.cancel();
    });
  },

  async start(memory) {
    this.cancel();

    const executionId = this.executionId;

    const terminal = document.querySelector(this.selectors.terminal);

    const screen = terminal?.querySelector(this.selectors.screen);

    const history = terminal?.querySelector(this.selectors.history);

    if (!terminal || !screen || !history) {
      console.error(
        "TerminalExperience: estrutura do terminal não encontrada.",
      );

      return;
    }

    history.innerHTML = "";

    await this.renderBootSequence({
      messages: memory.bootMessages ?? [],
      history,
      screen,
      executionId,
    });

    if (!this.isExecutionActive(executionId)) {
      return;
    }

    for (const command of memory.commands ?? []) {
      await this.renderCommand({
        command,
        history,
        screen,
        executionId,
      });

      if (!this.isExecutionActive(executionId)) {
        return;
      }
    }

    if (memory.finalMessage) {
      await this.appendOutputLine({
        output: memory.finalMessage,
        history,
        screen,
        executionId,
      });
    }

    if (!this.isExecutionActive(executionId)) {
      return;
    }

    this.appendPrompt({
      history,
      screen,
      active: true,
    });
  },

  cancel() {
    this.executionId += 1;
  },

  isExecutionActive(executionId) {
    return executionId === this.executionId;
  },

  async renderBootSequence({ messages, history, screen, executionId }) {
    const versionLine = this.createLine({
      className: "love-terminal__line love-terminal__line--version",
      text: "Universo Mariana Terminal",
    });

    history.append(versionLine);

    this.scrollToBottom(screen);

    await this.wait(400);

    for (const message of messages) {
      if (!this.isExecutionActive(executionId)) {
        return;
      }

      const line = this.createOutputLine(message);

      history.append(line);

      this.scrollToBottom(screen);

      await this.wait(message.delay ?? 450);
    }

    const separator = this.createLine({
      className: "love-terminal__separator",
      text: "",
    });

    history.append(separator);

    this.scrollToBottom(screen);

    await this.wait(500);
  },

  async renderCommand({ command, history, screen, executionId }) {
    const prompt = this.appendPrompt({
      history,
      screen,
      active: true,
    });

    const commandElement = prompt.querySelector(".love-terminal__command");

    await this.typeText({
      element: commandElement,
      text: command.command,
      executionId,
      screen,
    });

    if (!this.isExecutionActive(executionId)) {
      return;
    }

    prompt.classList.remove("love-terminal__prompt--active");

    await this.wait(320);

    for (const output of command.output ?? []) {
      await this.appendOutputLine({
        output,
        history,
        screen,
        executionId,
      });

      if (!this.isExecutionActive(executionId)) {
        return;
      }
    }

    await this.wait(command.delay ?? this.commandDelay);
  },

  appendPrompt({ history, screen, active = false }) {
    const prompt = document.createElement("div");

    prompt.className = "love-terminal__prompt";

    if (active) {
      prompt.classList.add("love-terminal__prompt--active");
    }

    prompt.innerHTML = `
      <span
        class="love-terminal__prompt-user"
        aria-hidden="true"
      >
        ademir@universo-mariana
      </span>

      <span
        class="love-terminal__prompt-separator"
        aria-hidden="true"
      >
        :
      </span>

      <span
        class="love-terminal__prompt-path"
        aria-hidden="true"
      >
        ~
      </span>

      <span
        class="love-terminal__prompt-symbol"
        aria-hidden="true"
      >
        $
      </span>

      <span class="love-terminal__command"></span>

      <span
        class="love-terminal__cursor"
        aria-hidden="true"
      ></span>
    `;

    history.append(prompt);

    this.scrollToBottom(screen);

    return prompt;
  },

  async appendOutputLine({ output, history, screen, executionId }) {
    if (!this.isExecutionActive(executionId)) {
      return;
    }

    const line = this.createOutputLine(output);

    history.append(line);

    this.scrollToBottom(screen);

    await this.wait(output.delay ?? this.outputDelay);
  },

  createOutputLine(output) {
    const type = output.type ?? "default";

    return this.createLine({
      className: `
        love-terminal__line
        love-terminal__line--${type}
      `,
      text: output.text ?? "",
    });
  },

  createLine({ className, text }) {
    const line = document.createElement("div");

    line.className = className.trim();
    line.textContent = text;

    return line;
  },

  async typeText({ element, text, executionId, screen }) {
    element.textContent = "";

    for (const character of text) {
      if (!this.isExecutionActive(executionId)) {
        return;
      }

      element.textContent += character;

      this.scrollToBottom(screen);

      const variation = Math.floor(Math.random() * 26) - 13;

      await this.wait(Math.max(20, this.typingSpeed + variation));
    }
  },

  scrollToBottom(screen) {
    screen.scrollTop = screen.scrollHeight;
  },

  wait(milliseconds) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, milliseconds);
    });
  },
};
