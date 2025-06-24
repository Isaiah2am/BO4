const products = [
  { name: "Crying obby", price: 99, img: "imgs/cry.webp", available: true, link: "productpage/productpage.html" },
  { name: "Grass block", price: 150, img: "imgs/gras.webp", available: true, link: "productpage/productpage.html" },
  { name: "Diamond block", price: 130, img: "imgs/dias.webp", available: true, link: "productpage/productpage.html" }
];

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

document.addEventListener('DOMContentLoaded', function() {
  const section = document.getElementById('section__items');
  const select = document.getElementById('sort-products');

  function renderProducts(list) {
    section.innerHTML = '';
    list.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product-item';
      const productLink = product.link || "#";
      div.innerHTML = `
        <section class="product1__section" style="position: relative;">
          <a href="${productLink}">
        <button class="product__plusbutton" data-product="${product.name}" style="position: absolute; top: 10px; right: 10px; font-size: 1.5rem; background: #fff; border: 1px solid #ccc; border-radius: 50%; width: 2.5rem; height: 2.5rem; cursor: pointer;">+</button>
          </a>
          <figure class="product1__img">
        <img src="${product.img}" alt="" width="300rem" height="300rem">
          </figure>
          <h2>${product.price}$</h2>
          <h2>${product.name}</h2>
          <h2 style="font-size: 3rem;">⭐⭐⭐⭐⭐</h2>
          <div>
        <button class="product__button" data-product="${product.name}">Add to cart</button>
        <button class="product__removebutton" data-product="${product.name}">-</button>
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

  renderProducts(products);
});

const cartItems = {};

document.addEventListener('DOMContentLoaded', function() {
  const searchBar = document.getElementById('search-bar');
  const sectionItems = document.getElementById('section__items');

  function getProductElements() {
    return Array.from(sectionItems.children);
  }

  searchBar.addEventListener('input', function() {
    const query = searchBar.value.trim().toLowerCase();
    getProductElements().forEach(product => {
      const text = product.textContent.toLowerCase();
      product.style.display = text.includes(query) ? '' : 'none';
    });
  });
});

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('product__button')) {
    const name = e.target.getAttribute('data-product');
    cartItems[name] = (cartItems[name] || 0) + 1;
  }
  if (e.target.classList.contains('product__removebutton')) {
    const name = e.target.getAttribute('data-product');
    if (cartItems[name]) {
      cartItems[name]--;
      if (cartItems[name] === 0) delete cartItems[name];
    }
  }
  if (e.target.classList.contains('product__plusbutton')) {
    const name = e.target.getAttribute('data-product');
    cartItems[name] = (cartItems[name] || 0) + 1;
  }
});

function getCartDropdownContent() {
  const entries = Object.entries(cartItems);
  if (entries.length === 0) return 'Cart is empty';
  let total = 0;
  const lines = entries.map(([name, qty]) => {
    const product = products.find(p => p.name === name);
    const price = product ? product.price : 0;
    total += price * qty;
    return `${name}: ${qty} × $${price} = $${(price * qty).toFixed(2)}`;
  });
  lines.push(`<hr style="margin: 8px 0;">`);
  lines.push(`<strong>Total: $${total.toFixed(2)}</strong>`);
  return lines.join('<br>');
}

document.addEventListener('click', function(e) {
  const nav = e.target.closest('nav.shoppingcart_section');
  if (nav) {
    let dropdown = document.querySelector('.cart-dropdown');
    if (dropdown) {
      dropdown.remove();
    } else {
      dropdown = document.createElement('div');
      dropdown.className = 'cart-dropdown';
      dropdown.innerHTML = getCartDropdownContent();
      const rect = nav.getBoundingClientRect();
      dropdown.style.position = 'absolute';
      dropdown.style.top = `${rect.bottom + window.scrollY}px`;
      dropdown.style.left = `${rect.left + window.scrollX - 200}px`;
      document.body.appendChild(dropdown);
      function handleOutsideClick(ev) {
        if (!dropdown.contains(ev.target) && !nav.contains(ev.target)) {
          dropdown.remove();
          document.removeEventListener('mousedown', handleOutsideClick);
        }
      }
      document.addEventListener('mousedown', handleOutsideClick);
    }
  } else {
    const dropdown = document.querySelector('.cart-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.remove();
    }
  }
});

function createItemDetailsTemplate(product) {
  const template = document.createElement('template');
  template.innerHTML = `
    <div class="shopitem item-details">
      <strong>${product.name}</strong><br>
      <small>Description of ${product.name}</small>
      <input class="item-qty" type="number" value="1" min="1">
      <div class="item-price">$${product.price.toFixed(2)}</div>
    </div>
  `;
  return template;
}

class ShoppingItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set product(product) {
    const template = createItemDetailsTemplate(product);
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
