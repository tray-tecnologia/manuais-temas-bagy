# Edição no código do tema

::: danger
### **Atenção!**

Recomendamos criar uma cópia de segurança antes de editar os códigos HTML e CSS do seu tema. Assim, caso aconteça algum problema você poderá retornar rapidamente a um tema funcional.&#x20;

Vale lembrar que a Tray não se responsabiliza por problemas gerados devido a edição do código.

Somente edite o código do seu tema se tiver conhecimentos avançados em HTML, CSS e JS, caso contrário o tema poderá parar de funcionar na sua loja.
:::

Nós criamos um tema com diversas personalizações através do painel do tema e do painel administrativo da Tray, de modo a facilitar o controle da sua loja. Entretanto entendemos que você possa querer modificar as coisas um pouco mais afundo. É isso que vamos te explicar nessa seção.

Para fazer qualquer modificação mais complexa no seu tema será necessário que ele não esteja publicado. Mas não se preocupe, você não precisa tirar a loja do ar. Basta duplicar o tema. Caso o seu tema não esteja publicado ainda, você poderá fazer as alterações sem a necessidade de duplicar o tema, apesar de recomendarmos duplicá-lo.

Para isso **Configurações >&#x20;**_**Minha Loja > Editar layout**_, no seu tema clique em **Mais opções** e clique em Duplicar. Você poderá editar nome depois caso queira.

![](/tema-padrao-2/edicao-codigo-edicao-codigo-tema.avif)

Após duplicar o tema você terá acesso a uma nova opção chamada _**Editar HTML**_. Será através dela que você terá acesso ao editor online da plataforma para fazer as edições.

![](/tema-padrao-2/edicao-codigo-edicao-codigo-tema-2.avif)

Você poderá editar qualquer arquivo no editor de arquivos que aparecer, desde que tenha conhecimento para tal. Recomendamos que só altere os arquivos _**style.css**_ e _**style.min.css**_ que controlam os estilos do tema.

No editor online os arquivos ficam a direita da nela em em exibição em lista. Os arquivos css mencionados acima estarão dentro da pasta css. Ao clicar em algum arquivo ele será carregado na parte mais a direita da tela. A imagem abaixo exemplifica isso.

![](/tema-padrao-2/edicao-codigo-edicao-codigo-tema-3.avif)

Faça as alterações que quiser e salve utilizando o botão abaixo. Para que as modificações sejam refletidas na loja é necessário atualizar o arquivo css minificado, o _**style.min.css**_. Copie todo o código do arquivo _**style.css**_ e utilize uma ferramenta de minificação de css. Recomendamos a ferramenta CSS Minifier. Você pode acessar ela clicando [**aqui**](https://cssminifier.com/).

Copie o código minificado gerado pela ferramenta e colo no arquivo _**style.min.css**_ sobrescrevendo todo o conteúdo já existente. Salve as alterações utilizando o botão salvar.

Após esse procedimento você precisará publicar novamente o tema para que as modificações fiquem disponíveis na loja. Siga os passos vistos na seção **Instalação.** Pronto. Alterações feitas.&#x20;

::: info
**Vale lembrar que:** Devido ao cache da plataforma, pode demorar até 1 hora para que as alterações sejam aplicadas. Lembre se limpar o cache do seu navegador antes de verificar se as alterações apareceram.
:::
