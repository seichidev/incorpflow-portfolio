/* ==========================================================================
   DADOS DO PORTFÓLIO — IncorpFlow
   --------------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para atualizar o site.

   • Tudo que começa com "[PREENCHER]" aparece destacado em amarelo no site
     e é contado no aviso do topo. Quando você trocar todos os textos, o
     aviso some sozinho.
   • Links (diagramas, vídeo, relatório) precisam estar PÚBLICOS
     ("qualquer pessoa com o link"), sem pedir permissão ao professor.
   • Datas no formato AAAA-MM-DD (ex.: 2026-11-30).
   • status: "concluido" | "andamento" | "previsto" | "replanejado"
   ========================================================================== */

window.PORTFOLIO = {

  /* ---------------------------------------------------------------- 1. INÍCIO */
  projeto: {
    nome: "IncorpFlow",
    titulo: "Portfólio do Projeto de Estágio",
    objetivo:
      "Sistema web para gerenciar e acompanhar os dados e documentos da incorporação imobiliária, centralizando as informações de construções, pavimentos e unidades autônomas conforme a ABNT NBR 12.721. Voltado a engenheiros e profissionais responsáveis pelo memorial de incorporação.",
    descricao:
      "Projeto do estágio de Ciência da Computação (UniFil). Já estão implementados o gerenciamento de construções, pavimentos, equipamentos, acabamentos e unidades autônomas, com inativação e reativação dos registros. Falta o gerenciamento de usuários e permissões, e está prevista a avaliação de um caso de uso de conta para o engenheiro.",
    // Textos curtos exibidos como etiquetas no topo do portfólio
    etiquetas: ["Projeto de Estágio", "UniFil"],
  },

  /* ---------------------------------------------------------------- 2. SOBRE */
  sobre: {
    problema:
      "A incorporação imobiliária exige muitos documentos e dados, regulados pela Lei nº 4.591/1964, pelo Código Civil e pela ABNT NBR 12.721. Hoje essas informações costumam ser mantidas de forma manual e fragmentada, em planilhas. Isso favorece inconsistências cadastrais, retrabalho a cada atualização e atrasos no registro do empreendimento.",

    // categoria: agrupa as tecnologias em colunas
    tecnologias: [
      { categoria: "Interface", itens: ["FilamentPHP", "Livewire"] },
      { categoria: "Back-end", itens: ["PHP", "Laravel"] },
      { categoria: "Dados e ferramentas", itens: ["PostgreSQL", "Composer", "Git e GitHub", "Visual Studio Code"] },
    ],

    arquitetura: {
      descricao:
        "Aplicação web em Laravel (padrão MVC). O FilamentPHP monta o painel administrativo, com formulários e tabelas, e acessa os dados pelos models do Laravel, que gravam no PostgreSQL.",
      // Blocos exibidos em ordem, da esquerda para a direita (ou de cima para baixo no celular)
      camadas: [
        { nome: "Interface", detalhe: "Painel Filament: telas, formulários e tabelas" },
        { nome: "Aplicação", detalhe: "Laravel: models, validações e regras de negócio" },
        { nome: "Dados", detalhe: "Banco PostgreSQL" },
      ],
    },
  },

  /* ------------------------------------- 3. CASOS DE USO E CRONOGRAMA */
  // Liste TODOS os casos de uso previstos. A mesma lista alimenta a tabela
  // de casos de uso e a tabela de cronograma.
  // "inicio" e "conclusao" = data real de conclusão OU previsão de implementação.
  // Se o planejamento mudar, atualize aqui e use status "replanejado".
  casosDeUso: [
    { id: "UC01", nome: "Gerenciar Construções", descricao: "O engenheiro cria, exibe, edita, inativa e reativa construções, com as informações estruturais do empreendimento.", inicio: "", conclusao: "", status: "concluido" },
    { id: "UC02", nome: "Gerenciar Pavimentos", descricao: "O engenheiro cadastra e mantém os pavimentos de uma construção (inferiores, térreo, superiores, entre outros).", inicio: "", conclusao: "", status: "concluido" },
    { id: "UC03", nome: "Gerenciar Equipamentos", descricao: "O engenheiro cadastra e mantém os equipamentos de uma construção.", inicio: "", conclusao: "", status: "concluido" },
    { id: "UC04", nome: "Gerenciar Acabamentos", descricao: "O engenheiro cadastra e mantém os acabamentos, vinculados a uma construção ou a uma unidade autônoma, por escopo e dependência.", inicio: "", conclusao: "", status: "concluido" },
    { id: "UC05", nome: "Gerenciar Unidades Autônomas", descricao: "O engenheiro cadastra e mantém as unidades autônomas de cada pavimento, com suas áreas (privativa, comum e equivalente).", inicio: "", conclusao: "", status: "concluido" },
    { id: "UC06", nome: "Gerenciar Usuários", descricao: "O administrador cadastra e mantém os usuários do sistema e seus acessos.", inicio: "", conclusao: "", status: "previsto" },
    { id: "UC07", nome: "Gerenciar Conta", descricao: "Caso de uso em avaliação: o engenheiro consulta e atualiza os dados da própria conta. Ainda não consta no diagrama de casos de uso.", inicio: "", conclusao: "", status: "previsto" },
  ],
  cronogramaNota:
    "Cronograma atualizado conforme o andamento real do estágio. Alterações em relação ao planejamento inicial estão sinalizadas como “Replanejado”.",

  /* ------------------------------------------------------ 4. DOCUMENTAÇÃO */
  // url vazio = botão desabilitado com a etiqueta "Link pendente".
  documentacao: [
    { tipo: "Casos de Uso", titulo: "Diagrama de Casos de Uso — IncorpFlow", url: "assets/caso-de-uso.png" },
    { tipo: "Diagrama de Classes", titulo: "Diagrama de Classes — IncorpFlow", url: "assets/classes.png" },
    { tipo: "DER", titulo: "Diagrama Entidade-Relacionamento (lógico)", url: "assets/der.png" },
    { tipo: "Workflow", titulo: "Workflow (As-Is) em BPMN", url: "assets/workflow.png" },
    { tipo: "Implantação", titulo: "Diagrama de Implantação — IncorpFlow", url: "assets/implantacao.png" },
    // Diagramas de sequência: um por ação de cada caso de uso (arquivos em assets/sequencia/)
    ...[
      ["construcao", "Construção", ["criar", "exibir", "editar", "inativar"]],
      ["pavimento", "Pavimento", ["criar", "exibir", "editar", "inativar"]],
      ["equipamento", "Equipamento", ["criar", "exibir", "editar", "inativar", "reativar"]],
      ["acabamento", "Acabamento", ["criar", "exibir", "editar", "inativar", "reativar"]],
      ["unidade", "Unidade Autônoma", ["criar", "exibir", "editar", "inativar", "reativar"]],
    ].flatMap(function (g) {
      return g[2].map(function (a) {
        return { tipo: "Diagrama de Sequência", titulo: a.charAt(0).toUpperCase() + a.slice(1) + " " + g[1], url: "assets/sequencia/" + g[0] + "-" + a + ".png" };
      });
    }),
  ],

  /* ------------------------------------------ ARTEFATOS DE REQUISITOS */
  // url vazio = etiqueta "Em breve". Arquivos em assets/requisitos/.
  requisitos: {
    documentos: [
      { titulo: "Pedido do Investidor", descricao: "Visão dos interessados: dores, necessidades e a solução esperada.", url: "assets/requisitos/pedido-do-investidor.pdf" },
      { titulo: "Documento de Visão", descricao: "Conceito inicial do sistema, problemas, afetados e soluções.", url: "assets/requisitos/documento-de-visao.pdf" },
      { titulo: "Especificação Suplementar", descricao: "Restrições, padrões operacionais e requisitos adicionais do sistema.", url: "assets/requisitos/especificacao-suplementar.pdf" },
      { titulo: "Glossário", descricao: "Termos do domínio da incorporação imobiliária e do desenvolvimento de software.", url: "assets/requisitos/glossario.pdf" },
    ],
    especificacoes: [
      { titulo: "Gerenciar Construções", descricao: "Especificação do caso de uso UC01.", url: "assets/requisitos/especificacao-construcoes.pdf" },
      { titulo: "Gerenciar Pavimentos", descricao: "Especificação do caso de uso UC02.", url: "assets/requisitos/especificacao-pavimentos.pdf" },
      { titulo: "Gerenciar Equipamentos", descricao: "Especificação do caso de uso UC03.", url: "assets/requisitos/especificacao-equipamentos.pdf" },
      { titulo: "Gerenciar Acabamentos", descricao: "Especificação do caso de uso UC04.", url: "assets/requisitos/especificacao-acabamentos.pdf" },
      { titulo: "Gerenciar Unidades Autônomas", descricao: "Especificação do caso de uso UC05.", url: "assets/requisitos/especificacao-unidades-autonomas.pdf" },
    ],
  },

  /* ----------------------------------------------------- 5. TELAS / VÍDEO */
  // src: caminho da imagem na pasta assets/ (ex.: "assets/login.png")
  telas: [
    { titulo: "Login", descricao: "Autenticação de acesso ao sistema.", src: "assets/telas/login.png" },
    { titulo: "Gerenciar Construções", descricao: "Listagem de construções, com busca, filtros e criação.", src: "assets/telas/construcoes.png" },
    { titulo: "Editar Construção", descricao: "Formulário de edição, com a ação de inativar. As demais telas de edição seguem o mesmo padrão.", src: "assets/telas/construcao-editar.png" },
    { titulo: "Gerenciar Pavimentos", descricao: "Listagem de pavimentos por construção.", src: "assets/telas/pavimentos.png" },
    { titulo: "Gerenciar Unidades Autônomas", descricao: "Listagem de unidades, com áreas e quantidade de unidades idênticas.", src: "assets/telas/unidades-autonomas.png" },
    { titulo: "Gerenciar Equipamentos", descricao: "Listagem de equipamentos de cada construção.", src: "assets/telas/equipamentos.png" },
    { titulo: "Gerenciar Acabamentos", descricao: "Listagem de acabamentos por escopo e dependência.", src: "assets/telas/acabamentos.png" },
  ],
  video: {
    titulo: "Demonstração do sistema em funcionamento",
    duracao: "máx. 5 min",
    // URL de EMBED. YouTube: https://www.youtube.com/embed/ID_DO_VIDEO
    //               Drive:   https://drive.google.com/file/d/ID_DO_ARQUIVO/preview
    embed: "",
    // Link normal para abrir em outra aba (YouTube/Drive)
    link: "",
  },

  /* ------------------------------------------------ 6. RELATÓRIO DE ESTÁGIO */
  relatorio: {
    // Link público do PDF (Drive: .../view  ou  caminho local: "assets/relatorio.pdf")
    url: "assets/relatorio.pdf",
    // Para visualizar dentro da página. Drive: .../file/d/ID/preview — local: igual a url
    embed: "assets/relatorio.pdf",
    atualizadoEm: "2026-11-17",
  },

  /* -------------------------------------------- 7. IDENTIFICAÇÃO DO ALUNO */
  aluno: {
    nome: "Victor Kendi Goya e Gabriel Seichi Baptista",
    matricula: "242041002 (Victor Kendi Goya)",
    orientador: "Marcelo Yamamoto e Renata Porto Gransoti",
    instituicao: "UniFil",
    ano: "2026",
  },
};
