# Interface do Usuário da Loja - Showcase de Produtos (Angular)

Esta é a aplicação frontend para o Showcase de Produtos, construída com Angular. Ela consome a API NestJS para exibir produtos, permitir a seleção e gerenciar um carrinho de compras.

## Tecnologias

- Angular (v17+ com componentes standalone)
- TypeScript
- RxJS
- Angular CLI
- HTML5, CSS3

## Pré-requisitos

- Node.js (versão LTS recomendada)
- npm
- Angular CLI instalado globalmente: `npm install -g @angular/cli`
- **API Backend Rodando:** Esta aplicação frontend requer que a [API Backend](#link-para-o-readme-do-backend-se-estiver-em-outro-repo-ou-instrucoes) esteja rodando (geralmente em `http://localhost:3000`).

## Configuração e Instalação

1.  **Navegue até o diretório do frontend:**
    ```bash
    # A partir da raiz do monorepo:
    # cd frontend/store-ui
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```

## Executando a Aplicação (Servidor de Desenvolvimento)

1.  **Certifique-se de que a API backend esteja rodando.**
2.  **Inicie o servidor de desenvolvimento do Angular:**
    ```bash
    ng serve --open
    ```
    ou
    ```bash
    npm start
    ```
    A aplicação estará disponível em `http://localhost:4200/` e abrirá automaticamente no seu navegador. O servidor recarregará automaticamente se você alterar os arquivos de origem.

## Build para Produção

Para criar um build otimizado para produção:
```bash
ng build
