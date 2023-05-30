import headerHTML from './header.html';

export default function createHeader() {
   const headerElement = document.createElement('header');
   headerElement.classList.add('header');
   headerElement.innerHTML = headerHTML;
   document.body.appendChild(headerElement);
   return headerElement
}