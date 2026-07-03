# Blocos

Blocos são partes que podem ou não existir dentro de uma seção, podendo ou não serem criados pelo usuário conforme sua necessidade. Com os blocos o desenvolvedor pode criar vários tipos de blocos para uma determinada seção e deixa a cargo do usuário escolher qual deseja usar.

Cada bloco possui os seguintes atributos:

| Dado | Descrição | Obrigatório |
| --- | --- | --- |
| type | Tipo do bloco | Sim |
| name | Nome do bloco | Sim |
| limit | Limite desse bloco podem existir na seção. | Sim |
| static | Indica se o bloco pode ou não ser reordenado. | Não |
| visible | Indica se o bloco está ou não visível. | Não |
| settings | Configurações possíveis para aquela seção. | Sim |

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
