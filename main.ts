const output = document.querySelector("#output") as HTMLDivElement; 
const nomeInput = document.querySelector("#nomeInput") as HTMLInputElement;
const emailInput = document.querySelector("#emailInput") as HTMLInputElement;
const pesquisaInput = document.querySelector("#pesquisaInput") as HTMLInputElement;

const btnAdicionar = document.querySelector("#btnAdicionar") as HTMLButtonElement;
const btnFiltrarAtivos = document.querySelector("#btnFiltrarAtivos") as HTMLButtonElement;
const btnMostrarTodos = document.querySelector("#btnMostrarTodos") as HTMLButtonElement;
const btnOrdenar = document.querySelector("#btnOrdenar") as HTMLButtonElement;

const contadorUtilizadores = document.querySelector("#contadorUtilizadores") as HTMLParagraphElement;
const contadorAtivos = document.querySelector("#contadorAtivos") as HTMLParagraphElement;
const contadorInativos = document.querySelector("#contadorInativos") as HTMLParagraphElement;
const exibirPercentual = document.querySelector("#exibirPercentual") as HTMLParagraphElement;
let msgAlerta = document.querySelector("#msgAlerta") as HTMLParagraphElement;

const modal = document.querySelector("#modalDetalhes") as HTMLDivElement;
const detalheNome = document.querySelector("#detalheNome") as HTMLParagraphElement;
const detalheEmail = document.querySelector("#detalheEmail") as HTMLParagraphElement;
const detalheEstado = document.querySelector("#detalheEstado") as HTMLParagraphElement;
const btnFecharModal = document.querySelector("#btnFecharModal") as HTMLButtonElement;


interface Utilizador {
  id: number;
  nome: string;
  email: string;
  ativo: boolean;
  toggleEstado(): void
}


class UtilizadorClass implements Utilizador {
  id: number;
  nome: string;
  email: string;
  ativo: boolean;

  constructor(id: number, nome: string, email: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.ativo = true;
  }

  toggleEstado (): void {
    this.ativo = !this.ativo;
  }
}


let listaUtilizadores: Utilizador[] = [];

const utilizadoresFake = [
  { id: 1, nome: "Tereza Dias", email: "terezadias@email.com", ativo: true },
  { id: 2, nome: "Cíntia Dias", email: "cintiadias@email.com", ativo: true },
  { id: 3, nome: "Ottolino Dias", email: "ottolino@email.com", ativo: true }
];



function carregarUtilizadoresIniciais(): void {
  listaUtilizadores = [];

  utilizadoresFake.forEach(dado => {
    const utilizador = new UtilizadorClass(
      dado.id,
      dado.nome,
      dado.email
    );
    utilizador.ativo = dado.ativo;
    listaUtilizadores.push(utilizador);
  });

  renderUtilizadores();
}


function adicionarUtilizador(): void {
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();

  if(!nome) {
    msgAlerta.innerHTML = "[ATENÇÃO] Preencha o Nome";
    return;
  }

  if(!email) {
    msgAlerta.innerHTML = "[ATENÇÃO] Preencha o Email";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    msgAlerta.innerHTML = "E-mail inválido";
    return;
  }

  msgAlerta.innerHTML = "";

  const novoId = listaUtilizadores.length + 1;
  const novoUtilizador = new UtilizadorClass(novoId, nome, email);
  listaUtilizadores.push(novoUtilizador); 

  renderUtilizadores();

  nomeInput.value = "";
  emailInput.value = "";
}


function alternarEstadoUtilizador(id: number): void {
  const utilizador = listaUtilizadores.find(u => u.id === id);

  if (!utilizador) {
    return;
  }

  utilizador.toggleEstado();

  renderUtilizadores();
}


function removerUtilizador(id:number): void {
  listaUtilizadores = listaUtilizadores.filter(u => u.id !== id);
  renderUtilizadores();
}


function mostrarApenasAtivos(): void {
  const utilizadoresAtivos = listaUtilizadores.filter(u => u.ativo === true);
  renderUtilizadores(utilizadoresAtivos);
}


function procurarUtilizador(): void {
  const nome = pesquisaInput.value.trim().toLocaleLowerCase();

  const utilizadoresFiltrados = listaUtilizadores.filter(u => 
    u.nome.toLocaleLowerCase().includes(nome)
  );

  renderUtilizadores(utilizadoresFiltrados);
}


function atualizarContadores(): void {
  contadorUtilizadores.textContent = `Total de utilizadores: ${listaUtilizadores.length}`

  const totalAtivos = listaUtilizadores.filter(u => u.ativo).length;
  const totalInativos = listaUtilizadores.filter(u => !u.ativo).length;

  const percentual = listaUtilizadores.length === 0
  ? 0
  : (totalAtivos / listaUtilizadores.length) * 100;

  exibirPercentual.textContent = `${percentual.toFixed(0)}% de Ativos`;
  contadorAtivos.textContent = `Ativos: ${totalAtivos}`;
  contadorInativos.textContent = `Inativos: ${totalInativos}`;
}


function mostrarDetalhes(utilizador: Utilizador): void {
  detalheNome.textContent = `Nome: ${utilizador.nome}`;
  detalheEmail.textContent = `Email: ${utilizador.email}`;
  detalheEstado.textContent = `Estado: ${utilizador.ativo ? "Ativo" : "Inativo"}`;
  detalheEstado.classList.remove("ativo", "inativo");
  detalheEstado.classList.add(utilizador.ativo ? "ativo" : "inativo");

  modal.classList.remove("hidden");
}



function renderUtilizadores(utilizadores: Utilizador[] = listaUtilizadores): void {
  output.innerHTML = "";

  atualizarContadores();
  
  utilizadores.forEach(utilizador => {
    const cartao = document.createElement("div");
    cartao.classList.add("cartao");

    const nome = document.createElement("h3");
    nome.textContent = utilizador.nome;

    const email = document.createElement("p");
    email.textContent = utilizador.email;

    const estado = document.createElement("p");
    estado.textContent = utilizador.ativo ? "Ativo" : "Inativo";
    estado.classList.add(utilizador.ativo ? "ativo" : "inativo");

    const tarefas = document.createElement("p");
    tarefas.textContent = "0 tarefas atribuídas";
    tarefas.classList.add("tarefas");

    const btnToggle = document.createElement("button");
    btnToggle.textContent = utilizador.ativo ? "Desativar" : "Ativar";
    if (utilizador.ativo) {
      btnToggle.classList.add("btnDesativar");
    } else {
      btnToggle.classList.add("btnAtivar", "button");
    }

    cartao.addEventListener("click", () => {
      mostrarDetalhes(utilizador);
    });

    btnToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      alternarEstadoUtilizador(utilizador.id);
    });

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("btnPadrao", "btnRemover");
    btnRemover.addEventListener('click', (event) => {
      event.stopPropagation();
      const resposta = confirm(
        `Tens a certeza de que desejas remover o(a) utilizador(a) ${utilizador.nome}?`
      );

      if (resposta) {
        removerUtilizador(utilizador.id);
      } else {
        return;
      }
    });

    cartao.appendChild(nome);
    cartao.appendChild(email);
    cartao.appendChild(estado);
    cartao.appendChild(tarefas);
    cartao.appendChild(btnToggle);
    cartao.appendChild(btnRemover);

    if(output) {
      output.appendChild(cartao);
    }
  });
}



btnAdicionar.addEventListener("click", adicionarUtilizador);
btnFiltrarAtivos.addEventListener("click", mostrarApenasAtivos);

btnMostrarTodos.addEventListener("click", () => {
renderUtilizadores();
});

btnOrdenar.addEventListener('click', () => {
  listaUtilizadores.sort((a, b) => a.nome.localeCompare(b.nome));
  renderUtilizadores();
});

pesquisaInput.addEventListener("input", procurarUtilizador);

btnFecharModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});



carregarUtilizadoresIniciais();

