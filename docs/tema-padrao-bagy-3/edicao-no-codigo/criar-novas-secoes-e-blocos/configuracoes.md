# Configurações

Configurações são os itens mais primitivos das seções ou blocos que o desenvolvedor cria para que os usuários possam inserir dados ou para serem informados. As configurações do editor do tema 3.0 se divide em **Configurações de Entrada** e **Configurações Informativas**.

### Configurações de entrada

Configurações de entrada definem campos ou opções que as seções ou bloco terão e que estarão a disposição do usuário para serem modificados. Existem 8 tipos diferentes de configurações que o desenvolvedor pode escolher para criar múltiplas configurações que o usuário irá usar para personalizar do seu modo.

#### Atributos padrões

Os atributos abaixo são comuns a todas as configurações de entrada. Contudo, dependendo do tipo de configuração podem existir atributos extras.

<table><thead><tr><th width="112.12109375">Atributo</th><th width="507.74609375">Descrição</th><th>Obrigatório</th></tr></thead><tbody><tr><td><code>type</code></td><td>Atributo que indica de qual tipo é a configuração.</td><td>Sim</td></tr><tr><td><code>id</code></td><td>ID usado para acessar o valor configurado.</td><td>Sim</td></tr><tr><td><code>label</code></td><td>Label usada no editor do tema para instrução do usuário</td><td>Sim</td></tr><tr><td><code>info</code></td><td>Texto informativo opcional sobre a configuração.</td><td>Não</td></tr><tr><td><code>immutable</code></td><td>Indicação se o campo pode ou não ser alterado no editor.</td><td>Não</td></tr></tbody></table>

#### checkbox

Uma configuração do tipo `checkbox` cria um campo checkbox. Essa configuração pode ser usada para habilitar ou desabilitar uma funcionalidade. Além dos atributos padrões, esse campo ainda exige o atributo `default` indicado se a configuração está ativa ou não por padrão.

:::tabs
== Código

```json
{
  "type": "checkbox",
  "id": "show_message_line",
  "label": "Mostrar linha de mensagem",
  "info": "Utilize esse espaço para inserir avisos ou promoções",
  "default": true
}
```

== Saída

<img src="/tema-padrao-3-0/edicao-codigo-checkbox.png" />

:::

#### radio

Uma configuração do tipo `radio` cria um campo radio. Essa configuração pode ser usada para selecionar uma opção dentre vários valores pré definidos. Além dos atributos padrões, esse campo ainda exige o atributo `options` indicando os valores pré definidos e o atributo  `default` indicado a qual dos valores pré definidos é o padrão.

:::tabs
== Código

```json
{
  "type": "radio",
  "id": "border_radius",
  "label": "Raio das bordas",
  "default": "50px",
  "options": [
    {
      "value": "50px",
      "label": "Arredondado"
    },
    {
      "value": "8px",
      "label": "Pouco arredondado"
    },
    {
      "value": "0px",
      "label": "Quadrado"
    }
  ],
  "info": "Escolha o estilo dos botões, pesquisa e campos de input da sua loja."
}
```

== Saída
<img src="/tema-padrao-3-0/edicao-codigo-radio.png" />
:::


#### range

Uma configuração do tipo `range` cria um campo slider. Essa configuração pode ser usada para selecionar uma opção dentre vários valores pré definidos em uma interface mais intuitiva e quando os valores são da mesma grandeza. Além dos atributos padrões, esse campo ainda exige os seguintes atributos:

<table><thead><tr><th width="112.12109375">Atributo</th><th width="494.50390625">Descrição</th><th>Obrigatório</th></tr></thead><tbody><tr><td><code>min</code></td><td>Valor mínimo que pode ser selecionado.</td><td>Sim</td></tr><tr><td><code>max</code></td><td>Valor máximo que pode ser selecionado.</td><td>Sim</td></tr><tr><td><code>step</code></td><td>Incremento entre os passos do slider.</td><td>Sim</td></tr><tr><td><code>unit</code></td><td>Unidade do campo, exemplo <code>px</code> para tamanho da fonte.</td><td>Não</td></tr><tr><td><code>default</code></td><td>Indica o valor padrão do campo.</td><td>Não</td></tr></tbody></table>

:::tabs
== Código

```json
{
  "type": "range",
  "id": "products_quantity",
  "label": "Quantidade de produtos",
  "min": 4,
  "max": 16,
  "step": 4,
  "unit": "produtos",
  "default": 8
},
```

== Saída
<img src="/tema-padrao-3-0/edicao-codigo-range.png" />
:::


#### select

Uma configuração do tipo `select` cria um campo select. Essa configuração pode ser usada para selecionar uma opção dentre vários valores pré definidos. Além dos atributos padrões, esse campo ainda exige o atributo `options` indicando os valores pré definidos e o atributo  `default` indicado a qual dos valores pré definidos é o padrão.

:::tabs
== Código

```json
{
  "id": "type",
  "type": "select",
  "label": "Tipo da vitrine",
  "options": [
    {
      "label": "Mais vendidos",
      "value": "top_seller"
    },
    {
      "label": "Lançamentos",
      "value": "new"
    },
    {
      "label": "Destaques",
      "value": "featured"
    },
    {
      "label": "Frete Grátis",
      "value": "free_shipping"
    },
    {
      "label": "Promoções",
      "value": "promotion"
    }
  ]
},
```

== Saída
<img src="/tema-padrao-3-0/edicao-codigo-select.png" />
:::

#### text

Uma configuração do tipo `text` cria um campo de texto. Essa configuração pode ser usada para que os usuários insiram curtos texto personalizados. Além dos atributos padrões, esse campo ainda exige os seguintes atributos:

<table><thead><tr><th width="123.5078125">Atributo</th><th width="494.50390625">Descrição</th><th>Obrigatório</th></tr></thead><tbody><tr><td><code>default</code></td><td>Valor padrão para o campo.</td><td>Não</td></tr><tr><td><code>placeholder</code></td><td>Texto exibido no campo quando não preenchido.</td><td>Não</td></tr><tr><td><code>maxLength</code></td><td>Tamanho máximo do texto permitido.</td><td>Não</td></tr></tbody></table>

:::tabs
== Código

```json
{
  "type": "text",
  "id": "title",
  "label": "Título",
  "default": "Lançamentos",
  "placeholder": "Título da vitrine"
}
```

== Saída
<img src="/tema-padrao-3-0/edicao-codigo-text.png" />
:::

#### rich\_text

Uma configuração do tipo `rich_text` cria um campo de texto multilinhas que permite algumas personalizações básicas do texto. Essa configuração pode ser usada permitir que o usuário crie textos melhor formatados. Além dos atributos padrões, esse campo ainda permite configurar o atributo `maxLength` indicando o tamanho máximo do texto permitido e o atributo  `default` indicado o valor padrão para o campo.

:::tabs
== Código

```json
{
  "id": "description",
  "type": "rich_text",
  "label": "Descrição",
  "maxLength": 500,
  "default": "Texto sobre a sua loja"
}
```

== Saída
<img src="/tema-padrao-3-0/edicao-codigo-richtext.png" />
:::

#### image\_picker

Uma configuração do tipo `image_picker` cria um campo que permite o usuário selecionar e enviar imagens. Essa configuração pode ser usada quando quiser permitir o usuário enviar imagens que serão configuradas e armazenadas diretamente no tema. Além dos atributos padrões, esse campo ainda permite configurar o atributo  `default` indicado o valor padrão para o campo.

:::tabs
== Código

```json
{
  "id": "store_image",
  "type": "image_picker",
  "label": "Imagem",
  "info": "Tamanho recomendado: 525x405 px"
}
```

== Saída
<img src="/tema-padrao-3-0/edicao-codigo-imagepicker.png" />
:::


#### color\_picker

Uma configuração do tipo `color_picker` cria um campo que permite o usuário selecionar uma cor. Essa configuração pode ser usada para definir a cor a ser usada em vários elementos de um tema, como o texto. Além dos atributos padrões, esse campo ainda permite configurar o atributo  `default` indicado a cor padrão para o campo.

:::tabs
== Código

```json
{
  "id": "color_base",
  "type": "color_picker",
  "label": "Cor base",
  "default": "#0975D4"
}
```

== Saída
_Sem preview ainda..._
:::


### Configurações informativas

As configurações informativas são configurações visíveis aos usuários, mas que servem apenas como guia ou informativo. Essas configurações também **não possuem os atributos padrões** das configurações normais. Abaixo estão mapeados os tipos.

#### standard\_images

Uma configuração do tipo `standard_images` cria uma visualização de uma imagem padrão que foi configurada dentro do admin da plataforma. Isso permite referenciar configurações de imagens que são feitas em outros locais da plataforma, mas que podem afetar o tema. Os atributos disponível nessa configuração são:

<table><thead><tr><th width="123.5078125">Atributo</th><th width="494.50390625">Descrição</th><th>Obrigatório</th></tr></thead><tbody><tr><td><code>type</code></td><td>Tipo da configuração. Valor fixo <code>standard_images</code>  </td><td>Sim</td></tr><tr><td><code>label</code></td><td>Texto do cabeçalho.</td><td>Sim</td></tr><tr><td><code>content</code></td><td>Identificação da imagem padrão que deve ser exibida.</td><td>Sim</td></tr><tr><td><code>info</code></td><td>Texto informativo opcional sobre a configuração.</td><td>Não</td></tr></tbody></table>

:::tabs
== Código

```json
{
  "type": "standard_images",
  "label": "Logo",
  "content": "logo_loja",
  "info": "Logo da loja cadastrada em [Imagens Padrões]({{store-url}}/adm/cores/cores.php?aba=imagens)"
}
```

== Saída
<img src="/tema-padrao-3-0/edicao-codigo-logo.png" />
:::

#### header

Uma configuração do tipo `header` cria um cabeçalho dentro do bloco ou da seção. Esse tipo de configuração é interessante para separar trechos e deixar mais organizados as configurações disponíveis. Os atributos disponível nessa configuração são:

<table><thead><tr><th width="123.5078125">Atributo</th><th width="494.50390625">Descrição</th><th>Obrigatório</th></tr></thead><tbody><tr><td><code>type</code></td><td>Tipo da configuração. Valor fixo <code>header</code>  </td><td>Sim</td></tr><tr><td><code>content</code></td><td>Texto do cabeçalho.</td><td>Sim</td></tr><tr><td><code>info</code></td><td>Texto informativo opcional sobre a configuração.</td><td>Não</td></tr></tbody></table>

:::tabs
== Código

```json
{
  "type": "header",
  "content": "Família de fonte",
  "info": "Escolha uma família de fonte para usar em sua loja."
}
```

== Saída
<img src="/tema-padrao-3-0/edicao-codigo-header.png" />
:::

#### paragraph

Uma configuração do tipo `paragraph` cria um paragrafo dentro das configurações do bloco ou da seção. Esse tipo de configuração é interessante dar mais esclarecimentos sobre alguma configuração mais complexa. Os atributos disponível nessa configuração são:

<table><thead><tr><th width="123.5078125">Atributo</th><th width="494.50390625">Descrição</th><th>Obrigatório</th></tr></thead><tbody><tr><td><code>type</code></td><td>Tipo da configuração. Valor fixo <code>paragraph</code>  </td><td>Sim</td></tr><tr><td><code>content</code></td><td>Texto do paragrafo.</td><td>Sim</td></tr></tbody></table>

:::tabs
== Código

```json
{
  "type": "paragraph",
  "content": "Escolha a tipografia ideal para sua loja. A tipografia escolhida será aplicada nos títulos e textos da loja."
}
```

== Saída
<img src="/tema-padrao-3-0/edicao-codigo-paragraph.png" />
:::