# Seções

Uma seção é uma parte horizontal do layout que pode ser habilitada ou escondida, ter ou não blocos e  configurações que alteram o comportamento dentro do tema. Uma seção ser configurada para ser posicionada em qualquer outra posição do layout, dando uma infinidade de opções para o usuário.

### Arquivo da seção

Todas as configurações que definem uma seção são armazenado em um arquivo `.json` , ou seja, pode ser aberto em qualquer sistema e possui fácil entendimento.

O nome do arquivo precisa ser prefixado com a página que deseja que a seção apareça para que o editor exiba a seção no contexto correto. Veja abaixo as possibilidades.

<table><thead><tr><th width="135.98046875">Prefixo</th><th>Página</th></tr></thead><tbody><tr><td>Sem prefixo</td><td><p>Seções que são exibidas para todas as páginas.</p><p>Atualmente suportado somente no <code>header</code> e <code>footer</code>.</p></td></tr><tr><td><code>home.</code></td><td>Seções que devem aparecer na página inicial da loja.</td></tr><tr><td><code>catalog.</code></td><td>Seções que devem aparecer na página de catálogo e busca.</td></tr><tr><td><code>product.</code></td><td>Seções que devem aparecer na página de produto.</td></tr></tbody></table>

### Atributos da seção

Os atributos abaixo estão disponíveis para a criação de uma seção. Alguns são obrigatórios, enquanto outros são opcionais. Os atributos `blocks` e `settings` são obrigatórios, mas podem ser passado um array vazio `[]` se não existirem dados para tais campos.

<table><thead><tr><th width="107.93359375">Dado</th><th width="486.9453125">Descrição</th><th>Obrigatório</th></tr></thead><tbody><tr><td><code>type</code></td><td>Tipo da seção, definido automaticamente pelo nome do arquivo.</td><td>Sim</td></tr><tr><td><code>name</code></td><td>Nome da seção.</td><td>Sim</td></tr><tr><td><code>template</code></td><td>Nome do arquivo <code>html</code> do tema que renderiza aquela seção.</td><td>Sim</td></tr><tr><td><code>limit</code></td><td>Limite dessa seção podem existir no editor do tema.</td><td>Não</td></tr><tr><td><code>static</code></td><td>Indica se o item pode ou não ser reordenado.</td><td>Não</td></tr><tr><td><code>blocks</code></td><td>Array de tipos de blocos pertencentes aquela seção.</td><td>Sim</td></tr><tr><td><code>settings</code></td><td>Array de configurações possíveis para aquela seção.</td><td>Sim</td></tr></tbody></table>

Abaixo deixo também a definição da interface typescript que define o tipo da seção.

```typescript
export interface SectionSchema {
  type: string; // Definido automaticamente pelo nome do arquivo
  name: string;
  template: string;
  limit?: number;
  static?: boolean;
  max_blocks?: number;
  blocks: SectionSchemaBlock[];
  settings: SectionSchemaSettings[];
}
```

Abaixo, um exemplo completo de seção, contendo as definições, [blocos](blocos) e [configurações](configuracoes).

```json
{
  "name": "Cabeçalho",
  "limit": 1,
  "static": true,
  "max_blocks": 4,
  "template": "header",
  "blocks": [
    {
      "type": "logo",
      "name": "Logo",
      "limit": 1,
      "static": true,
      "visible": true,
      "settings": []
    },
    {
      "type": "search",
      "name": "Busca",
      "limit": 1,
      "static": true,
      "visible": true,
      "settings": [
        {
          "id": "style",
          "type": "select",
          "label": "Estilo de exibição",
          "options": [
            {
              "value": "text-and-icon",
              "label": "Texto e ícone"
            },
            {
              "value": "icon",
              "label": "Ícone"
            }
          ],
          "default": "text-and-icon"
        },
        {
          "id": "search_text",
          "type": "text",
          "label": "Texto da busca",
          "maxLength": 35,
          "default": "Olá, o que você procura?"
        }
      ]
    },
    {
      "type": "account_cart",
      "name": "Minha conta e carrinho",
      "limit": 1,
      "static": true,
      "visible": true,
      "settings": [
        {
          "id": "account_style",
          "type": "select",
          "label": "Estilo de exibição",
          "options": [
            {
              "value": "text-and-icon",
              "label": "Texto e ícone"
            },
            {
              "value": "icon",
              "label": "Ícone"
            }
          ],
          "default": "text-and-icon"
        },
        {
          "type": "checkbox",
          "id": "show_cart_counter",
          "label": "Mostrar contador",
          "default": true
        }
      ]
    }
  ],
  "settings": [
    {
      "id": "show_message_line",
      "type": "checkbox",
      "label": "Mostrar linha de mensagem",
      "default": true,
      "info": "Utilize esse espaço para inserir avisos ou promoções"
    },
    {
      "id": "message_line_content",
      "type": "text",
      "label": "Conteúdo da linha de mensagem",
      "maxLength": 110,
      "default": "Utilize esse espaço para inserir avisos ou promoções"
    },
    {
      "id": "menu_category_levels",
      "type": "select",
      "label": "Nível das categorias",
      "options": [
        {
          "value": "first",
          "label": "Primeiro nível"
        },
        {
          "value": "second",
          "label": "Segundo nível"
        },
        {
          "value": "third",
          "label": "Terceiro nível"
        }
      ],
      "info": "Determina quantos níveis de categoria serão exibidos.",
      "default": "third"
    },
    {
      "id": "menu_style",
      "type": "select",
      "label": "Estilo do menu",
      "options": [
        {
          "value": "default",
          "label": "Padrão"
        },
        {
          "value": "hamburger",
          "label": "Recolhido"
        }
      ],
      "default": "default"
    }
  ]
}
```
