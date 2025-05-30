# Product Showcase Monorepo (Teste Prático)

Este projeto é uma aplicação full-stack para cadastro, seleção e carrinho de compras de produtos, desenvolvida como parte de um teste prático utilizando NestJS para o backend e Angular para o frontend.

## Descrição do Projeto

O objetivo deste teste foi demonstrar habilidades no desenvolvimento das seguintes funcionalidades:
- Cadastro de produtos (Backend)
- Listagem e filtragem de produtos (Frontend e Backend)
- Visualização de detalhes de um produto (Frontend)
- Funcionalidade de carrinho de compras (Frontend)
- Paginação na listagem de produtos (Frontend e Backend)

Este projeto foi desenvolvido seguindo as especificações do documento "Teste Prático: Cadastro de Produto, Seleção e Carrinho (NestJS e Angular)".

## Tecnologias Utilizadas

- **Backend:**
  - NestJS (Node.js framework)
  - TypeScript
  - TypeORM (para interação com o banco de dados)
  - PostgreSQL (Banco de dados relacional)
  - Class-validator & Class-transformer (para validação de DTOs)
- **Frontend:**
  - Angular (Framework frontend)
  - TypeScript
  - RxJS (para programação reativa)
  - Angular CLI
- **Geral:**
  - Node.js
  - npm (Gerenciador de pacotes)
  - Git (Controle de versão)
  - Insomnia/Postman (para testes de API backend)

## Estrutura do Projeto

Este é um monorepo contendo duas aplicações principais:

- `backend/api/`: A aplicação NestJS que serve a API REST.
- `frontend/store-ui/`: A aplicação Angular que consome a API e fornece a interface do usuário.

## Pré-requisitos Globais

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão LTS recomendada, ex: v18, v20)
- npm (geralmente vem com o Node.js)
- [Angular CLI](https://angular.io/cli) instalado globalmente: `npm install -g @angular/cli`
- [NestJS CLI](https://docs.nestjs.com/cli/overview) instalado globalmente (opcional, mas útil para desenvolvimento backend): `npm install -g @nestjs/cli`
- Um servidor PostgreSQL rodando e acessível.

## Configuração e Instalação

1.  **Clone o repositório:**
    ```bash
    git clone <https://github.com/maia2a/product-showcase>
    cd product-showcase-monorepo
    ```

2.  **Configurar o Backend:**
    - Navegue até a pasta do backend:
      ```bash
      cd backend/api
      ```
    - Instale as dependências:
      ```bash
      npm install
      ```
    - **Configuração do Banco de Dados:**
        - Certifique-se de que seu servidor PostgreSQL está rodando.
        - Crie um banco de dados (ex: `product_db`).
        - Atualize as credenciais do banco de dados no arquivo `backend/api/src/app.module.ts` dentro da configuração do `TypeOrmModule.forRoot({...})` se necessário (usuário, senha, nome do banco). Por padrão, o projeto está configurado para usar `synchronize: true` com TypeORM, o que criará as tabelas automaticamente em ambiente de desenvolvimento.

3.  **Configurar o Frontend:**
    - Navegue até a pasta do frontend:
      ```bash
      cd ../
