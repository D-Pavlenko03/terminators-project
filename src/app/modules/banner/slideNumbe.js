export default function slideNumder(bannerSwiper) {
   bannerSwiper.on('slideChange', function () {
      let realIndex = bannerSwiper.realIndex;
      let slideNumberElement = document.getElementById('slideNumber');

      slideNumberElement.textContent = realIndex + 1;
   });

   let scrollbarContainer = document.querySelector('.swiper-scrollbar');
   scrollbarContainer.addEventListener('scroll', function () {
      let slideWidth = bannerSwiper.slides[0].getWidth();
      let scrollLeft = scrollbarContainer.scrollLeft;
      let currentSlide = Math.round(scrollLeft / slideWidth);
      let slideNumberElement = document.getElementById('slideNumber');

      slideNumberElement.textContent = currentSlide + 1;
   });
}