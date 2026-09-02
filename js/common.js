/* ===================================================
   JINGMU — Common JavaScript
   Shared: navbar, cart, favorites, login, toast, footer
   =================================================== */

/* ===== LOCALSTORAGE HELPERS ===== */
function loadLS(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch (e) { return fallback; }
}
function saveLS(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
function getFavorites() { return loadLS('jingmu_favs', []); }
function setFavorites(f) { saveLS('jingmu_favs', f); refreshBadges(); }
function getCart() { return loadLS('jingmu_cart', []); }
function setCart(c) { saveLS('jingmu_cart', c); refreshBadges(); renderCart(); }

/* ===== BADGE UPDATES ===== */
function refreshBadges() {
    var favs = getFavorites();
    var cart = getCart();
    var fb = document.getElementById('favBadge');
    var cb = document.getElementById('cartBadge');
    if (fb) {
        fb.textContent = favs.length;
        fb.classList.toggle('hidden', favs.length === 0);
    }
    if (cb) {
        var cartCount = cart.reduce(function (s, i) { return s + i.qty; }, 0);
        cb.textContent = cartCount;
        cb.classList.toggle('hidden', cartCount === 0);
    }
}

/* ===== TOAST NOTIFICATION ===== */
var toastTimer = null;
function showToast(msg) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2400);
}

/* ===== FAVORITE TOGGLE ===== */
function toggleFav(id) {
    var favs = getFavorites();
    var idx = favs.indexOf(id);
    if (idx !== -1) {
        favs.splice(idx, 1);
        showToast('Removed from Favorites');
    } else {
        favs.push(id);
        showToast('Added to Favorites!');
    }
    setFavorites(favs);
    /* Re-render products if the grid exists */
    if (typeof renderProducts === 'function') renderProducts();
    if (typeof renderDetail === 'function') renderDetail();
}

/* ===== CART FUNCTIONS ===== */
function addToCart(id, qty) {
    qty = qty || 1;
    var cart = getCart();
    var found = false;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) { cart[i].qty += qty; found = true; break; }
    }
    if (!found) cart.push({ id: id, qty: qty });
    setCart(cart);
    showToast('Added to Cart!');
}

function changeQty(id, delta) {
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].qty += delta;
            if (cart[i].qty <= 0) cart.splice(i, 1);
            break;
        }
    }
    setCart(cart);
}

function removeFromCart(id) {
    var cart = getCart().filter(function (i) { return i.id !== id; });
    setCart(cart);
    showToast('Item removed from cart');
}

function renderCart() {
    var cart = getCart();
    var container = document.getElementById('cartItems');
    var totalEl = document.getElementById('cartTotalPrice');
    if (!container || !totalEl) return;
    if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
        totalEl.textContent = '$0.00';
        return;
    }
    var total = 0;
    container.innerHTML = cart.map(function (item) {
        var p = null;
        for (var i = 0; i < PRODUCTS.length; i++) {
            if (PRODUCTS[i].id === item.id) { p = PRODUCTS[i]; break; }
        }
        if (!p) return '';
        var sub = p.price * item.qty;
        total += sub;
        return '<div class="cart-item">' +
            '<img src="' + p.img + '" alt="' + p.name + '">' +
            '<div class="cart-item-info">' +
            '<div class="cart-item-name">' + p.name + '</div>' +
            '<div class="cart-item-price">$' + sub.toFixed(2) + '</div>' +
            '<div class="cart-item-qty">' +
            '<button class="qty-btn" data-qty="' + p.id + '" data-delta="-1">&#8722;</button>' +
            '<span>' + item.qty + '</span>' +
            '<button class="qty-btn" data-qty="' + p.id + '" data-delta="1">&#43;</button>' +
            '</div></div>' +
            '<button class="cart-item-remove" data-remove="' + p.id + '">&times;</button>' +
            '</div>';
    }).join('');
    totalEl.textContent = '$' + total.toFixed(2);
}

/* ===== NAVBAR HTML ===== */
function getNavHTML(activePage) {
    var pages = [
        { href: 'index.html', label: 'Home', key: 'home' },
        { href: 'products.html', label: 'Products', key: 'products' },
        { href: 'about.html', label: 'About Us', key: 'about' },
        { href: 'contact.html', label: 'Contact Us', key: 'contact' }
    ];
    var links = pages.map(function (p) {
        return '<li><a href="' + p.href + '" class="' + (p.key === activePage ? 'active' : '') + '">' + p.label + '</a></li>';
    }).join('');
    return '<nav class="navbar">' +
        '<div class="nav-inner">' +
        '<a href="index.html" class="logo">JINGMU</a>' +
        '<ul class="nav-links">' + links + '</ul>' +
        '<div class="nav-actions">' +
        '<button class="nav-btn" id="loginBtn">Login</button>' +
        '<span class="nav-icon" id="favNavIcon" title="Favorites">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
        '<span class="badge hidden" id="favBadge">0</span>' +
        '</span>' +
        '<span class="nav-icon" id="cartNavIcon" title="Shopping Cart">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' +
        '<span class="badge hidden" id="cartBadge">0</span>' +
        '</span>' +
        '<button class="hamburger" id="hamburgerBtn" aria-label="Toggle menu">' +
        '<span></span><span></span><span></span></button>' +
        '</div></div></nav>';
}

/* ===== MOBILE MENU HTML ===== */
function getMobileMenuHTML(activePage) {
    var pages = [
        { href: 'index.html', label: 'Home', key: 'home' },
        { href: 'products.html', label: 'Products', key: 'products' },
        { href: 'about.html', label: 'About Us', key: 'about' },
        { href: 'contact.html', label: 'Contact Us', key: 'contact' }
    ];
    var links = pages.map(function (p) {
        return '<a href="' + p.href + '" class="' + (p.key === activePage ? 'active' : '') + '">' + p.label + '</a>';
    }).join('');
    return '<div class="mobile-menu" id="mobileMenu">' + links +
        '<div class="mobile-actions"><button class="nav-btn" id="mobileLoginBtn">Login</button></div></div>';
}

/* ===== FOOTER HTML ===== */
function getFooterHTML() {
    return '<footer class="footer">' +
        '<div class="footer-brand">JINGMU</div>' +
        '<p class="footer-desc">HONG KONG JINGMU LIMITED — Your trusted supplier for sweet fashion, teen clothing, accessories, hair decorations, and lifestyle goods. Serving global wholesale &amp; retail with love.</p>' +
        '<div class="social-links">' +
        '<a href="#" title="Facebook">FB</a>' +
        '<a href="#" title="Instagram">IG</a>' +
        '<a href="#" title="Pinterest">PI</a>' +
        '<a href="#" title="TikTok">TK</a>' +
        '</div>' +
        '<div class="footer-copy">&copy; 2026 HONG KONG JINGMU LIMITED. All rights reserved.</div>' +
        '</footer>';
}

/* ===== LOGIN MODAL HTML ===== */
function getLoginModalHTML() {
    return '<div class="modal-overlay" id="loginModal">' +
        '<div class="modal">' +
        '<button class="modal-close" id="loginClose">&times;</button>' +
        '<h2>Welcome Back</h2>' +
        '<form id="loginForm">' +
        '<input type="text" placeholder="Username or Email" required>' +
        '<input type="password" placeholder="Password" required>' +
        '<button type="submit" class="modal-submit">Login</button>' +
        '</form>' +
        '<div class="modal-msg" id="loginMsg">Login Successful! Welcome to JINGMU.</div>' +
        '</div></div>';
}

/* ===== CART PANEL HTML ===== */
function getCartPanelHTML() {
    return '<div class="cart-overlay" id="cartOverlay"></div>' +
        '<div class="cart-panel" id="cartPanel">' +
        '<div class="cart-header">' +
        '<h2>Shopping Cart</h2>' +
        '<button class="cart-close" id="cartClose">&times;</button>' +
        '</div>' +
        '<div class="cart-items" id="cartItems"><div class="cart-empty">Your cart is empty.</div></div>' +
        '<div class="cart-footer">' +
        '<div class="cart-total"><span>Total</span><span id="cartTotalPrice">$0.00</span></div>' +
        '<button class="cart-checkout" id="checkoutBtn">Proceed to Checkout</button>' +
        '</div></div>';
}

/* ===== INITIALIZE COMMON ELEMENTS ===== */
function initCommon(activePage) {
    /* Inject navbar */
    var navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) navPlaceholder.innerHTML = getNavHTML(activePage);

    /* Inject mobile menu */
    var mobilePlaceholder = document.getElementById('mobile-placeholder');
    if (mobilePlaceholder) mobilePlaceholder.innerHTML = getMobileMenuHTML(activePage);

    /* Inject login modal */
    var loginPlaceholder = document.getElementById('login-placeholder');
    if (loginPlaceholder) loginPlaceholder.innerHTML = getLoginModalHTML();

    /* Inject cart panel */
    var cartPlaceholder = document.getElementById('cart-placeholder');
    if (cartPlaceholder) cartPlaceholder.innerHTML = getCartPanelHTML();

    /* Inject toast */
    var toastPlaceholder = document.getElementById('toast-placeholder');
    if (toastPlaceholder) toastPlaceholder.innerHTML = '<div class="toast" id="toast"></div>';

    /* Inject footer */
    var footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.innerHTML = getFooterHTML();

    /* Bind events */
    bindCommonEvents();
    refreshBadges();
    renderCart();
}

/* ===== BIND SHARED EVENTS ===== */
function bindCommonEvents() {
    /* Login button */
    var loginBtn = document.getElementById('loginBtn');
    if (loginBtn) loginBtn.addEventListener('click', function () {
        document.getElementById('loginModal').classList.add('active');
    });

    /* Mobile login button */
    var mobileLoginBtn = document.getElementById('mobileLoginBtn');
    if (mobileLoginBtn) mobileLoginBtn.addEventListener('click', function () {
        document.getElementById('loginModal').classList.add('active');
        document.getElementById('mobileMenu').classList.remove('active');
        document.getElementById('hamburgerBtn').classList.remove('active');
    });

    /* Login modal close */
    var loginClose = document.getElementById('loginClose');
    if (loginClose) loginClose.addEventListener('click', function () {
        document.getElementById('loginModal').classList.remove('active');
        document.getElementById('loginMsg').classList.remove('success');
    });

    /* Login modal overlay click */
    var loginModal = document.getElementById('loginModal');
    if (loginModal) loginModal.addEventListener('click', function (e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.getElementById('loginMsg').classList.remove('success');
        }
    });

    /* Login form submit */
    var loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        document.getElementById('loginMsg').classList.add('success');
        setTimeout(function () {
            document.getElementById('loginModal').classList.remove('active');
            document.getElementById('loginMsg').classList.remove('success');
            showToast('Login Successful! Welcome to JINGMU.');
            loginForm.reset();
        }, 1200);
    });

    /* Cart icon open */
    var cartNavIcon = document.getElementById('cartNavIcon');
    if (cartNavIcon) cartNavIcon.addEventListener('click', function () {
        document.getElementById('cartPanel').classList.add('active');
        document.getElementById('cartOverlay').classList.add('active');
    });

    /* Cart close */
    var cartClose = document.getElementById('cartClose');
    if (cartClose) cartClose.addEventListener('click', closeCart);

    var cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    /* Checkout button */
    var checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', function () {
        if (getCart().length === 0) { showToast('Your cart is empty'); return; }
        showToast('Checkout feature coming soon!');
    });

    /* Hamburger */
    var hamburgerBtn = document.getElementById('hamburgerBtn');
    if (hamburgerBtn) hamburgerBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        document.getElementById('mobileMenu').classList.toggle('active');
    });

    /* Mobile menu link click close */
    var mobileLinks = document.querySelectorAll('.mobile-menu a');
    for (var i = 0; i < mobileLinks.length; i++) {
        mobileLinks[i].addEventListener('click', function () {
            document.getElementById('mobileMenu').classList.remove('active');
            document.getElementById('hamburgerBtn').classList.remove('active');
        });
    }

    /* Event delegation for cart qty/remove buttons */
    document.addEventListener('click', function (e) {
        var qtyBtn = e.target.closest('[data-qty]');
        if (qtyBtn) {
            changeQty(parseInt(qtyBtn.dataset.qty), parseInt(qtyBtn.dataset.delta));
            return;
        }
        var rmBtn = e.target.closest('[data-remove]');
        if (rmBtn) {
            removeFromCart(parseInt(rmBtn.dataset.remove));
            return;
        }
    });
}

function closeCart() {
    document.getElementById('cartPanel').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
}

/* ===== HELPER: GET PRODUCT BY ID ===== */
function getProductById(id) {
    for (var i = 0; i < PRODUCTS.length; i++) {
        if (PRODUCTS[i].id === id) return PRODUCTS[i];
    }
    return null;
}

/* ===== HELPER: GET URL PARAM ===== */
function getUrlParam(name) {
    var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.search);
    return results ? decodeURIComponent(results[1]) : null;
}
