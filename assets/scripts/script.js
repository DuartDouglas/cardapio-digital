//============================================================
// ITENS DO CARDÁPIO
//============================================================
const modalSummaryOrder = document.getElementById('modalSummaryOrder');

const items = [
   { nome: "Burguer A", descricao: "Pão, hambúrguer 150g, bacon, batata rústica, cheddar e molho especial da casa.", preco: 25.90, observacoes: "", imagem: "burguer-a" },
   { nome: "Burguer B", descricao: "Pão, hambúrguer 150g, bacon, batata rústica, cheddar e molho especial da casa.", preco: 28.90, observacoes: "", imagem: "burguer-b" },
   { nome: "Burguer C", descricao: "Pão, hambúrguer 150g, bacon, batata rústica, cheddar e molho especial da casa.", preco: 31.90, observacoes: "", imagem: "burguer-c" },
   { nome: "Burguer D", descricao: "Pão, hambúrguer 150g, bacon, batata rústica, cheddar e molho especial da casa.", preco: 28.90, observacoes: "", imagem: "burguer-d" }
];

let order = [];
let total = 0;

const createMenu = () => {
   const menuItemsContainer = document.getElementById('menuItemsContainer');

   menuItemsContainer.innerHTML = "";

   items.forEach((item) => {
      const itemMenu = document.createElement('div');
      itemMenu.className = "item";

      const itemContainer = document.createElement('div');
      itemContainer.className = "item-container";

      const itemContainerDescription = document.createElement('div');
      itemContainerDescription.className = "item-description";

      const itemName = document.createElement('h4');
      itemName.textContent = item.nome;

      const itemDescription = document.createElement('p');
      itemDescription.textContent = item.descricao;

      const itemPrice = document.createElement('p');
      itemPrice.className = "price";
      itemPrice.textContent = "R$ " + item.preco.toFixed(2);

      const itemContainerImg = document.createElement('div');
      itemContainerImg.className = "item-img";

      const itemImg = document.createElement('img');
      itemImg.src = `assets/images/${item.imagem}.png`;
      itemImg.alt = item.nome;


      let btnAddItem = document.createElement('button');
      btnAddItem.className = "btnAddItem";
      btnAddItem.textContent = "Querro esse";

      itemMenu.appendChild(itemContainer);
      itemContainer.appendChild(itemContainerDescription);
      itemContainerDescription.appendChild(itemName);
      itemContainerDescription.appendChild(itemDescription);
      itemContainerDescription.appendChild(itemPrice);
      itemContainer.appendChild(itemContainerImg);
      itemContainerImg.appendChild(itemImg);
      itemMenu.appendChild(btnAddItem);

      menuItemsContainer.appendChild(itemMenu);

      //============================================================
      // Abre observações e botão adicionar item
      //============================================================
      btnAddItem.addEventListener('click', () => {
         btnAddItem.style.display = 'none';
         const addNewItem = document.createElement('div');
         addNewItem.className = 'addNewItem';

         const label = document.createElement('p');
         label.classList = "label";
         label.textContent = 'Alguma observação?';

         const textarea = document.createElement('textarea');
         textarea.setAttribute('cols', '30');
         textarea.setAttribute('rows', '3');
         textarea.setAttribute('placeholder', 'Ex: Tirar cheddar, etc...');
         textarea.addEventListener('input', (event) => {
            item.observacoes = event.target.value;
         });

         const buttons = document.createElement('div');
         buttons.classList = 'buttons';

         const span = document.createElement('span');
         span.textContent = `Não adicionado`;

         /* const btnDeleteItem = document.createElement('button');
         btnDeleteItem.classList = 'btnDeleteItem';

         const svgBtnDeleteItem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
         const useBtnDeleteItem = document.createElementNS("http://www.w3.org/2000/svg", "use");
         useBtnDeleteItem.setAttributeNS("http://www.w3.org/1999/xlink", "href", "assets/images/icons.svg#btnDeleteItem"); */

         const div = document.createElement('div');
         div.classList = 'btnsQtd';

         const buttonMinus = document.createElement('button');
         buttonMinus.innerHTML = '<svg> <use xlink:href="assets/images/icons.svg#minus"/></svg>';
         buttonMinus.addEventListener('click', () => {
            removeFromCart(item);
            span.textContent = `${order.filter(i => i === item).length} und`;

            if (order.filter(i => i === item).length < 1) {
               buttonMinus.style.display = "none";
            } else {
               buttonMinus.style.display = "flex";
            }
         });

         buttonMinus.style.display = "none";
         
         const buttonAdd = document.createElement('button');
         buttonAdd.classList = 'btnAdd';

         buttonAdd.innerHTML = `Adicionar <svg><use xlink:href="assets/images/icons.svg#plus" /></svg>`;
         buttonAdd.onclick = () => {
            addToCart(item);
            span.textContent = `${order.filter(i => i === item).length} und`;

            if (order.filter(i => i === item).length < 1) {
               buttonMinus.style.display = "none";
            } else {
               buttonMinus.style.display = "flex";
            }
         }

         addNewItem.appendChild(label);
         addNewItem.appendChild(textarea);
         addNewItem.appendChild(buttons);
         buttons.appendChild(span);

         buttons.appendChild(div);
         div.appendChild(buttonMinus);

         buttons.appendChild(buttonAdd);

         itemMenu.appendChild(addNewItem);

         // se não existe nenhum item na sacola exibido no modal a msg
         modalSummaryOrder.classList.add('show');
         let qtdOrderSummary = document.getElementById("qtdOrderSummary");
         if (order.length < 1) {
            qtdOrderSummary.innerHTML = "Nenhum item no carrinho";
         }
      });

   });
}

function addToCart(item) {
   order.push(item);
   total += item.preco;
   //console.log(total);
   updateOrderSummary();
}

function removeFromCart(item) {
   const index = order.findIndex(i => i === item);

   if (index !== -1) {
      order.splice(index, 1);
      total -= item.preco;
      updateOrderSummary();
      //checkout(); // Atualiza o resumo do pedido ao remover um item
   }
}

function updateOrderSummary() {
   let qtdOrderSummary = document.getElementById("qtdOrderSummary");
   let totalPrice = document.getElementById('totalPrice');
   if (order.length < 1) {
      qtdOrderSummary.innerHTML = "Nenhum item no carrinho";
      totalPrice.innerHTML = "";
   } else if (order.length < 2) {
      qtdOrderSummary.innerHTML = "Total sem entrega";
      totalPrice.innerHTML = "R$ " + total.toFixed(2) + " <span>/ " + order.length + " item</span>";
   } else {
      totalPrice.innerHTML = "R$ " + total.toFixed(2) + " <span>/ " + order.length + " itens</span>";
   }
}

function checkout() {
   const checkoutContainer = document.getElementById('checkoutContainer');
   checkoutContainer.innerHTML = ""; // Limpa o conteúdo anterior

   if (order.length === 0) {
      checkoutContainer.innerHTML = "Nenhum item no carrinho";
   } else {
      const checkoutTitle = document.createElement('h2');
      checkoutTitle.textContent = "Resumo do Pedido";

      const itemList = document.createElement('ul');

      // Cria um objeto para armazenar a contagem de cada item e suas observações
      const itemDetails = {};

      // Agrupa os itens e suas observações no carrinho
      order.forEach(item => {
         const itemName = item.nome;
         const itemObservations = item.observacoes || "Sem observações";

         if (!itemDetails[itemName]) {
            itemDetails[itemName] = {
               quantity: 0,
               observations: itemObservations,
            };
         }

         itemDetails[itemName].quantity++;
      });

      // Adiciona cada item, sua quantidade e observações ao resumo
      for (const itemName in itemDetails) {
         const { quantity, observations } = itemDetails[itemName];

         const listItem = document.createElement('li');
         listItem.innerHTML = `<strong>${quantity}x ${itemName} - </strong>Observações: ${observations}`;

         itemList.appendChild(listItem);
      }

      const totalContainer = document.createElement('div');
      totalContainer.textContent = `Total: R$ ${total.toFixed(2)}`;

      checkoutContainer.appendChild(checkoutTitle);
      checkoutContainer.appendChild(itemList);
      checkoutContainer.appendChild(totalContainer);
   }

   modalSummaryOrder.classList.add('show');
}

const seeOrder = document.getElementById('seeOrder')
seeOrder.addEventListener('click', checkout);

window.onload = createMenu;