import { DefaultTheme } from 'vitepress';
import { ensureEndingWithoutSlash } from '../../helpers/ensureEndingWithoutSlash';

/**
 * Return sidebar config to Black22
 * @param basePath The base path where doc will be displayed
 * @returns
 */
export const getBlack22Sidebar = (basePath: string): DefaultTheme.SidebarItem[] => {
  basePath = ensureEndingWithoutSlash(basePath);
  return [
    {
      text: 'Apresentação',
      base: `${basePath}/apresentacao/`,
      items: [
        {
          text: 'Início',
          link: `inicio`,
        },
        {
          text: 'Manual',
          link: `manual`,
        },
        {
          text: 'Suporte',
          link: `suporte`,
        },
        {
          text: 'Instalação',
          link: `instalacao`,
        },
      ],
    },
    {
      text: 'Painel do Tema',
      base: `${basePath}/painel-do-tema/`,
      items: [
        {
          text: 'Painel Modernizado',
          link: `painel-modernizado`,
        },
        {
          text: 'Minha Loja',
          link: `minha-loja`,
        },
        {
          text: 'Cores',
          collapsed: true,
          items: [
            {
              text: 'Início',
              link: `cores/inicio`,
            },
            {
              text: 'Cores Gerais do Tema',
              link: `cores/cores-gerais-do-tema`,
            },
            {
              text: 'Cabeçalho',
              link: `cores/barra-superior`,
            },
            {
              text: 'Rodapé',
              link: `cores/elementos-do-slide`,
            },
            {
              text: 'Selo',
              link: `cores/elementos-do-slide-1`,
            },
          ],
        },
        {
          text: 'Banners',
          link: `banners`,
        },
        {
          text: 'Layout',
          collapsed: true,
          items: [
            {
              text: 'Início',
              link: `layout/inicio`,
            },
            {
              text: 'Vitrine de Produtos',
              link: `layout/vitrine-de-produtos`,
            },
            {
              text: 'Depoimentos',
              link: `layout/depoimentos`,
            },
            {
              text: 'Notícias',
              link: `layout/noticias`,
            },
            {
              text: 'Newsletter',
              link: `layout/newsletter`,
            },
            {
              text: 'Categorias e Busca',
              link: `layout/newsletter-popup`,
            },
            {
              text: 'Página do Produto',
              link: `layout/pagina-do-produto`,
            },
          ],
        },
      ],
    },
    {
      text: 'Configurações',
      base: `${basePath}/configuracoes/`,
      items: [
        {
          text: 'Imagens Padrões',
          link: `imagens-padroes`,
        },
        {
          text: 'Selos dos Produtos',
          link: `selos-dos-produtos`,
        },
        {
          text: 'Imagem na Vitrine (thumb)',
          link: `tamanho-da-vitrine`,
        },
        {
          text: 'Textos e Informações',
          link: `textos-e-informacoes`,
        },
        {
          text: 'Páginas Extras',
          link: `paginas-extras`,
        },
        {
          text: 'Formas de Pagamento',
          link: `formas-de-pagamento`,
        },
      ],
    },
    {
      text: 'Banners',
      base: `${basePath}/banners/`,
      items: [
        {
          text: 'Localização na Plataforma',
          link: `localizacao-na-plataforma`,
        },
        {
          text: 'Dimensões',
          link: `dimensoes`,
        },
        {
          text: 'Gabarito Desktop',
          link: `gabarito-desktop`,
        },
        {
          text: 'Gabarito Mobile',
          link: `gabarito-mobile`,
        },
      ],
    },
    {
      text: 'Edição no Código',
      base: `${basePath}/edicao-no-codigo/`,
      items: [
        {
          text: 'Edição no código do tema',
          link: `edicao-no-codigo-do-tema`,
        },
      ],
    },
    {
      text: 'Considerações Finais',
      base: `${basePath}/consideracoes-finais/`,
      items: [
        {
          text: 'SSL - Certificado de Segurança',
          link: `ssl-certificado-de-seguranca`,
        },
        {
          text: 'Parabéns!',
          link: `parabens`,
        },
      ],
    },
  ];
};
