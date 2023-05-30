export default function openCart() {
   let cartDiv = document.querySelector(".shopping__cart");
   let openCartBtn = document.querySelector(".cart__btn");
   let deleteCartBtn = document.querySelector(".shopping__cart-close");
   let overlay = document.querySelector(".cart__overlay");

   let parentElement = document.getElementById('cart__btn');
   let sectionElement = document.getElementById('cart-box');
   parentElement.appendChild(sectionElement);

   openCartBtn.addEventListener("click", function () {
      cartDiv.classList.add("shopping__cart-open");
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";!!
   });

   deleteCartBtn.addEventListener("click", function () {
      setTimeout(function() {
         cartDiv.classList.remove("shopping__cart-open");
         overlay.style.display = "none";
         document.body.style.overflow = "";
      }, 100);
   });

   document.addEventListener("click", function (event) {
      const deleteCartItemButton = event.target.closest('.shopping__cart-delete-item');

      if (!cartDiv.contains(event.target) && !openCartBtn.contains(event.target) && !deleteCartItemButton) {
         cartDiv.classList.remove("shopping__cart-open");
         overlay.style.display = "none";
         document.body.style.overflow = "";
      }
   });
}