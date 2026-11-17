/* Renderiza o portfólio a partir de dados.js. Não precisa editar este arquivo. */
(function () {
  "use strict";
  var D = window.PORTFOLIO;
  var pendentes = 0;

  /* ------------------------------------------------------------ utilitários */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Texto com suporte ao marcador [PREENCHER]
  function t(s) {
    s = String(s == null ? "" : s);
    if (s.indexOf("[PREENCHER]") === 0) {
      pendentes++;
      return '<span class="ph">' + esc(s.replace("[PREENCHER]", "").trim() || "preencher") + "</span>";
    }
    return esc(s);
  }
  function data(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
    return m ? m[3] + "/" + m[2] + "/" + m[1] : s ? esc(s) : '<span class="muted">—</span>';
  }
  function url(s) { return /^(https?:\/\/|assets\/|\.\/)/.test(s || "") ? s : ""; }

  var I = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9.5a.5.5 0 0 0 .5.5H10v-5h4v5h4.5a.5.5 0 0 0 .5-.5V10"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    tasks: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3.5 6 1.2 1.2L6.8 5M3.5 12l1.2 1.2L6.8 11M3.5 18l1.2 1.2L6.8 17"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    photo: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m21 16-5-5-9 9"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="m10 8.5 5 3.5-5 3.5z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    warn: '<path d="M12 4 2.5 20h19z"/><path d="M12 10v4.5M12 17.5h.01"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    ext: '<path d="M14 4h6v6M20 4 10 14"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    down: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
    chev: '<path d="m9 6 6 6-6 6"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  };
  function ic(name, cls) {
    return '<svg class="ic ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + I[name] + "</svg>";
  }
  function btn(label, href, opts) {
    opts = opts || {};
    var cls = "btn " + (opts.cls || "btn-outline");
    var icon = opts.icon ? ic(opts.icon) : "";
    if (!url(href)) return '<span class="' + cls + ' is-disabled" aria-disabled="true">' + icon + esc(label) + "</span>";
    return '<a class="' + cls + '" href="' + esc(href) + '" target="_blank" rel="noopener">' + icon + esc(label) + "</a>";
  }
  function badge(label, color) { return '<span class="badge badge-' + color + '">' + esc(label) + "</span>"; }

  var STATUS = {
    concluido: ["Concluído", "success"],
    andamento: ["Em andamento", "primary"],
    previsto: ["Previsto", "gray"],
    replanejado: ["Replanejado", "warning"],
  };
  function statusBadge(s) { var x = STATUS[s] || STATUS.previsto; return badge(x[0], x[1]); }

  function section(id, icon, titulo, desc, corpo, extra) {
    return (
      '<section class="card section" id="' + id + '" data-title="' + esc(titulo) + '">' +
      '<header class="sec-head"><span class="sec-ic">' + ic(icon) + "</span>" +
      '<div class="sec-txt"><h2>' + esc(titulo) + "</h2>" + (desc ? "<p>" + desc + "</p>" : "") + "</div>" +
      (extra ? '<div class="sec-extra">' + extra + "</div>" : "") +
      "</header>" +
      '<div class="sec-body">' + corpo + "</div></section>"
    );
  }
  function empty(icon, titulo, texto) {
    return '<div class="empty">' + ic(icon) + "<h3>" + esc(titulo) + "</h3><p>" + esc(texto) + "</p></div>";
  }

  /* ----------------------------------------------------------------- seções */
  var P = D.projeto, S = D.sobre, A = D.aluno;
  var ucs = D.casosDeUso || [];
  var concl = ucs.filter(function (u) { return u.status === "concluido"; }).length;
  var pct = ucs.length ? Math.round((concl / ucs.length) * 100) : 0;
  var diagramas = (D.documentacao || []).length;
  var telas = (D.telas || []).length;

  function secInicio() {
    var tags = (P.etiquetas || []).map(function (e) { return '<span class="hero-tag">' + esc(e) + "</span>"; }).join("");
    var hero =
      '<section class="hero" id="inicio" data-title="Início">' +
      '<div class="hero-tags">' + tags + "</div>" +
      "<h1>" + esc(P.nome) + "</h1>" +
      '<p class="hero-sub">' + esc(P.titulo) + "</p>" +
      '<div class="hero-grid">' +
      '<div><h3>Objetivo do sistema</h3><p>' + t(P.objetivo) + "</p></div>" +
      '<div><h3>Sobre o projeto</h3><p>' + t(P.descricao) + "</p></div>" +
      "</div>" +
      '<div class="hero-actions">' +
      '<a class="btn btn-white" href="#casos-de-uso">' + ic("tasks") + "Casos de uso</a>" +
      '<a class="btn btn-ghost" href="#telas-video">' + ic("play") + "Ver demonstração</a>" +
      '<a class="btn btn-ghost" href="#relatorio">' + ic("doc") + "Relatório de estágio</a>" +
      "</div></section>";

    function stat(icon, label, valor, desc, extra) {
      return '<div class="card stat"><div class="stat-label">' + ic(icon) + "<span>" + label + '</span></div><div class="stat-value">' + valor + "</div>" +
        '<div class="stat-desc">' + desc + "</div>" + (extra || "") + "</div>";
    }
    var bar = '<div class="progress" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"><span style="width:' + pct + '%"></span></div>';
    var stats =
      '<div class="stats">' +
      stat("tasks", "Casos de uso", ucs.length, concl + " concluído" + (concl === 1 ? "" : "s")) +
      stat("check", "Progresso", pct + "%", "dos casos de uso implementados", bar) +
      stat("layers", "Diagramas", diagramas, "documentos de modelagem") +
      stat("photo", "Telas", telas, "evidências de funcionamento") +
      "</div>";
    return hero + stats;
  }

  function secSobre() {
    var tec = (S.tecnologias || []).map(function (g) {
      return '<div class="tech-col"><h4>' + esc(g.categoria) + "</h4><div class=\"chips\">" +
        g.itens.map(function (i) { return '<span class="chip">' + t(i) + "</span>"; }).join("") + "</div></div>";
    }).join("");
    var cam = (S.arquitetura.camadas || []).map(function (c, i, arr) {
      return '<div class="arch-node"><strong>' + esc(c.nome) + "</strong><span>" + t(c.detalhe) + "</span></div>" +
        (i < arr.length - 1 ? '<div class="arch-arrow" aria-hidden="true">' + ic("chev") + "</div>" : "");
    }).join("");
    var corpo =
      '<div class="block"><h3>Problema que o sistema busca resolver</h3><p>' + t(S.problema) + "</p></div>" +
      '<div class="block"><h3>Tecnologias utilizadas</h3><div class="tech-grid">' + tec + "</div></div>" +
      '<div class="block"><h3>Arquitetura / descrição da solução</h3><p>' + t(S.arquitetura.descricao) + '</p><div class="arch">' + cam + "</div></div>";
    return section("sobre", "info", "Sobre o projeto", "Problema, tecnologias e visão geral da solução.", corpo);
  }

  function secCasos() {
    var linhas = ucs.map(function (u) {
      return "<tr><td><span class=\"mono\">" + esc(u.id) + "</span></td><td class=\"strong\">" + t(u.nome) + "</td><td>" + t(u.descricao) + "</td></tr>";
    }).join("");
    var tabela = '<div class="table-wrap"><table class="table"><thead><tr><th>Código</th><th>Caso de uso</th><th>Descrição</th></tr></thead><tbody>' + linhas + "</tbody></table></div>";
    return section("casos-de-uso", "tasks", "Casos de uso", "Todos os casos de uso previstos para o sistema.", tabela,
      badge(ucs.length + " previsto" + (ucs.length === 1 ? "" : "s"), "primary"));
  }

  function secCronograma() {
    var linhas = ucs.map(function (u) {
      return "<tr><td><span class=\"mono\">" + esc(u.id) + "</span></td><td class=\"strong\">" + t(u.nome) + "</td><td>" + data(u.inicio) + "</td><td>" + data(u.conclusao) + "</td><td>" + statusBadge(u.status) + "</td></tr>";
    }).join("");
    var tabela =
      '<div class="table-wrap"><table class="table"><thead><tr><th>Código</th><th>Caso de uso</th><th>Início</th><th>Conclusão / previsão</th><th>Situação</th></tr></thead><tbody>' + linhas + "</tbody></table></div>" +
      (D.cronogramaNota ? '<p class="note">' + ic("info") + esc(D.cronogramaNota) + "</p>" : "");
    return section("cronograma", "calendar", "Cronograma de desenvolvimento", "Datas de conclusão ou previsão de implementação de cada caso de uso.", tabela,
      badge(pct + "% concluído", pct === 100 ? "success" : "primary"));
  }

  function secDoc() {
    var linhas = (D.documentacao || []).map(function (d) {
      var previa = /\.(png|jpe?g|gif|webp|svg)$/i.test(d.url || "") && url(d.url)
        ? '<button class="doc-thumb" data-lb data-src="' + esc(d.url) + '" data-cap="' + esc(d.titulo) + '" aria-label="Ampliar: ' + esc(d.titulo) + '"><img src="' + esc(d.url) + '" alt="" loading="lazy"></button>'
        : '<span class="muted">—</span>';
      return "<tr><td>" + previa + "</td><td>" + badge(d.tipo, "primary") + '</td><td class="strong">' + t(d.titulo) + '</td><td class="right">' +
        (url(d.url) ? btn("Abrir", d.url, { icon: "ext", cls: "btn-outline btn-sm" }) : badge("Link pendente", "gray")) + "</td></tr>";
    }).join("");
    var corpo =
      '<div class="table-wrap"><table class="table"><thead><tr><th>Prévia</th><th>Tipo</th><th>Diagrama</th><th class="right">Acesso</th></tr></thead><tbody>' + linhas + "</tbody></table></div>" +
      '<p class="note">' + ic("info") + "Todos os links abrem sem necessidade de solicitar permissão de acesso.</p>";
    return section("documentacao", "layers", "Documentação", "Diagramas de classes, sequência, estados e demais artefatos de modelagem.", corpo,
      badge(diagramas + " documento" + (diagramas === 1 ? "" : "s"), "primary"));
  }

  function secRequisitos() {
    var R = D.requisitos || {};
    function tabela(lista, coluna) {
      var linhas = (lista || []).map(function (d) {
        return '<tr><td class="strong">' + t(d.titulo) + "</td><td>" + t(d.descricao) + '</td><td class="right">' +
          (url(d.url) ? btn("Abrir", d.url, { icon: "ext", cls: "btn-outline btn-sm" }) : badge("Em breve", "gray")) + "</td></tr>";
      }).join("");
      return '<div class="table-wrap"><table class="table"><thead><tr><th>' + coluna + '</th><th>Descrição</th><th class="right">Acesso</th></tr></thead><tbody>' + linhas + "</tbody></table></div>";
    }
    var corpo =
      '<div class="block"><h3>Documentos de requisitos</h3>' + tabela(R.documentos, "Documento") + "</div>" +
      '<div class="block"><h3>Especificações de caso de uso</h3>' + tabela(R.especificacoes, "Caso de uso") + "</div>";
    var total = (R.documentos || []).length + (R.especificacoes || []).length;
    return section("requisitos", "doc", "Artefatos de requisitos", "Documentos de requisitos e especificações de caso de uso do projeto.", corpo,
      badge(total + " documento" + (total === 1 ? "" : "s"), "primary"));
  }

  function secTelasVideo() {
    var cards = (D.telas || []).map(function (s, i) {
      var img = url(s.src)
        ? '<button class="shot-btn" data-lb data-src="' + esc(s.src) + '" data-cap="' + esc(s.titulo + " — " + s.descricao) + '" aria-label="Ampliar: ' + esc(s.titulo) + '"><img src="' + esc(s.src) + '" alt="' + esc(s.titulo) + '" loading="lazy"></button>'
        : '<div class="shot-empty">' + ic("photo") + "<span>Adicione a imagem em assets/</span></div>";
      return '<figure class="shot">' + img + "<figcaption><strong>" + t(s.titulo) + "</strong><span>" + t(s.descricao) + "</span></figcaption></figure>";
    }).join("");

    var V = D.video || {};
    var player = url(V.embed)
      ? '<div class="video"><iframe src="' + esc(V.embed) + '" title="' + esc(V.titulo) + '" allowfullscreen loading="lazy" allow="autoplay; fullscreen; picture-in-picture"></iframe></div>'
      : empty("play", "Vídeo ainda não adicionado", "Informe o link de embed em dados.js (video.embed).");

    var corpo =
      '<div class="block"><h3>Vídeo de demonstração</h3><p class="muted-p">' + esc(V.titulo || "") + (V.duracao ? " · " + esc(V.duracao) : "") + "</p>" + player +
      '<div class="actions">' + btn("Abrir vídeo em nova aba", V.link, { icon: "ext" }) + "</div></div>" +
      '<div class="block"><h3>Capturas de tela</h3><div class="shots">' + cards + "</div></div>";
    return section("telas-video", "photo", "Telas e vídeo", "Evidências do funcionamento: principais funcionalidades em prints e em vídeo.", corpo);
  }

  function secRelatorio() {
    var R = D.relatorio || {};
    var viewer = url(R.embed)
      ? '<div class="pdf"><iframe src="' + esc(R.embed) + '" title="Relatório de Estágio (PDF)" loading="lazy"></iframe></div>'
      : empty("doc", "Relatório ainda não adicionado", "Informe o link do PDF em dados.js (relatorio.url).");
    var corpo =
      '<div class="actions top">' + btn("Abrir PDF", R.url, { icon: "ext", cls: "btn-primary" }) + btn("Baixar", R.url, { icon: "down" }) + "</div>" + viewer;
    var extra = R.atualizadoEm ? badge("Atualizado em " + data(R.atualizadoEm).replace(/<[^>]+>/g, ""), "success") : "";
    return section("relatorio", "doc", "Relatório de estágio", "Relatório atualizado com as atividades desenvolvidas até a data de entrega.", corpo, extra);
  }

  function secAluno() {
    function row(k, v) { return '<div class="kv"><dt>' + k + "</dt><dd>" + v + "</dd></div>"; }
    var corpo =
      '<dl class="infolist">' +
      row("Alunos", t(A.nome)) +
      row("Matrícula", t(A.matricula)) +
      row("Professor orientador", t(A.orientador)) +
      row("Instituição", t(A.instituicao)) +
      row("Projeto", t(P.nome)) +
      "</dl>";
    return section("aluno", "user", "Identificação dos alunos", "", corpo);
  }

  /* ---------------------------------------------------------------- montagem */
  var html = secInicio() + secSobre() + secCasos() + secCronograma() + secDoc() + secRequisitos() + secTelasVideo() + secRelatorio() + secAluno();

  // Aviso de campos pendentes (some sozinho quando tudo estiver preenchido)
  var alerta = "";
  if (pendentes > 0) {
    alerta = '<div class="alert" role="status">' + ic("warn") +
      "<div><strong>" + pendentes + " campo" + (pendentes === 1 ? "" : "s") + " ainda por preencher.</strong> " +
      "Os trechos em amarelo vêm de <code>dados.js</code>. Este aviso desaparece quando todos forem preenchidos.</div></div>";
  }
  document.getElementById("content").innerHTML = alerta + html;

  /* Menu lateral (grupos estilo Filament) */
  var grupos = [
    { nome: "Projeto", itens: [["inicio", "home", "Início"], ["sobre", "info", "Sobre o projeto"]] },
    { nome: "Desenvolvimento", itens: [["casos-de-uso", "tasks", "Casos de uso"], ["cronograma", "calendar", "Cronograma"], ["documentacao", "layers", "Documentação"], ["requisitos", "doc", "Artefatos de requisitos"]] },
    { nome: "Evidências", itens: [["telas-video", "photo", "Telas e vídeo"], ["relatorio", "doc", "Relatório de estágio"]] },
    { nome: "Alunos", itens: [["aluno", "user", "Alunos"]] },
  ];
  document.getElementById("nav").innerHTML = grupos.map(function (g) {
    return '<div class="nav-group"><div class="nav-label">' + g.nome + "</div>" +
      g.itens.map(function (i) { return '<a class="nav-item" href="#' + i[0] + '" data-id="' + i[0] + '" title="' + i[2] + '">' + ic(i[1]) + "<span>" + i[2] + "</span></a>"; }).join("") + "</div>";
  }).join("");

  document.getElementById("footer").innerHTML = esc(P.nome) + " · " + esc(P.titulo) + " · " + esc(A.nome) + "" + " · " + esc(A.ano || "");

  /* Ícones dos botões fixos */
  var $ = function (id) { return document.getElementById(id); };
  $("menuBtn").innerHTML = ic("menu");
  $("lbClose").innerHTML = ic("close");
  document.querySelector(".crumbs .sep").innerHTML = ic("chev");

  /* --------------------------------------------------------------- interação */
  var root = document.documentElement;
  function setThemeIcon() { $("themeBtn").innerHTML = ic(root.classList.contains("dark") ? "sun" : "moon"); }
  setThemeIcon();
  $("themeBtn").addEventListener("click", function () {
    root.classList.toggle("dark");
    try { localStorage.setItem("tema", root.classList.contains("dark") ? "dark" : "light"); } catch (e) {}
    setThemeIcon();
  });

  function fechaMenu() { document.body.classList.remove("menu-open"); }
  // Desktop: recolhe a barra lateral (só ícones). Celular/tablet: abre e fecha o menu.
  var desktop = window.matchMedia("(min-width: 1024px)");
  function rotuloMenu() {
    var recolhido = root.classList.contains("sb-collapsed");
    $("menuBtn").setAttribute("aria-label", desktop.matches ? (recolhido ? "Expandir menu" : "Recolher menu") : "Abrir menu");
    $("menuBtn").setAttribute("aria-expanded", desktop.matches ? String(!recolhido) : String(document.body.classList.contains("menu-open")));
  }
  $("menuBtn").addEventListener("click", function () {
    if (desktop.matches) {
      root.classList.toggle("sb-collapsed");
      try { localStorage.setItem("menu", root.classList.contains("sb-collapsed") ? "recolhido" : "expandido"); } catch (e) {}
    } else {
      document.body.classList.toggle("menu-open");
    }
    rotuloMenu();
  });
  desktop.addEventListener("change", function () { fechaMenu(); rotuloMenu(); });
  rotuloMenu();
  $("overlay").addEventListener("click", fechaMenu);
  $("nav").addEventListener("click", function (e) { if (e.target.closest("a")) fechaMenu(); });

  // Scrollspy: destaca o item do menu da seção visível
  var itens = {};
  [].forEach.call(document.querySelectorAll(".nav-item"), function (a) { itens[a.dataset.id] = a; });
  var secs = [].slice.call(document.querySelectorAll("[data-title]"));
  function ativa() {
    var y = window.scrollY + 140, atual = secs[0];
    secs.forEach(function (s) { if (s.offsetTop <= y) atual = s; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) atual = secs[secs.length - 1];
    Object.keys(itens).forEach(function (k) { itens[k].classList.toggle("active", k === atual.id); });
    // cronograma e casos de uso compartilham o mesmo contexto no menu
    $("crumbAtual").textContent = atual.dataset.title;
  }
  window.addEventListener("scroll", ativa, { passive: true });
  window.addEventListener("resize", ativa);
  ativa();

  // Lightbox das capturas de tela
  var lb = $("lightbox");
  function fechaLb() { lb.classList.remove("open"); }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lb]");
    if (b) {
      $("lbImg").src = b.dataset.src;
      $("lbImg").alt = b.dataset.cap;
      $("lbCap").textContent = b.dataset.cap;
      lb.classList.add("open");
    } else if (e.target === lb || e.target.closest("#lbClose")) fechaLb();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { fechaLb(); fechaMenu(); } });
})();
