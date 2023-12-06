# App de Cardápio Digital desenvolvido em HTML, CSS e JavaScript 

## Descrição

O App é um projeto de estudos em que utilizei apenas html, css e JavaScript. O pedido é enviado diretamente para o WhatsApp.

O App também não usa nenhuma forma de armazenamento de informações,  ao atualizar a página todas as informações digitadas serão perdidas. 

### Como usar?

Substitua o valor da constante phoneNumber pelo seu número de WhatsApp
```JavaScript 
const phoneNumber = "Seu numero de WhatsApp com o 55 (somente números)";
``` 

Se quiser alterar os produtos, descrição e preços basta mudar o valor da propriedade na ```const items```

```JavaScript
const items = [
   {nome: "Mude o nome do produto", descricao:"Descrição do produto", preco: "preco do produto deve ser um numero", observacoes: "observações", imagem: "o nome da imagem sem o caminho e sem a extensão do arquivo"}
];
```

### Algumas ideias de melhorias futuras

- O pedido está repetindo os itens iguais quando colocado mais de um.  Esse é um problema que precisa ser resolvido mas atualmente estou sem tempo. Irei corrigir no futuro;
- No botão ```Sobre nós``` inserir um modal que exiba informações sobre o estabelecimento; 
- Bloquear o botão enviar pedido para ser liberado somente se todas as informações estiverem preenchidas;
- Adicionar uma condição para exibir observação ao enviar o pedido somente se existir conteúdo;
- Adicionar no pedido a informação que o pedido é entrega ou retirada;
- Usar ```localStorage``` para armazenar as informações do cliente (nome, telefone e endereço).

### Licença

Esse projeto é de uso livre. Você pode usar o código para qualquer fim. 

Só peço que se gostou do projeto e for usá-lo em algo público não deixe de citar o meu nome.



