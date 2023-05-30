import './app/modules/cart/cart.js';import createHeader from './app/modules/header/header.js';
import createBannerSection from "./app/modules/banner/banner.js";
import createCardsSection from "./app/modules/cards/cards.js";
import createCartSection from "./app/modules/cart/cart.js";
import slideNumder from "./app/modules/banner/slideNumbe.js";
import { bannerSwiper } from "./app/modules/banner/banner.js";
import loadMoreCards from "./app/modules/cards/components/buttons/buttons.js";
import searchInput from "./app/modules/header/components/inputs/input.js";
import buttonEye from "./app/modules/cards/components/buttons/buttonEye.js";
import openCart from "./app/modules/header/components/buttons/openCart.js";
import buttonBuy from "./app/modules/cards/components/buttons/buttonBuy.js";

function init() {
   createHeader()
   createMainSection();
   bannerSwiper.init();
   slideNumder(bannerSwiper);
   loadMoreCards();
   searchInput();
   createCartSection();
   openCart();
}

export default function createMainSection() {
   const mainElement = document.createElement('main');
   mainElement.classList.add('main');

   const bannerSection = createBannerSection();
   const cardsSection = createCardsSection();

   mainElement.appendChild(bannerSection);
   mainElement.appendChild(cardsSection);

   document.body.appendChild(mainElement);

   buttonEye(cardsSection);
   
   buttonBuy(event, cardsSection);
}

init()