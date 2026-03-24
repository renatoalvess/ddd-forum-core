# Clean DDD Forum

Projeto de fórum construído com os princípios de Design Orientado a Domínio (DDD) e Arquitetura Limpa. O objetivo é criar um sistema robusto, escalável e de fácil manutenção, com uma clara separação de responsabilidades entre as camadas da aplicação. Este projeto foca exclusivamente na lógica de domínio e nos casos de uso, não incluindo uma camada de apresentação ou um servidor. Toda a validação é feita através de testes automatizados.

## Tabela de Conteúdos

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Começando](#começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [Rodando os Testes](#rodando-os-testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Conceitos de DDD](#conceitos-de-ddd)

## Sobre o Projeto

Este projeto implementa a lógica de domínio de um sistema de fórum onde os usuários podem criar perguntas, respondê-las, comentar e votar nas melhores respostas. A arquitetura é baseada em DDD, com uma separação clara entre o domínio da aplicação e as camadas de infraestrutura. Não há camada de apresentação (UI) ou servidor, o foco está na lógica de negócio e a validação é feita através de testes.

## Funcionalidades Principais

- Criar, ler, atualizar e excluir perguntas.
- Criar, ler, atualizar e excluir respostas.
- Comentar em perguntas e respostas.
- Escolher a melhor resposta para uma pergunta.
- Buscar perguntas recentes.
- Sistema de notificações para novas respostas e melhores respostas escolhidas.

## Tecnologias Utilizadas

- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
- ![Vitest](https://img.shields.io/badge/vitest-%236E9F18.svg?style=for-the-badge&logo=vitest&logoColor=white)
- ![ESLint](https://img.shields.io/badge/eslint-%234B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white)
- ![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=white)
- ![Day.js](https://img.shields.io/badge/day.js-%23FFBF00.svg?style=for-the-badge&logo=day.js&logoColor=white)

## Começando

Siga estas instruções para configurar e rodar o projeto em seu ambiente local.

### Pré-requisitos

- ![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/renatoalvess/ddd-forum-core.git
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd ddd-forum-core
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```

## Rodando os Testes

Para rodar os testes unitários e de integração, que validam toda a lógica da aplicação, use os seguintes comandos:

- Para rodar os testes uma vez:
  ```sh
  npm test
  ```
- Para rodar os testes em modo de observação (watch mode):
  ```sh
  npm run test:watch
  ```

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

```
.
├── src
│   ├── core
│   │   ├── entities
│   │   ├── errors
│   │   ├── events
│   │   └── repositories
│   ├── domain
│   │   ├── forum
│   │   │   ├── aplication
│   │   │   │   ├── repositories
│   │   │   │   └── use-cases
│   │   │   └── enterprise
│   │   │       ├── entities
│   │   │       └── events
│   │   └── notification
│   │       ├── aplication
│   │       │   ├── repositories
│   │       │   ├── subscribers
│   │       │   └── use-cases
│   │       └── enterprise
│   │           └── entities
└── test
    ├── repositories
    ├── factories
    └── utils
```

- **`src/core`**: Contém as classes base, tipos e interfaces compartilhadas por todo o projeto, como `Entity`, `AggregateRoot` e `DomainEvent`.
- **`src/domain`**: Contém a lógica de negócio principal da aplicação, dividida por contextos (bounded contexts).
  - **`forum`**: O contexto principal do fórum.
    - **`aplication`**: Contém os casos de uso (use cases) da aplicação.
    - **`enterprise`**: Contém as entidades de negócio e as regras de negócio do domínio.
  - **`notification`**: O contexto de notificações.
- **`test`**: Contém os testes automatizados.
  - **`repositories`**: Contém repositórios em memória para os testes.
  - **`factories`**: Contém fabricas para criar entidades de teste.


## Conceitos de DDD

Este projeto utiliza vários conceitos de Domain-Driven Design para criar um sistema mais robusto e manutenível.

### Entidades e Objetos de Valor

- **Entidades**: São objetos que possuem uma identidade única que persiste ao longo do tempo. Em nosso projeto, `Question` e `Answer` são exemplos de entidades.
- **Objetos de Valor**: São objetos que não possuem uma identidade única e são definidos por seus atributos. `Slug` é um exemplo de Objeto de Valor.

### Agregados (Aggregates)

Agregados são um conjunto de entidades e objetos de valor que são tratados como uma única unidade para fins de consistência de dados. A raiz do agregado (Aggregate Root) é a única entidade que pode ser acessada diretamente por código externo. No nosso caso, `Question` é uma raiz de agregado que encapsula as coleções de `QuestionComment` e `QuestionAttachment`.

### Eventos de Domínio (Domain Events)

Eventos de domínio são usados para capturar ocorrências importantes no domínio. Quando um evento de domínio é disparado, ele pode ser tratado por outros componentes do sistema, como os `subscribers` no contexto de notificação. Isso permite um baixo acoplamento entre diferentes partes do sistema. Exemplos incluem `AnswerCreatedEvent` e `QuestionBestAnswerChosenEvent`.

### Casos de Uso (Use Cases)

Os casos de uso representam as ações que um usuário pode realizar no sistema. Eles orquestram a lógica do domínio, recuperando entidades dos repositórios, executando as regras de negócio e salvando o estado atualizado.

### Repositórios

Os repositórios são uma abstração sobre a persistência de dados. Eles fornecem uma interface para consultar e salvar os agregados, escondendo os detalhes de implementação do banco de dados. Para os testes, utilizamos repositórios em memória para manter os testes rápidos e independentes de um banco de dados real.

### Licença

Este projeto está sob a licença MIT.
