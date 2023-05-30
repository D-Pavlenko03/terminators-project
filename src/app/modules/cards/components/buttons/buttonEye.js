export default function buttonEye(cardsSection) {
   if (!cardsSection) {
      return;
   }

   cardsSection.addEventListener('click', function (event) {
      const buttonEye = event.target.closest('.button__eye');
      if (buttonEye) {

         const photoCardItemLink = buttonEye.dataset.src;

         const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

         const enlargedImage = document.createElement('div');
         enlargedImage.className = 'card__large-image';

         const image = document.createElement('img');
         image.src = photoCardItemLink;

         enlargedImage.appendChild(image);

         document.body.appendChild(enlargedImage);

         enlargedImage.addEventListener('click', function () {
            document.body.removeChild(enlargedImage);
            document.body.style.overflow = '';
            window.scrollTo(0, currentScrollPos);
         });

         document.body.style.overflow = 'hidden';
      }
   });
}