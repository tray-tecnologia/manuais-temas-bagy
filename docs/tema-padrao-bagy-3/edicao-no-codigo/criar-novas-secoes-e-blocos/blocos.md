# Blocos

Blocos são partes que podem ou não existir dentro de uma seção, podendo ou não serem criados pelo usuário conforme sua necessidade. Com os blocos o desenvolvedor pode criar vários tipos de blocos para uma determinada seção e deixa a cargo do usuário escolher qual deseja usar.

Cada bloco possui os seguintes atributos:

<table><thead><tr><th width="110.53125">Dado</th><th width="507.87109375">Descrição</th><th>Obrigatório</th></tr></thead><tbody><tr><td><code>type</code></td><td>Tipo do bloco</td><td>Sim</td></tr><tr><td><code>name</code></td><td>Nome do bloco</td><td>Sim</td></tr><tr><td><code>limit</code></td><td>Limite desse bloco podem existir na seção.</td><td>Sim</td></tr><tr><td><code>static</code></td><td>Indica se o bloco pode ou não ser reordenado.</td><td>Não</td></tr><tr><td><code>visible</code> </td><td>Indica se o bloco está ou não visível.</td><td>Não</td></tr><tr><td><code>settings</code></td><td>Configurações possíveis para aquela seção.</td><td>Sim</td></tr></tbody></table>

Abaixo deixo também a definição da interface typescript que define o tipo do bloco.

```typescript
export interface SectionSchemaBlock {
  type: string;
  name: string;
  limit: number;
  static?: boolean;
  visible?: boolean;
  settings: SectionSchemaSettings[];
}
```
