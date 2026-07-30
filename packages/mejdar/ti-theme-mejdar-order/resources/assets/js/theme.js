/**
 * MEJDAR Order Theme - JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mejdar-menu-toggle');
    const navLinks = document.querySelector('.mejdar-nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.style.display = isExpanded ? 'none' : 'flex';
        });
    }

    // Cart sidebar toggle
    const cartToggle = document.querySelector('[data-control="open-cart"]');
    const cartClose = document.querySelector('.mejdar-cart-close');
    const cartSidebar = document.querySelector('.mejdar-cart');

    if (cartToggle && cartSidebar) {
        cartToggle.addEventListener('click', function() {
            cartSidebar.classList.add('mejdar-cart--open');
            document.body.style.overflow = 'hidden';
        });
    }

    if (cartClose && cartSidebar) {
        cartClose.addEventListener('click', function() {
            cartSidebar.classList.remove('mejdar-cart--open');
            document.body.style.overflow = '';
        });
    }

    // Category filter (menu page)
    const categoryButtons = document.querySelectorAll('.mejdar-category-btn');
    const menuCards = document.querySelectorAll('.mejdar-menu-card');

    categoryButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Update active state
            categoryButtons.forEach(function(b) {
                b.classList.remove('mejdar-category-btn--active');
                b.setAttribute('aria-selected', 'false');
            });
            this.classList.add('mejdar-category-btn--active');
            this.setAttribute('aria-selected', 'true');

            const category = this.dataset.category;

            // Filter items
            menuCards.forEach(function(card) {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Quantity controls
    document.querySelectorAll('[data-control="qty-minus"]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const currentVal = parseInt(input.value) || 0;
            if (currentVal > 1) {
                input.value = currentVal - 1;
                input.dispatchEvent(new Event('change'));
            }
        });
    });

    document.querySelectorAll('[data-control="qty-plus"]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const currentVal = parseInt(input.value) || 0;
            input.value = currentVal + 1;
            input.dispatchEvent(new Event('change'));
        });
    });

    // Close cart on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && cartSidebar && cartSidebar.classList.contains('mejdar-cart--open')) {
            cartSidebar.classList.remove('mejdar-cart--open');
            document.body.style.overflow = '';
        }
    });
});
