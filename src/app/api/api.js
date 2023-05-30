import createCard from "../../app/modules/cards/card.js";

fetch('https://6464831d043c103502bb5293.mockapi.io/api/terminators')
   .then(response => response.json())
   .then(data => {
      data.slice(0, 8).forEach(terminator => {
         createCard(terminator);
      });
   })
   .catch(error => {
      console.log('Ошибка при получении данных', error);
   });