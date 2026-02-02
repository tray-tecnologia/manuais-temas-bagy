import type { DefaultTheme } from 'vitepress';

const normalizeBasePath = (basePath: string): string => {
  if (basePath.endsWith('/')) {
    return basePath.slice(0, -1);
  }
  return basePath;
};

export const sidebarDefault = (): DefaultTheme.SidebarItem[] => {
  return [
    { text: 'Apresentação', link: 'temas' },
    { text: 'Tema Padrão Bagy 3.0', link: '/tema-padrao-3-0/apresentacao/inicio' },
  ];
};

export const sidebarTemaPadrao30 = (basePath: string): DefaultTheme.SidebarItem[] => {
  basePath = normalizeBasePath(basePath);
  return [
    {
      text: 'Apresentação',
      base: `${basePath}/apresentacao/`,
      items: [
        { text: 'Início', link: 'inicio' },
        { text: 'Manual', link: 'manual' },
        { text: 'Suporte', link: 'suporte' },
        { text: 'Instalação', link: 'instalacao' },
      ],
    },

    {
      text: 'Painel do tema',
      base: `${basePath}/painel-do-tema/`,
      items: [
        { text: 'Painel Modernizado', link: 'painel-modernizado' },

        {
          text: 'Configurações Gerais',
          base: `${basePath}/painel-do-tema/configuracoes-gerais/`,
          collapsed: true,
          items: [
            { text: 'Início', link: `inicio` },
            { text: 'Geral', link: `geral` },
            { text: 'Logo', link: `logo` },
            { text: 'Tipografia', link: `tipografia` },
            { text: 'Cores', link: `cores` },
            { text: 'Selos', link: `selos` },
            { text: 'Redes Sociais', link: `redes-sociais` },
          ],
        },

        { text: 'Cabeçalho', link: 'cabecalho' },
        { text: 'Rodapé', link: 'rodape' },

        {
          text: 'Página Inicial',
          base: `${basePath}/painel-do-tema/pagina-inicial/`,
          collapsed: true,
          items: [
            { text: 'Início', link: `inicio` },
            { text: 'Full Banner', link: `full-banner` },
            { text: 'Barra de Informações', link: `barra-de-informacoes` },
            { text: 'Linha de Banners', link: `linha-de-banners` },
            { text: 'Grade de Banners', link: `grade-de-banners` },
            { text: 'Vitrine', link: `vitrine` },
            { text: 'Sobre a Loja', link: `sobre-a-loja` },
            { text: 'Notícias', link: `noticias` },
            { text: 'Marcas', link: `marcas` },
            { text: 'Avaliações da Loja', link: `avaliacoes-da-loja` },
          ],
        },

        {
          text: 'Página de Catalogo',
          base: `${basePath}/painel-do-tema/pagina-de-catalogo/`,
          collapsed: true,
          items: [
            { text: 'Início', link: `inicio` },
            { text: 'Principal da Categoria', link: `principal-da-categoria` },
          ],
        },

        {
          text: 'Página de Produto',
          base: `${basePath}/painel-do-tema/pagina-de-produto/`,
          collapsed: true,
          items: [
            { text: 'Início', link: `inicio` },
            { text: 'Produto', link: `produto` },
            { text: 'Compre Junto', link: `compre-junto` },
            { text: 'Abas de Produtos', link: `abas-de-produtos` },
            { text: 'Produtos Relacionados', link: `produtos-relacionados` },
            { text: 'Produtos Visualizados Recentemente', link: `produtos-visualizados-recentemente` },
          ],
        },
      ],
    },

    {
      text: 'Configurações',
      base: `${basePath}/configuracoes/`,
      items: [
        { text: 'Imagens Padrões', link: 'imagens-padroes' },
        { text: 'Carrinho Lateral', link: 'carrinho-lateral' },
        { text: 'Selos dos Produtos', link: 'selos-dos-produtos' },
        { text: 'Imagem na Vitrine (thumb)', link: 'tamanho-da-vitrine' },
        { text: 'Textos e Informações', link: 'textos-e-informacoes' },
        { text: 'Páginas Extras', link: 'paginas-extras' },
        { text: 'Formas de Pagamento', link: 'formas-de-pagamento' },
        { text: 'Aparência do Checkout', link: 'aparencia-do-checkout' },
      ],
    },

    {
      text: 'Banners',
      base: `${basePath}/banners/`,
      items: [
        { text: 'Localização na Plataforma', link: 'localizacao-na-plataforma' },
        { text: 'Dimensões', link: 'dimensoes' },
      ],
    },

    {
      text: 'Edição no Código',
      base: `${basePath}/edicao-no-codigo/`,
      items: [
        { text: 'Editando o código do seu tema', link: 'edicao-no-codigo-do-tema' },
        {
          text: 'Criar novas seções e blocos',
          base: `${basePath}/edicao-no-codigo/criar-novas-secoes-e-blocos/`,
          collapsed: true,
          items: [
            { text: 'Início', link: `inicio` },
            { text: 'Editor', link: `editor` },
            { text: 'Global', link: `global` },
            { text: 'Seções', link: `secoes` },
            { text: 'Blocos', link: `blocos` },
            { text: 'Configurações', link: `configuracoes` },
          ],
        },
      ],
    },

    {
      text: 'Considerações Finais',
      base: `${basePath}/consideracoes-finais/`,
      items: [
        { text: 'SSL - Certificado de Segurança', link: 'ssl-certificado-de-seguranca' },
        { text: 'Parabéns!', link: 'parabens' },
      ],
    },
  ];
};
