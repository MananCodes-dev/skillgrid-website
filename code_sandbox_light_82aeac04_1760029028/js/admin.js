// Admin Dashboard for ModernStore
class AdminDashboard {
    constructor() {
        this.products = JSON.parse(localStorage.getItem('adminProducts')) || this.getDefaultProducts();
        this.orders = JSON.parse(localStorage.getItem('orders')) || this.generateMockOrders();
        this.customers = this.generateMockCustomers();
        this.currentSection = 'dashboard';
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupEventListeners();
        this.loadDashboardData();
        this.initializeCharts();
    }

    // Get default products from main store or create mock data
    getDefaultProducts() {
        // Try to get products from main store first
        const storeProducts = localStorage.getItem('products');
        if (storeProducts) {
            return JSON.parse(storeProducts).map(product => ({
                ...product,
                stock: Math.floor(Math.random() * 100) + 10,
                sold: Math.floor(Math.random() * 50),
                createdAt: new Date().toISOString()
            }));
        }

        // Fallback to mock data
        return [
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
                stock: 45,
                sold: 32,
                createdAt: "2024-01-15T10:30:00Z"
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
                stock: 78,
                sold: 156,
                createdAt: "2024-01-10T14:20:00Z"
            }
        ];
    }

    generateMockOrders() {
        const orders = [];
        const statuses = ['pending', 'confirmed', 'shipped', 'delivered'];
        const customers = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Davis'];
        
        for (let i = 1; i <= 20; i++) {
            orders.push({
                orderNumber: `MS-2024-${String(i).padStart(6, '0')}`,
                customer: customers[Math.floor(Math.random() * customers.length)],
                customerEmail: `customer${i}@example.com`,
                items: this.products.slice(0, Math.floor(Math.random() * 3) + 1),
                total: (Math.random() * 500 + 50).toFixed(2),
                status: statuses[Math.floor(Math.random() * statuses.length)],
                createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                shippingAddress: {
                    address: '123 Main St',
                    city: 'Anytown',
                    state: 'CA',
                    zipCode: '12345'
                }
            });
        }
        
        return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    generateMockCustomers() {
        const customers = [];
        const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Davis', 'Eva Wilson', 'Frank Miller'];
        
        names.forEach((name, index) => {
            customers.push({
                id: index + 1,
                name,
                email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
                totalOrders: Math.floor(Math.random() * 10) + 1,
                totalSpent: (Math.random() * 1000 + 100).toFixed(2),
                joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
                status: Math.random() > 0.1 ? 'active' : 'inactive'
            });
        });
        
        return customers;
    }

    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active', 'bg-indigo-100', 'text-indigo-700'));
                
                // Add active class to clicked link
                link.classList.add('active', 'bg-indigo-100', 'text-indigo-700');
                
                // Show corresponding section
                const section = link.dataset.section;
                this.showSection(section);
            });
        });
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Show target section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            this.currentSection = sectionName;
            
            // Load section-specific data
            this.loadSectionData(sectionName);
        }
    }

    loadSectionData(section) {
        switch (section) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'products':
                this.loadProductsTable();
                break;
            case 'orders':
                this.loadOrdersTable();
                break;
            case 'inventory':
                this.loadInventoryData();
                break;
            case 'customers':
                this.loadCustomersData();
                break;
            case 'analytics':
                this.loadAnalyticsData();
                break;
        }
    }

    // Dashboard Data
    loadDashboardData() {
        this.updateDashboardStats();
        this.loadRecentOrders();
        
        // Initialize charts if not already done
        setTimeout(() => {
            if (!this.chartsInitialized) {
                this.initializeCharts();
            }
        }, 100);
    }

    updateDashboardStats() {
        // Calculate real stats from data
        const totalOrders = this.orders.length;
        const totalRevenue = this.orders.reduce((sum, order) => sum + parseFloat(order.total), 0);
        const activeProducts = this.products.filter(p => p.inStock).length;
        const totalCustomers = this.customers.length;

        // Update the stats (these would be dynamic in a real application)
        document.querySelector('.grid .bg-white:nth-child(1) .text-2xl').textContent = totalOrders.toLocaleString();
        document.querySelector('.grid .bg-white:nth-child(2) .text-2xl').textContent = `$${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 0})}`;
        document.querySelector('.grid .bg-white:nth-child(3) .text-2xl').textContent = activeProducts;
        document.querySelector('.grid .bg-white:nth-child(4) .text-2xl').textContent = totalCustomers.toLocaleString();
    }

    loadRecentOrders() {
        const recentOrdersContainer = document.getElementById('recent-orders');
        if (!recentOrdersContainer) return;

        const recentOrders = this.orders.slice(0, 5);
        
        recentOrdersContainer.innerHTML = recentOrders.map(order => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.orderNumber}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.customer}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.items[0]?.name || 'Multiple Items'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $${order.total}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${this.getStatusColor(order.status)}">
                        ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                </td>
            </tr>
        `).join('');
    }

    getStatusColor(status) {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    // Products Management
    loadProductsTable() {
        const productsTable = document.getElementById('products-table');
        if (!productsTable) return;

        productsTable.innerHTML = this.products.map(product => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <img src="${product.image}" alt="${product.name}" class="w-10 h-10 rounded-lg object-cover mr-4">
                        <div>
                            <div class="text-sm font-medium text-gray-900">${product.name}</div>
                            <div class="text-sm text-gray-500">ID: ${product.id}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span class="capitalize">${product.category}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $${product.price}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span class="${product.stock < 10 ? 'text-red-600 font-semibold' : ''}">${product.stock}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${product.inStock ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onclick="admin.editProduct(${product.id})" class="text-indigo-600 hover:text-indigo-900 mr-3">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="admin.deleteProduct(${product.id})" class="text-red-600 hover:text-red-900">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Orders Management
    loadOrdersTable() {
        const ordersTable = document.getElementById('orders-table');
        if (!ordersTable) return;

        ordersTable.innerHTML = this.orders.map(order => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.orderNumber}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>${order.customer}</div>
                    <div class="text-xs text-gray-400">${order.customerEmail}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $${order.total}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <select onchange="admin.updateOrderStatus('${order.orderNumber}', this.value)" 
                            class="text-xs px-2 py-1 rounded-full border-0 ${this.getStatusColor(order.status)}">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    </select>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onclick="admin.viewOrderDetails('${order.orderNumber}')" class="text-indigo-600 hover:text-indigo-900 mr-3">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="admin.printOrder('${order.orderNumber}')" class="text-gray-600 hover:text-gray-900">
                        <i class="fas fa-print"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Inventory Management
    loadInventoryData() {
        this.loadLowStockItems();
        this.loadOutOfStockItems();
        this.loadTopSellingItems();
        this.initializeInventoryChart();
    }

    loadLowStockItems() {
        const lowStockContainer = document.getElementById('low-stock-items');
        if (!lowStockContainer) return;

        const lowStockItems = this.products.filter(p => p.stock < 10 && p.stock > 0);
        
        if (lowStockItems.length === 0) {
            lowStockContainer.innerHTML = '<p class="text-sm text-gray-500">No low stock items</p>';
            return;
        }

        lowStockContainer.innerHTML = lowStockItems.map(item => `
            <div class="flex justify-between items-center text-sm">
                <span>${item.name}</span>
                <span class="font-semibold text-red-600">${item.stock}</span>
            </div>
        `).join('');
    }

    loadOutOfStockItems() {
        const outOfStockContainer = document.getElementById('out-of-stock-items');
        if (!outOfStockContainer) return;

        const outOfStockItems = this.products.filter(p => p.stock === 0);
        
        if (outOfStockItems.length === 0) {
            outOfStockContainer.innerHTML = '<p class="text-sm text-gray-500">No out of stock items</p>';
            return;
        }

        outOfStockContainer.innerHTML = outOfStockItems.map(item => `
            <div class="text-sm">
                <div class="font-medium">${item.name}</div>
                <button class="text-xs text-indigo-600 hover:text-indigo-800">Restock</button>
            </div>
        `).join('');
    }

    loadTopSellingItems() {
        const topSellingContainer = document.getElementById('top-selling-items');
        if (!topSellingContainer) return;

        const topSelling = this.products
            .sort((a, b) => (b.sold || 0) - (a.sold || 0))
            .slice(0, 5);

        topSellingContainer.innerHTML = topSelling.map(item => `
            <div class="flex justify-between items-center text-sm">
                <span>${item.name}</span>
                <span class="font-semibold text-green-600">${item.sold || 0}</span>
            </div>
        `).join('');
    }

    // Event Listeners
    setupEventListeners() {
        // Product modal
        const addProductBtn = document.getElementById('add-product-btn');
        const productModal = document.getElementById('product-modal');
        const closeProductModal = document.getElementById('close-product-modal');
        const cancelProduct = document.getElementById('cancel-product');
        const productForm = document.getElementById('product-form');

        addProductBtn?.addEventListener('click', () => this.showProductModal());
        closeProductModal?.addEventListener('click', () => this.hideProductModal());
        cancelProduct?.addEventListener('click', () => this.hideProductModal());
        productForm?.addEventListener('submit', (e) => this.handleProductSubmit(e));

        // Search and filters
        const productSearch = document.getElementById('product-search');
        const categoryFilter = document.getElementById('category-filter');
        const orderSearch = document.getElementById('order-search');
        const statusFilter = document.getElementById('status-filter');

        productSearch?.addEventListener('input', () => this.filterProducts());
        categoryFilter?.addEventListener('change', () => this.filterProducts());
        orderSearch?.addEventListener('input', () => this.filterOrders());
        statusFilter?.addEventListener('change', () => this.filterOrders());
    }

    // Product Modal
    showProductModal(product = null) {
        const modal = document.getElementById('product-modal');
        const title = document.getElementById('product-modal-title');
        const form = document.getElementById('product-form');
        
        if (product) {
            title.textContent = 'Edit Product';
            this.populateProductForm(product);
        } else {
            title.textContent = 'Add New Product';
            form.reset();
        }
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    hideProductModal() {
        const modal = document.getElementById('product-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    populateProductForm(product) {
        const form = document.getElementById('product-form');
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            const name = input.name;
            if (product[name] !== undefined) {
                if (input.type === 'checkbox') {
                    input.checked = product[name];
                } else {
                    input.value = product[name];
                }
            }
        });
        
        // Store product ID for editing
        form.dataset.productId = product.id;
    }

    handleProductSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const productData = {};
        
        // Convert form data to object
        for (let [key, value] of formData.entries()) {
            if (key === 'inStock' || key === 'featured') {
                productData[key] = true; // Checkbox values
            } else if (key === 'price' || key === 'originalPrice' || key === 'stock') {
                productData[key] = parseFloat(value) || 0;
            } else {
                productData[key] = value;
            }
        }
        
        // Handle unchecked checkboxes
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                productData[checkbox.name] = false;
            }
        });
        
        const productId = form.dataset.productId;
        
        if (productId) {
            // Update existing product
            this.updateProduct(parseInt(productId), productData);
        } else {
            // Add new product
            this.addProduct(productData);
        }
        
        this.hideProductModal();
    }

    addProduct(productData) {
        const newProduct = {
            id: Math.max(...this.products.map(p => p.id), 0) + 1,
            ...productData,
            rating: 0,
            reviews: 0,
            sold: 0,
            createdAt: new Date().toISOString()
        };
        
        this.products.push(newProduct);
        this.saveProducts();
        this.loadProductsTable();
        
        this.showToast('Product added successfully!', 'success');
    }

    updateProduct(productId, productData) {
        const productIndex = this.products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            this.products[productIndex] = {
                ...this.products[productIndex],
                ...productData
            };
            
            this.saveProducts();
            this.loadProductsTable();
            
            this.showToast('Product updated successfully!', 'success');
        }
    }

    editProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.showProductModal(product);
        }
    }

    deleteProduct(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.products = this.products.filter(p => p.id !== productId);
            this.saveProducts();
            this.loadProductsTable();
            
            this.showToast('Product deleted successfully!', 'success');
        }
    }

    saveProducts() {
        localStorage.setItem('adminProducts', JSON.stringify(this.products));
    }

    // Order Management
    updateOrderStatus(orderNumber, newStatus) {
        const orderIndex = this.orders.findIndex(o => o.orderNumber === orderNumber);
        if (orderIndex !== -1) {
            this.orders[orderIndex].status = newStatus;
            localStorage.setItem('orders', JSON.stringify(this.orders));
            
            this.showToast(`Order ${orderNumber} status updated to ${newStatus}`, 'success');
        }
    }

    viewOrderDetails(orderNumber) {
        const order = this.orders.find(o => o.orderNumber === orderNumber);
        if (order) {
            alert(`Order Details:\n\nOrder: ${order.orderNumber}\nCustomer: ${order.customer}\nTotal: $${order.total}\nStatus: ${order.status}\n\nFull order details would be shown in a modal.`);
        }
    }

    printOrder(orderNumber) {
        this.showToast(`Printing order ${orderNumber}...`, 'info');
    }

    // Filtering
    filterProducts() {
        const search = document.getElementById('product-search').value.toLowerCase();
        const category = document.getElementById('category-filter').value;
        
        let filteredProducts = this.products;
        
        if (search) {
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(search) ||
                p.description.toLowerCase().includes(search)
            );
        }
        
        if (category) {
            filteredProducts = filteredProducts.filter(p => p.category === category);
        }
        
        // Update table with filtered products
        const productsTable = document.getElementById('products-table');
        if (productsTable) {
            // Temporarily replace products for rendering
            const originalProducts = this.products;
            this.products = filteredProducts;
            this.loadProductsTable();
            this.products = originalProducts;
        }
    }

    filterOrders() {
        const search = document.getElementById('order-search').value.toLowerCase();
        const status = document.getElementById('status-filter').value;
        
        let filteredOrders = this.orders;
        
        if (search) {
            filteredOrders = filteredOrders.filter(o => 
                o.orderNumber.toLowerCase().includes(search) ||
                o.customer.toLowerCase().includes(search) ||
                o.customerEmail.toLowerCase().includes(search)
            );
        }
        
        if (status) {
            filteredOrders = filteredOrders.filter(o => o.status === status);
        }
        
        // Update table with filtered orders
        const ordersTable = document.getElementById('orders-table');
        if (ordersTable) {
            const originalOrders = this.orders;
            this.orders = filteredOrders;
            this.loadOrdersTable();
            this.orders = originalOrders;
        }
    }

    // Charts
    initializeCharts() {
        this.initializeSalesChart();
        this.initializeCategoryChart();
        this.chartsInitialized = true;
    }

    initializeSalesChart() {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return;

        // Generate mock sales data for the last 7 days
        const labels = [];
        const data = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
            data.push(Math.floor(Math.random() * 1000) + 500);
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Daily Sales ($)',
                    data: data,
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f3f4f6'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    initializeCategoryChart() {
        const ctx = document.getElementById('categoryChart');
        if (!ctx) return;

        // Calculate category distribution
        const categoryCount = {};
        this.products.forEach(product => {
            categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
        });

        const labels = Object.keys(categoryCount);
        const data = Object.values(categoryCount);
        const colors = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels.map(label => label.charAt(0).toUpperCase() + label.slice(1)),
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    initializeInventoryChart() {
        const ctx = document.getElementById('inventoryChart');
        if (!ctx) return;

        // Create inventory data
        const labels = this.products.map(p => p.name.substring(0, 15) + '...');
        const stockData = this.products.map(p => p.stock);
        const soldData = this.products.map(p => p.sold || 0);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Current Stock',
                    data: stockData,
                    backgroundColor: '#10b981',
                    borderColor: '#059669',
                    borderWidth: 1
                }, {
                    label: 'Units Sold',
                    data: soldData,
                    backgroundColor: '#4f46e5',
                    borderColor: '#3730a3',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f3f4f6'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Utility methods
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
        }`;
        
        toast.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas ${
                    type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-circle' : 
                    type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'
                }"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }

    // Placeholder methods for other sections
    loadCustomersData() {
        console.log('Loading customers data...');
    }

    loadAnalyticsData() {
        console.log('Loading analytics data...');
    }
}

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', () => {
    window.admin = new AdminDashboard();
});