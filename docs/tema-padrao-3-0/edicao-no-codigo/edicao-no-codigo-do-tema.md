# Editando o código do seu tema

::: danger **Atenção!**
Essa parte da documentação é voltada a usuários com conhecimento avançados de programação. Caso não possua tal conhecimento, **prossiga com cautela!**
:::

Nós criamos os temas com diversas personalizações através do painel do tema e do painel administrativo da Bagy, de modo a facilitar o controle da sua loja. Entretanto, entendemos que você possa querer modificar as coisas um pouco mais afundo. Nessa seção vamos te explicar como fazer isso.

### Duplicando o tema

Para fazer qualquer modificação mais complexa no seu tema será necessário que ele não esteja publicado. Para isso você não precisa tirar a loja do ar,  basta duplicar o tema publicado. Caso o seu tema não esteja publicado ainda, você poderá fazer as alterações sem a necessidade de duplicá-lo.

Para isso acesse no menu lateral esquerdo,  em **Configurações > Minha loja > Editar layout**. No seu tema clique em **Mais opções** e sem seguida clique em **Duplicar tema**. Você poderá editar o nome depois, caso queira.

::: info **Dica**
Apesar de não ser necessário duplicar para editar o código quando ele não está publicado, recomendamos que o faça. Assim, caso tiver algum problema você terá uma cópia de segurança.
:::

![image](/tema-padrao-3-0/edicao-codigo-tema.png)

### Editando o código

Após duplicar o tema você terá acesso a uma nova opção chamada **Editar HTML**. Será através dela que você terá acesso ao editor online da plataforma para fazer as edições.

![image](/tema-padrao-3-0/edicao-codigo-tema-2.png)

Você poderá editar qualquer arquivo presente no tema pelo editor de arquivos. Recomendamos que tome muito cuidado para não prejudicar a exibição do tema. O editor online mostra os arquivos a esquerda da tela, em exibição em lista. Os arquivos estarão dentro de pastas. Ao clicar em algum arquivo ele será carregado na parte mais a direita da tela. A imagem abaixo exemplifica isso.

![image](/tema-padrao-3-0/edicao-codigo-tema-3.png)

Faça as alterações que quiser e salve apertando no teclado as teclas **CTRL + S** ou através do botão salvar no topo superior direito da tela.

Arquivos **CSS** e **JS** podem estar minificados, ou seja, reduzindo seu tamanho e diagramação para melhorar o carregamento. Essa técnica não impacta no funcionamento da sua loja, mas dificulta o entendimento do código por pessoas. Esses arquivos geralmente tem a terminação `min.css` ou `min.js`.&#x20;

Caso encontre algum arquivo desses, procure pelo respectivo nome de arquivo sem o `.min` e duplique ele. Assim você garante ter uma cópia de segurança caso aconteça algum problema e não é impactado pela minificação.

### Publicando nova versão

Após esse procedimento você precisará publicar novamente o tema para que as modificações fiquem disponíveis na loja. Siga os passos vistos na seção **Instalação** e tudo pronto, alterações disponíveis para seus usuários.

::: info **Dica**
Devido ao cache da plataforma, pode demorar até 1 hora para que as alterações sejam aplicadas. Lembre de limpar o cache do seu navegador antes de verificar se as alterações foram aplicadas.
:::
