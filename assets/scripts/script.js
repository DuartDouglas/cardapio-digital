//============================================================
// ITENS DO CARDÁPIO
//============================================================

const items = [
   { nome: "Burguer A", descricao: "Pão, hambúrguer 150g, bacon, batata rústica, cheddar e molho especial da casa.", preco: 25.90, observacoes: "", imagem: "burguer-a" },
   { nome: "Burguer B", descricao: "Pão, hambúrguer 150g, bacon, batata rústica, cheddar e molho especial da casa.", preco: 28.90, observacoes: "", imagem: "burguer-b" },
   { nome: "Burguer C", descricao: "Pão, hambúrguer 150g, bacon, batata rústica, cheddar e molho especial da casa.", preco: 31.90, observacoes: "", imagem: "burguer-c" },
   { nome: "Burguer D", descricao: "Pão, hambúrguer 150g, bacon, batata rústica, cheddar e molho especial da casa.", preco: 28.90, observacoes: "", imagem: "burguer-d" }
];

let order = [];

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

         const form = document.createElement('form');

         const label = document.createElement('label');
         label.textContent = 'Alguma observação?';

         const textarea = document.createElement('textarea');
         textarea.setAttribute('cols', '30');
         textarea.setAttribute('rows', '3');
         textarea.setAttribute('placeholder', 'Ex: Tirar cheddar, etc...');

         const buttons = document.createElement('div');
         buttons.classList = 'buttons';

         const btnDeleteItem = document.createElement('button');
         btnDeleteItem.classList = 'btnDeleteItem';

         const svgBtnDeleteItem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
         const useBtnDeleteItem = document.createElementNS("http://www.w3.org/2000/svg", "use");
         useBtnDeleteItem.setAttributeNS("http://www.w3.org/1999/xlink", "href", "assets/images/icons.svg#btnDeleteItem");

         const div = document.createElement('div');
         div.classList = 'btnsQtd';

         const buttonMinus = document.createElement('button');
         buttonMinus.textContent = '-';

         const span = document.createElement('span');
         span.textContent = '1';

         const buttonPlus = document.createElement('button');
         buttonPlus.textContent = '+';

         const buttonAdd = document.createElement('button');
         buttonAdd.classList = 'btnAdd';
         buttonAdd.textContent = 'Adicionar';

         form.appendChild(label);
         form.appendChild(textarea);
         form.appendChild(buttons);
         buttons.appendChild(btnDeleteItem);
         btnDeleteItem.appendChild(svgBtnDeleteItem);
         svgBtnDeleteItem.appendChild(useBtnDeleteItem);
         buttons.appendChild(div);
         div.appendChild(buttonMinus);
         div.appendChild(span);
         div.appendChild(buttonPlus);
         buttons.appendChild(buttonAdd);

         addNewItem.appendChild(form);
         itemMenu.appendChild(addNewItem);

         // precisa conferir se existe algum item na sacola para ser exibido o modal
         modalOrder.classList.add('show');

         // Trabalhando no formulário
         /*  btnDeleteItem.addEventListener('click', () => {
             form.preventDefault();
             addNewItem.classList.remove('show');
             btnAddItem[i].style.display = 'block';
          }); */
      });

   });
}

window.onload = createMenu;



//============================================================
// CÓDIGO ANTIGO =============================================
//============================================================
/* const btnAddItem = document.querySelectorAll('.btnAddItem');
const modalOrder = document.getElementById('modalOrder');


for (let i = 0; i < btnAddItem.length; i++) {
   btnAddItem[i].addEventListener('click', () => {
      btnAddItem[i].style.display = 'none';
      const addNewItem = document.querySelectorAll('.addNewItem')[i];
      addNewItem.classList.add('show');

      const form = document.createElement('form');

      const label = document.createElement('label');
      label.textContent = 'Alguma observação?';

      const textarea = document.createElement('textarea');
      textarea.setAttribute('cols', '30');
      textarea.setAttribute('rows', '3');
      textarea.setAttribute('placeholder', 'Ex: Tirar cheddar, etc...');

      const buttons = document.createElement('div');
      buttons.classList = 'buttons';

      const btnDeleteItem = document.createElement('button');
      btnDeleteItem.classList = 'btnDeleteItem';

      const svgBtnDeleteItem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const useBtnDeleteItem = document.createElementNS("http://www.w3.org/2000/svg", "use");
      useBtnDeleteItem.setAttributeNS("http://www.w3.org/1999/xlink", "href", "assets/images/icons.svg#btnDeleteItem");

      const div = document.createElement('div');
      div.classList = 'btnsQtd';

      const buttonMinus = document.createElement('button');
      buttonMinus.textContent = '-';

      const span = document.createElement('span');
      span.textContent = '1';

      const buttonPlus = document.createElement('button');
      buttonPlus.textContent = '+';

      const buttonAdd = document.createElement('button');
      buttonAdd.classList = 'btnAdd';
      buttonAdd.textContent = 'Adicionar';

      form.appendChild(label);
      form.appendChild(textarea);
      form.appendChild(buttons);
      buttons.appendChild(btnDeleteItem);
      btnDeleteItem.appendChild(svgBtnDeleteItem);
      svgBtnDeleteItem.appendChild(useBtnDeleteItem);
      buttons.appendChild(div);
      div.appendChild(buttonMinus);
      div.appendChild(span);
      div.appendChild(buttonPlus);
      buttons.appendChild(buttonAdd);

      addNewItem.appendChild(form);

      // precisa conferir se existe algum item na sacola para ser exibido o modal
      modalOrder.classList.add('show');

      // Trabalhando no formulário
      btnDeleteItem.addEventListener('click', () => {
         form.preventDefault();
         addNewItem.classList.remove('show');
         btnAddItem[i].style.display = 'block';
      });

   });
}; */