const btnAddItem = document.getElementById('btnAddItem');
const modalPed = document.getElementById('modalPed');
const addNewItem = document.getElementById('addNewItem');

btnAddItem.addEventListener('click', ()=> {
   addNewItem.classList.add('show');
   btnAddItem.style.display = 'none';
   modalPed.classList.add('show');
});

const createAddNewItem = () => {
   const form = document.createElement('form');
   const label = document.createElement('label');
   const textarea = document.createElement('textarea');
   const div1 = document.createElement('div');
   const div2 = document.createElement('div');
   const buttonMinus = document.createElement('button');
   const span = document.createElement('span');
   const buttonPlus = document.createElement('button');
   const buttonAdd = document.createElement('button');
}