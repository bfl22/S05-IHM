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
  // --- LÓGICA PARA RENOVAÇÃO DE LIVROS (NOVA) ---
  const listaRenovacao = document.getElementById("lista-renovacao");
  const semLivrosRenovacaoMsg = document.getElementById("sem-livros-renovacao");

  // Dados de exemplo: livros emprestados pelo usuário
  const meusLivrosEmprestados = [
    {
      id: 1,
      titulo: "Engenharia de Software",
      vencimento: "2025-12-10",
      renovavel: true,
      renovado: false,
    },
    {
      id: 2,
      titulo: "Introdução à Computação",
      vencimento: "2025-12-10",
      renovavel: true,
      renovado: false,
    },
  ];

  function renderizarLivrosParaRenovacao() {
    if (!listaRenovacao) return; // Garante que o elemento exista
    // Limpa a lista antes de adicionar os itens
    listaRenovacao.innerHTML = "";

    const livrosParaRenovar = meusLivrosEmprestados.filter(
      (livro) => livro.renovavel || livro.renovado
    );

    if (livrosParaRenovar.length === 0) {
      semLivrosRenovacaoMsg.parentElement.style.display = "flex";
    } else {
      semLivrosRenovacaoMsg.parentElement.hidden = true;
      livrosParaRenovar.forEach((livro) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.padding = "10px";
        li.style.borderBottom = "1px solid #eee";

        const dataVencimento = new Date(livro.vencimento + "T00:00:00");
        const dataFormatada = dataVencimento.toLocaleDateString("pt-BR");

        li.innerHTML = `
          <div class="font">
            <strong style="font-size: 15px;">${livro.titulo}</strong>
            <p style="font-size: 13px; color: #666; margin: 2px 0 0 0;">Vencimento: ${dataFormatada}</p>
          </div>
          <button class="btn-biblioteca btn-renovar" data-livro-id="${
            livro.id
          }" ${!livro.renovavel || livro.renovado ? "disabled" : ""}>
            ${livro.renovado ? "Renovado" : "Renovar"}
          </button>
        `;

        listaRenovacao.appendChild(li);
      });
    }
  }

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

  let minhasSalasReservadas = [];

  // --- LÓGICA PARA SALAS RESERVADAS ---
  function renderizarSalasReservadas() {
    const listaContainer = document.getElementById("lista-salas-reservadas");
    const semSalasMsg = document.getElementById("sem-salas-reservadas");

    if (!listaContainer) return;

    listaContainer.innerHTML = ""; // Limpa a lista

    if (minhasSalasReservadas.length === 0) {
      // Se não houver salas, mostra a mensagem padrão
      listaContainer.innerHTML = `
        <li>
          <p id="sem-salas-reservadas" class="font" style="color: #666; width: 100%; text-align: center;">
            Você não possui salas reservadas no momento.
          </p>
        </li>`;
    } else {
      // Se houver salas, cria os itens da lista
      minhasSalasReservadas.forEach((reserva) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.padding = "10px";
        li.style.borderBottom = "1px solid #eee";
        li.innerHTML = `
          <div class="font">
            <strong style="font-size: 15px;">${reserva.nome}</strong>
            <p style="font-size: 13px; color: #d9534f; margin: 2px 0 0 0;">Devolver até: <b>${reserva.devolucao}</b></p>
          </div>
          <button class="btn-biblioteca btn-cancelar btn-cancelar-reserva-sala" data-sala-nome="${reserva.nome}" style="flex: 0 1 auto; padding: 8px 12px; font-size: 12px;">Cancelar</button>
        `;
        listaContainer.appendChild(li);
      });
    }
  }

  let livrosReservadosPeloUsuario = [];

  // Adiciona evento de clique para cancelar a reserva da sala
  document
    .getElementById("lista-salas-reservadas")
    .addEventListener("click", (e) => {
      if (
        e.target &&
        e.target.classList.contains("btn-cancelar-reserva-sala")
      ) {
        const nomeSalaParaCancelar = e.target.getAttribute("data-sala-nome");

        // Mostra o modal de confirmação para o cancelamento
        conteudoConfirmacao.innerHTML = `
          <h2 class="titulo-secao" style="text-align: center;">Confirmar Cancelamento</h2>
          <p class="font" style="text-align: center; font-size: 14px; line-height: 1.5;">
            Tem certeza que deseja cancelar a reserva da "<b>${nomeSalaParaCancelar}</b>"?
          </p>
          <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button id="btn-nao-cancelar" class="btn-biblioteca" style="flex: 1; background-color: #8d99ae;">Não</button>
            <button id="btn-sim-cancelar" class="btn-biblioteca btn-cancelar" style="flex: 1;">Sim, cancelar</button>
          </div>
        `;
        modalConfirmacao.style.display = "flex";

        // Evento para o botão "Não"
        document
          .getElementById("btn-nao-cancelar")
          .addEventListener("click", () => {
            modalConfirmacao.style.display = "none";
          });

        // Evento para o botão "Sim, cancelar"
        document.getElementById("btn-sim-cancelar").addEventListener(
          "click",
          () => {
            // Remove a sala da lista de reservas do usuário
            minhasSalasReservadas = minhasSalasReservadas.filter(
              (reserva) => reserva.nome !== nomeSalaParaCancelar
            );

            // Marca a sala como disponível novamente no array principal
            const salaOriginal = salas.find(
              (s) => s.nome === nomeSalaParaCancelar
            );
            if (salaOriginal) salaOriginal.reservada = false;

            // Atualiza as listas na interface
            renderizarSalasReservadas(); // Atualiza a lista "Minhas Salas Reservadas"
            renderizarSalas(); // Atualiza a lista principal de salas para o próximo pop-up

            // Fecha o modal
            modalConfirmacao.style.display = "none";
          },
          { once: true }
        );
      }
    });

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
    // Monta o conteúdo do modal com a lista de salas
    conteudoConfirmacao.innerHTML = `
      <h2 class="titulo-secao">Reservar Sala</h2>
      <div id="lista-salas-container" style="margin-top: 15px; background-color: #fff; border-radius: 8px; padding: 5px 0;">
        <ul id="lista-salas" class="font" style="list-style-type: none; padding: 0;">
          ${listaSalas.innerHTML}
        </ul>
      </div>
    `;
    // Mostra o modal
    modalConfirmacao.style.display = "flex";
  });

  // Evento de clique na lista de salas (usando delegação de evento)
  // Alterado para ouvir cliques no modal, pois a lista agora está dentro dele
  modalConfirmacao.addEventListener("click", (e) => {
    // Garante que o clique foi em um item de sala
    if (!e.target.closest("#lista-salas")) {
      return;
    }

    const salaClicada = e.target;
    if (
      salaClicada.tagName === "LI" &&
      !salaClicada.classList.contains("reservada")
    ) {
      // VERIFICA SE JÁ EXISTE UMA SALA RESERVADA
      if (minhasSalasReservadas.length > 0) {
        conteudoConfirmacao.innerHTML = `
          <h2 class="titulo-secao" style="text-align: center;">Atenção</h2>
          <p class="font" style="text-align: center; font-size: 14px; line-height: 1.5;">
            Não é possível reservar duas salas ao mesmo tempo.
            <br><br>
            Assim que o tempo da sua reserva atual acabar, você poderá reservá-la novamente ou outra sala.
          </p>
          <button id="btn-fechar-alerta" class="btn-biblioteca" style="width: 100%; margin-top: 15px;">OK</button>
        `;
        modalConfirmacao.style.display = "flex";

        document
          .getElementById("btn-fechar-alerta")
          .addEventListener("click", () => {
            modalConfirmacao.style.display = "none";
          });

        return; // Impede que o fluxo de reserva continue
      }

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
          const horaDevolucaoFormatada = formatarHora(devolucao);
          minhasSalasReservadas.push({
            nome: nomeSala,
            devolucao: horaDevolucaoFormatada,
          });
          renderizarSalasReservadas(); // Atualiza a lista de salas reservadas na tela

          const salaParaReservar = salas.find((s) => s.nome === nomeSala);
          if (salaParaReservar) salaParaReservar.reservada = true;

          // 2. Marca a sala como reservada na interface
          // Re-renderiza a lista de salas original para refletir a mudança
          renderizarSalas();

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
  function renderizarLivros(
    livrosParaRenderizar = livros,
    container = listaLivros
  ) {
    if (livrosParaRenderizar.length === 0) {
      container.innerHTML = `<li style="text-align: center; color: #666; cursor: default;">Nenhum livro encontrado.</li>`;
      // buscaExternaContainer.style.display = "block"; // Removido para funcionar no modal
    } else {
      // buscaExternaContainer.style.display = "none";
      container.innerHTML = livrosParaRenderizar
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
    renderizarLivros(); // Garante que a lista base (escondida) esteja atualizada
    // Monta o conteúdo do modal com a busca e lista de livros
    conteudoConfirmacao.innerHTML = `
      <h2 class="titulo-secao">Reservar Livro</h2>
      <div id="lista-livros-container">
        <div style="padding: 0 10px 10px 10px">
          <input type="text" id="input-busca-livro" placeholder="Pesquisar livro..." style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box;">
        </div>
        <ul id="lista-livros" class="font" style="list-style-type: none; padding: 0;">
          ${listaLivros.innerHTML}
        </ul>
      </div>
    `;
    // Mostra o modal
    modalConfirmacao.style.display = "flex";

    // Adiciona o listener de input AGORA, pois o input foi criado
    const inputBuscaNoModal = document.getElementById("input-busca-livro");
    const listaNoModal = document.querySelector(
      "#confirmacaoModal #lista-livros"
    );

    inputBuscaNoModal.addEventListener("input", (e) => {
      const termoBusca = e.target.value.toLowerCase();
      const livrosFiltrados = livros.filter((livro) =>
        livro.nome.toLowerCase().includes(termoBusca)
      );
      renderizarLivros(livrosFiltrados, listaNoModal);
    });
  });

  // Alterado para ouvir cliques no modal, pois a lista agora está dentro dele
  modalConfirmacao.addEventListener("click", function handleLivroClick(e) {
    if (!e.target.closest("#lista-livros")) return;

    const livroClicado = e.target;
    const nomeLivro = livroClicado.dataset.livroNome;
    const livro = livros.find((l) => l.nome === nomeLivro);

    // Permite o clique apenas se o livro existir e tiver cópias disponíveis
    if (livro && livro.copiasDisponiveis > 0) {
      const agora = new Date();
      const devolucao = new Date(agora);
      devolucao.setDate(agora.getDate() + 15); // Adiciona 15 dias

      // Garante que a devolução seja em um dia útil
      if (devolucao.getDay() === 6) {
        // Se for sábado
        devolucao.setDate(devolucao.getDate() + 2); // Pula para segunda-feira
      } else if (devolucao.getDay() === 0) {
        // Se for domingo
        devolucao.setDate(devolucao.getDate() + 1); // Pula para segunda-feira
      }

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
        // Adiciona listener ao botão de confirmação
        "click",
        () => {
          // Diminui a contagem de cópias
          livro.copiasDisponiveis--;

          // Adiciona o livro à lista de livros para renovação
          const novoLivroEmprestado = {
            id: Date.now(), // ID único baseado no timestamp
            titulo: nomeLivro,
            vencimento: devolucao.toISOString().split("T")[0], // Formato AAAA-MM-DD
            renovavel: true,
            renovado: false,
          };
          meusLivrosEmprestados.push(novoLivroEmprestado);
          livrosReservadosPeloUsuario.push({
            // Mantém a lógica anterior se necessário
            nome: nomeLivro,
            dataDevolucao: devolucao,
            podeRenovar: true,
          });

          // Re-renderiza a lista para mostrar a contagem atualizada
          // Atualiza a lista principal escondida e a do modal
          renderizarLivros(); // Atualiza a lista principal
          const listaNoModal = document.querySelector(
            "#confirmacaoModal #lista-livros"
          );
          if (listaNoModal) renderizarLivros(livros, listaNoModal);
          renderizarLivrosParaRenovacao(); // Atualiza a lista de renovação na tela principal

          conteudoConfirmacao.innerHTML = `
            <h2 class="titulo-secao" style="text-align: center;">Sucesso!</h2>
            <p class="font" style="text-align: center; font-size: 14px; line-height: 1.5;">
              O livro "<b>${nomeLivro}</b>" foi reservado com sucesso.
            </p>
            <button id="btn-fechar-sucesso" class="btn-biblioteca" style="width: 100%; margin-top: 15px;">OK</button>
          `;

          // O listener para fechar o modal no botão "OK" já existe e vai funcionar
          // Adiciona listener ao novo botão "OK" para fechar o modal
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

  // Adiciona evento de clique aos botões "Renovar" (usando delegação de evento no container)
  listaRenovacao.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("btn-renovar")) {
      const livroId = parseInt(e.target.getAttribute("data-livro-id"));
      const livro = meusLivrosEmprestados.find((l) => l.id === livroId);

      if (livro && livro.renovavel) {
        // Calcula a nova data de vencimento
        const dataVencimentoAtual = new Date(livro.vencimento + "T00:00:00");
        const novaDataVencimento = new Date(dataVencimentoAtual);
        novaDataVencimento.setDate(novaDataVencimento.getDate() + 15);

        // Garante que a nova data seja um dia útil
        if (novaDataVencimento.getDay() === 6) {
          // Sábado
          novaDataVencimento.setDate(novaDataVencimento.getDate() + 2);
        } else if (novaDataVencimento.getDay() === 0) {
          // Domingo
          novaDataVencimento.setDate(novaDataVencimento.getDate() + 1);
        }

        // Atualiza os dados do livro
        livro.vencimento = novaDataVencimento.toISOString().split("T")[0];
        livro.renovado = true;
        livro.renovavel = false; // Impede renovações múltiplas

        // Re-renderiza a lista para mostrar a data atualizada e o botão desabilitado
        renderizarLivrosParaRenovacao();

        // Mostra a confirmação no modal
        conteudoConfirmacao.innerHTML = `
          <h2 class="titulo-secao" style="text-align: center;">Sucesso!</h2>
          <p class="font" style="text-align: center; font-size: 14px; line-height: 1.5;">
            O livro "<b>${livro.titulo}</b>" foi renovado com sucesso.
            <br>Nova data de devolução: <b>${novaDataVencimento.toLocaleDateString(
              "pt-BR"
            )}</b>
          </p>
          <button id="btn-fechar-sucesso" class="btn-biblioteca" style="width: 100%; margin-top: 15px;">OK</button>
        `;
        modalConfirmacao.style.display = "flex";

        // Adiciona o evento de clique ao botão "OK" para fechar o modal
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
    document.getElementById("btn-busca-externa"); // Este pode ser removido do HTML eventualmente

  // Array para armazenar as solicitações feitas
  let minhasSolicitacoes = [];

  // Função para renderizar (desenhar) a lista de solicitações na tela
  function renderizarSolicitacoes() {
    const listaContainer = document.getElementById("lista-solicitacoes");
    let html = "";
    if (minhasSolicitacoes.length === 0) {
      html = `<p id="sem-solicitacoes-msg" class="font" style="text-align: center; color: #666">Você ainda não fez nenhuma solicitação.</p>`;
    } else {
      html = minhasSolicitacoes
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
    // Se o container existir (no HTML principal), atualiza.
    if (listaContainer) {
      listaContainer.innerHTML = html;
    }
    return html; // Retorna o HTML para ser usado no modal
  }

  // Função para mostrar a tela "Minhas Solicitações"
  function mostrarMinhasSolicitacoes() {
    const solicitacoesHtml = renderizarSolicitacoes();

    conteudoConfirmacao.innerHTML = `
      <div id="minhas-solicitacoes-container">
        <div class="titulo-secao font"><b>Minhas Solicitações</b></div>
        <div id="lista-solicitacoes" style="margin-top: 15px;">
          ${solicitacoesHtml}
        </div>
        <button id="btn-criar-sugestao" class="btn-biblioteca" style="width: 100%; margin-top: 20px;">
          Criar Nova Sugestão
        </button>
      </div>
    `;
    modalConfirmacao.style.display = "flex";
  }

  // Função para mostrar o formulário de busca externa
  function mostrarFormBuscaExterna() {
    // Pega o HTML do formulário que já existe na página e o move para o modal
    const formHtml = document.getElementById(
      "busca-externa-form-container"
    ).innerHTML;

    conteudoConfirmacao.innerHTML = formHtml;
    modalConfirmacao.style.display = "flex";
  }

  // Adiciona eventos aos botões de "Busca Externa"
  if (btnBuscaExternaMain) {
    btnBuscaExternaMain.addEventListener("click", mostrarMinhasSolicitacoes);
  }

  // Usa delegação de eventos no modal para lidar com os cliques
  modalConfirmacao.addEventListener("click", (e) => {
    // Botão "Criar Nova Sugestão"
    if (e.target.id === "btn-criar-sugestao") {
      mostrarFormBuscaExterna();
    }

    // Botão "Cancelar" do formulário
    if (e.target.id === "btn-cancelar-sugestao") {
      mostrarMinhasSolicitacoes();
    }
  });

  // Usa delegação de eventos no modal para o envio do formulário
  modalConfirmacao.addEventListener("submit", (e) => {
    if (e.target.id === "form-busca-externa") {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const novaSolicitacao = {
        nomeAluno: "Beatriz",
        matricula: "632",
        titulo: formData.get("titulo-completo"),
        dataSolicitacao: new Date(),
        status: "Em análise",
      };

      minhasSolicitacoes.unshift(novaSolicitacao);
      form.reset();
      mostrarMinhasSolicitacoes(); // Volta para a lista de solicitações
    }
  });

  // if (btnBuscaExternaSecundario) {
  //   btnBuscaExternaSecundario.addEventListener(
  //     "click",
  //     mostrarMinhasSolicitacoes
  //   );
  // }

  // // Adiciona evento ao botão "Criar Nova Sugestão"
  // if (btnCriarSugestao) {
  //   btnCriarSugestao.addEventListener("click", mostrarFormBuscaExterna);
  // }

  // // Adiciona evento ao botão "Cancelar" do formulário
  // if (btnCancelarSugestao) {
  //   btnCancelarSugestao.addEventListener("click", mostrarMinhasSolicitacoes);
  // }

  // // Adiciona evento de envio ao formulário
  // if (formBuscaExterna) {
  //   formBuscaExterna.addEventListener("submit", function (e) {
  //     e.preventDefault(); // Impede o recarregamento da página

  //     // Coleta os dados do formulário
  //     const formData = new FormData(formBuscaExterna);

  //     minhasSolicitacoes.unshift(novaSolicitacao); // Adiciona a nova solicitação no início da lista
  //     formBuscaExterna.reset(); // Limpa o formulário
  //     mostrarMinhasSolicitacoes(); // Volta para a tela de solicitações para ver o item adicionado
  //   });
  // }

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
  renderizarLivrosParaRenovacao();
  renderizarSalasReservadas(); // Inicializa a seção de salas reservadas
});
