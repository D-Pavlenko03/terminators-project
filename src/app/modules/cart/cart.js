import cartHTML from './cart.html';

export default function createCartSection() {
   const cartElement = document.createElement('div');
   cartElement.classList.add('cart');
   cartElement.innerHTML = cartHTML;
   document.body.appendChild(cartElement);
}