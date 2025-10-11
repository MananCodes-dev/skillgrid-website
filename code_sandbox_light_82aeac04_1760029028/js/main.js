// Main JavaScript for ModernStore
class ModernStore {
    constructor() {
        this.products = [];
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.currentCategory = 'all';
        this.currentSort = 'featured';
        this.productsPerPage = 8;
        this.currentPage = 1;
        
        this.init();
    }

    init() {
        this.loadSampleProducts();
        this.setupEventListeners();
        this.updateCartUI();
        this.updateWishlistUI();
        
        // Render products after productManager is initialized
        setTimeout(() => {
            if (this.productManager) {
                this.productManager.renderProducts();
            }
        }, 100);
    }

    // Sample product data
    loadSampleProducts() {
        this.products = [
            {
                id: 1,
                name: "Premium Wireless Headphones",
                category: "electronics",
                price: 199.99,
                originalPrice: 249.99,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
                description: "High-quality wireless headphones with noise cancellation",
                rating: 4.5,
                reviews: 128,
                inStock: true,
                featured: true,
                discount: 20
            },
            {
                id: 2,
                name: "Organic Cotton T-Shirt",
                category: "clothing",
                price: 29.99,
                originalPrice: 39.99,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
                description: "Comfortable organic cotton t-shirt in various colors",
                rating: 4.2,
                reviews: 89,
                inStock: true,
                featured: true,
                discount: 25
            },
            {
                id: 3,
                name: "Smart Home Security Camera",
                category: "electronics",
                price: 149.99,
                originalPrice: 199.99,
                image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
                description: "1080p HD security camera with night vision",
                rating: 4.7,
                reviews: 203,
                inStock: true,
                featured: false,
                discount: 25
            },
            {
                id: 4,
                name: "Ceramic Plant Pot Set",
                category: "home",
                price: 45.99,
                originalPrice: 59.99,
                image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop",
                description: "Set of 3 beautiful ceramic plant pots",
                rating: 4.3,
                reviews: 67,
                inStock: true,
                featured: true,
                discount: 23
            },
            {
                id: 5,
                name: "Fitness Tracking Watch",
                category: "sports",
                price: 299.99,
                originalPrice: 399.99,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
                description: "Advanced fitness tracker with heart rate monitoring",
                rating: 4.6,
                reviews: 145,
                inStock: true,
                featured: true,
                discount: 25
            },
            {
                id: 6,
                name: "Designer Leather Jacket",
                category: "clothing",
                price: 179.99,
                originalPrice: 249.99,
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
                description: "Premium leather jacket with modern design",
                rating: 4.4,
                reviews: 92,
                inStock: true,
                featured: false,
                discount: 28
            },
            {
                id: 7,
                name: "Bluetooth Speaker",
                category: "electronics",
                price: 79.99,
                originalPrice: 99.99,
                image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
                description: "Portable Bluetooth speaker with excellent sound quality",
                rating: 4.1,
                reviews: 156,
                inStock: true,
                featured: false,
                discount: 20
            },
            {
                id: 8,
                name: "Yoga Mat Premium",
                category: "sports",
                price: 49.99,
                originalPrice: 69.99,
                image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
                description: "Non-slip premium yoga mat for all levels",
                rating: 4.8,
                reviews: 234,
                inStock: true,
                featured: true,
                discount: 29
            }
        ];
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn?.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Cart sidebar toggle
        const cartBtn = document.getElementById('cart-btn');
        const cartSidebar = document.getElementById('cart-sidebar');
        const closeCartBtn = document.getElementById('close-cart');
        
        cartBtn?.addEventListener('click', () => this.toggleCart());
        closeCartBtn?.addEventListener('click', () => this.closeCart());
        
        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (cartSidebar && !cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
                this.closeCart();
            }
        });

        // User authentication modal
        const userMenuBtn = document.getElementById('user-menu-btn');
        const authModal = document.getElementById('auth-modal');
        const closeAuthBtn = document.getElementById('close-auth');
        const toggleAuthBtn = document.getElementById('toggle-auth');
        
        userMenuBtn?.addEventListener('click', () => this.showAuthModal());
        closeAuthBtn?.addEventListener('click', () => this.hideAuthModal());
        toggleAuthBtn?.addEventListener('click', () => this.toggleAuthForm());
        
        // Form submissions
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        
        loginForm?.addEventListener('submit', (e) => this.handleLogin(e));
        registerForm?.addEventListener('submit', (e) => this.handleRegister(e));

        // Search functionality
        const searchInput = document.getElementById('search-input');
        const mobileSearchInput = document.getElementById('mobile-search-input');
        
        searchInput?.addEventListener('input', (e) => this.handleSearch(e.target.value));
        mobileSearchInput?.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Category filters
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.filterByCategory(category);
            });
        });

        // Sort dropdown
        const sortSelect = document.getElementById('sort-select');
        sortSelect?.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderProducts();
        });

        // View toggle
        const gridViewBtn = document.getElementById('grid-view');
        const listViewBtn = document.getElementById('list-view');
        
        gridViewBtn?.addEventListener('click', () => this.setGridView());
        listViewBtn?.addEventListener('click', () => this.setListView());

        // Load more button
        const loadMoreBtn = document.getElementById('load-more');
        loadMoreBtn?.addEventListener('click', () => this.loadMoreProducts());

        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        checkoutBtn?.addEventListener('click', () => this.proceedToCheckout());

        // Wishlist button
        const wishlistBtn = document.getElementById('wishlist-btn');
        wishlistBtn?.addEventListener('click', () => this.showWishlist());
    }

    // Cart Management
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showToast(`${product.name} added to cart!`, 'success');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.renderCartItems();
    }

    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartUI();
                this.renderCartItems();
            }
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.classList.toggle('hidden', totalItems === 0);
        }
        
        if (cartTotal) {
            cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
        }
        
        this.renderCartItems();
    }

    renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (!cartItemsContainer) return;

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center text-gray-500 py-8">
                    <i class="fas fa-shopping-cart text-4xl mb-4"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-medium text-sm">${item.name}</h4>
                    <p class="text-gray-600 text-sm">$${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="store.updateCartQuantity(${item.id}, ${item.quantity - 1})" 
                            class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm">-</button>
                    <span class="text-sm font-medium">${item.quantity}</span>
                    <button onclick="store.updateCartQuantity(${item.id}, ${item.quantity + 1})" 
                            class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm">+</button>
                </div>
                <button onclick="store.removeFromCart(${item.id})" 
                        class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
        `).join('');
    }

    toggleCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        cartSidebar?.classList.toggle('cart-open');
    }

    closeCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        cartSidebar?.classList.remove('cart-open');
    }

    // Wishlist Management
    toggleWishlist(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const isInWishlist = this.wishlist.some(item => item.id === productId);
        
        if (isInWishlist) {
            this.wishlist = this.wishlist.filter(item => item.id !== productId);
            this.showToast(`${product.name} removed from wishlist`, 'info');
        } else {
            this.wishlist.push(product);
            this.showToast(`${product.name} added to wishlist!`, 'success');
        }
        
        this.saveWishlist();
        this.updateWishlistUI();
        this.renderProducts(); // Re-render to update heart icons
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }

    updateWishlistUI() {
        const wishlistCount = document.getElementById('wishlist-count');
        if (wishlistCount) {
            const count = this.wishlist.length;
            wishlistCount.textContent = count;
            wishlistCount.classList.toggle('hidden', count === 0);
        }
    }

    showWishlist() {
        // For now, just show a toast. In a real app, this would show a wishlist modal/page
        this.showToast(`You have ${this.wishlist.length} items in your wishlist`, 'info');
    }

    // Utility Methods
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }

    // Authentication (Mock)
    showAuthModal() {
        const authModal = document.getElementById('auth-modal');
        authModal?.classList.remove('hidden');
        authModal?.classList.add('flex');
    }

    hideAuthModal() {
        const authModal = document.getElementById('auth-modal');
        authModal?.classList.add('hidden');
        authModal?.classList.remove('flex');
    }

    toggleAuthForm() {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const authTitle = document.getElementById('auth-title');
        const toggleBtn = document.getElementById('toggle-auth');
        
        if (loginForm?.classList.contains('hidden')) {
            loginForm.classList.remove('hidden');
            registerForm?.classList.add('hidden');
            authTitle.textContent = 'Sign In';
            toggleBtn.textContent = "Don't have an account? Sign up";
        } else {
            loginForm?.classList.add('hidden');
            registerForm?.classList.remove('hidden');
            authTitle.textContent = 'Create Account';
            toggleBtn.textContent = 'Already have an account? Sign in';
        }
    }

    handleLogin(e) {
        e.preventDefault();
        // Mock login - in real app, this would make API call
        this.currentUser = { email: 'user@example.com', name: 'John Doe' };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.hideAuthModal();
        this.showToast('Successfully signed in!', 'success');
    }

    handleRegister(e) {
        e.preventDefault();
        // Mock registration - in real app, this would make API call
        this.currentUser = { email: 'newuser@example.com', name: 'New User' };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.hideAuthModal();
        this.showToast('Account created successfully!', 'success');
    }

    proceedToCheckout() {
        if (this.cart.length === 0) {
            this.showToast('Your cart is empty!', 'error');
            return;
        }
        
        if (!this.currentUser) {
            this.showAuthModal();
            this.showToast('Please sign in to continue', 'info');
            return;
        }
        
        // For this demo, we'll just show a success message
        this.showToast('Redirecting to checkout...', 'success');
        setTimeout(() => {
            window.location.href = 'checkout.html';
        }, 1500);
    }
}

// Initialize the store when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.store = new ModernStore();
});