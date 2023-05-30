import createCard from "../../card.js";

export default function loadMoreCards() {
   let loadedCards = 8;
   const loadButton = document.querySelector('.button__load');

   function additionalCards() {
      fetch('https://6464831d043c103502bb5293.mockapi.io/api/terminators')
         .then(response => response.json())
         .then(data => {
            const remainingCards = data.slice(loadedCards, loadedCards + 8);
            remainingCards.forEach(terminator => {
               createCard(terminator);
            });
            loadedCards += remainingCards.length;

            if (loadedCards >= data.length) {
               loadButton.style.display = 'none';
            }
         })
         .catch(error => {
            console.log('Ошибка при получении данных', error);
         });
   }

   loadButton.addEventListener('click', additionalCards);
}