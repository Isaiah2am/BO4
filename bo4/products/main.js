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

document.addEventListener('DOMContentLoaded', function() {
  const section = document.getElementById('section__items');
  const select = document.getElementById('sort-products');

  function renderProducts(list) {
    section.innerHTML = '';
    list.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product-item';
      // Use product.link if available, otherwise default to "#"
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

  // Initial render
  renderProducts(products);
});


    document.addEventListener('DOMContentLoaded', function() {
        const searchBar = document.getElementById('search-bar');
        const sectionItems = document.getElementById('section__items');

        // Helper: get all products (assumes products are rendered as direct children)
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
        console.log(`Add to cart pressed for: ${name}`);
      }
      if (e.target.classList.contains('product__removebutton')) {
        const name = e.target.getAttribute('data-product');
        console.log(`Remove from cart pressed for: ${name}`);
      }
      if (e.target.classList.contains('product__plusbutton')) {
        const name = e.target.getAttribute('data-product');
        console.log(`Plus button pressed for: ${name}`);
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

    // Register as a custom element <schoppingitem>
    class SchoppingItem extends HTMLElement {
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
    customElements.define('schoppingitem', SchoppingItem);
    let cartItems = [];

    function addToCart(productName) {
      const product = products.find(p => p.name === productName);
      if (!product) return;
      const existing = cartItems.find(item => item.name === productName);
      if (existing) {
        existing.qty += 1;
      } else {
        cartItems.push({ ...product, qty: 1 });
      }
      renderCart();
    }

    function removeFromCart(productName) {
      const idx = cartItems.findIndex(item => item.name === productName);
      if (idx !== -1) {
        if (cartItems[idx].qty > 1) {
          cartItems[idx].qty -= 1;
        } else {
          cartItems.splice(idx, 1);
        }
        renderCart();
      }
    }

    function renderCart() {
      const cartSection = document.getElementById('cart__items');
      if (!cartSection) return;
      cartSection.innerHTML = '';
      cartItems.forEach(item => {
        const el = document.createElement('schoppingitem');
        el.product = { ...item, price: item.price * item.qty };
        el.setAttribute('data-product', item.name);
        cartSection.appendChild(el);
      });
      cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
      updateCartDisplay();
    }

    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('product__button')) {
        const name = e.target.getAttribute('data-product');
        addToCart(name);
      }
      if (e.target.classList.contains('product__removebutton')) {
        const name = e.target.getAttribute('data-product');
        removeFromCart(name);
      }
    });


  document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById('cartDropdownMenu');
    const cartIconLi = document.getElementById('cartIconLi');
    if (menu && cartIconLi) {
      function toggleCartDropdown(e) {
        e.stopPropagation();
        const isOpen = menu.style.display === 'block';
        menu.style.display = isOpen ? 'none' : 'block';
      }
      cartIconLi.addEventListener('click', toggleCartDropdown);
      document.addEventListener('click', function() {
        menu.style.display = 'none';
      });
      menu.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  });