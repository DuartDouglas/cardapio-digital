const modalSummaryOrder = document.getElementById('modalSummaryOrder');
const btnViewOrder = document.getElementById('btnViewOrder');


//============================================================
// ITENS DO CARDÁPIO =========================================
//============================================================
const items = [
   { nome: "Burguer A", descricao: "Pão, hambúrguer 150g, bacon, batata rústica, cheddar e molho especial da casa.", preco: 25.90, observacoes: "", imagem: "burguer-a" },
   { nome: "Burguer B", descricao: "Pão, hambúrguer 150g, bacon, batata rústica, cheddar e molho especial da casa.", preco: 28.90, observacoes: "", imagem: "burguer-b" },
   { nome: "Burguer C", descricao: "Pão, hambúrguer 150g, bacon, batata rústica, cheddar e molho especial da casa.", preco: 31.90, observacoes: "", imagem: "burguer-c" },
   { nome: "Burguer D", descricao: "Pão, hambúrguer 150g, bacon, batata rústica, cheddar e molho especial da casa.", preco: 28.90, observacoes: "", imagem: "burguer-d" }
];

// ====================
// == PREÇO DO FRETE == 
// ====================
const deliveryPrice = 40.00;

let order = [];
let total = 0;

// CRIA MENU DE ITEMS 
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

         if (order.length < 1) {
            btnViewOrder.style.display = "none";
         }

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

         const buttonMinus = document.createElement('button');
         buttonMinus.classList = 'btnMinus';
         buttonMinus.innerHTML = '<svg> <use xlink:href="assets/images/icons.svg#minus"/></svg>';
         buttonMinus.addEventListener('click', () => {
            removeFromCart(item);
            span.textContent = `${order.filter(i => i === item).length} und`;

            if (order.filter(i => i === item).length < 1) {
               buttonMinus.style.display = "none";
            } else {
               buttonMinus.style.display = "flex";
            }

            if (order.length < 1) {
               modalSummaryOrder.classList.remove('show');
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

            btnViewOrder.style.display = "flex";
            modalSummaryOrder.classList.add('show');
         }

         addNewItem.appendChild(label);
         addNewItem.appendChild(textarea);
         addNewItem.appendChild(buttons);
         buttons.appendChild(span);
         buttons.appendChild(buttonMinus);
         buttons.appendChild(buttonAdd);
         itemMenu.appendChild(addNewItem);

         // MSG PARA NENHUM ITEM NA SACOLA
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
   updateOrderSummary();
}

function removeFromCart(item) {
   const index = order.findIndex(i => i === item);

   if (index !== -1) {
      order.splice(index, 1);
      total -= item.preco;
      updateOrderSummary();
   }
}

// MODAL RESUMO DO PEDIDO
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

function viewOrder() {
   const viewOrderContainer = document.getElementById('viewOrderContainer');
   document.body.style.overflow = 'hidden';
   if (order.length >= 1) {
      viewOrderContainer.classList.add('show');
   }

   // Input para Dados pessoais e de entrega 
   const deliver = document.getElementById('deliver');
   const pickUp = document.getElementById('pickUp');
   const inAddress = document.getElementById('inAddress');

   deliver.addEventListener('change', () => {
      deliver.checked = true;
      pickUp.checked = false;
      inDeliveryAddress.classList.add('show');
      inAddress.setAttribute('required', 'true');
   });

   pickUp.addEventListener('change', () => {
      pickUp.checked = true;
      deliver.checked = false;
      inDeliveryAddress.classList.remove('show');
      inAddress.removeAttribute('required');
   });

   // Resumo do pedido
   const summaryOrderItems = document.getElementById('summaryOrderItems');

   summaryOrderItems.innerHTML = "";

   // Cria um conjunto para manter o controle dos itens já exibidos
   const displayedItems = new Set();

   // Itera sobre os itens no carrinho
   order.forEach(item => {
      const itemName = item.nome;

      // Verifica se o item já foi exibido, se sim, continua para o próximo item
      if (displayedItems.has(itemName)) {
         return;
      }

      const itemsWithSameName = order.filter(i => i.nome === itemName);
      const quantity = itemsWithSameName.length;
      const description = itemsWithSameName[0].descricao;
      const observations = itemsWithSameName[0].observacoes || "Sem observações";
      const unitPrice = itemsWithSameName[0].preco;
      const image = itemsWithSameName[0].imagem;

      const totalItem = quantity * unitPrice;

      // =============================
      // CRIA OS ELEMENTO EM ITEMS
      // =============================
      const divItem = document.createElement('div');
      divItem.classList = 'item';
      const itemContainer = document.createElement('div');
      itemContainer.classList = 'item-container';
      const itemImg = document.createElement('div');
      itemImg.classList = 'item-img';
      const img = document.createElement('img');
      img.src = `assets/images/${image}.png`;
      img.alt = itemName;
      const itemDescription = document.createElement('div');
      itemDescription.classList = 'item-description';
      const header = document.createElement('div');
      header.classList = 'header';
      const burguerTitle = document.createElement('h4');
      burguerTitle.textContent = itemName;
      const burguerPrice = document.createElement('p');
      burguerPrice.classList = 'price';
      burguerPrice.textContent = `R$ ${unitPrice.toFixed(2)}`;
      const descriptionBurguer = document.createElement('p');
      descriptionBurguer.textContent = description;
      const summaryItemContainer = document.createElement('div');
      summaryItemContainer.classList = 'summaryItemContainer';
      const itemObservationsP = document.createElement('p');
      itemObservationsP.classList = 'itemObservations';
      itemObservationsP.innerHTML = `Observações: <span>${observations}</span>`;
      const summaryItem = document.createElement('p');
      summaryItem.classList = 'summaryItem';
      summaryItem.textContent = `${quantity} und/ Total R$ ${totalItem.toFixed(2)}`;

      divItem.appendChild(itemContainer);
      itemContainer.appendChild(itemImg);
      itemImg.appendChild(img);
      itemContainer.appendChild(itemDescription);
      itemDescription.appendChild(header);
      header.appendChild(burguerTitle);
      header.appendChild(burguerPrice);
      itemDescription.appendChild(descriptionBurguer);
      divItem.appendChild(summaryItemContainer);
      summaryItemContainer.appendChild(itemObservationsP);
      summaryItemContainer.appendChild(summaryItem);

      summaryOrderItems.appendChild(divItem);
      // =============================
      // !!! CRIA OS ELEMENTO EM ITEMS
      // =============================

      // Adiciona o nome do item ao conjunto de itens exibidos
      displayedItems.add(itemName);

      // VALOR TOTAL SEM FRETE 
      const valueSubTotalOrder = document.getElementById('valueSubTotalOrder');
      valueSubTotalOrder.textContent = `R$ ${total.toFixed(2)}`;
      
      // VALOR DO FRETE 
      const valueDeliveryPrice = document.getElementById('valueDeliveryPrice');
      valueDeliveryPrice.textContent = `R$ ${deliveryPrice.toFixed(2)}`;
      
      // VALOR TOTAL
      const valueTotalPriceOrder = document.getElementById('valueTotalPriceOrder');
      let calcTotal = Number(deliveryPrice.toFixed(2)) + Number(total.toFixed(2));
      valueTotalPriceOrder.textContent = `R$ ${calcTotal.toFixed(2)}`;
   });
}

btnViewOrder.addEventListener('click', viewOrder);


// FECHA MODAL DO PEDIDO 
document.getElementById('closeSummaryOrder').addEventListener('click', () => {
   viewOrderContainer.classList.remove('show');
   document.body.style.overflow = 'auto';
});

// FECHA MODAL DO PEDIDO 
document.getElementById('btnEditItems').addEventListener('click', () => {
   viewOrderContainer.classList.remove('show');
   document.body.style.overflow = 'auto';
});

window.onload = createMenu;