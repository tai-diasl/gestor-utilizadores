
# Gestor de Utilizadores

Este projeto é uma aplicação web de gestão de utilizadores, desenvolvida com HTML, CSS e TypeScript. Permite adicionar, remover, ativar/desativar e pesquisar utilizadores, bem como visualizar estatísticas sobre o estado dos utilizadores (Ativos/inativos) e detalher individuais em um modal.


## Funcionalidades

- Adicionar novos utilizadores com nome e email.

- Validar campos obrigatórios e email.

- Alternar o estado do utilizador (Ativo/Inativo).

- Remover utilizadores da lista com confirmação.

- Filtrar apenas utilizadores ativos.

- Pesquisar utilizadores pelo nome (atualização em tempo real).

- Ordenar a lista de utilizadores alfabeticamente.

- Contadores atualizados:

  - Total de utilizadores

  - Total de ativos

  - Total de inativos

  - Percentual de ativos

- Visualização de detalhes do utilizador em um modal.


## Tecnologias

- **TypeScript** - Tipagem forte, classes e interfaces
- **HTML5** - Estrutura da página
- **CSS3** - Estilo
- Manipulação do **DOM** e eventos com TypeScript puro.


## Como usar

1. Clone o repositório (no bash)

`git clone 
https://github.com/tai-diasl/gestor-utilizadores.git`

2. Entre na pasta do projeto

`cd gestor-utilizadores
`

3. Compile o TypeScript para JavaScript

`tsc main.ts
`

4. Abra o `index.html` em um navegador (Google Chrome, Firefox, etc).


### Uso

- Digite o nome e email do utilizador e clique em Adicionar.

- Clique em Desativar/Ativar para mudar o estado do utilizador.

- Clique em Remover para excluir um utilizador da lista.

- Use a pesquisa para filtrar utilizadores pelo nome.

- Clique em Mostrar apenas ativos para exibir apenas utilizadores ativos.

- Clique em Mostrar todos para exibir todos os utilizadores.

- Clique em Ordenar para organizar alfabeticamente.

- Clique em um cartão para abrir o modal com detalhes do utilizador.


## Autora

- [@Taís Dias](https://github.com/tai-diasl)

