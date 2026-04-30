// Sticky header
const header = document.getElementById('siteHeader');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Add to cart (AJAX — stays on page, updates cart count)
const productForm = document.querySelector('.product-form');
if (productForm) {
  productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = productForm.querySelector('.product-page__add-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Adding...';
    btn.disabled = true;

    try {
      await fetch('/cart/add.js', { method: 'POST', body: new FormData(productForm) });
      const cart = await fetch('/cart.js').then(r => r.json());

      let countEl = document.querySelector('.site-header__cart-count');
      if (!countEl) {
        countEl = document.createElement('span');
        countEl.className = 'site-header__cart-count';
        document.querySelector('.site-header__cart').appendChild(countEl);
      }
      countEl.textContent = cart.item_count;

      btn.textContent = 'Added to Cart!';
      setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 1800);
    } catch {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}
