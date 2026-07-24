const MemoryRepository = {
  memories: {
    manual: {
      type: "character-sheet",
      eyebrow: "Arquivo confidencial",
      title: "Manual da Mariana",
      description: `
                Após um período avançado de observação, foi possível
                registrar algumas características dessa criatura rara,
                caótica e extremamente carismática.
            `,
      attributes: [
        {
          icon: "🎭",
          label: "Classe",
          value: "Caótica Boa",
        },
        {
          icon: "❤️",
          label: "HP",
          value: "100 / 100",
        },
        {
          icon: "✨",
          label: "Mana",
          value: "Infinita",
        },
        {
          icon: "🐈",
          label: "Afinidade",
          value: "Gatos",
        },
        {
          icon: "🥺",
          label: "Fraqueza",
          value: "Filhotes",
        },
        {
          icon: "🎲",
          label: "Previsibilidade",
          value: "Não disponível",
        },
        {
          icon: "😂",
          label: "Habilidade especial",
          value: "Fazer qualquer situação virar piada",
        },
        {
          icon: "💜",
          label: "Drop raro",
          value: "Sorrisos sinceros",
        },
      ],
      note: `
                <strong>Aviso importante:</strong>
                não existe documentação capaz de prever completamente
                o funcionamento da Mariana. Novos comportamentos podem
                surgir sem aviso prévio e geralmente tornam a experiência
                ainda melhor.
            `,
    },

    bugs: {
      type: "placeholder",
      eyebrow: "Relatório de qualidade",
      title: "Bugs conhecidos",
      description: `
                Alguns comportamentos inesperados já foram identificados.
                A equipe decidiu mantê-los porque fazem parte da experiência.
            `,
    },

    achievements: {
      type: "placeholder",
      eyebrow: "Progresso da jornada",
      title: "Conquistas desbloqueadas",
      description: `
                O histórico de conquistas está sendo sincronizado
                com os servidores do universo.
            `,
    },

    missions: {
      type: "placeholder",
      eyebrow: "Próximos objetivos",
      title: "Missões futuras",
      description: `
                Existem aventuras aguardando autorização,
                planejamento e algumas decisões questionáveis.
            `,
    },

    terminal: {
      type: "placeholder",
      eyebrow: "Sistema operacional",
      title: "Terminal do amor",
      description: `
                Sistema inicializado. Aguardando comandos...
            `,
    },

    message: {
      type: "placeholder",
      eyebrow: "Transmissão particular",
      title: "Para você",
      description: `
                Algumas mensagens precisam esperar o momento certo
                para serem reveladas.
            `,
    },
  },

  get(memoryId) {
    return this.memories[memoryId] ?? null;
  },

  exists(memoryId) {
    return Object.hasOwn(this.memories, memoryId);
  },
};
