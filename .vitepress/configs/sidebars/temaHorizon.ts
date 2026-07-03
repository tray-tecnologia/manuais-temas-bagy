import { DefaultTheme } from 'vitepress';
import { ensureEndingWithoutSlash } from '../../helpers/ensureEndingWithoutSlash';

/**
 * Return sidebar config to Tema Padrão Bagy 3.0
 * @param basePath The base path where doc will be displayed
 * @returns
 */
export const getTemaHorizonSidebar = (basePath: string): DefaultTheme.SidebarItem[] => {
  basePath = ensureEndingWithoutSlash(basePath);
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
            { text: 'Cores', link: `cores` },
            { text: 'Fundo da Loja', link: `fundo-da-loja` },
            { text: 'Fontes', link: `fontes` },
            { text: 'Bordas', link: `bordas` },
            { text: 'Imagem de Produto', link: `imagem-de-produto` },
            { text: 'Botão Comprar', link: `botao-comprar` },
            { text: 'Redes Sociais', link: `redes-sociais` },
            { text: 'Redirecionamento do Carrinho', link: `redirecionamento-do-carrinho` },
            { text: 'Popup de Aviso', link: `popup-de-aviso` },
            { text: 'LGPD - Lei Geral de Proteção de Dados ', link: `lgpd` },
            { text: 'Carrinho', link: `carrinho` },
            { text: 'Card de Produto', link: `card-de-produto` },
            { text: 'Estilo Customizado (CSS) ', link: `estilo-customizado` },
            { text: 'Selos', link: `selos` },
            { text: 'Notícias', link: `noticias` },
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
            { text: 'Onde encontrar', link: `onde-encontrar` },
            { text: 'Botão com ação', link: `botao-com-acao` },
            { text: 'Depoimentos', link: `depoimentos` },
            { text: 'Avaliações da loja', link: `avaliacoes-da-loja` },
            { text: 'Html', link: `html` },
            { text: 'Texto com imagem', link: `texto-com-imagem` },
            { text: 'Imagem com tópicos', link: `imagem-com-topicos` },
            { text: 'Últimas notícias', link: `ultimas-noticias` },
            { text: 'Texto com video', link: `texto-com-video` },
            { text: 'Imagem com texto sobreposto', link: `imagem-com-texto-sobreposto` },
            { text: 'Vitrine com contador superior', link: `vitrine-com-contador-superior` },
            { text: 'Vitrine de produtos', link: `vitrine-de-produtos` },
            { text: 'Produtos com imagem de fundo', link: `produtos-com-imagem-de-fundo` },
            { text: 'Produto detalhado', link: `produto-detalhado` },
            { text: 'Vitrine com contador lateral', link: `vitrine-com-contador-lateral` },
            { text: 'Vitrine de produtos em abas', link: `vitrine-de-produtos-em-abas` },
            { text: 'Galeria de marcas', link: `galeria-de-marcas` },
            { text: 'Slideshow', link: `slideshow` },
            { text: 'Mini banner com texto', link: `mini-banner-com-texto` },
            { text: 'Banners em grid', link: `banners-em-grid` },
            { text: 'Banners', link: `banners` },
            { text: 'Linha de banners', link: `linha-de-banners` },
            { text: 'Galeria de imagens', link: `galeria-de-imagens` },
            { text: 'Galeria do Canal do YouTube', link: `galeria-do-canal-do-youtube` },
            { text: 'Vídeo do YouTube', link: `video-do-youtube` },
          ],
        },

        {
          text: 'Página de Catalogo',
          base: `${basePath}/painel-do-tema/pagina-de-catalogo/`,
          collapsed: true,
          items: [
            { text: 'Início', link: `inicio` },
            { text: 'Topo da listagem', link: `topo-da-listagem` },
            { text: 'Listagem de Produtos', link: `listagem-de-produtos` },
            { text: 'Descrição da Categoria', link: `descricao-da-categoria` },
          ],
        },

        {
          text: 'Página de Produto',
          base: `${basePath}/painel-do-tema/pagina-de-produto/`,
          collapsed: true,
          items: [
            { text: 'Início', link: `inicio` },
            { text: 'Informações do Produto', link: `informacoes-do-produto` },
            { text: 'Compre Junto', link: `compre-junto` },
            { text: 'Abas de Produtos', link: `abas-de-produtos` },
            { text: 'Produtos Relacionados', link: `produtos-relacionados` },
            { text: 'Produtos Visualizados', link: `produtos-visualizados` },
          ],
        },
      ],
    },

    {
      text: 'Configurações',
      base: `${basePath}/configuracoes/`,
      items: [
        { text: 'Carrinho Lateral', link: 'carrinho-lateral' },
        { text: 'Selos dos Produtos', link: 'selos-dos-produtos' },
        { text: 'Imagem na Vitrine (thumb)', link: 'tamanho-da-vitrine' },
        { text: 'Páginas Extras', link: 'paginas-extras' },
        { text: 'Formas de Pagamento', link: 'formas-de-pagamento' },
        { text: 'Aparência do Checkout', link: 'aparencia-do-checkout' },
      ],
    },

    {
      text: 'Banners',
      base: `${basePath}/banners/`,
      items: [{ text: 'Dimensões', link: 'dimensoes' }],
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
        { text: 'Sanitização', link: 'sanitizacao' },
      ],
    },

    {
      text: 'Considerações Finais',
      base: `${basePath}/consideracoes-finais/`,
      items: [
        { text: 'Loja segura', link: 'loja-segura' },
        { text: 'SSL - Certificado de Segurança', link: 'ssl-certificado-de-seguranca' },
        { text: 'Parabéns!', link: 'parabens' },
      ],
    },
  ];
};
