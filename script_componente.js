function openMenu() {
  document.getElementById("menu_aba").style.display = "block";
}

function closeMenu() {
  document.getElementById("menu_aba").style.display = "none";
}

function temaLim() {
  document.documentElement.style.setProperty("--cor-click", "#38184C");
  document.documentElement.style.setProperty("--cor-sombra", "#9b0a59");
  document.documentElement.style.setProperty("--cor-text", "black");
  document.documentElement.style.setProperty("--cor-back1", "#CEF09D");
  document.documentElement.style.setProperty("--cor-back2", "#4f6a93");
  document.documentElement.style.setProperty(
    "--md-sys-color-primary",
    "#38184C"
  );
}

function temaInatel() {
  document.documentElement.style.setProperty("--cor-click", "#126ae2");
  document.documentElement.style.setProperty("--cor-sombra", "#0a599b");
  document.documentElement.style.setProperty("--cor-text", "black");
  document.documentElement.style.setProperty("--cor-back1", "#edf2f4");
  document.documentElement.style.setProperty("--cor-back2", "#6a937a");
  document.documentElement.style.setProperty(
    "--md-sys-color-primary",
    "#126ae2"
  );
}

function temaDark() {
  const cores = {
    "--cor-click": "#CEF09D",
    "--cor-sombra": "#9b0a59",
    "--cor-text": "black",
    "--cor-back1": "#38184C",
    "--cor-back2": "#4f6a93",
    "--md-sys-color-primary": "#CEF09D",
  };

  for (const [variavel, valor] of Object.entries(cores)) {
    document.documentElement.style.setProperty(variavel, valor);
  }
}

const eventos = [
  {
    id: 1,
    title: "Semana do Software 2025",
    date: "12/05",
    time: "10:00",
    location: "Salão de Eventos",
    type: "tech",
    description:
      "Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400",
  },
  {
    id: 2,
    title: "Workshop de IoT",
    date: "12/01",
    time: "08:00",
    location: "Laboratório CS&I",
    type: "tech",
    description:
      "Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400",
  },
  {
    id: 3,
    title: "Festa dos Alunos 2025",
    date: "18/05",
    time: "19:00",
    location: "Área Esportiva",
    type: "cultural",
    description:
      "Venha comemorar a melhor Festa dos Alunos de todos os tempos!",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400",
  },
  {
    id: 4,
    title: "Feira de Oportunidades",
    date: "04/05",
    time: "10:00",
    location: "Salão de Eventos",
    type: "academic",
    description:
      "Venha conhecer empresas e projetos com destaque na área da engenharia.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400",
  },
];

const carousel = document.querySelector(".carousel");

// Função para criar os cards
function createCards() {
  eventos.forEach((event) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p><span class="material-symbols-outlined icon">event</span> ${event.date} às ${event.time} <span class="material-symbols-outlined icon">pin_drop</span> ${event.location}</p>
            </div>
        `;
    carousel.appendChild(card);
  });
}

// Controle do carrossel
let index = 0;
function nextCard() {
  index = (index + 1) % eventos.length;
  updateCarousel();
}

function prevCard() {
  index = (index - 1 + eventos.length) % eventos.length;
  updateCarousel();
}

function updateCarousel() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Adicionando interatividade
document.getElementById("nextBtn").addEventListener("click", nextCard);
document.getElementById("prevBtn").addEventListener("click", prevCard);

// Auto avanço a cada 5 segundos
setInterval(nextCard, 5000);

// Arrastar no celular
let startX;
carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
carousel.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextCard();
  if (endX - startX > 50) prevCard();
});

// Inicializando
createCards();

// Componente Aulas ----------------------------------------------------------------------------------

class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Cria o Shadow DOM
    this.aulas = []; // Inicializa como um array vazio
    this.hoje = "ter"; // Dia atual
  }

  async connectedCallback() {
    // Carrega os dados do arquivo JSON
    const response = await fetch("aulas.json");
    this.aulas = await response.json();
    this.render(); // Renderiza o componente com os dados carregados
  }

  // Método para renderizar o conteúdo do componente
  render() {
    const aulasDia = this.aulas.filter((a) => a.data === this.hoje); // Filtra as aulas para o dia de hoje
    this.shadowRoot.innerHTML = `
      <style>
      .comp-aula {
        position: relative;
        background-color: white;
        top: 0px;
        left: 0px;
        rigth: 0px;
        padding: 15px;
        margin: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      }

      .titulo_aula {
        font-family: "Arimo", sans-serif;
        font-optical-sizing: auto;
        font-weight: bold;
        font-style: normal;
        font-size: 15px;
        color: var(--cor-text);
        padding-left: 5px;
        padding-right: 5px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      p {
        font-family: "Arimo", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        font-size: 11px;
        color: var(--cor-text);
        line-height: 1.5;
        orphans: 3;
        padding-left: 5px;
        padding-right: 5px
      }

      .lables {
        display: flex;
        /*justify-content: space-between;*/
      }

      .lable-prova {
        background-color: var(--prova);
        padding: 7px;
        padding-right: 15px;
        padding-left: 15px;
        margin-bottom: 10px;
        border-radius: 500px;
        text-align: center
      }

      .lable-frequencia {
        background-color: var(--frequencia);
        padding: 7px;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: 10px;
        border-radius: 500px;
      }

      .lable-nota {
        background-color: var(--prova);
        padding: 7px;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: 10px;
        border-radius: 500px;
      }

      .p_lable {
        font-family: "Arimo", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        font-size: 11px;
        color: white;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      </style>
      <link rel="stylesheet" href="styles_componente.css">
      <div>
        ${aulasDia
          .map((a) => {
            let provaDisplay = a.prova_alert ? "" : "display: none;";

            // Lógica para definir a cor da nota dinamicamente
            let notaCor;
            const notaValor = parseFloat(a.nota);
            if (notaValor < 6) {
              notaCor = "red";
            } else if (notaValor >= 6 && notaValor < 8) {
              notaCor = "orange";
            } else {
              notaCor = "green";
            }

            return `
            <div class="comp-aula">
              <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
              <div class="titulo_aula">${a.disciplina}</div>
              <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
              <div class="lables">
                <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                <div class="lable-nota p_lable" style="background-color: ${notaCor};">CR: <b>${a.nota}</b></div>
              </div>
            </div>
          `;
          })
          .join("")}
      </div>
    `;
  }
}

// Registrando o componente
customElements.define("aulas-component", AulasComponent);

// Funcionalidade da Seção Biblioteca ----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Seleciona os elementos da UI
  const btnReservarSalas = document.getElementById("btn-reservar-salas");
  const listaSalasContainer = document.getElementById("lista-salas-container");
  const listaSalas = document.getElementById("lista-salas");
  const modalConfirmacao = document.getElementById("confirmacaoModal");
  const closeButton = modalConfirmacao.querySelector(".close-button");
  const conteudoConfirmacao = document.getElementById("confirmacao-conteudo");

  // --- DADOS ---
  const buscaExternaContainer = document.getElementById(
    "busca-externa-container"
  );
  const minhasSolicitacoesContainer = document.getElementById(
    "minhas-solicitacoes-container"
  );
  const formBuscaExternaContainer = document.getElementById(
    "busca-externa-form-container"
  );

  const btnReservarLivros = document.getElementById("btn-reservar-livros");
  const listaLivrosContainer = document.getElementById(
    "lista-livros-container"
  );
  const listaLivros = document.getElementById("lista-livros");
  const inputBuscaLivro = document.getElementById("input-busca-livro");
  let livros = [
    { nome: "Cálculo Vol. 1", copiasDisponiveis: 3 },
    { nome: "Sistemas Digitais", copiasDisponiveis: 1 },
    { nome: "Engenharia de Software", copiasDisponiveis: 5 },
    { nome: "Redes de Computadores", copiasDisponiveis: 2 },
    { nome: "Inteligência Artificial", copiasDisponiveis: 0 },
    { nome: "O Senhor dos Anéis", copiasDisponiveis: 4 },
  ];

  let salas = [
    { nome: "Sala de Estudos 1", reservada: true },
    { nome: "Sala de Estudos 2", reservada: false },
    { nome: "Sala de Estudos 3", reservada: true },
    { nome: "Sala de Estudos 4", reservada: false },
    { nome: "Sala de Estudos 5", reservada: true },
    { nome: "Sala de Reunião A", reservada: false },
    { nome: "Sala de Reunião B", reservada: true },
    { nome: "Sala de Reunião C", reservada: false },
    { nome: "Sala de Reunião D", reservada: false },
    { nome: "Sala de Reunião E", reservada: false },
  ];

  let livrosReservadosPeloUsuario = [];

  // --- LÓGICA PARA SALAS ---
  // Função para gerar a lista de salas
  function renderizarSalas() {
    listaSalas.innerHTML = salas
      .map((sala) => {
        const classeReservada = sala.reservada ? 'class="reservada"' : "";
        const textoReservado = sala.reservada
          ? " <span>(Reservada)</span>"
          : "";
        return `<li data-sala-nome="${sala.nome}" ${classeReservada}>${sala.nome}${textoReservado}</li>`;
      })
      .join("");
  }

  // Evento para mostrar/esconder a lista de salas
  btnReservarSalas.addEventListener("click", () => {
    const isVisible = listaSalasContainer.style.display === "block";
    // Esconde todos os outros containers
    if (listaLivrosContainer) listaLivrosContainer.style.display = "none";
    if (minhasSolicitacoesContainer)
      minhasSolicitacoesContainer.style.display = "none";
    formBuscaExternaContainer.style.display = "none";
    // Mostra ou esconde o container de salas
    listaSalasContainer.style.display = isVisible ? "none" : "block";
  });

  // Evento de clique na lista de salas (usando delegação de evento)
  listaSalas.addEventListener("click", (e) => {
    const salaClicada = e.target;
    if (
      salaClicada.tagName === "LI" &&
      !salaClicada.classList.contains("reservada")
    ) {
      const nomeSala = salaClicada.dataset.salaNome;

      // Calcula horários
      const agora = new Date();
      const devolucao = new Date(agora.getTime() + 2 * 60 * 60 * 1000); // Adiciona 2 horas
      const formatarHora = (data) =>
        data.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

      // Monta o conteúdo do modal de confirmação
      conteudoConfirmacao.innerHTML = `
        <h2 class="titulo-secao">Confirmar Reserva</h2>
        <p class="font">Sala: <b>${nomeSala}</b></p>
        <p class="font">Data: <b>${agora.toLocaleDateString("pt-BR")}</b></p>
        <p class="font">Horário da Reserva: <b>${formatarHora(agora)}</b></p>
        <p class="font">Horário de Devolução: <b>${formatarHora(
          devolucao
        )}</b></p>
        <button id="btn-confirmar-reserva" class="btn-biblioteca" style="width: 100%; margin-top: 15px;">Confirmar</button>
      `;

      // Mostra o modal
      modalConfirmacao.style.display = "flex";

      // Adiciona evento ao botão de confirmar DENTRO do modal
      document.getElementById("btn-confirmar-reserva").addEventListener(
        "click",
        () => {
          // 1. Atualiza o estado da sala no array de dados
          const salaParaReservar = salas.find((s) => s.nome === nomeSala);
          if (salaParaReservar) salaParaReservar.reservada = true;

          // 2. Marca a sala como reservada na interface
          salaClicada.classList.add("reservada");
          salaClicada.innerHTML = `${nomeSala} <span>(Reservada)</span>`;

          // 2. Atualiza o conteúdo do modal para mostrar a mensagem de sucesso
          conteudoConfirmacao.innerHTML = `
            <h2 class="titulo-secao" style="text-align: center;">Sucesso!</h2>
            <p class="font" style="text-align: center; font-size: 14px; line-height: 1.5;">
              A sala "<b>${nomeSala}</b>" foi reservada com sucesso.
            </p>
            <button id="btn-fechar-sucesso" class="btn-biblioteca" style="width: 100%; margin-top: 15px;">OK</button>
          `;

          // 3. Adiciona evento ao novo botão "OK" para fechar o modal
          document
            .getElementById("btn-fechar-sucesso")
            .addEventListener("click", () => {
              modalConfirmacao.style.display = "none";
            });
        },
        { once: true }
      ); // { once: true } garante que o evento só dispare uma vez
    }
  });

  // --- LÓGICA PARA LIVROS ---
  function renderizarLivros(livrosParaRenderizar = livros) {
    if (livrosParaRenderizar.length === 0) {
      listaLivros.innerHTML = "";
      buscaExternaContainer.style.display = "block";
    } else {
      buscaExternaContainer.style.display = "none";
      listaLivros.innerHTML = livrosParaRenderizar
        .map((livro) => {
          const isDisponivel = livro.copiasDisponiveis > 0;
          const classeReservada = !isDisponivel ? 'class="reservada"' : "";
          const textoStatus = isDisponivel
            ? `<span>(${livro.copiasDisponiveis} cópias)</span>`
            : "<span>(Indisponível)</span>";

          return `<li data-livro-nome="${livro.nome}" ${classeReservada}>${livro.nome} ${textoStatus}</li>`;
        })
        .join("");
    }
  }

  btnReservarLivros.addEventListener("click", () => {
    const isVisible = listaLivrosContainer.style.display === "block";
    // Esconde todos os outros containers
    if (listaSalasContainer) listaSalasContainer.style.display = "none";
    if (minhasSolicitacoesContainer)
      minhasSolicitacoesContainer.style.display = "none";
    formBuscaExternaContainer.style.display = "none";
    // Mostra ou esconde o container de livros
    listaLivrosContainer.style.display = isVisible ? "none" : "block";
  });

  inputBuscaLivro.addEventListener("input", (e) => {
    const termoBusca = e.target.value.toLowerCase();
    const livrosFiltrados = livros.filter((livro) =>
      livro.nome.toLowerCase().includes(termoBusca)
    );
    renderizarLivros(livrosFiltrados);
  });

  listaLivros.addEventListener("click", (e) => {
    const livroClicado = e.target;
    const nomeLivro = livroClicado.dataset.livroNome;
    const livro = livros.find((l) => l.nome === nomeLivro);

    // Permite o clique apenas se o livro existir e tiver cópias disponíveis
    if (livro && livro.copiasDisponiveis > 0) {
      const agora = new Date();
      const devolucao = new Date(agora);
      devolucao.setDate(agora.getDate() + 15); // Adiciona 15 dias

      conteudoConfirmacao.innerHTML = `
        <h2 class="titulo-secao">Confirmar Reserva</h2>
        <p class="font">Livro: <b>${nomeLivro}</b></p>
        <p class="font">Data da Retirada: <b>${agora.toLocaleDateString(
          "pt-BR"
        )}</b></p>
        <p class="font">Data de Devolução: <b>${devolucao.toLocaleDateString(
          "pt-BR"
        )}</b></p>
        <button id="btn-confirmar-reserva" class="btn-biblioteca" style="width: 100%; margin-top: 15px;">Confirmar</button>
      `;

      modalConfirmacao.style.display = "flex";

      document.getElementById("btn-confirmar-reserva").addEventListener(
        "click",
        () => {
          // Diminui a contagem de cópias
          livro.copiasDisponiveis--;

          // Adiciona o livro à lista de livros reservados pelo usuário
          livrosReservadosPeloUsuario.push({
            nome: nomeLivro,
            dataDevolucao: devolucao,
            podeRenovar: true, // Permite uma renovação
          });

          // Re-renderiza a lista para mostrar a contagem atualizada
          renderizarLivros();

          conteudoConfirmacao.innerHTML = `
            <h2 class="titulo-secao" style="text-align: center;">Sucesso!</h2>
            <p class="font" style="text-align: center; font-size: 14px; line-height: 1.5;">
              O livro "<b>${nomeLivro}</b>" foi reservado com sucesso.
            </p>
            <button id="btn-fechar-sucesso" class="btn-biblioteca" style="width: 100%; margin-top: 15px;">OK</button>
          `;

          document
            .getElementById("btn-fechar-sucesso")
            .addEventListener("click", () => {
              modalConfirmacao.style.display = "none";
            });
        },
        { once: true }
      );
    }
  });

  // --- LÓGICA PARA RENOVAÇÃO ---
  const btnRenovarLivros = document.getElementById("btn-renovar-livros");

  btnRenovarLivros.addEventListener("click", () => {
    // Monta o conteúdo do modal de renovação
    let conteudoHtml = `<h2 class="titulo-secao">Meus Empréstimos</h2>`;

    if (livrosReservadosPeloUsuario.length === 0) {
      conteudoHtml += `<p class="font">Você não possui livros emprestados no momento.</p>`;
    } else {
      conteudoHtml += `<ul id="lista-renovacao" style="list-style: none; padding: 0;">`;
      livrosReservadosPeloUsuario.forEach((livro, index) => {
        conteudoHtml += `
          <li style="padding: 10px; border-bottom: 1px solid #eee;">
            <p class="font" style="margin: 0;"><b>${livro.nome}</b></p>
            <p class="font" style="margin: 5px 0;">Devolução: ${livro.dataDevolucao.toLocaleDateString(
              "pt-BR"
            )}</p>
            ${
              livro.podeRenovar
                ? `<button class="btn-biblioteca btn-renovar-item" data-index="${index}" style="font-size: 12px; padding: 8px 12px; flex: none;">Renovar</button>`
                : `<p class="font" style="color: #999; margin: 0;">Renovação não permitida</p>`
            }
          </li>
        `;
      });
      conteudoHtml += `</ul>`;
    }

    conteudoConfirmacao.innerHTML = conteudoHtml;
    modalConfirmacao.style.display = "flex";
  });

  // Evento para os botões de renovar dentro do modal (delegação de evento)
  modalConfirmacao.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("btn-renovar-item")) {
      const index = parseInt(e.target.dataset.index, 10);
      const livroParaRenovar = livrosReservadosPeloUsuario[index];

      if (livroParaRenovar && livroParaRenovar.podeRenovar) {
        // Adiciona mais 15 dias à data de devolução atual
        livroParaRenovar.dataDevolucao.setDate(
          livroParaRenovar.dataDevolucao.getDate() + 15
        );
        livroParaRenovar.podeRenovar = false; // Impede futuras renovações

        // Atualiza a mensagem de sucesso no modal
        conteudoConfirmacao.innerHTML = `
          <h2 class="titulo-secao" style="text-align: center;">Sucesso!</h2>
          <p class="font" style="text-align: center;">A devolução do livro "<b>${
            livroParaRenovar.nome
          }</b>" foi estendida para <b>${livroParaRenovar.dataDevolucao.toLocaleDateString(
          "pt-BR"
        )}</b>.</p>
          <button id="btn-fechar-sucesso" class="btn-biblioteca" style="width: 100%; margin-top: 15px;">OK</button>
        `;

        // Adiciona o evento de clique ao novo botão "OK" para fechar o modal
        document
          .getElementById("btn-fechar-sucesso")
          .addEventListener("click", () => {
            modalConfirmacao.style.display = "none";
          });
      }
    }
  });

  // --- LÓGICA DE BUSCA EXTERNA ---
  const btnBuscaExternaMain = document.getElementById("btn-busca-externa-main");
  const btnBuscaExternaSecundario =
    document.getElementById("btn-busca-externa");
  const btnCriarSugestao = document.getElementById("btn-criar-sugestao");
  const formBuscaExterna = document.getElementById("form-busca-externa");
  const btnCancelarSugestao = document.getElementById("btn-cancelar-sugestao");

  // Array para armazenar as solicitações feitas
  let minhasSolicitacoes = [];

  // Função para renderizar (desenhar) a lista de solicitações na tela
  function renderizarSolicitacoes() {
    const listaContainer = document.getElementById("lista-solicitacoes");
    if (minhasSolicitacoes.length === 0) {
      listaContainer.innerHTML = `<p id="sem-solicitacoes-msg" class="font" style="text-align: center; color: #666">Você ainda não fez nenhuma solicitação.</p>`;
    } else {
      listaContainer.innerHTML = minhasSolicitacoes
        .map(
          (solicitacao) => `
        <div style="background-color: #fff; padding: 15px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <p class="font" style="margin: 0 0 10px 0;"><b>Livro:</b> ${
            solicitacao.titulo
          }</p>
          <p class="font" style="font-size: 13px; color: #555; margin: 5px 0;"><b>Solicitante:</b> ${
            solicitacao.nomeAluno
          } (Matrícula: ${solicitacao.matricula})</p>
          <p class="font" style="font-size: 13px; color: #555; margin: 5px 0;"><b>Data:</b> ${solicitacao.dataSolicitacao.toLocaleDateString(
            "pt-BR"
          )}</p>
          <p class="font" style="font-size: 13px; color: #555; margin: 5px 0;"><b>Status:</b> <span style="font-weight: bold; color: #0a599b;">${
            solicitacao.status
          }</span></p>
        </div>
      `
        )
        .join("");
    }
  }

  // Função para mostrar a tela "Minhas Solicitações"
  function mostrarMinhasSolicitacoes() {
    listaSalasContainer.style.display = "none";
    listaLivrosContainer.style.display = "none";
    formBuscaExternaContainer.style.display = "none";
    minhasSolicitacoesContainer.style.display = "block";
    renderizarSolicitacoes(); // Atualiza a lista sempre que a tela é exibida
  }

  // Função para mostrar o formulário de busca externa
  function mostrarFormBuscaExterna() {
    listaSalasContainer.style.display = "none";
    listaLivrosContainer.style.display = "none";
    minhasSolicitacoesContainer.style.display = "none";
    formBuscaExternaContainer.style.display = "block";
  }

  // Adiciona eventos aos botões de "Busca Externa"
  if (btnBuscaExternaMain) {
    btnBuscaExternaMain.addEventListener("click", mostrarMinhasSolicitacoes);
  }
  if (btnBuscaExternaSecundario) {
    btnBuscaExternaSecundario.addEventListener(
      "click",
      mostrarMinhasSolicitacoes
    );
  }

  // Adiciona evento ao botão "Criar Nova Sugestão"
  if (btnCriarSugestao) {
    btnCriarSugestao.addEventListener("click", mostrarFormBuscaExterna);
  }

  // Adiciona evento ao botão "Cancelar" do formulário
  if (btnCancelarSugestao) {
    btnCancelarSugestao.addEventListener("click", mostrarMinhasSolicitacoes);
  }

  // Adiciona evento de envio ao formulário
  if (formBuscaExterna) {
    formBuscaExterna.addEventListener("submit", function (e) {
      e.preventDefault(); // Impede o recarregamento da página

      // Coleta os dados do formulário
      const formData = new FormData(formBuscaExterna);
      const novaSolicitacao = {
        // Dados do aluno (fixos, como solicitado)
        nomeAluno: "Beatriz",
        matricula: "632",
        // Dados do formulário
        titulo: formData.get("titulo-completo"),
        // Dados gerados pelo sistema
        dataSolicitacao: new Date(),
        status: "Em análise",
      };

      minhasSolicitacoes.unshift(novaSolicitacao); // Adiciona a nova solicitação no início da lista
      formBuscaExterna.reset(); // Limpa o formulário
      mostrarMinhasSolicitacoes(); // Volta para a tela de solicitações para ver o item adicionado
    });
  }

  // --- INICIALIZAÇÃO E GERAL ---

  // Evento para fechar o modal
  closeButton.addEventListener("click", () => {
    modalConfirmacao.style.display = "none";
  });

  // Fecha o modal se clicar fora da área de conteúdo
  window.addEventListener("click", (e) => {
    if (e.target == modalConfirmacao) {
      modalConfirmacao.style.display = "none";
    }
  });

  // Fluxo de inicialização
  renderizarSalas();
  renderizarLivros();
});
