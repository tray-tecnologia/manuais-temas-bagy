# Sanitização

O editor aplica **sanitização na colagem** (e, em alguns campos, também durante a edição) nos componentes `InputText`, `TextArea`, `RichText` e `Code`. O conteúdo que não for permitido é removido ou bloqueado; quando isso ocorre, o usuário recebe uma mensagem informativa.\
Abaixo veremos mais detalhes.

#### Objetivo

Reduzir o risco de **XSS (Cross-Site Scripting)** e de **CSS malicioso** quando o lojista cola conteúdo nos campos do editor do tema.\
O fluxo principal é interceptar o evento de colagem e tratar o texto/HTML/CSS . Quando algo é removido ou bloqueado, o usuário vê uma mensagem informativa.

Esta camada no **frontend** oferece feedback imediato, reduz carga no servidor e evita erros antes do envio. O **back-end** mantém validação própria,  a sanitização do editor **não substitui** a segurança do servidor.

#### Stack técnica

| Camada | Biblioteca                                       | Função                                                |
| ------ | ------------------------------------------------ | ----------------------------------------------------- |
| HTML   | [DOMPurify](https://github.com/cure53/DOMPurify) | Lista de tags e atributos por tipo de campo.          |
| CSS    | [PostCSS](https://postcss.org/)                  | Remove declarações e at-rules consideradas perigosas. |

***

Segue tabela com o que cada campo permite de Tags e Atributos:

#### Tags

| Tags       | Permitida em                                 |
| ---------- | -------------------------------------------- |
| a          | `InputText`, `TextArea`, `RichText`, `Code`  |
| abbr       | `RichText`, `Code`                           |
| address    | `RichText`, `Code`                           |
| article    | `RichText`, `Code`                           |
| aside      | `Code`                                       |
| audio      | `Code`                                       |
| b          | `InputText`, `TextArea`, `RichText`, `Code`  |
| blockquote | `RichText`, `Code`                           |
| br         | `InputText`,  `TextArea`, `RichText`, `Code` |
| button     | `Code`                                       |
| caption    | `Code`                                       |
| cite       | `RichText`, `Code`                           |
| code       | `InputText`,  `TextArea`, `RichText`, `Code` |
| col        | `Code`                                       |
| colgroup   | `Code`                                       |
| datalist   | `Code`                                       |
| dd         | `Code`                                       |
| del        | `RichText`, `Code`                           |
| details    | `RichText`, `Code`                           |
| div        | `RichText`, `Code`                           |
| dl         | `Code`                                       |
| dt         | `Code`                                       |
| em         | `InputText`,  `TextArea`, `RichText`, `Code` |
| figcaption | `RichText`, `Code`                           |
| figure     | `RichText`, `Code`                           |
| footer     | `RichText`, `Code`                           |
| h1         | `RichText`, `Code`                           |
| h2         | `RichText`, `Code`                           |
| h3         | `RichText`, `Code`                           |
| h4         | `RichText`, `Code`                           |
| h5         | `RichText`, `Code`                           |
| h6         | `RichText`, `Code`                           |
| header     | `RichText`, `Code`                           |
| hr         | `RichText`, `Code`                           |
| i          | `InputText`,  `TextArea`, `RichText`, `Code` |
| img        | `RichText`, `Code`                           |
| label      | `Code`                                       |
| legend     | `Code`                                       |
| li         | `RichText`, `Code`                           |
| mark       | `InputText`,  `TextArea`, `RichText`, `Code` |
| menu       | `Code`                                       |
| nav        | `Code`                                       |
| ol         | `RichText`, `Code`                           |
| p          | `RichText`, `Code`                           |
| picture    | `RichText`, `Code`                           |
| pre        | `RichText`, `Code`                           |
| progress   | `Code`                                       |
| q          | `InputText`,  `TextArea`, `RichText`, `Code` |
| s          | `InputText`,  `TextArea`, `RichText`, `Code` |
| section    | `RichText`, `Code`                           |
| small      | `InputText`,  `TextArea`, `RichText`, `Code` |
| source     | `RichText`, `Code`                           |
| span       | `InputText`,  `TextArea`, `RichText`, `Code` |
| strong     | `InputText`,  `TextArea`, `RichText`, `Code` |
| sub        | `InputText`,  `TextArea`, `RichText`, `Code` |
| summary    | `RichText`, `Code`                           |
| sup        | `InputText`,  `TextArea`, `RichText`, `Code` |
| table      | `Code`                                       |
| tbody      | `Code`                                       |
| td         | `Code`                                       |
| tfoot      | `Code`                                       |
| th         | `Code`                                       |
| thead      | `Code`                                       |
| time       | `InputText`,  `TextArea`, `RichText`, `Code` |
| tr         | `Code`                                       |
| track      | `Code`                                       |
| u          | `InputText`,  `TextArea`, `RichText`, `Code` |
| ul         | `RichText`, `Code`                           |
| video      | `Code`                                       |

#### Atributos

::: info
**Atenção**

Alguns dos atributos listados não podem ser usados em todas as tags HTML listadas acimas. É dever do desenvolvedor saber quais atributos podem ser usados com quais tags.
:::

| Atributos               | Permitido em                                 |
| ----------------------- | -------------------------------------------- |
| abbr                    | `RichText`, `Code`                           |
| accesskey               | `Code`                                       |
| alt                     | `RichText`, `Code`                           |
| cellpadding             | `Code`                                       |
| cellspacing             | `Code`                                       |
| cite                    | `RichText`, `Code`                           |
| class                   | `InputText`,  `TextArea`, `RichText`, `Code` |
| clear                   | `Code`                                       |
| code                    | `Code`                                       |
| cols                    | `Code`                                       |
| colspan                 | `Code`                                       |
| compact                 | `Code`                                       |
| controls                | `Code`                                       |
| controlslist            | `Code`                                       |
| crossorigin             | `Code`                                       |
| data                    | `RichText`, `Code`                           |
| datetime                | `InputText`,  `TextArea`, `RichText`, `Code` |
| decoding                | `RichText`, `Code`                           |
| default                 | `Code`                                       |
| direction               | `Code`                                       |
| disablepictureinpicture | `Code`                                       |
| disableremoteplayback   | `Code`                                       |
| disallowdocumentaccess  | `Code`                                       |
| download                | `RichText`, `Code`                           |
| draggable               | `Code`                                       |
| elementtiming           | `Code`                                       |
| end                     | `Code`                                       |
| face                    | `Code`                                       |
| headers                 | `Code`                                       |
| height                  | `RichText`, `Code`                           |
| high                    | `Code`                                       |
| href                    | `InputText`,  `TextArea`, `RichText`, `Code` |
| hreflang                | `RichText`, `Code`                           |
| hreftranslate           | `Code`                                       |
| hspace                  | `Code`                                       |
| id                      | `InputText`,  `TextArea`, `RichText`, `Code` |
| imagesizes              | `RichText`, `Code`                           |
| imagesrcset             | `RichText`, `Code`                           |
| importance              | `Code`                                       |
| incremental             | `Code`                                       |
| inert                   | `Code`                                       |
| kind                    | `Code`                                       |
| label                   | `Code`                                       |
| lang                    | `RichText`, `Code`                           |
| latencyhint             | `Code`                                       |
| leftmargin              | `Code`                                       |
| link                    | `Code`                                       |
| loading                 | `RichText`, `Code`                           |
| longdesc                | `Code`                                       |
| loop                    | `Code`                                       |
| low                     | `Code`                                       |
| lowsrc                  | `Code`                                       |
| marginheight            | `Code`                                       |
| marginwidth             | `Code`                                       |
| media                   | `RichText`, `Code`                           |
| muted                   | `Code`                                       |
| nohref                  | `Code`                                       |
| noresize                | `Code`                                       |
| noshade                 | `Code`                                       |
| nowrap                  | `Code`                                       |
| open                    | `RichText`, `Code`                           |
| optimum                 | `Code`                                       |
| playsinline             | `Code`                                       |
| poster                  | `Code`                                       |
| pseudo                  | `Code`                                       |
| referrerpolicy          | `RichText`, `Code`                           |
| rel                     | `RichText`, `Code`                           |
| resources               | `Code`                                       |
| reversed                | `RichText`, `Code`                           |
| role                    | `RichText`, `Code`                           |
| rows                    | `Code`                                       |
| rowspan                 | `Code`                                       |
| rules                   | `Code`                                       |
| scope                   | `Code`                                       |
| scrollamount            | `Code`                                       |
| scrolldelay             | `Code`                                       |
| scrolling               | `Code`                                       |
| sizes                   | `RichText`, `Code`                           |
| span                    | `Code`                                       |
| spellcheck              | `RichText`, `Code`                           |
| src                     | `RichText`, `Code`                           |
| srclang                 | `Code`                                       |
| srcset                  | `RichText`, `Code`                           |
| standby                 | `Code`                                       |
| start                   | `RichText`, `Code`                           |
| step                    | `Code`                                       |
| tabindex                | `Code`                                       |
| target                  | `RichText`, `Code`                           |
| text                    | `Code`                                       |
| title                   | `InputText`,  `TextArea`, `RichText`, `Code` |
| topmargin               | `Code`                                       |
| translate               | `RichText`, `Code`                           |
| truespeed               | `Code`                                       |
| valuetype               | `Code`                                       |
| vspace                  | `Code`                                       |
| width                   | `RichText`, `Code`                           |
| wrap                    | `Code`                                       |

***

#### Camada CSS&#x20;

Usada quando o conteúdo colado é identificado como CSS.

#### Propriedades CSS Bloqueadas: `deniedProps`

| Propriedade      | Razão                                          |
| ---------------- | ---------------------------------------------- |
| `behavior`       | Permite executar HTC scripts no IE             |
| `-moz-binding`   | XBL binding pode executar JS no Firefox antigo |
| `expression`     | CSS expressions executam JS no IE              |
| `-ms-filter`     | Filtros IE podem conter código                 |
| `filter`         | Pode conter expressions no IE                  |
| `-o-link`        | Opera pode seguir links arbitrários            |
| `-o-link-source` | Fonte de link no Opera                         |

#### Padrões de Valores Bloqueados: `deniedValues`&#x20;

| Padrão             | Razão                               |
| ------------------ | ----------------------------------- |
| `javascript:`      | Execução de JavaScript via URL      |
| `vbscript:`        | Execução de VBScript via URL        |
| `data:`            | Data URIs podem conter scripts      |
| `expression(`      | CSS expressions (IE)                |
| `url(javascript:)` | JS em propriedades url()            |
| `@import`          | Pode carregar CSS externo malicioso |
| `\\00`             | Caracteres escapados para bypass    |

Antes da análise principal, o editor remove linhas perigosas do tipo `@import` e `@charset`. Assim o CSS fica mais seguro e não quebra casos em que `@import` aparece só como texto dentro de uma propriedade.

No resultado final, podem faltar blocos vazios e as linhas podem ser reorganizadas, isso é esperado e não indica problema de segurança.

***

#### Mensagens ao usuário

* Bloqueio total: _"O código colado não pôde ser mantido por motivos de segurança. Verifique o manual do tema para saber mais."_
* Remoção parcial: _"Parte do texto colado foi removido por motivos de segurança. Verifique o manual do tema para saber mais."_
