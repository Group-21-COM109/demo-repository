/**
 * ============================================
 * BLOOM & CO. - FORM VALIDATION
 * Comprehensive form validation for contact form
 * ============================================
 */

$(document).ready(function() {
    
    console.log('Form validation initialized');
    
    // ============================================
    // VALIDATION SETUP
    // ============================================
    
    const form = $('#contactForm');
    const submitBtn = $('button[type="submit"]');
    
    // Validation rules for each field
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s'-]+$/,
            message: 'First name must be at least 2 characters (letters only)'
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s'-]+$/,
            message: 'Last name must be at least 2 characters (letters only)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: true,
            pattern: /^[\d\s\-\+\(\)]{10,}$/,
            message: 'Please enter a valid phone number (at least 10 digits)'
        },
        address: {
            required: true,
            minLength: 10,
            message: 'Please enter a complete delivery address'
        },
        postcode: {
            required: true,
            pattern: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
            message: 'Please enter a valid UK postcode (e.g., BT1 1AA)'
        },
        flowerType: {
            required: true,
            message: 'Please select a flower type'
        },
        message: {
            required: true,
            minLength: 20,
            maxLength: 500,
            message: 'Message must be between 20 and 500 characters'
        },
        agreeTerms: {
            required: true,
            message: 'You must agree to the terms and conditions'
        }
    };
    
    // ============================================
    // VALIDATION FUNCTIONS
    // ============================================
    
    /**
     * Show error message for a field
     */
    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.addClass('error');
        formGroup.find('.error').text(message);
        field.attr('aria-invalid', 'true');
    }
    
    /**
     * Clear error message for a field
     */
    function clearError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.removeClass('error');
        formGroup.find('.error').text('');
        field.attr('aria-invalid', 'false');
    }
    
    /**
     * Validate a single field
     */
    function validateField(field) {
        const fieldName = field.attr('name');
        const value = field.val();
        const rules = validationRules[fieldName];
        
        // If no rules for this field, skip
        if (!rules) return true;
        
        // Clear previous error
        clearError(field);
        
        // Check if required and empty
        if (rules.required && !value.trim()) {
            showError(field, 'This field is required');
            return false;
        }
        
        // Check minimum length
        if (rules.minLength && value.length < rules.minLength) {
            showError(field, rules.message);
            return false;
        }
        
        // Check maximum length
        if (rules.maxLength && value.length > rules.maxLength) {
            showError(field, rules.message);
            return false;
        }
        
        // Check pattern
        if (rules.pattern && value && !rules.pattern.test(value)) {
            showError(field, rules.message);
            return false;
        }
        
        // Special validation for checkbox
        if (fieldName === 'agreeTerms' && !$('#agreeTerms').is(':checked')) {
            showError(field, rules.message);
            return false;
        }
        
        return true;
    }
    
    /**
     * Validate entire form
     */
    function validateForm() {
        let isValid = true;
        
        form.find('input, textarea, select').each(function() {
            if (!validateField($(this))) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // ============================================
    // REAL-TIME VALIDATION
    // ============================================
    
    // Validate on blur (when leaving a field)
    form.find('input, textarea, select').on('blur', function() {
        validateField($(this));
    });
    
    // Clear error while typing
    form.find('input, textarea').on('input', function() {
        const formGroup = $(this).closest('.form-group');
        if (formGroup.hasClass('error')) {
            clearError($(this));
        }
    });
    
    // ============================================
    // FORM SUBMISSION
    // ============================================
    
    form.on('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // Form is valid - process submission
            
            // Disable submit button
            submitBtn.prop('disabled', true);
            submitBtn.text('Submitting...');
            
            // Collect form data
            const formData = form.serialize();
            console.log('Form submitted:', formData);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form[0].reset();
            
            // Re-enable submit button
            submitBtn.prop('disabled', false);
            submitBtn.text('Submit Order');
            
        } else {
            // Form has errors - scroll to first error
            const firstError = form.find('.error').first();
            if (firstError.length) {
                $('html, body').animate({
                    scrollTop: firstError.offset().top - 100
                }, 500);
                firstError.find('input, textarea, select').focus();
            }
        }
    });
    
    // ============================================
    // SUCCESS MESSAGE
    // ============================================
    
    function showSuccessMessage() {
        const orderId = generateOrderId();
        
        const successHtml = `
            <div class="success-message show" role="alert">
                <h3>Thank you for your order!</h3>
                <p>We have received your message and will get back to you shortly.</p>
                <p>Your order reference is: <strong>${orderId}</strong></p>
            </div>
        `;
        
        // Hide form and show success message
        form.hide();
        form.after(successHtml);
    }
    
    /**
     * Generate a random order ID
     */
    function generateOrderId() {
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000);
        return `BLOOM-${timestamp}-${random}`;
    }
    
    // ============================================
    // CHARACTER COUNTER FOR MESSAGE
    // ============================================
    
    const messageField = $('#message');
    const charCounter = $('<span class="char-counter">0/500</span>');
    messageField.after(charCounter);
    
    messageField.on('input', function() {
        const length = $(this).val().length;
        charCounter.text(`${length}/500`);
        
        if (length > 500) {
            charCounter.css('color', 'red');
        } else {
            charCounter.css('color', '#666');
        }
    });
    
    console.log('Validation rules loaded:', Object.keys(validationRules).length, 'fields');
    
});
