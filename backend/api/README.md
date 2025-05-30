# API de Showcase de Produtos (NestJS)

Esta é a API backend para a aplicação de showcase de produtos, construída com NestJS, TypeORM e PostgreSQL.

## Tecnologias

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- class-validator
- class-transformer

## Pré-requisitos

- Node.js (versão LTS recomendada)
- npm
- Servidor PostgreSQL rodando

## Configuração e Instalação

1.  **Navegue até o diretório da API:**
    ```bash
    # A partir da raiz do monorepo:
    # cd backend/api
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configuração do Banco de Dados:**
    - Certifique-se de que o PostgreSQL está rodando.
    - Crie um banco de dados, por exemplo: `product_db`.
      ```sql
      -- Exemplo com psql:
      -- sudo -u postgres psql
      -- CREATE DATABASE product_db;
      -- \q
      ```
    - As credenciais do banco de dados (usuário, senha, host, porta, nome do banco) estão configuradas no arquivo `src/app.module.ts` dentro de `TypeOrmModule.forRoot({...})`. Ajuste conforme necessário para o seu ambiente.
    - O esquema do banco de dados (`Product` entity) será criado/sincronizado automaticamente ao iniciar a aplicação em modo de desenvolvimento devido à configuração `synchronize: true` no TypeORM. **Para produção, use migrações.**

## Executando a Aplicação

- **Modo de Desenvolvimento (com watch):**
  ```bash
  npm run start:dev
  ```

## Endpoints da API

A API base roda em `http://localhost:3000`.

### Produtos (`/products`)

#### `POST /products`

- **Descrição:** Cria um novo produto no sistema.
- **Método:** `POST`
- **Corpo da Requisição (JSON):**
  ```json
  {
    "name": "Nome do Produto Exemplo",
    "description": "Esta é uma descrição detalhada e excelente do produto.",
    "price": 199.99,
    "imageUrl": "[http://example.com/imagem_do_produto.jpg](http://example.com/imagem_do_produto.jpg)" // Este campo é opcional
  }
  ```
- **Validações do Corpo:**
  - `name`: string, obrigatório, mínimo de 3 caracteres.
  - `description`: string, opcional.
  - `price`: número, obrigatório, valor mínimo de 0.01.
  - `imageUrl`: string, opcional, deve ser uma URL válida se fornecida.
- **Resposta de Sucesso (201 Created):**
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
- **Respostas de Erro:**
  - `400 Bad Request`: Se os dados fornecidos na requisição forem inválidos (e.g., nome muito curto, preço negativo, `imageUrl` mal formatada).

#### `GET /products`

- **Descrição:** Lista os produtos cadastrados. Suporta filtragem por termo de busca e paginação.
- **Método:** `GET`
- **Query Parameters (Opcionais):**
  - `search` (string): Termo para buscar no nome ou na descrição dos produtos. A busca é case-insensitive e verifica se o termo está contido nos campos.
  - `page` (number): Especifica o número da página dos resultados a ser retornada. Padrão: `1`.
  - `limit` (number): Especifica o número máximo de itens a serem retornados por página. Padrão: `10`. Máximo: `100`.
- **Exemplo de URL:**
  ```
  http://localhost:3000/products?search=notebook&page=1&limit=5
  ```
- **Resposta de Sucesso (200 OK):**
  Retorna um objeto contendo os dados paginados e metadados da paginação.
  ```json
  {
    "data": [
      {
        "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "name": "Notebook Super Potente",
        "description": "Um notebook com configurações avançadas para alto desempenho.",
        "price": 7500.0,
        "imageUrl": "[http://example.com/notebook.jpg](http://example.com/notebook.jpg)",
        "createdAt": "2025-05-29T10:00:00.000Z",
        "updatedAt": "2025-05-29T10:00:00.000Z"
      }
      // ... outros produtos da página
    ],
    "meta": {
      "totalItems": 15, // Número total de itens que correspondem à busca (se houver)
      "itemsPerPage": 5, // Número de itens retornados nesta página
      "totalPages": 3, // Número total de páginas disponíveis
      "currentPage": 1 // A página atual que está sendo visualizada
    }
  }
  ```

#### `GET /products/:id`

- **Descrição:** Obtém os detalhes de um produto específico utilizando o seu ID (UUID).
- **Método:** `GET`
- **Parâmetro de Rota:**
  - `id` (string UUID): O ID único do produto.
- **Exemplo de URL:**
  ```
  http://localhost:3000/products/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  ```
- **Resposta de Sucesso (200 OK):**
  Retorna o objeto completo do produto correspondente ao ID fornecido.
  ```json
  {
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "name": "Notebook Super Potente",
    "description": "Um notebook com configurações avançadas para alto desempenho.",
    "price": 7500.0,
    "imageUrl": "[http://example.com/notebook.jpg](http://example.com/notebook.jpg)",
    "createdAt": "2025-05-29T10:00:00.000Z",
    "updatedAt": "2025-05-29T10:00:00.000Z"
  }
  ```
- **Respostas de Erro:**
  - `404 Not Found`: Se nenhum produto com o ID fornecido for encontrado.
  - `400 Bad Request`: Se o ID fornecido não for um UUID válido (devido ao `ParseUUIDPipe`).

## Build e Execução

- **Modo de Desenvolvimento (com watch):**

  ```bash
  npm run start:dev
  ```

  A API estará disponível em `http://localhost:3000`.

- **Build de Produção:**

  ```bash
  npm run build
  ```

- **Iniciar em Modo de Produção (após o build):**
  ```bash
  npm run start:prod
  ```
