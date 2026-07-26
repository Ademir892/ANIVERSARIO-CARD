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
      type: "achievement-list",
      eyebrow: "Progresso da jornada",
      title: "Conquistas desbloqueadas",
      description: `
    Algumas conquistas já foram registradas no sistema.
    Outras ainda aguardam os requisitos necessários
    para serem oficialmente desbloqueadas.
  `,
      progress: {
        unlocked: 4,
        total: 7,
      },
      achievements: [
        {
          id: "ACH-001",
          icon: "✨",
          title: "Primeiro contato",
          description: `
        Iniciar uma conversa que, sem aviso prévio,
        acabaria criando um novo universo.
      `,
          status: "unlocked",
          statusLabel: "Desbloqueada",
          date: "Conquista registrada",
          rarity: "Rara",
        },
        {
          id: "ACH-002",
          icon: "😂",
          title: "Risada sincronizada",
          description: `
        Rir juntos de alguma coisa que provavelmente
        não faria sentido para mais ninguém.
      `,
          status: "unlocked",
          statusLabel: "Desbloqueada",
          date: "Conquista registrada",
          rarity: "Incomum",
        },
        {
          id: "ACH-003",
          icon: "🎬",
          title: "Sessão compartilhada",
          description: `
        Assistir a algo juntos sem que gatos,
        comentários ou distrações dominem completamente a missão.
      `,
          status: "unlocked",
          statusLabel: "Desbloqueada",
          date: "Conquista registrada",
          rarity: "Épica",
        },
        {
          id: "ACH-004",
          icon: "💜",
          title: "Apego detectado",
          description: `
        Perceber que aquela pessoa começou a ocupar
        uma parte importante demais dos pensamentos.
      `,
          status: "unlocked",
          statusLabel: "Desbloqueada",
          date: "Conquista registrada",
          rarity: "Lendária",
        },
        {
          id: "ACH-005",
          icon: "🗺️",
          title: "Primeira viagem",
          description: `
        Explorar algum lugar novo juntos
        e voltar com histórias para contar.
      `,
          status: "locked",
          statusLabel: "Bloqueada",
          date: "Requisito pendente",
          rarity: "Épica",
        },
        {
          id: "ACH-006",
          icon: "📸",
          title: "Álbum de memórias",
          description: `
        Registrar momentos suficientes para criar
        uma coleção de lembranças compartilhadas.
      `,
          status: "locked",
          statusLabel: "Bloqueada",
          date: "Requisito pendente",
          rarity: "Rara",
        },
        {
          id: "ACH-007",
          icon: "❔",
          title: "Conquista secreta",
          description: `
        Os requisitos desta conquista permanecerão ocultos
        até que o universo considere o momento adequado.
      `,
          status: "secret",
          statusLabel: "Secreta",
          date: "Informação classificada",
          rarity: "Desconhecida",
        },
      ],
      note: `
    O progresso é atualizado automaticamente conforme
    novas memórias são criadas. Nenhuma conquista pode
    ser desbloqueada à força.
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
      type: "terminal",
      eyebrow: "Sistema operacional",
      title: "Terminal do Amor",
      version: "Universo Mariana Terminal v1.0.0",

      bootMessages: [
        {
          text: "Inicializando sistema...",
          type: "muted",
          delay: 450,
        },
        {
          text: "Carregando memórias compartilhadas...",
          type: "muted",
          delay: 550,
        },
        {
          text: "Verificando compatibilidade emocional...",
          type: "muted",
          delay: 550,
        },
        {
          text: "Compatibilidade confirmada.",
          type: "success",
          delay: 700,
        },
        {
          text: "Conexão estabelecida com Mariana.",
          type: "success",
          delay: 850,
        },
      ],

      commands: [
        {
          command: "whoami",
          output: [
            {
              text: "Ademir",
              type: "default",
            },
            {
              text: "Desenvolvedor, copiloto e explorador deste universo.",
              type: "muted",
            },
          ],
        },
        {
          command: "locate happiness",
          output: [
            {
              text: "Procurando...",
              type: "muted",
            },
            {
              text: "Correspondência encontrada:",
              type: "success",
            },
            {
              text: "/universo/mariana",
              type: "path",
            },
          ],
        },
        {
          command: "cat feelings.log",
          output: [
            {
              text: "[INFO] Conexão emocional estabelecida.",
              type: "info",
            },
            {
              text: "[INFO] Apego inesperado detectado.",
              type: "info",
            },
            {
              text: "[WARN] Nenhum mecanismo de rollback disponível.",
              type: "warning",
            },
          ],
        },
        {
          command: "git status",
          output: [
            {
              text: "On branch together",
              type: "default",
            },
            {
              text: "Your relationship is up to date.",
              type: "success",
            },
            {
              text: "nothing to commit, working tree happy",
              type: "muted",
            },
          ],
        },
        {
          command: "system status",
          output: [
            {
              text: "Love Engine: running",
              type: "success",
            },
            {
              text: "Memory Sync: active",
              type: "success",
            },
            {
              text: "Future Plans: loading",
              type: "warning",
            },
            {
              text: "Mariana Connection: stable",
              type: "success",
            },
          ],
        },
        {
          command: "exit",
          output: [
            {
              text: "Permission denied.",
              type: "error",
            },
            {
              text: "Você não pode sair deste universo.",
              type: "accent",
            },
          ],
        },
      ],

      finalMessage: {
        text: "Processo concluído. Conexão mantida.",
        type: "success",
      },
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
