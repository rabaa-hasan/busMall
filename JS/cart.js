  
/* global Cart */
'use strict';


// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
let table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let  cart;

function loadCart() {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

function infoForm() {
  const infoArray = ['Name', 'Street', 'City', 'State', 'ZIP code', 'Phone Number'];
  let mainEl = document.getElementsByTagName('main')[0];
  let sectionEl = document.createElement('section');
  mainEl.appendChild(sectionEl);
  let formEl = document.createElement('form');
  sectionEl.appendChild(formEl);
  let fieldsetEl = document.createElement('fieldset');
  formEl.appendChild(fieldsetEl);
  let legendEl = document.createElement('legend');
  fieldsetEl.appendChild(legendEl);
  legendEl.textContent = 'Add your Info';
  for (let i = 0; i < infoArray.length; i++) {
    let pEl = document.createElement('p');
    fieldsetEl.appendChild(pEl);
    let labelEl = document.createElement('label');
    pEl.appendChild(labelEl);
    labelEl.for = infoArray[i];
    labelEl.textContent = infoArray[i];
    let inputEl = document.createElement('input');
    pEl.appendChild(inputEl);
    inputEl.type = 'text';
    inputEl.id = infoArray[i];
    inputEl.placeholder = infoArray[i];
  }
  let pEl = document.createElement('p');
  fieldsetEl.appendChild(pEl);
  let labelEl = document.createElement('label');
  pEl.appendChild(labelEl);
  labelEl.for = 'creditCard';
  labelEl.textContent = 'Credit Card Number:';
  let inputEl = document.createElement('input');
  pEl.appendChild(inputEl);
  inputEl.type = 'number';
  inputEl.id = 'creditCard';
  inputEl.placeholder = '16 digits';
  inputEl.maxLength = 16;
  let buttonEl = document.createElement('button');
  fieldsetEl.appendChild(buttonEl);
  buttonEl.textContent = 'Process Order';

}
// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tbEl = document.getElementsByTagName('tbody')[0];
  tbEl.textContent = '';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR

  let tbEl = document.getElementsByTagName('tbody')[0];
  for (let i = 0; i < cart.items.length; i++) {
    let trEl = document.createElement('tr');
    tbEl.appendChild(trEl);
    let tdElDelete = document.createElement('td');
    let tdElItem = document.createElement('td');
    let tdElQuantity = document.createElement('td');
    let tdElPic = document.createElement('td');
    trEl.appendChild(tdElDelete);
    trEl.appendChild(tdElQuantity);
    trEl.appendChild(tdElItem);
    trEl.appendChild(tdElPic);
    tdElDelete.innerHTML = `<a id="remove${i}">X</a>`;
    tdElItem.textContent = cart.items[i].product;
    tdElQuantity.textContent = cart.items[i].quantity;
    let imgEl = document.createElement('img');
    imgEl.id = 'productImg';
    tdElPic.appendChild(imgEl);
    for (let j = 0; j < Product.allProducts.length; j++) {
      if (cart.items[i].product === Product.allProducts[j].name) {
        imgEl.src = `${Product.allProducts[j].filePath}`;
        break;
      }
    }
  }
}

function removeItemFromCart(event) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table
  let removeArray = document.getElementsByTagName('a');
  //let removeArray = document.getElementsByClassName('remove');
  for (let i = 0; i < removeArray.length; i++) {
    if (event.target.id === `remove${i}`) {
      cart.removeItem(cart.items[i]);
      break;
    }
  }
  cart.saveToLocalStorage();
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
infoForm();