// Products management for ModernStore
class ProductManager {
    constructor(storeInstance) {
        this.store = storeInstance;
        this.filteredProducts = [];
        this.searchQuery = '';
        this.isListView = false;
    }

    // Product rendering
    renderProducts() {
        this.applyFilters();
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) return;

        if (this.filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                    <p class="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        const productsToShow = this.filteredProducts.slice(0, this.store.currentPage * this.store.productsPerPage);
        
        productsGrid.innerHTML = productsToShow.map(product => 
            this.isListView ? this.renderProductListItem(product) : this.renderProductCard(product)
        ).join('');

        // Update load more button
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            const hasMore = productsToShow.length < this.filteredProducts.length;
            loadMoreBtn.style.display = hasMore ? 'block' : 'none';
        }

        // Update grid classes for list view
        if (this.isListView) {
            productsGrid.className = 'space-y-4';
        } else {
            productsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
        }
    }

    renderProductCard(product) {
        const isInWishlist = this.store.wishlist.some(item => item.id === product.id);
        const discountPercentage = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        return `
            <div class="product-card bg-white rounded-lg shadow-md overflow-hidden relative group">
                ${discountPercentage > 0 ? `
                    <div class="discount-badge">
                        -${discountPercentage}%
                    </div>
                ` : ''}
                
                <div class="product-image relative overflow-hidden">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         class="w-full h-48 object-cover transition-transform duration-300">
                    
                    <!-- Overlay buttons -->
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-1 opacity-0 group-hover:opacity-100">
                        <button onclick="store.productManager.quickView(${product.id})" 
                                class="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors" title="Quick View">
                            <i class="fas fa-eye text-sm"></i>
                        </button>
                        <button onclick="store.addToCart(${product.id})" 
                                class="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors" title="Add to Cart">
                            <i class="fas fa-shopping-cart text-sm"></i>
                        </button>
                        <button onclick="store.toggleWishlist(${product.id})" 
                                class="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors" title="Add to Wishlist">
                            <i class="fas fa-heart text-sm ${isInWishlist ? 'text-red-500' : ''}"></i>
                        </button>
                        <button onclick="store.addToComparison && store.addToComparison(${product.id})" 
                                class="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors" title="Compare">
                            <i class="fas fa-balance-scale text-sm"></i>
                        </button>
                    </div>
                </div>

                <div class="p-4">
                    <div class="flex items-start justify-between mb-2">
                        <h3 class="text-sm font-semibold text-gray-800 line-clamp-2">${product.name}</h3>
                        <button onclick="store.toggleWishlist(${product.id})" 
                                class="text-gray-400 hover:text-red-500 transition-colors ml-2">
                            <i class="fas fa-heart ${isInWishlist ? 'text-red-500' : ''}"></i>
                        </button>
                    </div>
                    
                    <p class="text-xs text-gray-600 mb-3 line-clamp-2">${product.description}</p>
                    
                    <!-- Rating -->
                    <div class="flex items-center space-x-1 mb-3">
                        ${this.renderStars(product.rating)}
                        <button onclick="store.showProductReviews && store.showProductReviews(${product.id})" 
                                class="text-xs text-gray-500 hover:text-indigo-600 transition-colors">
                            (${product.reviews} reviews)
                        </button>
                    </div>
                    
                    <!-- Price -->
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center space-x-2">
                            <span class="text-lg font-bold text-indigo-600">$${product.price.toFixed(2)}</span>
                            ${product.originalPrice ? `
                                <span class="text-sm text-gray-500 line-through">$${product.originalPrice.toFixed(2)}</span>
                            ` : ''}
                        </div>
                        <span class="text-xs px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            ${product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>
                    
                    <!-- Actions -->
                    <div class="flex space-x-2">
                        <button onclick="store.addToCart(${product.id})" 
                                class="flex-1 bg-indigo-600 text-white py-2 px-3 rounded-md text-sm hover:bg-indigo-700 transition-colors ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}"
                                ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-cart-plus mr-1"></i>
                            Add to Cart
                        </button>
                        <button onclick="store.productManager.quickView(${product.id})" 
                                class="bg-gray-100 text-gray-700 py-2 px-3 rounded-md text-sm hover:bg-gray-200 transition-colors">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderProductListItem(product) {
        const isInWishlist = this.store.wishlist.some(item => item.id === product.id);
        const discountPercentage = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        return `
            <div class="product-card bg-white rounded-lg shadow-md overflow-hidden flex">
                <div class="relative">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         class="w-32 h-32 object-cover">
                    ${discountPercentage > 0 ? `
                        <div class="discount-badge">
                            -${discountPercentage}%
                        </div>
                    ` : ''}
                </div>
                
                <div class="flex-1 p-4 flex justify-between">
                    <div class="flex-1">
                        <div class="flex items-start justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                            <button onclick="store.toggleWishlist(${product.id})" 
                                    class="text-gray-400 hover:text-red-500 transition-colors ml-2">
                                <i class="fas fa-heart ${isInWishlist ? 'text-red-500' : ''}"></i>
                            </button>
                        </div>
                        
                        <p class="text-gray-600 mb-2">${product.description}</p>
                        
                        <!-- Rating -->
                        <div class="flex items-center space-x-1 mb-2">
                            ${this.renderStars(product.rating)}
                            <button onclick="store.showProductReviews && store.showProductReviews(${product.id})" 
                                    class="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                                (${product.reviews} reviews)
                            </button>
                        </div>
                        
                        <div class="flex items-center space-x-2">
                            <span class="text-xl font-bold text-indigo-600">$${product.price.toFixed(2)}</span>
                            ${product.originalPrice ? `
                                <span class="text-gray-500 line-through">$${product.originalPrice.toFixed(2)}</span>
                            ` : ''}
                            <span class="text-sm px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                ${product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>
                    
                    <div class="flex flex-col justify-center space-y-2 ml-4">
                        <button onclick="store.addToCart(${product.id})" 
                                class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}"
                                ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-cart-plus mr-1"></i>
                            Add to Cart
                        </button>
                        <button onclick="store.productManager.quickView(${product.id})" 
                                class="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
                            <i class="fas fa-eye mr-1"></i>
                            Quick View
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let starsHTML = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star star"></i>';
        }
        
        // Half star
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt star"></i>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star star empty"></i>';
        }
        
        return starsHTML;
    }

    // Filtering and Sorting
    applyFilters() {
        let filtered = [...this.store.products];

        // Apply category filter
        if (this.store.currentCategory && this.store.currentCategory !== 'all') {
            filtered = filtered.filter(product => product.category === this.store.currentCategory);
        }

        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }

        // Apply sorting
        filtered = this.sortProducts(filtered);

        this.filteredProducts = filtered;
    }

    sortProducts(products) {
        switch (this.store.currentSort) {
            case 'price-low':
                return products.sort((a, b) => a.price - b.price);
            case 'price-high':
                return products.sort((a, b) => b.price - a.price);
            case 'name':
                return products.sort((a, b) => a.name.localeCompare(b.name));
            case 'rating':
                return products.sort((a, b) => b.rating - a.rating);
            case 'featured':
            default:
                return products.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return b.rating - a.rating;
                });
        }
    }

    // Search functionality
    handleSearch(query) {
        this.searchQuery = query;
        this.store.currentPage = 1;
        this.renderProducts();
    }

    // Category filtering
    filterByCategory(category) {
        this.store.currentCategory = category;
        this.store.currentPage = 1;
        this.renderProducts();
        
        // Update category cards visual state
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('ring-2', 'ring-indigo-500');
        });
        
        if (category !== 'all') {
            const selectedCard = document.querySelector(`[data-category="${category}"]`);
            selectedCard?.classList.add('ring-2', 'ring-indigo-500');
        }
    }

    // View switching
    setGridView() {
        this.isListView = false;
        this.renderProducts();
        
        // Update button states
        document.getElementById('grid-view')?.classList.add('text-indigo-600', 'bg-indigo-100');
        document.getElementById('grid-view')?.classList.remove('text-gray-500');
        document.getElementById('list-view')?.classList.remove('text-indigo-600', 'bg-indigo-100');
        document.getElementById('list-view')?.classList.add('text-gray-500');
    }

    setListView() {
        this.isListView = true;
        this.renderProducts();
        
        // Update button states
        document.getElementById('list-view')?.classList.add('text-indigo-600', 'bg-indigo-100');
        document.getElementById('list-view')?.classList.remove('text-gray-500');
        document.getElementById('grid-view')?.classList.remove('text-indigo-600', 'bg-indigo-100');
        document.getElementById('grid-view')?.classList.add('text-gray-500');
    }

    // Load more functionality
    loadMoreProducts() {
        this.store.currentPage++;
        this.renderProducts();
    }

    // Quick view modal
    quickView(productId) {
        const product = this.store.products.find(p => p.id === productId);
        if (!product) return;

        // Track recently viewed
        if (window.features && window.features.addToRecentlyViewed) {
            window.features.addToRecentlyViewed(productId);
        }

        const modal = document.createElement('div');
        modal.id = 'quick-view-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        
        const isInWishlist = this.store.wishlist.some(item => item.id === productId);
        
        modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-4xl w-full max-h-90vh overflow-y-auto">
                <div class="flex justify-between items-center p-4 border-b">
                    <h2 class="text-xl font-semibold">Quick View</h2>
                    <button onclick="this.closest('#quick-view-modal').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="grid md:grid-cols-2 gap-6 p-6">
                    <div>
                        <img src="${product.image}" alt="${product.name}" class="w-full h-80 object-cover rounded-lg">
                    </div>
                    
                    <div>
                        <h3 class="text-2xl font-bold mb-2">${product.name}</h3>
                        <div class="flex items-center space-x-2 mb-4">
                            ${this.renderStars(product.rating)}
                            <span class="text-gray-500">(${product.reviews} reviews)</span>
                        </div>
                        
                        <p class="text-gray-700 mb-4">${product.description}</p>
                        
                        <div class="flex items-center space-x-3 mb-4">
                            <span class="text-3xl font-bold text-indigo-600">$${product.price.toFixed(2)}</span>
                            ${product.originalPrice ? `
                                <span class="text-xl text-gray-500 line-through">$${product.originalPrice.toFixed(2)}</span>
                            ` : ''}
                        </div>
                        
                        <div class="flex items-center space-x-2 mb-6">
                            <span class="px-3 py-1 rounded-full text-sm ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                ${product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                        
                        <div class="flex space-x-3">
                            <button onclick="store.addToCart(${product.id}); this.closest('#quick-view-modal').remove();" 
                                    class="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}"
                                    ${!product.inStock ? 'disabled' : ''}>
                                <i class="fas fa-cart-plus mr-2"></i>
                                Add to Cart
                            </button>
                            <button onclick="store.toggleWishlist(${product.id}); this.closest('#quick-view-modal').remove();" 
                                    class="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                                <i class="fas fa-heart ${isInWishlist ? 'text-red-500' : ''}"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Extend the main store class with product management
document.addEventListener('DOMContentLoaded', () => {
    if (window.store) {
        window.store.productManager = new ProductManager(window.store);
        
        // Add methods to the main store instance
        window.store.renderProducts = () => window.store.productManager.renderProducts();
        window.store.handleSearch = (query) => window.store.productManager.handleSearch(query);
        window.store.filterByCategory = (category) => window.store.productManager.filterByCategory(category);
        window.store.setGridView = () => window.store.productManager.setGridView();
        window.store.setListView = () => window.store.productManager.setListView();
        window.store.loadMoreProducts = () => window.store.productManager.loadMoreProducts();
    }
});