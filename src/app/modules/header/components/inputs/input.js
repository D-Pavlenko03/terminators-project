export default function searchInput() {
   let searchInput = document.getElementById('searchInput');
   let searchResults = document.getElementById('searchResults');
   let lastInputValue = '';

   searchInput.addEventListener('input', function () {
      let inputText = searchInput.value;

      if (inputText.trim() === '') {
         searchResults.innerHTML = '';
         lastInputValue = '';
         return;
      }

      fetch('https://6464831d043c103502bb5293.mockapi.io/api/terminators')
         .then(response => response.json())
         .then(function (data) {
            let allProducts = data;

            if (inputText !== searchInput.value) {
               return;
            }

            let filteredProducts = allProducts.filter(function (product) {
               return product.name.toLowerCase().includes(inputText.toLowerCase());
            });

            if (inputText !== searchInput.value) {
               return;
            }

            searchResults.innerHTML = '';

            if (filteredProducts.length > 0) {
               filteredProducts.forEach(function (product) {
                  let productCard = document.createElement('a');
                  productCard.className = 'search__wrapper';
                  productCard.href = product['main-photo-url'];

                  productCard.addEventListener('click', function (event) {
                     event.preventDefault();

                     document.body.style.overflow = 'hidden';
                     document.documentElement.style.overflow = 'hidden';

                     let overlay = document.createElement('div');
                     overlay.className = 'search__overlay';

                     let imgElement = document.createElement('img');
                     imgElement.className = 'search__big-img';
                     imgElement.src = this.href;

                     document.body.appendChild(overlay);
                     document.body.appendChild(imgElement);

                     overlay.addEventListener('click', function () {
                        document.body.removeChild(overlay);
                        document.body.removeChild(imgElement);
                        document.body.style.overflow = 'auto';
                        document.documentElement.style.overflow = 'auto';
                     });
                  });

                  let productImage = document.createElement('img');
                  productImage.className = 'search__image';
                  productImage.src = product['main-photo-url'];

                  let productName = document.createElement('span');
                  productName.className = 'search__text';
                  productName.textContent = product.name;

                  productCard.appendChild(productImage);
                  productCard.appendChild(productName);

                  searchResults.appendChild(productCard);
               });
            } else {
               searchResults.textContent = 'No matching products found';
            }
         })
         .catch(function (error) {
            console.log('Ошибка при получении данных', error);
         });
   });

   searchInput.addEventListener('input', function () {
      if (searchInput.value.trim() === '') {
         searchResults.innerHTML = '';
         lastInputValue = '';
      }
   });

   document.addEventListener('click', function (event) {
      let isClickInsideSearchResults = searchResults.contains(event.target);
      if (!isClickInsideSearchResults) {
         searchResults.innerHTML = '';
      }
   });
};