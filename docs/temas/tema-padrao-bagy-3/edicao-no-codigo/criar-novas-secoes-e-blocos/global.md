# Global

Todos os temas precisam definir configurações que são aplicadas globalmente, independente da seção ou página. Para isso criarmos o arquivo `global.json` no novo editor. Disponível na pasta `configs/editor`, ele permite definir configurações que afetam todo o tema.&#x20;

Nesse arquivo podemos configurar cores, tipografia, logos, selos, redes sociais, proporção de imagens, bordas, entre outros diversos itens. Se a configuração pode afetar vários pontos do tema, esse é o local ideal para ela ficar.&#x20;

### Organização

As configurações globais também são organizadas por seções, mas de uma forma bem mais simplificada. Chamamos elas de **seção de configuração global.**

Cada seção de configuração global terá o atributo `name`, contendo o nome daquela seção, e o atributo `settings`, contendo todas a configurações. Esses dois atributos são obrigatórios. Abaixo tem a definição da interface typescript que define o tipo de cada seção de configuração.

```typescript
export interface ConfigSchema {
  name: string;
  settings: SectionSchemaSettings[];
}
```

::: warning **Atenção!**
Não confunda a seção de configuração global com as seções definidas por páginas. As seções de configuração global são simplificadas!
:::

As configurações que podem ser usadas nessas seções são idênticas as configurações para as seções e blocos tradicionais. Saiba mais sobre as [configurações aqui](configuracoes).

Abaixo um exemplo desse arquivo com algumas das configurações disponíveis no Tema Padrão Bagy 3.0

```json
[
  {
    "name": "Tipografia",
    "settings": [
      {
        "type": "paragraph",
        "content": "Escolha a tipografia ideal para sua loja. A tipografia escolhida será aplicada nos títulos e textos da loja."
      },
      {
        "id": "font_family",
        "type": "radio",
        "label": "Família de fontes",
        "options": [
          {
            "value": "'Outfit', sans-serif",
            "label": "Outfit"
          },
          {
            "value": "'Inter', sans-serif",
            "label": "Inter"
          },
          {
            "value": "'Lora', serif",
            "label": "Lora"
          }
        ],
        "default": "'Outfit', sans-serif"
      }
    ]
  },
  {
    "name": "Cores",
    "settings": [
      {
        "type": "paragraph",
        "content": "Personalize sua loja com as cores da sua marca."
      },
      {
        "id": "color_base",
        "type": "color_picker",
        "label": "Cor base",
        "default": "#0975D4"
      },
      {
        "id": "color_base_hover",
        "type": "color_picker",
        "label": "Cor base com sobreposição mouse",
        "default": "#0F5999 "
      },
      {
        "id": "color_base_font",
        "type": "color_picker",
        "label": "Cor do texto sobre a cor base",
        "default": "#FFFFFF"
      },
      {
        "id": "color_highlight",
        "type": "color_picker",
        "label": "Cor de destaque",
        "default": "#C43651"
      },
      {
        "id": "color_highlight_hover",
        "type": "color_picker",
        "label": "Cor de destaque com sobreposição mouse",
        "default": "#963144"
      },
      {
        "id": "color_highlight_font",
        "type": "color_picker",
        "label": "Cor do texto sobre a cor de destaque",
        "default": "#FFFFFF"
      },
      {
        "id": "color_font",
        "type": "color_picker",
        "label": "Cor principal dos textos",
        "default": "#232323"
      },
      {
        "id": "color_font_secondary",
        "type": "color_picker",
        "label": "Cor de apoio dos textos",
        "default": "#353535"
      },
      {
        "id": "color_border",
        "type": "color_picker",
        "label": "Cor das bordas",
        "default": "#EDEDED"
      },
      {
        "id": "color_background",
        "type": "color_picker",
        "label": "Cor do fundo",
        "default": "#FFFFFF"
      }
    ]
  }
]
```
