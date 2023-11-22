const btnAddItem = document.querySelectorAll('.btnAddItem');
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

      /* precisa conferir se existe algum item na sacola para ser exibido o modal */
      modalOrder.classList.add('show');

      /* Trabalhando no formulário */
      btnDeleteItem.addEventListener('click', ()=> {
         form.preventDefault();
         addNewItem.classList.remove('show');
         btnAddItem[i].style.display = 'block';
      });

   });
};