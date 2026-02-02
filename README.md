# Manuais Bagy

Repositório contendo a documentação oficial dos temas Bagy. Este projeto utiliza [VitePress](https://vitepress.dev/) para gerar uma documentação estática, moderna e fácil de navegar. O objetivo é ajudar os usuários a configurar seus temas e deixar suas lojas prontas para vender. O conteúdo é organizado de forma didática e intuitiva, com instruções detalhadas para cada funcionalidade.

## Documentação Disponível

### Tema Padrão 3.0

A documentação do Tema Padrão 3.0 cobre os seguintes tópicos:

- **Apresentação**: Início, instalação, manual e suporte
- **Banners**: Dimensões e localização na plataforma
- **Configurações**: Checkout, carrinho lateral, pagamentos, imagens, páginas extras, selos e vitrines
- **Painel do Tema**: Cabeçalho, configurações gerais, página de catálogo, página de produto, página inicial e rodapé
- **Edição no Código**: Criar seções e blocos customizados
- **Considerações Finais**: SSL e certificados de segurança

## Instalação

**Pré-requisitos**

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- npm (incluído com o Node.js)

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd manuais-temas-bagy
```

2. Instale as dependências:

```bash
npm install
```

## Scripts Disponíveis

| Comando         | Descrição                                           |
| --------------- | --------------------------------------------------- |
| `npm run dev`   | Inicia o servidor de desenvolvimento                |
| `npm run build` | Gera a build de produção (output em `/public`)      |
| `npm run preview` | Visualiza a build de produção localmente          |

## Tecnologias Utilizadas

- [VitePress](https://vitepress.dev/) - Gerador de sites estáticos baseado em Vue
- [Vue 3](https://vuejs.org/) - Framework JavaScript
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript tipado
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) - Linting e formatação de código
- [vitepress-plugin-tabs](https://github.com/sapphi-red/vitepress-plugin-tabs) - Plugin para tabs
- [medium-zoom](https://medium-zoom.francoischalifour.com/) - Zoom em imagens

## Desenvolvimento

Para iniciar o ambiente de desenvolvimento:

```bash
npm run dev
```

O servidor será iniciado e você poderá acessar a documentação em `http://localhost:5173`.

## Build para Produção

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `/public`.

## Deploy

O deploy é realizado automaticamente via GitHub Actions para o GitHub Pages quando:

- Uma nova **tag** é criada (ex: `v1.0.0`, `v2.1.3`)
- Uma nova **release** é publicada
- O workflow é executado manualmente

### Como fazer deploy

1. Crie uma nova tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

2. Ou crie uma release pelo GitHub:
   - Acesse a aba **Releases** no repositório
   - Clique em **Draft a new release**
   - Crie uma nova tag (ex: `v1.0.0`)
   - Publique a release

### Configuração do GitHub Pages

Antes do primeiro deploy, configure o repositório:

1. Acesse **Settings** > **Pages**
2. Em **Source**, selecione **GitHub Actions**

## Licença

Este projeto é proprietário da Bagy.
