const Typing = {
    config: {
        element: null,
        button: null,

        messages: [
            "Existem encontros...",
            "que parecem escritos pelo universo.",
            "E, entre bilhões de estrelas,",
            "eu encontrei você."
        ],

        typingSpeed: 55,
        messagePause: 1400,
        fadeDuration: 400,
        initialDelay: 1000,

        currentMessage: 0,
        currentCharacter: 0
    },

    init() {
        this.config.element = document.getElementById("typing");
        this.config.button = document.getElementById("enterButton");

        if (!this.config.element) {
            console.error('Typing: elemento com id "typing" não encontrado.');
            return;
        }

        if (!this.config.button) {
            console.error('Typing: botão com id "enterButton" não encontrado.');
            return;
        }

        this.prepareElements();

        setTimeout(() => {
            this.start();
        }, this.config.initialDelay);
    },

    prepareElements() {
        this.config.element.textContent = "";
        this.config.element.classList.remove("typing-fade-out");

        this.config.button.classList.remove("enter-button-visible");
        this.config.button.disabled = true;
    },

    start() {
        this.config.currentMessage = 0;
        this.config.currentCharacter = 0;

        this.typeCharacter();
    },

    typeCharacter() {
        const {
            element,
            messages,
            currentMessage,
            currentCharacter,
            typingSpeed
        } = this.config;

        const message = messages[currentMessage];

        if (currentCharacter < message.length) {
            element.textContent += message.charAt(currentCharacter);

            this.config.currentCharacter++;

            setTimeout(() => {
                this.typeCharacter();
            }, typingSpeed);

            return;
        }

        this.handleCompletedMessage();
    },

    handleCompletedMessage() {
        const isLastMessage =
            this.config.currentMessage === this.config.messages.length - 1;

        if (isLastMessage) {
            this.finish();
            return;
        }

        setTimeout(() => {
            this.fadeCurrentMessage();
        }, this.config.messagePause);
    },

    fadeCurrentMessage() {
        this.config.element.classList.add("typing-fade-out");

        setTimeout(() => {
            this.nextMessage();
        }, this.config.fadeDuration);
    },

    nextMessage() {
        this.config.currentMessage++;
        this.config.currentCharacter = 0;

        this.config.element.textContent = "";
        this.config.element.classList.remove("typing-fade-out");

        this.typeCharacter();
    },

    finish() {
        setTimeout(() => {
            this.config.button.disabled = false;
            this.config.button.classList.add("enter-button-visible");
        }, 700);
    }
};