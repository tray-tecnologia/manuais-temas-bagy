<div align="center">
   <img src=".github/logo.svg" width="180"/>
   <h1>Manuais Temas</h1>

   Projeto com a manuais oficiais dos temas Tray e Bagy. Utiliza [VitePress](https://vitepress.dev/) para gerar uma documentação estática, moderna e fácil de navegar, com objetivo de ajudar os lojistas a configurarem seus temas e deixarem suas lojas prontas para vender. 
</div>
</br> 

## Instalação

Para instalar localmente o projeto siga os passos abaixo:

1. Clone o repositório

   ```bash
   git clone <repo-url> <path/to/cloned/repo>
   ```

1. Acesse a pasta onde o repositório foi clonado

   ```bash
   cd <path/to/cloned/repo>
   ```

1. Instale as dependências

   ```bash
   # Necessário Node.js 24 ou superior
   npm install   
   ```

1. Configure um proxy reverso `opcional recomendado`

   <details><summary>Expandir</summary>
   <br/>

      O projeto inclui na pasta `.proxy` um arquivo `docker-compose.yml` configurado para criar um proxy reverso usando o Nginx. Isso permite usar domínios locais para acessar a aplicação de modo a conseguir ver diferentes conteúdos modificando somente o domínio.

      Para funcionar corretamente precisamos fazer 3 configurações adicionais:

      1. Adicione os domínios ao host
      
         Os domínios locais usados não existem de verdade no mundo real, por isso precisam ser mapeados no arquivo `hosts` do sistema para que os navegadores consigam resolvê-lo. Para isso execute o comando:

         ```sh
         echo \
         "# Manuais Temas
         127.0.0.1 manuais.tray.local
         127.0.0.1 manuais.bagy.local" >> /etc/hosts
         ```

      1. Gere o certificado SSL

         Este projeto roda apenas sobre conexões seguras. Como não é possível gerar certificados válidos para usar em ambiente local, você precisará do executável mkcert para gerar o certificado ssl.

         Visite a [página do projeto](https://github.com/FiloSottile/mkcert#installation) e siga as instruções de instalação. Uma vez instalado o executável, rode o comando abaixo.

         ```sh
         cd nginx/ssl && mkcert -key-file app.key -cert-file app.crt "manuais.tray.local" "manuais.bagy.local"
         ``` 

         **:warning: _Atenção!_** _- Nunca envie os certificados gerados para o git!_

      1. Execute o proxy reverso

         Para iniciar proxy reverso e os domínios locais funcionarem corretamente você precisará inicializar os containers do Docker. Use os comandos abaixo para isso. Você pode fazer isso antes ou depois de rodar o script `npm run dev` visto mais a baixo.

         ```sh
         # Inicializa todos os containers e networks
         docker compose up -d

         # Para e remove todos os containers e networks.
         docker compose down
         ```
   </details>

## Comandos disponíveis

Existem três comandos disponíveis no projeto.


| Comando           | Descrição                                |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento     |
| `npm run build`   | Gera a build de produção (em `/public`)  |
| `npm run preview` | Visualiza a build de produção localmente |

## Regras markdown personalizadas

### Videos

Esse projeto possui um plugin que amplia o suporte de mídias na estrutura padrão de imagens para suportar videos nos formatos `.webm` e `.mp4`. A recomendação é usar o formato `.webm` para ter um tamanho bem reduzido (veja o script `convertImagesToModernFormat.ts` abaixo).

Para adicionar um vídeo basta usar o código abaixo:

```
![Alt](/path/to/some/video.webm)
```

Por padrão todos os videos são reproduzidos sem controles, som, com o autoplay e loops habilitados, para replicar um comportamento de `.gif`.

### Abas

Para criar uma aba nos markdowns de documentação use a sintaxe abaixo. Para mais dúvidas, acesse a [documentação do projeto](https://vitepress-plugins.sapphi.red/tabs/).

```
:::tabs

== tab a
Conteúdo da aba A

== tab b
Conteúdo da aba B

:::
```

### Marcas

O projeto possui um plugin interno para exibir determinadas partes de uma documentação somente para **uma** marca em específico. Para isso, basta usar a sintaxe abaixo. 

Cada bloco de marca permite usar qualquer conteúdo ou regra suportada pelo Vitepress, seja markdown ou html, e o bloco só finaliza ao encontrar uma marcação `@marca` ou o final do container `:::`.

O conteúdo de cada marca é definido em tempo de execução ao acessar a documentação.

```
:::brands

@tray
Conteúdo para marca Tray

@bagy
Conteúdo para marca Bagy

:::
``` 

## Scripts auxiliares

Esse projeto conta com alguns scripts auxiliares que ajudam a manter a organização, geração de conteúdo e redução de espaço para imagens.

| Script                             | Descrição                                                                                          |
| ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| `convertGitbookToVitepress.ts`     | Converte qualquer código específico e inválido do Gitbook para algo nativo do markdown/vitepress.   |
| `convertImagesToModernFormats.ts`  | Converte imagens `.png`, `.jpg` para `.avif` e `.gif` para `.webm`.                                 |
| `generateSidebar.ts`               | Gera a sidebar baseado da estrutura do Gitbook.                                                     |
| `migrateGitbookImages.ts`          | Baixa todas as imagens referenciadas nos `.md` para a pasta de assets.                              |

### Modo de uso

**`convertGitbookToVitepress.ts`**

```bash
npx vite-node scripts/convertGitbookToVitepress.ts -- [--in <pasta-entrada>] [--out <pasta-saida>] [--dry-run]
```

- `--in`: pasta com os `.md` exportados do Gitbook (padrão: `_output/manuais`)
- `--out`: pasta de destino dos arquivos convertidos (padrão: `_output/manuais-converted`)
- `--dry-run`: só reporta, não escreve nada

**`convertImagesToModernFormats.ts`**

```bash
npx vite-node scripts/convertImagesToModernFormats.ts -- <pasta-imagens> <pasta-md> [--dry-run]
```

- `<pasta-imagens>`: pasta onde estão as imagens a converter (originais são mantidos)
- `<pasta-md>`: pasta com os `.md` que referenciam essas imagens (referências são atualizadas pro novo formato)
- `--dry-run`: só reporta, não converte nem escreve nada
- Requer `avifenc` (conversão `.png`/`.jpg`/`.jpeg` → `.avif`) e `ffmpeg` (conversão `.gif` → `.webm`) instalados

**`generateSidebar.ts`**

```bash
npx vite-node scripts/generateSidebar.ts -- <tema>
```

- `<tema>`: nome do tema (deve ter `docs/{tema}/_meta/content.json`, gerado na migração do Gitbook)
- Sem essa pasta `_meta/`, o processo é interrompido (nada é gerado por aproximação)

**`migrateGitbookImages.ts`**

```bash
npx vite-node scripts/migrateGitbookImages.ts -- <pasta-docs> [--dry-run] [--report-only]
```

- `<pasta-docs>`: pasta com os `.md` a vasculhar em busca de imagens hospedadas no Gitbook
- `--dry-run`: não baixa nem reescreve, só simula
- `--report-only`: só gera o relatório em `scripts/_output/gitbook-images-report.json`


## Tecnologias e pacotes utilizadas

- [VitePress](https://vitepress.dev/) - Gerador de sites estáticos baseado em Vue
- [Vue 3](https://vuejs.org/) - Framework JavaScript
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript tipado
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) - Linting e formatação de código
- [medium-zoom](https://medium-zoom.francoischalifour.com/) - Zoom em imagens (internalizado)
- [vitepress-plugin-tabs](https://vitepress-plugins.sapphi.red/tabs/) - Plugin para suportar abas