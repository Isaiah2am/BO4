const items = [
  ["Crying obby", "99$", "imgs/cry.webp", "⭐⭐⭐⭐⭐", true],
  ["Grass block", "150$", "imgs/gras.webp", "⭐⭐⭐⭐", true],
  ["Diamond block", "130$", "imgs/dias.webp", "⭐⭐⭐", true],
];

let productContainer = document.getElementById("section__items");
if (productContainer) {
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
}

let cartCount = 0;
const cartCountElement = document.getElementById('items__li');

function updateCartDisplay() {
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('product__button')) {
    cartCount++;
    updateCartDisplay();
  }
  if (e.target.classList.contains('product__removebutton')) {
    if (cartCount > 0) {
      cartCount--;
      updateCartDisplay();
    }
  }
});

// Intersection Observer Example
let observer = new IntersectionObserver(
  function(entries) {
    if (entries[0].isIntersecting === true) {
      document.getElementsByTagName("main")[0].classList.add("a-popup");
      observer.disconnect();
    }
  }, 
  {
    threshold: 0.1,
  }
);

if (document.getElementsByTagName("main")[0]) {
  observer.observe(document.getElementsByTagName("main")[0]);
}

// --- Lazy Loading Batch Example ---

const products_array = [
  ["Crying obby", 99, "imgs/cry.webp", true],
  ["Grass block", 150, "imgs/gras.webp", true],
  ["Diamond block", 130, "imgs/dias.webp", true],
  // Add more products as needed
];

let productIndex = 0;
const productsPerBatch = 3;
const productSection = document.querySelector('.products');

function onAddToCartClick() {
  cartCount++;
  updateCartDisplay();
}

function onRemoveFromCartClick() {
  if (cartCount > 0) {
    cartCount--;
    updateCartDisplay();
  }
}

function loadMoreProducts() {
  if (!productSection) return;
  const end = productIndex + productsPerBatch;
  const batch = products_array.slice(productIndex, end);

  batch.forEach(([name, price, imgSrc, available]) => {
    const article = document.createElement('article');
    article.classList.add('product');
    if (!available) {
      article.classList.add('product--not-available');
    }

    article.innerHTML = `
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
      ;
      ${
        available
          ? `<button class="product__button" type="button">Add to Cart</button>
             <button class="remove__button" type="button">Remove</button>`
          : `<button class="product__button product__button--disabled" type="button" disabled>Sold out</button>`
      }
    `;

    const addButton = article.querySelector('.product__button:not(.product__button--disabled)');
    if (addButton) addButton.addEventListener('click', onAddToCartClick);

    const removeButton = article.querySelector('.remove__button');
    if (removeButton) removeButton.addEventListener('click', onRemoveFromCartClick);

    productSection.appendChild(article);
  });

  productIndex = end;
}

// Optionally, call loadMoreProducts() to load the first batch on page load
// loadMoreProducts();


document.addEventListener('DOMContentLoaded', function() {
    // Example product data
    const products = [
      { name: "Crying obby", price: "99$", img: "imgs/cry.webp", available: true },
      { name: "Grass block", price: "150$", img: "imgs/gras.webp", available: true },
      { name: "Diamond block", price: "130$", img: "imgs/dias.webp", available: true }

    ];

    const section = document.getElementById('section__items');
    const select = document.getElementById('sort-products');

    function renderProducts(list) {
        section.innerHTML = '';
        list.forEach(product => {
            const div = document.createElement('div');
            div.className = 'product-item';
      div.innerHTML = `
          <section class="product1__section">
        <figure class="product1__img">
          <img src="${product.img}" alt="" width="300rem" height="300rem">
        </figure>
        <h2>${product.price}</h2>
        <h2>${product.name}</h2>
        <h2>⭐⭐⭐⭐⭐</h2>
        <div>
          <button class="product__button">Add to cart</button>
          <button class="product__removebutton">-</button>
        </div>
      </section>
      `;
            section.appendChild(div);
        });
    }

    function sortProducts(type) {
        let sorted = [...products];
        switch(type) {
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
        renderProducts(sorted);
    }

    select.addEventListener('change', function() {
        sortProducts(this.value);
    });

    // Initial render
    renderProducts(products);
});
