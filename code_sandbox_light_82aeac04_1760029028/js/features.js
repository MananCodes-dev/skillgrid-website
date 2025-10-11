// Additional interactive features for ModernStore
class InteractiveFeatures {
    constructor(storeInstance) {
        this.store = storeInstance;
        this.reviews = JSON.parse(localStorage.getItem('productReviews')) || {};
        this.wishlistVisible = false;
        this.recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        
        this.init();
    }

    init() {
        this.setupProductReviews();
        this.setupRecentlyViewed();
        this.setupProductComparison();
        this.setupAdvancedSearch();
        this.setupProductFilters();
        this.setupKeyboardNavigation();
        this.setupLiveChat();
        this.setupNewsletterSignup();
    }

    // Product Reviews System
    setupProductReviews() {
        // Initialize reviews for sample products
        if (Object.keys(this.reviews).length === 0) {
            this.generateSampleReviews();
        }
    }

    generateSampleReviews() {
        const sampleReviews = {
            1: [ // Premium Wireless Headphones
                {
                    id: 1,
                    userName: "John Doe",
                    rating: 5,
                    comment: "Excellent sound quality and comfort. Battery life is amazing!",
                    date: "2024-01-15",
                    verified: true,
                    helpful: 12
                },
                {
                    id: 2,
                    userName: "Sarah Miller",
                    rating: 4,
                    comment: "Great headphones, but a bit pricey. Worth it for the quality though.",
                    date: "2024-01-10",
                    verified: true,
                    helpful: 8
                }
            ],
            2: [ // Organic Cotton T-Shirt
                {
                    id: 3,
                    userName: "Mike Johnson",
                    rating: 5,
                    comment: "Super soft and comfortable. Perfect fit!",
                    date: "2024-01-12",
                    verified: true,
                    helpful: 5
                }
            ]
        };
        
        this.reviews = sampleReviews;
        localStorage.setItem('productReviews', JSON.stringify(this.reviews));
    }

    showProductReviews(productId) {
        const productReviews = this.reviews[productId] || [];
        const product = this.store.products.find(p => p.id === productId);
        
        if (!product) return;

        const modal = document.createElement('div');
        modal.id = 'reviews-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        
        modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-4xl w-full max-h-90vh overflow-y-auto">
                <div class="p-6 border-b">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-semibold">Reviews for ${product.name}</h3>
                        <button onclick="this.closest('#reviews-modal').remove()" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="flex items-center mt-2">
                        ${this.store.productManager.renderStars(product.rating)}
                        <span class="ml-2 text-gray-600">${product.rating} out of 5 (${productReviews.length} reviews)</span>
                    </div>
                </div>
                
                <div class="p-6">
                    <!-- Add Review Form -->
                    <div class="mb-6 bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-3">Write a Review</h4>
                        <form id="review-form" data-product-id="${productId}">
                            <div class="mb-3">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                <div class="flex space-x-1">
                                    ${[1,2,3,4,5].map(star => `
                                        <button type="button" class="review-star text-2xl text-gray-300 hover:text-yellow-400" data-rating="${star}">
                                            <i class="fas fa-star"></i>
                                        </button>
                                    `).join('')}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input type="text" name="userName" required 
                                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            </div>
                            <div class="mb-3">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Review</label>
                                <textarea name="comment" rows="3" required 
                                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                            </div>
                            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                Submit Review
                            </button>
                        </form>
                    </div>
                    
                    <!-- Existing Reviews -->
                    <div class="space-y-4">
                        <h4 class="font-semibold">Customer Reviews</h4>
                        ${productReviews.length > 0 ? productReviews.map(review => `
                            <div class="border-b pb-4">
                                <div class="flex items-center justify-between mb-2">
                                    <div class="flex items-center space-x-2">
                                        <span class="font-medium">${review.userName}</span>
                                        ${review.verified ? '<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Verified Purchase</span>' : ''}
                                    </div>
                                    <span class="text-sm text-gray-500">${review.date}</span>
                                </div>
                                <div class="flex items-center mb-2">
                                    ${this.renderReviewStars(review.rating)}
                                </div>
                                <p class="text-gray-700 mb-2">${review.comment}</p>
                                <div class="flex items-center text-sm text-gray-500">
                                    <button class="flex items-center space-x-1 hover:text-gray-700">
                                        <i class="fas fa-thumbs-up"></i>
                                        <span>Helpful (${review.helpful})</span>
                                    </button>
                                </div>
                            </div>
                        `).join('') : '<p class="text-gray-500">No reviews yet. Be the first to review!</p>'}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Setup review form
        this.setupReviewForm();
        this.setupReviewStars();
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    renderReviewStars(rating) {
        return Array.from({length: 5}, (_, i) => 
            `<i class="fas fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-300'}"></i>`
        ).join('');
    }

    setupReviewForm() {
        const reviewForm = document.getElementById('review-form');
        if (!reviewForm) return;

        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(reviewForm);
            const productId = parseInt(reviewForm.dataset.productId);
            const selectedRating = reviewForm.querySelector('.review-star.selected')?.dataset.rating;
            
            if (!selectedRating) {
                alert('Please select a rating');
                return;
            }
            
            const newReview = {
                id: Date.now(),
                userName: formData.get('userName'),
                rating: parseInt(selectedRating),
                comment: formData.get('comment'),
                date: new Date().toISOString().split('T')[0],
                verified: false,
                helpful: 0
            };
            
            if (!this.reviews[productId]) {
                this.reviews[productId] = [];
            }
            
            this.reviews[productId].push(newReview);
            localStorage.setItem('productReviews', JSON.stringify(this.reviews));
            
            // Update product rating
            this.updateProductRating(productId);
            
            this.store.showToast('Review submitted successfully!', 'success');
            document.getElementById('reviews-modal').remove();
        });
    }

    setupReviewStars() {
        const reviewStars = document.querySelectorAll('.review-star');
        
        reviewStars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.rating);
                
                // Remove selected class from all stars
                reviewStars.forEach(s => s.classList.remove('selected', 'text-yellow-400'));
                
                // Add selected class to clicked star and all previous stars
                for (let i = 0; i < rating; i++) {
                    reviewStars[i].classList.add('selected', 'text-yellow-400');
                    reviewStars[i].classList.remove('text-gray-300');
                }
            });
        });
    }

    updateProductRating(productId) {
        const productReviews = this.reviews[productId] || [];
        const product = this.store.products.find(p => p.id === productId);
        
        if (product && productReviews.length > 0) {
            const averageRating = productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length;
            product.rating = Math.round(averageRating * 10) / 10; // Round to 1 decimal
            product.reviews = productReviews.length;
            
            // Re-render products if on products page
            if (this.store.productManager) {
                this.store.productManager.renderProducts();
            }
        }
    }

    // Recently Viewed Products
    setupRecentlyViewed() {
        this.displayRecentlyViewed();
    }

    addToRecentlyViewed(productId) {
        const product = this.store.products.find(p => p.id === productId);
        if (!product) return;

        // Remove if already exists
        this.recentlyViewed = this.recentlyViewed.filter(item => item.id !== productId);
        
        // Add to beginning
        this.recentlyViewed.unshift({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            viewedAt: new Date().toISOString()
        });
        
        // Keep only last 10 items
        this.recentlyViewed = this.recentlyViewed.slice(0, 10);
        
        localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
        this.displayRecentlyViewed();
    }

    displayRecentlyViewed() {
        if (this.recentlyViewed.length === 0) return;

        // Add recently viewed section to homepage
        const existingSection = document.getElementById('recently-viewed-section');
        if (existingSection) {
            existingSection.remove();
        }

        const productsSection = document.getElementById('products');
        if (!productsSection) return;

        const recentlyViewedHTML = `
            <section id="recently-viewed-section" class="py-16">
                <div class="container mx-auto px-4">
                    <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Recently Viewed</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        ${this.recentlyViewed.slice(0, 4).map(item => `
                            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
                                <div class="p-4">
                                    <h3 class="font-semibold mb-2 text-sm">${item.name}</h3>
                                    <p class="text-indigo-600 font-bold">$${item.price.toFixed(2)}</p>
                                    <button onclick="store.addToCart(${item.id})" 
                                            class="mt-2 w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;

        productsSection.insertAdjacentHTML('beforebegin', recentlyViewedHTML);
    }

    // Advanced Search with Filters
    setupAdvancedSearch() {
        this.createAdvancedSearchModal();
    }

    createAdvancedSearchModal() {
        const searchButton = document.createElement('button');
        searchButton.innerHTML = '<i class="fas fa-filter"></i>';
        searchButton.className = 'text-gray-700 hover:text-indigo-600 transition-colors p-2';
        searchButton.title = 'Advanced Search';
        searchButton.onclick = () => this.showAdvancedSearchModal();

        // Add to search container
        const searchContainer = document.querySelector('.lg\\:flex.relative');
        if (searchContainer) {
            searchContainer.appendChild(searchButton);
        }
    }

    showAdvancedSearchModal() {
        const modal = document.createElement('div');
        modal.id = 'advanced-search-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        
        modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-2xl w-full p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-semibold">Advanced Search</h3>
                    <button onclick="this.closest('#advanced-search-modal').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <form id="advanced-search-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Search Keywords</label>
                        <input type="text" name="keywords" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select name="category" 
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="">All Categories</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="home">Home & Garden</option>
                                <option value="sports">Sports</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                            <select name="rating" 
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="">Any Rating</option>
                                <option value="4">4+ Stars</option>
                                <option value="3">3+ Stars</option>
                                <option value="2">2+ Stars</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                            <input type="number" name="minPrice" step="0.01" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                            <input type="number" name="maxPrice" step="0.01" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                        <label class="flex items-center">
                            <input type="checkbox" name="inStock" class="mr-2">
                            <span class="text-sm">In Stock Only</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" name="featured" class="mr-2">
                            <span class="text-sm">Featured Only</span>
                        </label>
                    </div>
                    
                    <div class="flex justify-end space-x-3 pt-4">
                        <button type="button" onclick="this.closest('#advanced-search-modal').remove()" 
                                class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" 
                                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            Search
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Setup form submission
        document.getElementById('advanced-search-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.performAdvancedSearch(new FormData(e.target));
            modal.remove();
        });
    }

    performAdvancedSearch(formData) {
        const filters = {
            keywords: formData.get('keywords'),
            category: formData.get('category'),
            rating: parseFloat(formData.get('rating')),
            minPrice: parseFloat(formData.get('minPrice')),
            maxPrice: parseFloat(formData.get('maxPrice')),
            inStock: formData.get('inStock') === 'on',
            featured: formData.get('featured') === 'on'
        };
        
        let filteredProducts = [...this.store.products];
        
        // Apply filters
        if (filters.keywords) {
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(filters.keywords.toLowerCase()) ||
                p.description.toLowerCase().includes(filters.keywords.toLowerCase())
            );
        }
        
        if (filters.category) {
            filteredProducts = filteredProducts.filter(p => p.category === filters.category);
        }
        
        if (filters.rating) {
            filteredProducts = filteredProducts.filter(p => p.rating >= filters.rating);
        }
        
        if (filters.minPrice) {
            filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
        }
        
        if (filters.maxPrice) {
            filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
        }
        
        if (filters.inStock) {
            filteredProducts = filteredProducts.filter(p => p.inStock);
        }
        
        if (filters.featured) {
            filteredProducts = filteredProducts.filter(p => p.featured);
        }
        
        // Show results
        this.showSearchResults(filteredProducts, filters);
    }

    showSearchResults(products, filters) {
        // Scroll to products section
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
        
        // Temporarily replace products for display
        const originalProducts = this.store.products;
        this.store.products = products;
        this.store.productManager.renderProducts();
        
        // Show search summary
        const resultsCount = products.length;
        this.store.showToast(`Found ${resultsCount} products matching your criteria`, 'info');
        
        // Add clear filters button
        this.addClearFiltersButton(() => {
            this.store.products = originalProducts;
            this.store.productManager.renderProducts();
        });
    }

    addClearFiltersButton(clearCallback) {
        const existingBtn = document.getElementById('clear-filters-btn');
        if (existingBtn) existingBtn.remove();
        
        const productsSection = document.querySelector('#products .container');
        if (productsSection) {
            const clearBtn = document.createElement('div');
            clearBtn.id = 'clear-filters-btn';
            clearBtn.className = 'mb-4 text-center';
            clearBtn.innerHTML = `
                <button onclick="this.parentElement.remove(); arguments[0]()" 
                        class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <i class="fas fa-times mr-2"></i>
                    Clear Filters
                </button>
            `;
            
            // Store callback in a way that can be accessed
            clearBtn.querySelector('button').onclick = () => {
                clearBtn.remove();
                clearCallback();
            };
            
            productsSection.insertBefore(clearBtn, productsSection.firstChild);
        }
    }

    // Keyboard Navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC to close modals
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.fixed.inset-0');
                modals.forEach(modal => modal.remove());
                
                if (this.store.cartManager?.isOpen) {
                    this.store.cartManager.toggleCart();
                }
            }
            
            // Ctrl+K for search
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                document.getElementById('search-input')?.focus();
            }
            
            // Ctrl+Shift+C for cart
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                this.store.cartManager?.toggleCart();
            }
        });
    }

    // Live Chat Widget (Mock)
    setupLiveChat() {
        const chatWidget = document.createElement('div');
        chatWidget.id = 'live-chat-widget';
        chatWidget.className = 'fixed bottom-4 right-4 z-40';
        chatWidget.innerHTML = `
            <button onclick="features.toggleLiveChat()" 
                    class="bg-indigo-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors">
                <i class="fas fa-comments text-xl"></i>
            </button>
        `;
        
        document.body.appendChild(chatWidget);
    }

    toggleLiveChat() {
        const existingChat = document.getElementById('live-chat-modal');
        if (existingChat) {
            existingChat.remove();
            return;
        }
        
        const chatModal = document.createElement('div');
        chatModal.id = 'live-chat-modal';
        chatModal.className = 'fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl z-50 border';
        
        chatModal.innerHTML = `
            <div class="p-4 bg-indigo-600 text-white rounded-t-lg">
                <div class="flex justify-between items-center">
                    <h4 class="font-semibold">Live Support</h4>
                    <button onclick="this.closest('#live-chat-modal').remove()" class="text-white hover:text-gray-200">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="text-sm opacity-90">We're here to help!</div>
            </div>
            
            <div class="h-64 overflow-y-auto p-4 space-y-3" id="chat-messages">
                <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <div class="text-sm">Hello! How can I help you today?</div>
                    <div class="text-xs text-gray-500 mt-1">Support Agent</div>
                </div>
            </div>
            
            <div class="p-4 border-t">
                <div class="flex space-x-2">
                    <input type="text" id="chat-input" placeholder="Type your message..." 
                           class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <button onclick="features.sendChatMessage()" 
                            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatModal);
        
        // Focus on chat input
        document.getElementById('chat-input')?.focus();
        
        // Enter key to send message
        document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage();
            }
        });
    }

    sendChatMessage() {
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');
        
        if (!chatInput || !chatMessages || !chatInput.value.trim()) return;
        
        const message = chatInput.value.trim();
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'text-right';
        userMessage.innerHTML = `
            <div class="bg-indigo-600 text-white rounded-lg p-3 max-w-xs ml-auto">
                <div class="text-sm">${message}</div>
                <div class="text-xs opacity-75 mt-1">You</div>
            </div>
        `;
        
        chatMessages.appendChild(userMessage);
        
        // Clear input
        chatInput.value = '';
        
        // Auto-scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate bot response
        setTimeout(() => {
            const botResponse = this.generateBotResponse(message);
            const botMessage = document.createElement('div');
            botMessage.innerHTML = `
                <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <div class="text-sm">${botResponse}</div>
                    <div class="text-xs text-gray-500 mt-1">Support Agent</div>
                </div>
            `;
            
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }

    generateBotResponse(userMessage) {
        const responses = {
            'hello': 'Hello! How can I assist you today?',
            'help': 'I\'m here to help! What do you need assistance with?',
            'order': 'For order inquiries, please check your email for tracking information or contact our support team.',
            'shipping': 'We offer free shipping on orders over $50. Standard shipping takes 5-7 business days.',
            'return': 'We accept returns within 30 days of purchase. Items must be in original condition.',
            'payment': 'We accept all major credit cards, PayPal, and Apple Pay for secure payments.',
            'default': 'Thank you for your message. A support agent will get back to you shortly!'
        };
        
        const message = userMessage.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (message.includes(key)) {
                return response;
            }
        }
        
        return responses.default;
    }

    // Newsletter Signup
    setupNewsletterSignup() {
        // Newsletter signup is already in the footer, just add functionality
        const newsletterForm = document.querySelector('footer .flex');
        if (newsletterForm) {
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button');
            
            submitBtn?.addEventListener('click', (e) => {
                e.preventDefault();
                const email = emailInput?.value;
                
                if (email && this.isValidEmail(email)) {
                    this.store.showToast('Thank you for subscribing to our newsletter!', 'success');
                    emailInput.value = '';
                } else {
                    this.store.showToast('Please enter a valid email address', 'error');
                }
            });
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Product Comparison
    setupProductComparison() {
        this.comparisonList = JSON.parse(localStorage.getItem('productComparison')) || [];
        this.updateComparisonButton();
    }

    addToComparison(productId) {
        const product = this.store.products.find(p => p.id === productId);
        if (!product) return;

        if (this.comparisonList.length >= 3) {
            this.store.showToast('Maximum 3 products can be compared', 'warning');
            return;
        }

        if (this.comparisonList.some(p => p.id === productId)) {
            this.store.showToast('Product already in comparison', 'info');
            return;
        }

        this.comparisonList.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            rating: product.rating,
            category: product.category
        });

        localStorage.setItem('productComparison', JSON.stringify(this.comparisonList));
        this.updateComparisonButton();
        this.store.showToast(`${product.name} added to comparison`, 'success');
    }

    updateComparisonButton() {
        let compareBtn = document.getElementById('comparison-btn');
        
        if (this.comparisonList.length === 0) {
            if (compareBtn) compareBtn.remove();
            return;
        }
        
        if (!compareBtn) {
            compareBtn = document.createElement('button');
            compareBtn.id = 'comparison-btn';
            compareBtn.className = 'fixed bottom-20 left-4 bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors z-40';
            compareBtn.innerHTML = `
                <div class="relative">
                    <i class="fas fa-balance-scale"></i>
                    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">${this.comparisonList.length}</span>
                </div>
            `;
            compareBtn.onclick = () => this.showComparison();
            document.body.appendChild(compareBtn);
        } else {
            compareBtn.querySelector('span').textContent = this.comparisonList.length;
        }
    }

    showComparison() {
        if (this.comparisonList.length === 0) return;

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        
        modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-6xl w-full max-h-90vh overflow-auto">
                <div class="p-6 border-b">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-semibold">Product Comparison</h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                
                <div class="p-6">
                    <div class="grid grid-cols-${this.comparisonList.length} gap-4">
                        ${this.comparisonList.map(product => `
                            <div class="text-center">
                                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg mb-4">
                                <h4 class="font-semibold mb-2">${product.name}</h4>
                                <p class="text-indigo-600 font-bold text-lg mb-2">$${product.price.toFixed(2)}</p>
                                <div class="mb-2">${this.store.productManager.renderStars(product.rating)}</div>
                                <p class="text-sm text-gray-600 mb-4 capitalize">${product.category}</p>
                                <button onclick="features.removeFromComparison(${product.id})" 
                                        class="text-red-500 text-sm hover:text-red-700">
                                    Remove
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    removeFromComparison(productId) {
        this.comparisonList = this.comparisonList.filter(p => p.id !== productId);
        localStorage.setItem('productComparison', JSON.stringify(this.comparisonList));
        this.updateComparisonButton();
        
        // Close modal if no products left
        if (this.comparisonList.length === 0) {
            const modal = document.querySelector('.fixed.inset-0');
            if (modal) modal.remove();
        } else {
            // Refresh comparison modal
            const modal = document.querySelector('.fixed.inset-0');
            if (modal) {
                modal.remove();
                this.showComparison();
            }
        }
    }
}

// Initialize features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.store) {
        window.features = new InteractiveFeatures(window.store);
        
        // Add feature methods to main store
        window.store.showProductReviews = (productId) => window.features.showProductReviews(productId);
        window.store.addToRecentlyViewed = (productId) => window.features.addToRecentlyViewed(productId);
        window.store.addToComparison = (productId) => window.features.addToComparison(productId);
    }
});