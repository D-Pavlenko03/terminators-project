import bannerHTML from "./banner.html";
import Swiper, { Parallax, Pagination, Mousewheel, Autoplay, Scrollbar, Keyboard } from 'swiper';

export default function createBannerSection() {
   const bannerElement = document.createElement("section");
   bannerElement.classList.add("banner");
   bannerElement.innerHTML = bannerHTML;
   return bannerElement;
}

export const bannerSwiper = new Swiper(".swiper-container", {
   modules: [Parallax, Pagination, Mousewheel, Autoplay, Scrollbar, Keyboard],

   direction: "vertical",
   speed: 1000,
   parallax: true,
   loop: true,
   grabCursor: true,

   scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
   },

   autoplay: {
      delay: 4000,
   },

   mousewheel: {
      invert: false
   },

   keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
   },
});