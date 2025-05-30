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
