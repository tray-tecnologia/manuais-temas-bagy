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

1. Configure um proxy reverso `Opcional`

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

## Scripts disponíveis

Existem três comandos disponíveis no projeto.


| Comando           | Descrição                                |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento     |
| `npm run build`   | Gera a build de produção (em `/public`)  |
| `npm run preview` | Visualiza a build de produção localmente |


## Tecnologias Utilizadas

- [VitePress](https://vitepress.dev/) - Gerador de sites estáticos baseado em Vue
- [Vue 3](https://vuejs.org/) - Framework JavaScript
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript tipado
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) - Linting e formatação de código
- [medium-zoom](https://medium-zoom.francoischalifour.com/) - Zoom em imagens