



const items = [
  ["Crying obby", "99$", "imgs/cry.webp", "⭐⭐⭐⭐⭐", true],
  ["Grass block", "150$", "imgs/gras.webp", "⭐⭐⭐⭐", true],
  ["Diamond block", "130$", "imgs/dias.webp", "⭐⭐⭐", true],
  

  
 
];

let productContainer = document.getElementById("section__items");
productContainer.innerHTML = ""; 

items.forEach(item => {
  const [name, price, imgSrc, stars, available] = item;

  if (available) {
    productContainer.innerHTML += `
      <section class="product1__section">
        <figure class="product1__img">
          <img src="${imgSrc}" alt="" width="300rem" height="300rem">
        </figure>
        <h2>${price}</h2>
        <h2>${name}</h2>
        <h2>${stars}</h2>
        <div>
          <button class="product__button">Add to cart</button>
          <button class="product__removebutton">-</button>
        </div>
      </section>
    `;
  }
});

let cartCount = 0;

const cartCountElement = document.getElementById('items__li');
const addButtons = document.querySelectorAll('.product__button');
const removeButtons = document.querySelectorAll('.product__removebutton');

addButtons.forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    updateCartDisplay();
  });
});

removeButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (cartCount > 0) {
      cartCount--;
      updateCartDisplay();
    }
  });
});

function updateCartDisplay() {
  cartCountElement.textContent = cartCount;
}



// interaction observer //
let observer = new IntersectionObserver(
  function(entries) {
    if (entries[0].isIntersecting === true) {
      document.getElementsByTagName("main")[0].classList.add("a-popup");
      observer.disconnect();;
    } else {
      console.log("Less than 50% in view");
    }
  }, 
  {
    threshold: 0.1,
  }
);

observer.observe(document.getElementsByTagName("main")[0]);