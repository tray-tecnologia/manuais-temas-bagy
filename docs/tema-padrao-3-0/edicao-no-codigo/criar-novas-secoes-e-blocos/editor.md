# Editor

![image](/tema-padrao-3-0/edicao-codigo-criar-novas-secoes-editor.png)

O editor do Tema Padrão Bagy 3.0 foi criado pensando no recurso drag and drop desde o início. Assim conseguimos otimizar cada parte dele para que funcione da melhor maneira possível.&#x20;

Como visto anteriormente, além de permitir reordenar as seções para que atendam a sua necessidade, ele permite que nossos clientes e parceiros criem seções e blocos totalmente personalizados sem ter que alterar blocos já existentes no tema e nem que precisem mudar uma linha do código do editor.

O editor usa Typescript, Vue 3, Prime Vue, Vite e Tailwind CSS, algumas das tecnologias mais recentes quanto ao desenvolvimento web front-end, garantindo que ele seja rápido e responsivo. Seu código, presente nos arquivos do tema, está compilado, otimizando a quantidade de arquivos e o tamanho.

O editor suporta os navegadores Google Chrome, Mozilla Firefox, Microsoft Edge e Apple Safari nas suas versões mais recentes para desktop. **Dispositivos móveis não são suportados.**

::: danger **Atenção!**
O código fonte do editor antes da compilação **não está** disponível aos clientes e parceiros, sendo de uso exclusivo Bagy!
:::

### Localização dos arquivos

Os arquivos do editor do Tema Padrão Bagy 3.0 ficam dentro da estrutura de arquivos do tema em diferentes pastas. As pastas `css/editor`  e `js/editor` guardam os arquivos `.css` e `.js` compilados pelo time da Bagy.&#x20;

A pasta `configs/editor` guarda as configurações das seções que são carregadas pelo editor do tema e  no qual os clientes e parceiros podem alterar ou criar suas próprias.

```
├── configs/
│   ├── editor/
│   │   ├── sections/
│   │   └── global.json
│   ├── settings.json
│   └── settings.html
│
├── css/editor/index.{hash}.css
└── js/editor/index.{hash}.js
```

O print abaixo mostra essa estrutura, focando principalmente nessa pasta `configs/editor` onde pode ser visto todos as seções que o Tema Padrão Bagy 3.0 disponibiliza.

![image](/tema-padrao-3-0/edicao-codigo-criar-novas-secoes-editor-2.png)