# Product Showcase Monorepo (Teste Prático)

Este projeto é uma aplicação full-stack para cadastro, seleção e carrinho de compras de produtos, desenvolvida como parte de um teste prático utilizando NestJS para o backend e Angular para o frontend.

## Descrição do Projeto

O objetivo deste teste prático foi demonstrar habilidades no desenvolvimento de funcionalidades de um sistema de e-commerce, incluindo:

-   Cadastro de produtos no backend.
-   Listagem de produtos com capacidades de filtragem e paginação, tanto no backend quanto no frontend.
-   Visualização detalhada de produtos no frontend.
-   Um sistema completo de carrinho de compras no frontend, incluindo adição, remoção, atualização de quantidade e persistência de dados.

Este projeto foi desenvolvido seguindo as especificações do documento "Teste Prático: Cadastro de Produto, Seleção e Carrinho (NestJS e Angular)".

## Tecnologias Utilizadas

Este projeto emprega um conjunto de tecnologias modernas para desenvolvimento full-stack:

-   **Backend:**
    -   NestJS (Framework Node.js)
    -   TypeScript
    -   TypeORM (ORM para interação com banco de dados)
    -   PostgreSQL (Banco de dados relacional)
    -   Class-validator & Class-transformer (Para validação de DTOs)
-   **Frontend:**
    -   Angular (Framework frontend, v20.0.0, utilizando componentes standalone)
    -   TypeScript
    -   RxJS (Para programação reativa)
    -   Angular CLI
    -   HTML5, CSS3
-   **Geral:**
    -   Node.js (Ambiente de execução JavaScript)
    -   npm (Gerenciador de pacotes)
    -   Git (Sistema de controle de versão)
    -   Insomnia/Postman (Recomendado para testes de API backend)

## Estrutura do Projeto

Este é um monorepo que organiza o backend e o frontend em diretórios separados para clareza e modularidade:

-   `backend/api/`: Contém a aplicação NestJS que serve a API RESTful.
-   `frontend/store-ui/`: Contém a aplicação Angular que consome a API e fornece a interface do usuário.

## Pré-requisitos Globais

Antes de iniciar a configuração e execução do projeto, garanta que os seguintes pré-requisitos estão instalados e configurados em seu ambiente de desenvolvimento:

-   [Node.js](https://nodejs.org/) (versão LTS recomendada, ex: v18, v20)
-   npm (geralmente instalado junto com o Node.js)
-   [Angular CLI](https://angular.io/cli) instalado globalmente: `npm install -g @angular/cli`
-   [NestJS CLI](https://docs.nestjs.com/cli/overview) instalado globalmente (opcional, mas útil para desenvolvimento backend): `npm install -g @nestjs/cli`
-   Um servidor PostgreSQL ativo e acessível.

## Configuração e Instalação

Siga os passos abaixo para configurar e instalar as dependências do projeto:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/maia2a/product-showcase](https://github.com/maia2a/product-showcase)
    cd product-showcase
    ```
    *(Observação: Se o nome da pasta clonada for diferente de `product-showcase-monorepo`, ajuste o `cd` no próximo passo)*

2.  **Configurar o Backend:**
    -   Navegue até a pasta do backend:
        ```bash
        cd backend/api
        ```
    -   Instale as dependências do backend:
        ```bash
        npm install
        ```
    -   **Configuração do Banco de Dados (PostgreSQL):**
        -   Certifique-se de que seu servidor PostgreSQL está rodando.
        -   Crie um banco de dados para a aplicação (ex: `product_db`).
            ```sql
            -- Exemplo usando psql:
            -- sudo -u postgres psql
            -- CREATE DATABASE product_db;
            -- \q
            ```
        -   As credenciais de acesso ao banco de dados (usuário, senha, host, porta, nome do banco) estão definidas no arquivo `backend/api/src/app.module.ts`, dentro da configuração do `TypeOrmModule.forRoot({...})`. **Ajuste essas credenciais conforme o seu ambiente PostgreSQL.**
        -   O projeto está configurado com `synchronize: true` no TypeORM para ambiente de desenvolvimento. Isso significa que as tabelas do banco de dados serão criadas ou atualizadas automaticamente com base nas entidades ao iniciar a aplicação. **Para ambientes de produção, é fortemente recomendado desabilitar `synchronize: true` e utilizar migrações do TypeORM.**

3.  **Configurar o Frontend:**
    -   A partir da raiz do monorepo (`product-showcase` ou `product-showcase-monorepo`), navegue até a pasta do frontend:
        ```bash
        cd frontend/store-ui
        # (Se você estava em backend/api, seria: cd ../../frontend/store-ui)
        ```
    -   Instale as dependências do frontend:
        ```bash
        npm install
        ```

## Executando as Aplicações

Para interagir com o projeto, você precisará executar o servidor backend e o servidor de desenvolvimento do frontend simultaneamente, cada um em seu próprio terminal.

1.  **Para Iniciar o Servidor Backend (API NestJS):**
    -   No terminal, navegue até o diretório `backend/api/`.
    -   Execute o comando:
        ```bash
        npm run start:dev
        ```
    -   A API estará disponível em `http://localhost:3000`. O terminal exibirá logs da aplicação.

2.  **Para Iniciar o Servidor Frontend (Angular UI):**
    -   Abra um **novo terminal**.
    -   Navegue até o diretório `frontend/store-ui/`.
    -   Execute o comando:
        ```bash
        ng serve --open
        ```
        (ou `npm start` se estiver configurado no `package.json` do frontend)
    -   A aplicação frontend Angular será compilada e aberta automaticamente no seu navegador padrão, geralmente em `http://localhost:4200/`. O servidor Angular monitora alterações nos arquivos e recompila automaticamente.

---

## Detalhes do Backend (API NestJS)

A API backend fornece os seguintes endpoints para gerenciar produtos:

### Endpoints da API

A API base roda em `http://localhost:3000`.

#### Produtos (`/products`)

##### `POST /products`

-   **Descrição:** Cria um novo produto no sistema.
-   **Método:** `POST`
-   **Corpo da Requisição (JSON):**
    ```json
    {
      "name": "Nome do Produto Exemplo",
      "description": "Esta é uma descrição detalhada e excelente do produto.",
      "price": 199.99,
      "imageUrl": "[http://example.com/imagem_do_produto.jpg](http://example.com/imagem_do_produto.jpg)" // Este campo é opcional
    }
    ```
-   **Validações do Corpo:**
    -   `name`: string, obrigatório, mínimo de 3 caracteres.
    -   `description`: string, opcional.
    -   `price`: número, obrigatório, valor mínimo de 0.01.
    -   `imageUrl`: string, opcional, deve ser uma URL válida se fornecida.
-   **Resposta de Sucesso (201 Created):**
    Retorna o objeto do produto recém-criado, incluindo seu `id` gerado e timestamps (`createdAt`, `updatedAt`).
    ```json
    {
      "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "name": "Nome do Produto Exemplo",
      "description": "Esta é uma descrição detalhada e excelente do produto.",
      "price": 199.99,
      "imageUrl": "[http://example.com/imagem_do_produto.jpg](http://example.com/imagem_do_produto.jpg)",
      "createdAt": "2025-05-30T18:00:00.000Z",
      "updatedAt": "2025-05-30T18:00:00.000Z"
    }
    ```
-   **Respostas de Erro:**
    -   `400 Bad Request`: Se os dados fornecidos na requisição forem inválidos.

##### `GET /products`

-   **Descrição:** Lista os produtos cadastrados. Suporta filtragem por termo de busca e paginação.
-   **Método:** `GET`
-   **Query Parameters (Opcionais):**
    -   `search` (string): Termo para buscar no nome ou na descrição dos produtos. A busca é case-insensitive e verifica se o termo está contido nos campos.
    -   `page` (number): Especifica o número da página dos resultados a ser retornada. Padrão: `1`.
    -   `limit` (number): Especifica o número máximo de itens a serem retornados por página. Padrão: `10`. Máximo: `100`.
-   **Exemplo de URL:**
    ```
    http://localhost:3000/products?search=notebook&page=1&limit=5
    ```
-   **Resposta de Sucesso (200 OK):**
    Retorna um objeto contendo os dados paginados e metadados da paginação.
    ```json
    {
      "data": [
        {
          "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          "name": "Notebook Super Potente",
          // ... outros campos do produto
        }
        // ... outros produtos da página
      ],
      "meta": {
        "totalItems": 15,
        "itemsPerPage": 5,
        "totalPages": 3,
        "currentPage": 1
      }
    }
    ```

##### `GET /products/:id`

-   **Descrição:** Obtém os detalhes de um produto específico utilizando o seu ID (UUID).
-   **Método:** `GET`
-   **Parâmetro de Rota:**
    -   `id` (string UUID): O ID único do produto.
-   **Exemplo de URL:**
    ```
    http://localhost:3000/products/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    ```
-   **Resposta de Sucesso (200 OK):** Retorna o objeto completo do produto.
-   **Respostas de Erro:**
    -   `404 Not Found`: Se nenhum produto com o ID fornecido for encontrado.
    -   `400 Bad Request`: Se o ID fornecido não for um UUID válido.

---

## Detalhes do Frontend (Interface Angular)

A aplicação frontend construída com Angular permite a interação do usuário com o catálogo de produtos e o carrinho de compras.

### Funcionalidades Implementadas no Frontend

-   **Listagem de Produtos:**
    -   Visualização de produtos em formato de grade.
    -   Busca por termo (no nome ou descrição do produto) para filtrar a lista dinamicamente.
    -   Paginação para navegar por grandes listas de produtos.
-   **Detalhes do Produto:**
    -   Visualização de uma página dedicada com informações detalhadas de um produto selecionado (nome, descrição completa, imagem, preço).
-   **Carrinho de Compras:**
    -   Adição de produtos ao carrinho a partir da página de detalhes.
    -   Visualização de uma página de carrinho dedicada listando todos os itens adicionados.
    -   Exibição do nome do produto, imagem, preço unitário, quantidade e subtotal por item no carrinho.
    -   Capacidade de aumentar ou diminuir a quantidade de cada item no carrinho.
    -   Remoção de itens individuais do carrinho.
    -   Opção para limpar todos os itens do carrinho.
    -   Exibição do valor total do pedido.
    -   Persistência do estado do carrinho no `localStorage` do navegador.
-   **Navegação e UX:**
    -   Interface com navegação clara entre as seções da loja.
    -   Feedback visual para estados de carregamento e erros ao interagir com a API.

### Estrutura de Rotas Principais do Frontend

A navegação da aplicação é gerenciada pelas seguintes rotas:

-   `/` (raiz): Redireciona automaticamente para `/products`.
-   `/products`: Exibe a lista de produtos (`ProductListComponent`) com funcionalidades de filtro e paginação.
-   `/products/:id`: Exibe os detalhes de um produto específico (`ProductDetailComponent`), onde `:id` é o ID do produto.
-   `/cart`: Exibe a página do carrinho de compras (`CartComponent`).

### Arquitetura e Componentes Chave do Frontend (Standalone)

A aplicação utiliza a arquitetura de componentes standalone do Angular para modularidade e clareza.

-   **`AppComponent` (`src/app/app.component.ts`):**
    -   Componente raiz que define o layout principal (cabeçalho, rodapé, área de conteúdo com `<router-outlet>`).
    -   Inclui a navegação principal e o indicador de itens no carrinho.
-   **`ProductListComponent` (`src/app/components/product-list/`):**
    -   Responsável por buscar (via `ProductService`) e renderizar a lista de produtos, aplicando filtros e paginação conforme interação do usuário.
-   **`ProductDetailComponent` (`src/app/components/product-detail/`):**
    -   Exibe informações completas de um produto e permite sua adição ao carrinho (via `CartService`).
-   **`CartComponent` (`src/app/components/cart/`):**
    -   Apresenta os itens do carrinho, permitindo ao usuário gerenciar quantidades, remover produtos e visualizar o total.

### Serviços Chave do Frontend

-   **`ProductService` (`src/app/services/product.service.ts`):**
    -   Centraliza a comunicação com a API backend para todas as operações relacionadas a produtos.
-   **`CartService` (`src/app/services/cart.service.ts`):**
    -   Gerencia o estado do carrinho de compras (itens, quantidades, totais) de forma reativa usando `BehaviorSubject` e persiste os dados no `localStorage`.

### Interfaces de Dados do Frontend

-   **`Product` (`src/app/models/product.model.ts`):** Define a estrutura de um objeto de produto.
-   **`CartItem` (`src/app/services/cart.service.ts`):** Define a estrutura de um item no carrinho.
-   **`PaginatedProductResult` (`src/app/services/product.service.ts`):** Define a estrutura da resposta paginada da API de produtos.

---

## [Seu Nome/Contato - Opcional]

-   Nome: [Gabriell Maia do Amaral Duarte]
-   Email: [gabrielldeveloper@gmail.com]
-   GitHub: [@maia2a]
