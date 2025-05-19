# Desafio Técnico Frontend - React + TypeScript

Este projeto é a implementação de um sistema de autenticação com interface para gerenciamento de usuários (admin) e perfil pessoal (usuário comum), desenvolvido com **ReactJS** e **TypeScript**, como parte de um desafio técnico para uma vaga de desenvolvedor fullstack.

## 🚀 Tecnologias Utilizadas

- [ReactJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (ou outro bundler, se aplicável)
- [Tailwind CSS](https://tailwindcss.com/) (para estilização)
- [React Router](https://reactrouter.com/) (para rotas)
- [Axios](https://axios-http.com/) (para requisições HTTP)
- [JWT](https://jwt.io/) (para autenticação via token)
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) (para persistência de sessão)

## 📱 Funcionalidades Implementadas

### 1. Tela de Login

- Formulário com campos de **e-mail** e **senha**.
- Autenticação via API com armazenamento de token JWT no `localStorage`.
- Redirecionamento após login:
  - Usuário Admin → Tela de listagem de usuários.
  - Usuário Comum → Tela de perfil.

### 2. Tela de Cadastro

- Formulário com campos de **nome**, **e-mail** e **senha**.
- Redirecionamento automático para a tela de login após cadastro bem-sucedido.

### 3. Tela de Listagem de Usuários (Admin)

- Listagem de todos os usuários com os seguintes dados:
  - Nome
  - E-mail
  - Papel (admin/usuário)
  - Status (ativo/inativo)
- (Opcional) Ações de **editar** e **deletar** usuários.
- (Opcional) Filtros por papel e ordenação por nome ou data de criação.

### 4. Tela de Perfil (Usuário)

- Exibição dos dados do usuário logado:
  - Nome
  - E-mail
  - Data de criação
- Possibilidade de alterar:
  - Nome
  - Senha (com validação de mínimo 8 caracteres)
- Logout com limpeza de token e proteção contra acesso não autorizado após logout.

### 5. Interface Responsiva

- Layout adaptado para **desktop**, **tablet** e **mobile**.

## 🧪 Como Rodar Localmente

### Pré-requisitos

- Node.js >= 18
- Yarn ou npm

### Instalação

#### Passo 1: Clonar e rodar a API (backend)

```bash
# Clonar o repositório do backend
git clone https://github.com/matheus-arj/conectar-test.git
cd conectar-test

# Instalar dependências
yarn install
# ou
npm install

# Rodar o backend
yarn dev
# ou
npm run dev
```

A API estará disponível em http://localhost:3000.

#### Passo 2: Clonar e rodar o Frontend

```bash
# Clonar o repositório do frontend
git clone https://github.com/matheus-arj/conectar-test-front.git
cd conectar-test-front

# Instalar dependências
yarn install
# ou
npm install

# Rodar o projeto
yarn dev
# ou
npm run dev
```

A aplicação estará disponível em http://localhost:5173.

### 🔐 Autenticação

- Após login, o token JWT é armazenado no localStorage.

- As rotas protegidas verificam a existência e validade do token.

- Usuários não autenticados são redirecionados para a tela de login.

### 🧼 Boas Práticas

- Código modularizado e reutilizável.

- Separação clara entre lógica de API e páginas.

- Validações simples de formulário com feedback ao usuário.

### 💼 Sobre o Desafio

Este projeto foi desenvolvido como parte de um desafio técnico para vaga de desenvolvedor frontend. O foco principal foi:

- Implementar os requisitos funcionais solicitados.

- Demonstrar boas práticas de desenvolvimento com React + TS.

- Garantir uma boa experiência de usuário em diferentes dispositivos.
