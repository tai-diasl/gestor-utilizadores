var output = document.querySelector("#output");
var nomeInput = document.querySelector("#nomeInput");
var emailInput = document.querySelector("#emailInput");
var pesquisaInput = document.querySelector("#pesquisaInput");
var btnAdicionar = document.querySelector("#btnAdicionar");
var btnFiltrarAtivos = document.querySelector("#btnFiltrarAtivos");
var btnMostrarTodos = document.querySelector("#btnMostrarTodos");
var btnOrdenar = document.querySelector("#btnOrdenar");
var contadorUtilizadores = document.querySelector("#contadorUtilizadores");
var contadorAtivos = document.querySelector("#contadorAtivos");
var contadorInativos = document.querySelector("#contadorInativos");
var exibirPercentual = document.querySelector("#exibirPercentual");
var msgAlerta = document.querySelector("#msgAlerta");
var modal = document.querySelector("#modalDetalhes");
var detalheNome = document.querySelector("#detalheNome");
var detalheEmail = document.querySelector("#detalheEmail");
var detalheEstado = document.querySelector("#detalheEstado");
var btnFecharModal = document.querySelector("#btnFecharModal");
var UtilizadorClass = /** @class */ (function () {
    function UtilizadorClass(id, nome, email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.ativo = true;
    }
    UtilizadorClass.prototype.toggleEstado = function () {
        this.ativo = !this.ativo;
    };
    return UtilizadorClass;
}());
var listaUtilizadores = [];
var utilizadoresFake = [
    { id: 1, nome: "Tereza Dias", email: "terezadias@email.com", ativo: true },
    { id: 2, nome: "Cíntia Dias", email: "cintiadias@email.com", ativo: true },
    { id: 3, nome: "Ottolino Dias", email: "ottolino@email.com", ativo: true }
];
function carregarUtilizadoresIniciais() {
    listaUtilizadores = [];
    utilizadoresFake.forEach(function (dado) {
        var utilizador = new UtilizadorClass(dado.id, dado.nome, dado.email);
        utilizador.ativo = dado.ativo;
        listaUtilizadores.push(utilizador);
    });
    renderUtilizadores();
}
function adicionarUtilizador() {
    var nome = nomeInput.value.trim();
    var email = emailInput.value.trim();
    if (!nome) {
        msgAlerta.innerHTML = "[ATENÇÃO] Preencha o Nome";
        return;
    }
    if (!email) {
        msgAlerta.innerHTML = "[ATENÇÃO] Preencha o Email";
        return;
    }
    if (!email.includes("@") || !email.includes(".")) {
        msgAlerta.innerHTML = "E-mail inválido";
        return;
    }
    msgAlerta.innerHTML = "";
    var novoId = listaUtilizadores.length + 1;
    var novoUtilizador = new UtilizadorClass(novoId, nome, email);
    listaUtilizadores.push(novoUtilizador);
    renderUtilizadores();
    nomeInput.value = "";
    emailInput.value = "";
}
function alternarEstadoUtilizador(id) {
    var utilizador = listaUtilizadores.find(function (u) { return u.id === id; });
    if (!utilizador) {
        return;
    }
    utilizador.toggleEstado();
    renderUtilizadores();
}
function removerUtilizador(id) {
    listaUtilizadores = listaUtilizadores.filter(function (u) { return u.id !== id; });
    renderUtilizadores();
}
function mostrarApenasAtivos() {
    var utilizadoresAtivos = listaUtilizadores.filter(function (u) { return u.ativo === true; });
    renderUtilizadores(utilizadoresAtivos);
}
function procurarUtilizador() {
    var nome = pesquisaInput.value.trim().toLocaleLowerCase();
    var utilizadoresFiltrados = listaUtilizadores.filter(function (u) {
        return u.nome.toLocaleLowerCase().includes(nome);
    });
    renderUtilizadores(utilizadoresFiltrados);
}
function atualizarContadores() {
    contadorUtilizadores.textContent = "Total de utilizadores: ".concat(listaUtilizadores.length);
    var totalAtivos = listaUtilizadores.filter(function (u) { return u.ativo; }).length;
    var totalInativos = listaUtilizadores.filter(function (u) { return !u.ativo; }).length;
    var percentual = listaUtilizadores.length === 0
        ? 0
        : (totalAtivos / listaUtilizadores.length) * 100;
    exibirPercentual.textContent = "".concat(percentual.toFixed(0), "% de Ativos");
    contadorAtivos.textContent = "Ativos: ".concat(totalAtivos);
    contadorInativos.textContent = "Inativos: ".concat(totalInativos);
}
function mostrarDetalhes(utilizador) {
    detalheNome.textContent = "Nome: ".concat(utilizador.nome);
    detalheEmail.textContent = "Email: ".concat(utilizador.email);
    detalheEstado.textContent = "Estado: ".concat(utilizador.ativo ? "Ativo" : "Inativo");
    detalheEstado.classList.remove("ativo", "inativo");
    detalheEstado.classList.add(utilizador.ativo ? "ativo" : "inativo");
    modal.classList.remove("hidden");
}
function renderUtilizadores(utilizadores) {
    if (utilizadores === void 0) { utilizadores = listaUtilizadores; }
    output.innerHTML = "";
    atualizarContadores();
    utilizadores.forEach(function (utilizador) {
        var cartao = document.createElement("div");
        cartao.classList.add("cartao");
        var nome = document.createElement("h3");
        nome.textContent = utilizador.nome;
        var email = document.createElement("p");
        email.textContent = utilizador.email;
        var estado = document.createElement("p");
        estado.textContent = utilizador.ativo ? "Ativo" : "Inativo";
        estado.classList.add(utilizador.ativo ? "ativo" : "inativo");
        var tarefas = document.createElement("p");
        tarefas.textContent = "0 tarefas atribuídas";
        tarefas.classList.add("tarefas");
        var btnToggle = document.createElement("button");
        btnToggle.textContent = utilizador.ativo ? "Desativar" : "Ativar";
        if (utilizador.ativo) {
            btnToggle.classList.add("btnDesativar");
        }
        else {
            btnToggle.classList.add("btnAtivar", "button");
        }
        cartao.addEventListener("click", function () {
            mostrarDetalhes(utilizador);
        });
        btnToggle.addEventListener('click', function (event) {
            event.stopPropagation();
            alternarEstadoUtilizador(utilizador.id);
        });
        var btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.classList.add("btnPadrao", "btnRemover");
        btnRemover.addEventListener('click', function (event) {
            event.stopPropagation();
            var resposta = confirm("Tens a certeza de que desejas remover o(a) utilizador(a) ".concat(utilizador.nome, "?"));
            if (resposta) {
                removerUtilizador(utilizador.id);
            }
            else {
                return;
            }
        });
        cartao.appendChild(nome);
        cartao.appendChild(email);
        cartao.appendChild(estado);
        cartao.appendChild(tarefas);
        cartao.appendChild(btnToggle);
        cartao.appendChild(btnRemover);
        if (output) {
            output.appendChild(cartao);
        }
    });
}
btnAdicionar.addEventListener("click", adicionarUtilizador);
btnFiltrarAtivos.addEventListener("click", mostrarApenasAtivos);
btnMostrarTodos.addEventListener("click", function () {
    renderUtilizadores();
});
btnOrdenar.addEventListener('click', function () {
    listaUtilizadores.sort(function (a, b) { return a.nome.localeCompare(b.nome); });
    renderUtilizadores();
});
pesquisaInput.addEventListener("input", procurarUtilizador);
btnFecharModal.addEventListener("click", function () {
    modal.classList.add("hidden");
});
carregarUtilizadoresIniciais();
