/**
 * ============================================
 * BLOOM & CO. - MAIN JAVASCRIPT
 * Animation, interactivity, and dynamic content
 * ============================================
 */

$(document).ready(function() {
    
    console.log('Bloom & Co. website loaded successfully');
    
    // ============================================
    // FLOWER CARD INTERACTIVITY
    // Click to reveal flower details
    // ============================================
    
    // Initially hide all flower details
    $('.flower-details').hide();
    
    // Handle click on info buttons
    $('.info-reveal-btn').on('click', function() {
        const targetId = $(this).data('target');
        const targetContent = $('#' + targetId);
        
        // Toggle visibility with animation
        targetContent.slideToggle(300);
        
        // Update button text
        if (targetContent.is(':visible')) {
            $(this).text('Hide Details');
            $(this).closest('.flower-card').addClass('expanded');
        } else {
            $(this).text('Show Details');
            $(this).closest('.flower-card').removeClass('expanded');
        }
    });
    
    // ============================================
    // REVEAL ALL FLOWERS BUTTON
    // ============================================
    
    $('#reveal-all-btn').on('click', function() {
        const allDetails = $('.flower-details');
        const allButtons = $('.info-reveal-btn');
        
        if (allDetails.first().is(':visible')) {
            // Hide all
            allDetails.slideUp(300);
            allButtons.text('Show Details');
            $(this).text('Show All Flower Information');
        } else {
            // Show all
            allDetails.slideDown(300);
            allButtons.text('Hide Details');
            $(this).text('Hide All Flower Information');
        }
    });
    
    // ============================================
    // ANIMATED COUNTER
    // ============================================
    
    function animateCounter(element, target, duration) {
        let current = 0;
        const increment = target / (duration / 16);
        
        function update() {
            current += increment;
            if (current < target) {
                element.text(Math.floor(current));
                requestAnimationFrame(update);
            } else {
                element.text(target);
            }
        }
        
        update();
    }
    
    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt($(entry.target).data('count'));
                animateCounter($(entry.target), target, 2000);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    $('.counter').each(function() {
        counterObserver.observe(this);
    });
    
    // ============================================
    // SMOOTH SCROLL FOR NAVIGATION
    // ============================================
    
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 500);
        }
    });
    
    // ============================================
    // BUTTON ANIMATIONS
    // ============================================
    
    $('.btn').on('mouseenter', function() {
        $(this).css('transform', 'scale(1.05)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'scale(1)');
    });
    
    // ============================================
    // KEYBOARD ACCESSIBILITY FOR FLOWER CARDS
    // ============================================
    
    $('.flower-card').on('keypress', function(e) {
        if (e.which === 13) { // Enter key
            const btn = $(this).find('.info-reveal-btn');
            if (btn.length) {
                btn.trigger('click');
            }
        }
    });
    
    // ============================================
    // DYNAMIC FLOWER DATA (for future expansion)
    // ============================================
    
    const flowerData = [
        {
            id: 1,
            name: 'Red Roses',
            price: 25.00,
            description: 'Classic romantic roses',
            image: 'roses.jpg'
        },
        {
            id: 2,
            name: 'Sunflowers',
            price: 20.00,
            description: 'Bright and cheerful',
            image: 'sunflowers.jpg'
        },
        {
            id: 3,
            name: 'White Lilies',
            price: 30.00,
            description: 'Elegant and fragrant',
            image: 'lilies.jpg'
        },
        {
            id: 4,
            name: 'Mixed Tulips',
            price: 18.00,
            description: 'Colourful spring blooms',
            image: 'tulips.jpg'
        }
    ];
    
    // Function to dynamically load flowers
    window.loadFlowers = function() {
        const grid = $('.flower-grid');
        
        flowerData.forEach((flower, index) => {
            const card = `
                <article class="flower-card">
                    <img src="images/flowers/${flower.image}" alt="${flower.name}">
                    <div class="content">
                        <h3>${flower.name}</h3>
                        <p class="price">£${flower.price.toFixed(2)}</p>
                        <button class="btn info-reveal-btn" data-target="flower-${index}">
                            Show Details
                        </button>
                        <div id="flower-${index}" class="hidden-content flower-details">
                            <p>${flower.description}</p>
                        </div>
                    </div>
                </article>
            `;
            grid.append(card);
        });
    };
    
});
