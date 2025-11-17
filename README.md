# Organiza Med

> 🔗 **Site (Azure Static Web Apps):** (https://jolly-beach-0c1eb290f.3.azurestaticapps.net)

# 📌 Demonstração

## 🏠 Página Inicial

![Demonstração do Projeto](tela-inicial.gif)

## 🧑‍⚕️ Módulo de Médicos

![Demonstração do Projeto](medicos.gif)

## 🧑‍💼 Módulo de Pacientes

![Demonstração do Projeto](pacientes.gif)

## 📝 Módulo de Procedimentos (Consultas e Cirurgias)

![Demonstração do Projeto](procedimentos.gif)

# 💡 Índice

- [Demonstração](#-demonstração)
- [Introdução](#-introdução)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Tecnologias Usadas](#-tecnologias-usadas)
- [Commits e Convenções](#-commits-e-convenções)
- [Contribuidores](#-contribuidores)
- [Mentores](#-mentores)
- [Sobre o Projeto](#-sobre-o-projeto)

# 🩺 Introdução

O **Organiza Med** é uma aplicação Angular voltada para a **organização do dia a dia de uma clínica**, com foco em:

- cadastro e gestão de **pacientes**;
- cadastro e gestão de **médicos**;
- controle de **procedimentos** (consultas e cirurgias);
- centralização das **atividades médicas** em uma interface única.

O projeto foi estruturado em módulos claros (médicos, pacientes, procedimentos) para facilitar manutenção, reutilização de componentes e evolução futura.

# ✨ Funcionalidades

- 🧑‍⚕️ **Gestão de Médicos**  
  Estrutura preparada para cadastro, listagem, edição e exclusão de médicos da clínica.

- 🧑‍💼 **Gestão de Pacientes**  
  Funcionalidades para manter o cadastro de pacientes sempre organizado, com telas dedicadas para **cadastrar**, **editar**, **listar** e **excluir**.

- 📝 **Gestão de Procedimentos (Consultas e Cirurgias)**  
  Organização de procedimentos médicos, separando especialmente consultas e cirurgias.

- 📋 **Atividades Médicas**  
  Seção destinada a visualizar e organizar as principais atividades médicas da aplicação.

- 🔐 **Módulo de Autenticação (Auth)**  
  Estrutura de autenticação preparada em um módulo dedicado, para controle de acesso quando integrado com uma API de back-end.

- 🏠 **Tela inicial com cards de navegação**  
  Componentes reutilizáveis (`as-card-inicio`) ajudam a destacar as principais ações (acessar pacientes, médicos, procedimentos etc.).

- 📱 **Layout responsivo**  
  Interface planejada para funcionar bem em diferentes tamanhos de tela.

# 🧱 Estrutura do Projeto

```text
Organiza-Med
│
├── .angular/.vscode/dist/node_modules/public
│
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── as-card-inicio/          # Card da página inicial (atalhos para módulos)
│   │   │   ├── atividades-medicas/      # Componentes relacionados às atividades médicas
│   │   │   ├── auth/                    # Telas/componentes de autenticação
│   │   │   ├── inicio/                  # Tela inicial da aplicação
│   │   │   ├── medicos/                 # Componentes relacionados ao módulo de médicos
│   │   │   └── pacientes/               # Componentes relacionados ao módulo de pacientes
│   │   │
│   │   ├── pacientes
│   │   │   ├── cadastrar/               # Tela de cadastro de pacientes
│   │   │   ├── editar/                  # Tela de edição de pacientes
│   │   │   ├── excluir/                 # Tela/fluxo de exclusão de pacientes
│   │   │   ├── listar/                  # Tela de listagem de pacientes
│   │   │   ├── pacientes.models.ts      # Tipos fortes para entidades de paciente
│   │   │   ├── pacientes.routes.ts      # Rotas específicas do módulo de pacientes
│   │   │   └── pacientes.service.ts     # Serviço responsável pelos dados de pacientes
│   │   │
│   │   ├── shared                       # Componentes/recursos compartilhados entre módulos
│   │   ├── data                         # Fontes de dados estáticos
│   │   ├── models                       # Modelos globais da aplicação (tipagens)
│   │   ├── environments
│   │   │   ├── environment.development.ts
│   │   │   └── environment.ts           # Configurações por ambiente
│   │   │
│   │   ├── app.config.ts                # Providers e rotas (standalone)
│   │   ├── app.html                     # Template do root component
│   │   └── app.ts                       # Root component (standalone)
│   │
│   ├── index.html
│   ├── main.ts                          # Bootstrap da aplicação Angular
│   └── styles.scss                      # Estilos globais da aplicação
│
├── angular.json
├── eslint.config.mts
├── package.json
├── staticwebapp.config.json             # Configuração de rotas para Azure Static Web Apps
└── README.md
```
- 🧩 **Components**  
  Cuidam da **UI e do fluxo de navegação**. Pastas como `inicio`, `medicos`, `pacientes`, `atividades-medicas` e `auth` isolam cada parte da interface.

- 🧠 **Models**  
  Reúnem **tipagens fortes** para entidades da aplicação (pacientes, médicos, procedimentos etc.), evitando “código alfabeto”.

- 📊 **Data**  
  Centraliza **dados estáticos/mocks** usados na UI (quando necessário), facilitando ajustes de conteúdo.

- 🔌 **Services** (ex.: `pacientes.service.ts`)  
  Encapsulam o acesso a dados de cada módulo (pacientes e, futuramente, médicos/procedimentos), concentrando as regras de comunicação com a fonte de dados.

- 🧭 **app.config.ts**  
  Define as **rotas e providers** da aplicação no modelo *standalone*.

- 🎨 **styles.scss**  
  Estilização global, com espaço para **temas, variáveis e utilitários**.

---

# 🔧 Tecnologias Usadas

- ⚡ **Angular** — componentes standalone + Angular Router  
- 🟦 **TypeScript** — tipagem forte em models e serviços  
- 🔁 **RxJS** — controle reativo de fluxos de dados e eventos  
- 🎨 **SCSS** — estilos globais e utilitários  
- ✅ **ESLint** — padronização de código (`eslint.config.mts`)  
- ☁️ **Azure Static Web Apps** — deploy da aplicação front-end  
# 🧠 Commits e Convenções

É utilizado [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/) para padronizar as mensagens de commit.

# 👥 Contribuidores

<p align="left">
  <a href="https://github.com/AgathaSates">
    <img src="https://github.com/AgathaSates.png" width="100" style="border-radius: 50%;" alt="Tiago Santini"/>
    &nbsp;&nbsp;&nbsp;
  </a>
</p>

| Nome         | GitHub                                         |
| ------------ | ---------------------------------------------- |
| Agatha Sates | [@AgathaSates](https://github.com/AgathaSates) |

# 👨‍🏫 Mentores

<p align="left" style="margin-left: 27px;">
  <a href="https://github.com/tiagosantini">
    <img src="https://github.com/tiagosantini.png" width="100" style="border-radius: 50%;" alt="Tiago Santini"/>
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/alexandre-rech-lages">
    <img src="https://github.com/alexandre-rech-lages.png" width="100" style="border-radius: 50%;" alt="Alexandre Rech"/>
  </a>
</p>

| Nome           | GitHub                                                     |
| -------------- | ---------------------------------------------------------- |
| Tiago Santini  | [@Tiago Santini](https://github.com/tiagosantini)          |
| Alexandre Rech | [@Alexandre Rech](https://github.com/alexandre-rech-lages) |

# 🏫 Sobre o Projeto

Desenvolvido durante o curso Fullstack da [Academia do Programador](https://academiadoprogramador.net) 2025
