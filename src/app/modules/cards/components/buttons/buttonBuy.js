export default function buttonBuy(event, cardsSection) {
   if (!cardsSection) {
      return;
   }

   const cartItems = getCartItemsFromStorage();
   cartItems.forEach(cartItem => addToCartElement(cartItem));

   const emptyCartMessage = document.getElementById('empty-cart-message');
   if (emptyCartMessage && cartItems.length > 0) {
      emptyCartMessage.style.display = 'none';
   }

   cardsSection.addEventListener('click', function (event) {
      const addToCartButton = event.target.closest('.button__basket');

      if (addToCartButton) {
         const buttonId = addToCartButton.id;
         addToCart(buttonId);
      }
   });

   setTimeout(() => {
      const deleteAllButton = document.querySelector('.cart-delete-all-btn');
      deleteAllButton.addEventListener('click', function () {
         removeAllCartItems();
      });
   }, 100);
}

function deleteCartItem(buttonId, cartItemElement) {
   const cartContainer = document.getElementById('cart-container');
   const updatedCartItems = cartItems.filter(item => item.id !== buttonId);

   if (cartItemElement) {
      cartContainer.removeChild(cartItemElement);
      removeCartItemFromStorage(buttonId);
   }

   if (updatedCartItems.length === 0) {
      removeAllCartItems();
   }

   const emptyCartMessage = document.getElementById('empty-cart-message');
   if (emptyCartMessage) {
      if (updatedCartItems.length === 0) {
         emptyCartMessage.style.display = 'flex';
      } else {
         emptyCartMessage.style.display = 'none';
      }
   }
}

function removeAllCartItems() {
   clearCartItemsFromStorage();

   const cartContainer = document.getElementById('cart-container');
   cartContainer.innerHTML = '';

   const cartItems = getCartItemsFromStorage();
   const emptyCartMessage = document.getElementById('empty-cart-message');
   if (emptyCartMessage && cartItems.length === 0) {
      emptyCartMessage.style.display = 'flex';
   }

   calculateTotalPrice();
}

function clearCartItemsFromStorage() {
   localStorage.removeItem('cartItems');
   localStorage.setItem('cartItems', JSON.stringify([]));
}

function addToCart(buttonId) {
   fetch(`https://6464831d043c103502bb5293.mockapi.io/api/terminators/${buttonId}`)
      .then(response => response.json())
      .then(data => {
         addToCartElement(data);
         saveCartItemToStorage(buttonId, data);
      })
      .catch(error => {
         console.log('Ошибка при получении данных', error);
      });
}

function createCartItem(terminator, id) {
   const cartItem = document.createElement('li');
   cartItem.classList.add('shopping__cart-item');
   cartItem.dataset.id = id;

   let cartInfoWrapper = document.createElement('div');
   cartInfoWrapper.classList.add('shopping__cart-list_wrapper');

   let cartItemsWrapper = document.createElement('div');
   cartItemsWrapper.classList.add('shopping__cart-list_items-wrapper');

   let cartItemImage = document.createElement('img');
   cartItemImage.classList.add('item-img');
   cartItemImage.src = terminator['main-photo-url'];
   cartItemImage.alt = terminator.name;

   const cartItemName = document.createElement('h4');
   cartItemName.classList.add('item-name');
   cartItemName.textContent = terminator.name;

   const cartItemPrice = document.createElement('h4');
   cartItemPrice.classList.add('item-price');
   cartItemPrice.textContent = `$${terminator.price.toFixed(2)}`;

   const cartDeleteItem = document.createElement("button");
   cartDeleteItem.className = "shopping__cart-delete-item";
   cartDeleteItem.innerHTML = `
   <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.14286 3.90625C2.71071 3.90625 2.35714 4.25781 2.35714 4.6875V20.3125C2.35714 20.7422 2.71071 21.0938 3.14286 21.0938H18.8571C19.2893 21.0938 19.6429 20.7422 19.6429 20.3125V4.6875C19.6429 4.25781 19.2893 3.90625 18.8571 3.90625H3.14286ZM0 4.6875C0 2.96387 1.40937 1.5625 3.14286 1.5625H18.8571C20.5906 1.5625 22 2.96387 22 4.6875V20.3125C22 22.0361 20.5906 23.4375 18.8571 23.4375H3.14286C1.40937 23.4375 0 22.0361 0 20.3125V4.6875ZM7.46429 11.3281H14.5357C15.1888 11.3281 15.7143 11.8506 15.7143 12.5C15.7143 13.1494 15.1888 13.6719 14.5357 13.6719H7.46429C6.81116 13.6719 6.28571 13.1494 6.28571 12.5C6.28571 11.8506 6.81116 11.3281 7.46429 11.3281Z" fill="black" fill-opacity="0.69" />
   </svg>`

   cartItemsWrapper.appendChild(cartItemImage);
   cartItemsWrapper.appendChild(cartInfoWrapper);

   cartInfoWrapper.appendChild(cartItemName);
   cartInfoWrapper.appendChild(cartItemPrice);

   cartItem.appendChild(cartItemsWrapper);
   cartItem.appendChild(cartDeleteItem);

   cartDeleteItem.addEventListener('click', function (event) {
      event.stopPropagation();
      const buttonId = cartItem.dataset.id;
      deleteCartItem(buttonId, this.parentNode);
   });

   return cartItem;
}

function saveCartItemsToStorage(cartItems) {
   const serializedCartItems = JSON.stringify(cartItems);
   localStorage.setItem('cartItems', serializedCartItems);

   if (cartItems.length === 0) {
      localStorage.setItem('cartItems', JSON.stringify([]));
   }
}

function deleteCartItem(buttonId, cartItem) {
   cartItem.remove();

   const cartItems = getCartItemsFromStorage();
   const updatedCartItems = cartItems.filter(item => item.id !== buttonId);

   saveCartItemsToStorage(updatedCartItems);

   calculateTotalPrice();
}

function addToCartElement(data) {
   if (data.hasOwnProperty('id')) {
      const cartItem = createCartItem(data, data.id);
      const buttonId = cartItem.dataset.id;

      setTimeout(() => {
         const cartContainer = document.getElementById('cart-container');
         const emptyCartMessage = document.getElementById('empty-cart-message');

         if (cartContainer) {
            cartContainer.appendChild(cartItem);
            saveCartItemToStorage(buttonId, data);

            calculateTotalPrice();

            const cartItems = getCartItemsFromStorage();
            if (emptyCartMessage && cartItems.length === 0) {
               emptyCartMessage.style.display = 'flex';
            } else {
               emptyCartMessage.style.display = 'none';
            }
         }
      }, 100);
   }
}

function saveCartItemToStorage(buttonId, data) {
   let cartItems = getCartItemsFromStorage();

   const existingCartItem = cartItems.find(item => item.id === data.id);

   if (!existingCartItem) {
      cartItems.push({ id: buttonId, ...data });

      const serializedCartItems = JSON.stringify(cartItems);
      localStorage.setItem('cartItems', serializedCartItems);
   }
}

function getCartItemsFromStorage() {
   const serializedCartItems = localStorage.getItem('cartItems');
   if (serializedCartItems) {
      return JSON.parse(serializedCartItems);
   } else {
      return [];
   }
}

function calculateTotalPrice() {
   const cartItems = getCartItemsFromStorage();
   let totalPrice = 0;

   for (let i = 0; i < cartItems.length; i++) {
      totalPrice += cartItems[i].price;
   }

   const totalSumElement = document.querySelector('.shopping__cart-footer-sum');
   totalSumElement.textContent = `$${totalPrice.toFixed(2)}`;
}