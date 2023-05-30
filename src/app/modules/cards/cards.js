import cardsHTML from './cards.html';

export default function createCardsSection() {
   const cardsElement = document.createElement('section');
   cardsElement.classList.add('cards');
   cardsElement.innerHTML = cardsHTML;
   return cardsElement;
}