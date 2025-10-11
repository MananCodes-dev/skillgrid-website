// Advanced cart management for ModernStore
class CartManager {
    constructor(storeInstance) {
        this.store = storeInstance;
        this.isOpen = false;
        this.animationDuration = 300;
    }

    // Enhanced cart toggle with backdrop
    toggleCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const backdrop = this.getOrCreateBackdrop();
        
        if (!this.isOpen) {
            this.openCart(cartSidebar, backdrop);
        } else {
            this.closeCart(cartSidebar, backdrop);
        }
    }

    openCart(cartSidebar, backdrop) {
        this.isOpen = true;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        backdrop.classList.add('active');
        cartSidebar.classList.add('cart-open');
        
        // Focus management for accessibility
        cartSidebar.setAttribute('aria-hidden', 'false');
        const firstFocusable = cartSidebar.querySelector('button, input, [tabindex]:not([tabindex="-1"])');
        firstFocusable?.focus();
    }

    closeCart(cartSidebar, backdrop) {
        this.isOpen = false;
        document.body.style.overflow = ''; // Restore scrolling
        
        backdrop.classList.remove('active');
        cartSidebar.classList.remove('cart-open');
        cartSidebar.setAttribute('aria-hidden', 'true');
    }

    getOrCreateBackdrop() {
        let backdrop = document.getElementById('cart-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'cart-backdrop';
            backdrop.className = 'cart-backdrop';
            backdrop.addEventListener('click', () => this.toggleCart());
            document.body.appendChild(backdrop);
        }
        return backdrop;
    }

    // Enhanced add to cart with animation and feedback
    addToCart(productId, quantity = 1) {
        const product = this.store.products.find(p => p.id === productId);
        if (!product) {
            this.store.showToast('Product not found', 'error');
            return false;
        }

        if (!product.inStock) {
            this.store.showToast('Product is out of stock', 'error');
            return false;
        }

        // Add animation from product card to cart icon
        this.animateAddToCart(productId);

        const existingItem = this.store.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.store.cart.push({ 
                ...product, 
                quantity,
                addedAt: new Date().toISOString()
            });
        }
        
        this.store.saveCart();
        this.updateCartUI();
        
        // Show success feedback
        this.store.showToast(`${product.name} added to cart!`, 'success');
        
        // Animate cart icon
        this.animateCartIcon();
        
        return true;
    }

    // Bulk operations
    addMultipleToCart(items) {
        let addedCount = 0;
        items.forEach(({ productId, quantity }) => {
            if (this.addToCart(productId, quantity)) {
                addedCount++;
            }
        });
        
        if (addedCount > 0) {
            this.store.showToast(`${addedCount} items added to cart!`, 'success');
        }
    }

    clearCart() {
        if (this.store.cart.length === 0) {
            this.store.showToast('Cart is already empty', 'info');
            return;
        }

        // Show confirmation dialog
        if (confirm('Are you sure you want to clear all items from your cart?')) {
            this.store.cart = [];
            this.store.saveCart();
            this.updateCartUI();
            this.store.showToast('Cart cleared successfully', 'success');
        }
    }

    // Enhanced quantity management with validation
    updateCartQuantity(productId, newQuantity) {
        const item = this.store.cart.find(item => item.id === productId);
        if (!item) return;

        if (newQuantity < 1) {
            this.removeFromCart(productId);
            return;
        }

        // Add max quantity validation
        const maxQuantity = 10; // Could be product-specific
        if (newQuantity > maxQuantity) {
            this.store.showToast(`Maximum quantity is ${maxQuantity}`, 'warning');
            newQuantity = maxQuantity;
        }

        item.quantity = newQuantity;
        item.updatedAt = new Date().toISOString();
        
        this.store.saveCart();
        this.updateCartUI();
    }

    removeFromCart(productId) {
        const item = this.store.cart.find(item => item.id === productId);
        if (!item) return;

        this.store.cart = this.store.cart.filter(item => item.id !== productId);
        this.store.saveCart();
        this.updateCartUI();
        
        this.store.showToast(`${item.name} removed from cart`, 'info');
        
        // Animate removal
        this.animateItemRemoval(productId);
    }

    // Enhanced cart UI with better UX
    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        
        const totalItems = this.store.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.calculateTotal();
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.classList.toggle('hidden', totalItems === 0);
            
            // Add bounce animation for count updates
            if (totalItems > 0) {
                cartCount.classList.add('animate-bounce');
                setTimeout(() => cartCount.classList.remove('animate-bounce'), 500);
            }
        }
        
        if (cartTotal) {
            cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
        }
        
        this.renderCartItems();
        this.updateCheckoutButton();
    }

    calculateTotal() {
        return this.store.cart.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    }

    calculateSubtotal() {
        return this.calculateTotal();
    }

    calculateTax(rate = 0.08) {
        return this.calculateSubtotal() * rate;
    }

    calculateShipping() {
        const subtotal = this.calculateSubtotal();
        return subtotal >= 50 ? 0 : 5.99; // Free shipping over $50
    }

    calculateGrandTotal() {
        return this.calculateSubtotal() + this.calculateTax() + this.calculateShipping();
    }

    // Enhanced cart items rendering
    renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (!cartItemsContainer) return;

        if (this.store.cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center text-gray-500 py-8">
                    <i class="fas fa-shopping-cart text-4xl mb-4 opacity-50"></i>
                    <p class="text-lg mb-2">Your cart is empty</p>
                    <p class="text-sm">Add some products to get started!</p>
                    <button onclick="store.cartManager.closeCart()" 
                            class="mt-4 text-indigo-600 hover:text-indigo-700 font-medium">
                        Continue Shopping
                    </button>
                </div>
            `;
            return;
        }

        const itemsHTML = this.store.cart.map((item, index) => this.renderCartItem(item, index)).join('');
        
        cartItemsContainer.innerHTML = `
            ${itemsHTML}
            <div class="border-t pt-4 mt-4">
                ${this.renderCartSummary()}
                <div class="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Shipping</span>
                    <span>${this.calculateShipping() === 0 ? 'Free' : '$' + this.calculateShipping().toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-sm text-gray-600">
                    <span>Tax</span>
                    <span>$${this.calculateTax().toFixed(2)}</span>
                </div>
            </div>
        `;
    }

    renderCartItem(item, index) {
        const itemTotal = item.price * item.quantity;
        
        return `
            <div class="cart-item flex items-center space-x-4 bg-gray-50 p-3 rounded-lg mb-3" 
                 data-product-id="${item.id}">
                <div class="flex-shrink-0">
                    <img src="${item.image}" 
                         alt="${item.name}" 
                         class="w-16 h-16 object-cover rounded-lg">
                </div>
                
                <div class="flex-1 min-w-0">
                    <h4 class="font-medium text-sm text-gray-900 truncate">${item.name}</h4>
                    <p class="text-xs text-gray-600 mt-1">$${item.price.toFixed(2)} each</p>
                    <p class="text-sm font-semibold text-indigo-600">$${itemTotal.toFixed(2)}</p>
                </div>
                
                <div class="flex items-center space-x-2">
                    <button onclick="store.cartManager.updateCartQuantity(${item.id}, ${item.quantity - 1})" 
                            class="quantity-btn w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-sm transition-colors">
                        <i class="fas fa-minus text-xs"></i>
                    </button>
                    <span class="quantity-display text-sm font-medium w-8 text-center">${item.quantity}</span>
                    <button onclick="store.cartManager.updateCartQuantity(${item.id}, ${item.quantity + 1})" 
                            class="quantity-btn w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-sm transition-colors">
                        <i class="fas fa-plus text-xs"></i>
                    </button>
                </div>
                
                <button onclick="store.cartManager.removeFromCart(${item.id})" 
                        class="text-red-500 hover:text-red-700 transition-colors p-1">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
        `;
    }

    renderCartSummary() {
        const subtotal = this.calculateSubtotal();
        const shipping = this.calculateShipping();
        const tax = this.calculateTax();
        const total = this.calculateGrandTotal();
        
        return `
            <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                    <span>Subtotal</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                ${shipping === 0 ? `
                    <div class="flex justify-between text-green-600">
                        <span>Shipping</span>
                        <span>Free!</span>
                    </div>
                ` : `
                    <div class="flex justify-between">
                        <span>Shipping</span>
                        <span>$${shipping.toFixed(2)}</span>
                    </div>
                `}
                <div class="flex justify-between">
                    <span>Tax</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="border-t pt-2">
                    <div class="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span class="text-indigo-600">$${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    updateCheckoutButton() {
        const checkoutBtn = document.getElementById('checkout-btn');
        if (!checkoutBtn) return;

        const isEmpty = this.store.cart.length === 0;
        const total = this.calculateGrandTotal();
        
        checkoutBtn.disabled = isEmpty;
        checkoutBtn.className = `w-full py-3 rounded-lg font-semibold transition-colors ${
            isEmpty 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`;
        
        checkoutBtn.innerHTML = isEmpty 
            ? '<i class="fas fa-shopping-cart mr-2"></i>Cart is Empty'
            : `<i class="fas fa-lock mr-2"></i>Checkout - $${total.toFixed(2)}`;
    }

    // Animation methods
    animateAddToCart(productId) {
        // Find the product card and animate
        const productCard = document.querySelector(`[data-product-id="${productId}"]`) || 
                           document.querySelector('.product-card');
        
        if (productCard) {
            productCard.classList.add('animate-pulse');
            setTimeout(() => productCard.classList.remove('animate-pulse'), 300);
        }
    }

    animateCartIcon() {
        const cartIcon = document.querySelector('#cart-btn i');
        if (cartIcon) {
            cartIcon.classList.add('animate-bounce');
            setTimeout(() => cartIcon.classList.remove('animate-bounce'), 500);
        }
    }

    animateItemRemoval(productId) {
        const cartItem = document.querySelector(`[data-product-id="${productId}"]`);
        if (cartItem) {
            cartItem.style.transform = 'translateX(100%)';
            cartItem.style.opacity = '0';
            cartItem.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                if (cartItem.parentNode) {
                    cartItem.remove();
                }
            }, 300);
        }
    }

    // Cart persistence and sharing
    exportCart() {
        const cartData = {
            items: this.store.cart,
            total: this.calculateGrandTotal(),
            exportedAt: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(cartData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `cart-${Date.now()}.json`;
        link.click();
        
        this.store.showToast('Cart exported successfully', 'success');
    }

    shareCart() {
        if (navigator.share) {
            const total = this.calculateGrandTotal();
            const itemCount = this.store.cart.reduce((sum, item) => sum + item.quantity, 0);
            
            navigator.share({
                title: 'ModernStore Cart',
                text: `Check out my cart with ${itemCount} items totaling $${total.toFixed(2)}!`,
                url: window.location.href
            });
        } else {
            // Fallback: Copy to clipboard
            const shareText = `Check out my ModernStore cart: ${this.store.cart.length} items, $${this.calculateGrandTotal().toFixed(2)} total!`;
            navigator.clipboard.writeText(shareText);
            this.store.showToast('Cart details copied to clipboard', 'success');
        }
    }

    // Wishlist integration
    moveToWishlist(productId) {
        const item = this.store.cart.find(item => item.id === productId);
        if (!item) return;

        // Add to wishlist if not already there
        const isInWishlist = this.store.wishlist.some(wishItem => wishItem.id === productId);
        if (!isInWishlist) {
            this.store.wishlist.push({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                addedAt: new Date().toISOString()
            });
            this.store.saveWishlist();
        }

        // Remove from cart
        this.removeFromCart(productId);
        
        this.store.showToast(`${item.name} moved to wishlist`, 'success');
        this.store.updateWishlistUI();
    }

    // Quick actions
    saveForLater() {
        if (this.store.cart.length === 0) return;
        
        const savedCart = JSON.stringify(this.store.cart);
        localStorage.setItem('savedCart', savedCart);
        localStorage.setItem('savedCartDate', new Date().toISOString());
        
        this.store.showToast('Cart saved for later', 'success');
    }

    restoreSavedCart() {
        const savedCart = localStorage.getItem('savedCart');
        if (!savedCart) {
            this.store.showToast('No saved cart found', 'info');
            return;
        }

        try {
            const parsedCart = JSON.parse(savedCart);
            this.store.cart = parsedCart;
            this.store.saveCart();
            this.updateCartUI();
            
            localStorage.removeItem('savedCart');
            localStorage.removeItem('savedCartDate');
            
            this.store.showToast('Cart restored successfully', 'success');
        } catch (error) {
            this.store.showToast('Error restoring cart', 'error');
        }
    }
}

// Initialize cart manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.store) {
        window.store.cartManager = new CartManager(window.store);
        
        // Override main store cart methods
        window.store.addToCart = (productId, quantity) => window.store.cartManager.addToCart(productId, quantity);
        window.store.toggleCart = () => window.store.cartManager.toggleCart();
        window.store.closeCart = () => window.store.cartManager.closeCart();
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && window.store.cartManager.isOpen) {
                window.store.cartManager.toggleCart();
            }
        });
    }
});