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
      type: "issue-list",
      eyebrow: "Relatório de qualidade",
      title: "Bugs conhecidos",
      description: `
        Durante os testes, alguns comportamentos inesperados
        foram encontrados. A maioria foi classificada como
        parte essencial da experiência.
    `,
      issues: [
        {
          id: "BUG-001",
          title: "Adota mentalmente qualquer filhote",
          description: `
                Ao encontrar um animal pequeno, o sistema
                pode iniciar imediatamente planos de adoção.
            `,
          status: "wont-fix",
          statusLabel: "Won't Fix",
          severity: "Crítica",
          icon: "🐈",
        },
        {
          id: "BUG-002",
          title: "Ri antes de terminar a própria piada",
          description: `
                A mensagem pode se tornar incompreensível
                porque a usuária começa a rir antes do final.
            `,
          status: "feature",
          statusLabel: "Feature",
          severity: "Alta",
          icon: "😂",
        },
        {
          id: "BUG-003",
          title: "Mudanças repentinas de assunto",
          description: `
                Conversas podem alterar completamente
                de direção sem qualquer aviso prévio.
            `,
          status: "investigating",
          statusLabel: "Investigando",
          severity: "Média",
          icon: "🧠",
        },
        {
          id: "BUG-004",
          title: "Excesso de carisma detectado",
          description: `
                Pode causar perda de concentração,
                sorrisos involuntários e apego crescente.
            `,
          status: "accepted",
          statusLabel: "Aceito",
          severity: "Irreversível",
          icon: "💜",
        },
      ],
      note: `
        Após análise técnica, a equipe concluiu que corrigir
        esses comportamentos reduziria significativamente
        a qualidade geral do sistema.
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
