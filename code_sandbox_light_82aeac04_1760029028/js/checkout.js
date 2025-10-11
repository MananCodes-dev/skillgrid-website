// Checkout management for ModernStore
class CheckoutManager {
    constructor() {
        this.currentStep = 1;
        this.maxStep = 4;
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.shippingData = {};
        this.paymentData = {};
        this.shippingRates = {
            standard: 5.99,
            express: 12.99,
            overnight: 24.99
        };
        this.selectedShipping = 'standard';
        this.taxRate = 0.08;
        
        this.init();
    }

    init() {
        if (this.cart.length === 0) {
            this.redirectToEmptyCart();
            return;
        }
        
        this.setupEventListeners();
        this.loadCartItems();
        this.updateSidebar();
        this.showStep(this.currentStep);
    }

    redirectToEmptyCart() {
        alert('Your cart is empty. Redirecting to home page.');
        window.location.href = 'index.html';
    }

    setupEventListeners() {
        // Shipping method change
        document.querySelectorAll('input[name="shipping"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.selectedShipping = e.target.value;
                this.updateSidebar();
            });
        });

        // Form validation
        const forms = ['shipping-form', 'payment-form'];
        forms.forEach(formId => {
            const form = document.getElementById(formId);
            if (form) {
                form.addEventListener('input', () => this.validateCurrentStep());
            }
        });

        // Card number formatting
        const cardNumberInput = document.querySelector('input[name="cardNumber"]');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', this.formatCardNumber);
        }

        // Expiry date formatting
        const expiryInput = document.querySelector('input[name="expiryDate"]');
        if (expiryInput) {
            expiryInput.addEventListener('input', this.formatExpiryDate);
        }

        // CVV validation
        const cvvInput = document.querySelector('input[name="cvv"]');
        if (cvvInput) {
            cvvInput.addEventListener('input', this.formatCVV);
        }

        // Billing address checkbox
        const billingCheckbox = document.getElementById('billingAddress');
        if (billingCheckbox) {
            billingCheckbox.addEventListener('change', this.toggleBillingAddress);
        }
    }

    // Step Navigation
    showStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.checkout-step').forEach(step => {
            step.classList.add('hidden');
        });

        // Show current step
        const currentStepElement = document.getElementById(`step-${this.getStepName(stepNumber)}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('hidden');
        }

        // Update progress indicator
        this.updateProgressIndicator(stepNumber);
        
        // Update step-specific content
        if (stepNumber === 4) {
            this.populateConfirmationStep();
        }
    }

    getStepName(stepNumber) {
        const stepNames = ['', 'cart', 'shipping', 'payment', 'confirmation'];
        return stepNames[stepNumber] || 'cart';
    }

    updateProgressIndicator(currentStep) {
        const steps = ['', 'cart', 'shipping', 'payment', 'confirmation'];
        
        for (let i = 1; i <= this.maxStep; i++) {
            const stepElement = document.getElementById(`${steps[i]}-step`);
            const circle = stepElement?.querySelector('div');
            const text = stepElement?.querySelector('span');
            
            if (i <= currentStep) {
                stepElement?.classList.remove('text-gray-400');
                stepElement?.classList.add('text-indigo-600');
                circle?.classList.remove('bg-gray-200', 'text-gray-500');
                circle?.classList.add('bg-indigo-600', 'text-white');
            } else {
                stepElement?.classList.remove('text-indigo-600');
                stepElement?.classList.add('text-gray-400');
                circle?.classList.remove('bg-indigo-600', 'text-white');
                circle?.classList.add('bg-gray-200', 'text-gray-500');
            }
        }
    }

    nextStep() {
        if (!this.validateCurrentStep()) {
            return;
        }

        if (this.currentStep < this.maxStep) {
            this.currentStep++;
            this.showStep(this.currentStep);
            
            // Save form data
            this.saveCurrentStepData();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    validateCurrentStep() {
        switch (this.currentStep) {
            case 1: // Cart review
                return this.cart.length > 0;
            case 2: // Shipping
                return this.validateShippingForm();
            case 3: // Payment
                return this.validatePaymentForm();
            case 4: // Confirmation
                return true;
            default:
                return true;
        }
    }

    validateShippingForm() {
        const form = document.getElementById('shipping-form');
        if (!form) return false;

        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        // Email validation
        const emailField = form.querySelector('[name="email"]');
        if (emailField && emailField.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                this.showFieldError(emailField, 'Please enter a valid email address');
                isValid = false;
            }
        }

        return isValid;
    }

    validatePaymentForm() {
        const form = document.getElementById('payment-form');
        if (!form) return false;

        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        // Card number validation (basic)
        const cardNumber = form.querySelector('[name="cardNumber"]').value.replace(/\s/g, '');
        if (cardNumber && (cardNumber.length < 13 || cardNumber.length > 19)) {
            this.showFieldError(form.querySelector('[name="cardNumber"]'), 'Please enter a valid card number');
            isValid = false;
        }

        // CVV validation
        const cvv = form.querySelector('[name="cvv"]').value;
        if (cvv && (cvv.length < 3 || cvv.length > 4)) {
            this.showFieldError(form.querySelector('[name="cvv"]'), 'Please enter a valid CVV');
            isValid = false;
        }

        // Expiry date validation
        const expiryDate = form.querySelector('[name="expiryDate"]').value;
        if (expiryDate && !this.validateExpiryDate(expiryDate)) {
            this.showFieldError(form.querySelector('[name="expiryDate"]'), 'Please enter a valid expiry date');
            isValid = false;
        }

        return isValid;
    }

    validateExpiryDate(expiryDate) {
        const [month, year] = expiryDate.split('/');
        if (!month || !year) return false;

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear() % 100;

        const expMonth = parseInt(month);
        const expYear = parseInt(year);

        if (expMonth < 1 || expMonth > 12) return false;
        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) return false;

        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('border-red-500');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'text-red-500 text-sm mt-1 field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('border-red-500');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    saveCurrentStepData() {
        switch (this.currentStep) {
            case 2: // Shipping data saved when moving from step 2
                this.shippingData = this.getFormData('shipping-form');
                break;
            case 3: // Payment data saved when moving from step 3
                this.paymentData = this.getFormData('payment-form');
                break;
        }
    }

    getFormData(formId) {
        const form = document.getElementById(formId);
        if (!form) return {};

        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }

    // Cart Display
    loadCartItems() {
        const checkoutItemsContainer = document.getElementById('checkout-items');
        if (!checkoutItemsContainer) return;

        if (this.cart.length === 0) {
            checkoutItemsContainer.innerHTML = '<p class="text-center text-gray-500">No items in cart</p>';
            return;
        }

        checkoutItemsContainer.innerHTML = this.cart.map(item => `
            <div class="flex items-center space-x-4 p-4 border rounded-lg">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-medium">${item.name}</h4>
                    <p class="text-gray-600 text-sm">$${item.price.toFixed(2)} × ${item.quantity}</p>
                </div>
                <div class="text-right">
                    <div class="font-semibold">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            </div>
        `).join('');
    }

    // Sidebar Update
    updateSidebar() {
        this.updateSidebarItems();
        this.updateSidebarTotals();
    }

    updateSidebarItems() {
        const sidebarItems = document.getElementById('sidebar-items');
        if (!sidebarItems) return;

        sidebarItems.innerHTML = this.cart.map(item => `
            <div class="flex items-center space-x-3">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium truncate">${item.name}</div>
                    <div class="text-xs text-gray-500">Qty: ${item.quantity}</div>
                </div>
                <div class="text-sm font-medium">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');
    }

    updateSidebarTotals() {
        const subtotal = this.calculateSubtotal();
        const shipping = this.getShippingCost();
        const tax = this.calculateTax();
        const total = subtotal + shipping + tax;

        document.getElementById('sidebar-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('sidebar-shipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
        document.getElementById('sidebar-tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('sidebar-total').textContent = `$${total.toFixed(2)}`;
    }

    calculateSubtotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getShippingCost() {
        const subtotal = this.calculateSubtotal();
        if (subtotal >= 100) return 0; // Free shipping over $100
        return this.shippingRates[this.selectedShipping] || this.shippingRates.standard;
    }

    calculateTax() {
        return this.calculateSubtotal() * this.taxRate;
    }

    // Confirmation Step
    populateConfirmationStep() {
        this.populateShippingSummary();
        this.populatePaymentSummary();
        this.populateOrderSummary();
    }

    populateShippingSummary() {
        const shippingSummary = document.getElementById('shipping-summary');
        if (!shippingSummary || !this.shippingData.firstName) return;

        const shippingMethods = {
            standard: 'Standard Shipping (5-7 business days)',
            express: 'Express Shipping (2-3 business days)',
            overnight: 'Overnight Shipping (Next business day)'
        };

        shippingSummary.innerHTML = `
            <div><strong>${this.shippingData.firstName} ${this.shippingData.lastName}</strong></div>
            <div>${this.shippingData.address}</div>
            <div>${this.shippingData.city}, ${this.shippingData.state} ${this.shippingData.zipCode}</div>
            <div class="mt-2"><strong>Shipping Method:</strong> ${shippingMethods[this.selectedShipping]}</div>
        `;
    }

    populatePaymentSummary() {
        const paymentSummary = document.getElementById('payment-summary');
        if (!paymentSummary || !this.paymentData.cardNumber) return;

        const maskedCardNumber = '**** **** **** ' + this.paymentData.cardNumber.slice(-4);
        
        paymentSummary.innerHTML = `
            <div><strong>Payment Method:</strong> Credit/Debit Card</div>
            <div><strong>Card Number:</strong> ${maskedCardNumber}</div>
            <div><strong>Cardholder:</strong> ${this.paymentData.cardholderName}</div>
        `;
    }

    populateOrderSummary() {
        const orderSummary = document.getElementById('order-summary');
        if (!orderSummary) return;

        orderSummary.innerHTML = this.cart.map(item => `
            <div class="flex justify-between text-sm">
                <span>${item.name} × ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
    }

    // Order Completion
    completeOrder() {
        // Show loading state
        const completeBtn = event.target;
        const originalText = completeBtn.innerHTML;
        completeBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
        completeBtn.disabled = true;

        // Simulate payment processing
        setTimeout(() => {
            this.processOrder();
        }, 2000);
    }

    processOrder() {
        // Generate order number
        const orderNumber = 'MS-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        // Save order to localStorage (in real app, this would go to server)
        const order = {
            orderNumber,
            items: this.cart,
            shipping: this.shippingData,
            payment: this.paymentData,
            totals: {
                subtotal: this.calculateSubtotal(),
                shipping: this.getShippingCost(),
                tax: this.calculateTax(),
                total: this.calculateSubtotal() + this.getShippingCost() + this.calculateTax()
            },
            createdAt: new Date().toISOString(),
            status: 'confirmed'
        };

        // Save order
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        localStorage.removeItem('cart');

        // Show success modal
        document.getElementById('order-number').textContent = orderNumber;
        const successModal = document.getElementById('success-modal');
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');

        // Send confirmation email (mock)
        this.sendConfirmationEmail(order);
    }

    sendConfirmationEmail(order) {
        // Mock email sending
        console.log('Sending confirmation email for order:', order.orderNumber);
        
        // In real implementation, this would make an API call to send email
        setTimeout(() => {
            console.log('Confirmation email sent to:', order.shipping.email);
        }, 1000);
    }

    trackOrder() {
        alert('Order tracking functionality would be implemented here.');
    }

    // Input Formatting
    formatCardNumber(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
    }

    formatExpiryDate(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    }

    formatCVV(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    }

    toggleBillingAddress(e) {
        // In a real implementation, this would copy shipping address to billing fields
        console.log('Billing address same as shipping:', e.target.checked);
    }
}

// Initialize checkout when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.checkout = new CheckoutManager();
});