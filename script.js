// translations is defined in translation.js which is loaded before this script
// No need to import it as it's already available in the global scope

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
   hamburger.addEventListener('click', function() {
    console.log('Hamburger clicked');
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Scroll Spy Navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Typing Effect
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = ["Delicious Snacks", "Premium Quality", "Homemade Goodness", "Irresistible Flavors"];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    setTimeout(type, newTextDelay + 250);

    // Animate Progress Bars on Scroll
    const progressBars = document.querySelectorAll('.progress-fill');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (isElementInViewport(bar)) {
                bar.style.width = width + '%';
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars();

    // Product Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Testimonial Slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const slideCount = testimonialSlides.length;
    
    function goToSlide(slideIndex) {
        testimonialTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
        
        // Update active slide
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialSlides[slideIndex].classList.add('active');
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex].classList.add('active');
        
        currentSlide = slideIndex;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(currentSlide);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    nextBtn.addEventListener('click', resetInterval);
    prevBtn.addEventListener('click', resetInterval);
    dots.forEach(dot => dot.addEventListener('click', resetInterval));

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // Animated Counter
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    const statsSection = document.querySelector('.stats');
    
    function animateCounters() {
        if (isElementInViewport(statsSection)) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animateCounters, 1);
                } else {
                    counter.innerText = target;
                }
            });
        }
    }
    
    window.addEventListener('scroll', function() {
        if (isElementInViewport(statsSection)) {
            animateCounters();
        }
    });

    // Shopping Cart Functionality
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartClose = document.querySelector('.cart-close');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartCount = document.querySelector('.cart-count');
    const cartSubtotal = document.querySelector('.cart-subtotal');
    
    let cart = [];
    
    // Open/Close Cart
    cartIcon.addEventListener('click', function() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    cartClose.addEventListener('click', function() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    cartOverlay.addEventListener('click', function() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Add to Cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = parseInt(productCard.querySelector('.product-price').textContent.replace(/[^\d]/g, ''));
            const productImage = productCard.querySelector('.product-image img').src;
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    title: productTitle,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            
            updateCart();
            showToast(`${productTitle} added to cart`);
        });
    });
    
    // Update Cart
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items
        if (cart.length === 0) {
            cartEmpty.style.display = 'flex';
            cartItemsContainer.style.display = 'none';
        } else {
            cartEmpty.style.display = 'none';
            cartItemsContainer.style.display = 'block';
            cartItemsContainer.innerHTML = '';
            
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <p class="cart-item-price">${formatRupiah(item.price)}</p>
                        <div class="cart-item-actions">
                            <div class="quantity-selector">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            
            // Add event listeners to quantity buttons
            document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const item = cart.find(item => item.id === id);
                    
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        cart = cart.filter(item => item.id !== id);
                    }
                    
                    updateCart();
                });
            });
            
            document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const item = cart.find(item => item.id === id);
                    item.quantity += 1;
                    updateCart();
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    cart = cart.filter(item => item.id !== id);
                    updateCart();
                    showToast('Item removed from cart');
                });
            });
            
            // Update subtotal
            const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            cartSubtotal.textContent = formatRupiah(subtotal);
        }
    }
    
    // Toast Notification
    function showToast(message) {
        const toast = document.querySelector('.toast-notification');
        toast.querySelector('.toast-message').textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    document.querySelector('.toast-close').addEventListener('click', function() {
        document.querySelector('.toast-notification').classList.remove('show');
    });

    // Image Modal
    const viewImageButtons = document.querySelectorAll('.view-image');
    const imageModal = document.querySelector('.image-modal');
    const modalImage = document.querySelector('.image-modal img');
    const modalClose = document.querySelector('.modal-close');
    
    viewImageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-src');
            modalImage.src = imageSrc;
            modalImage.alt = this.parentElement.querySelector('h3').textContent;
            imageModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalClose.addEventListener('click', function() {
        imageModal.classList.remove('open');
        document.body.style.overflow = '';
    });
    
    imageModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Quick View Modal
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const quickViewModal = document.querySelector('.quickview-modal');
    const quickViewOverlay = document.querySelector('.quickview-overlay');
    const quickViewClose = document.querySelector('.quickview-close');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            const productRating = productCard.querySelector('.product-rating').innerHTML;
            const productDesc = productCard.querySelector('.product-desc').textContent;
            
            const quickViewBody = document.querySelector('.quickview-body');
            quickViewBody.innerHTML = `
                <div class="quickview-image">
                    <img src="${productImage}" alt="${productTitle}">
                </div>
                <div class="quickview-details">
                    <h2 class="quickview-title">${productTitle}</h2>
                    <div class="quickview-rating">
                        ${productRating}
                    </div>
                    <div class="quickview-price">${formatRupiah(parseInt(productPrice.replace(/[^\d]/g, '')))}</div>
                    <p class="quickview-desc">${productDesc}</p>
                    <div class="quickview-actions">
                        <div class="quickview-quantity">
                            <button class="quickview-quantity-btn minus">-</button>
                            <input type="text" class="quickview-quantity-input" value="1" readonly>
                            <button class="quickview-quantity-btn plus">+</button>
                        </div>
                        <button class="quickview-addtocart" data-id="${productId}">Add to Cart</button>
                    </div>
                    <div class="quickview-meta">
                        <div class="quickview-meta-item">
                            <span class="quickview-meta-label">Category:</span>
                            <span class="quickview-meta-value">${productCard.getAttribute('data-category')}</span>
                        </div>
                        <div class="quickview-meta-item">
                            <span class="quickview-meta-label">Availability:</span>
                            <span class="quickview-meta-value">In Stock</span>
                        </div>
                        <div class="quickview-meta-item">
                            <span class="quickview-meta-label">Shipping:</span>
                            <span class="quickview-meta-value">Free Shipping</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Add event listener to the new Add to Cart button
            document.querySelector('.quickview-addtocart').addEventListener('click', function() {
                const quantity = parseInt(document.querySelector('.quickview-quantity-input').value);
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.push({
                        id: productId,
                        title: productTitle,
                        price: parseInt(productPrice.replace(/[^\d]/g, '')),
                        image: productImage,
                        quantity: quantity
                    });
                }
                
                updateCart();
                showToast(`${productTitle} added to cart`);
                quickViewModal.classList.remove('open');
                quickViewOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Quantity buttons in quick view
            document.querySelector('.quickview-quantity-btn.minus').addEventListener('click', function() {
                const input = document.querySelector('.quickview-quantity-input');
                let value = parseInt(input.value);
                if (value > 1) {
                    input.value = value - 1;
                }
            });
            
            document.querySelector('.quickview-quantity-btn.plus').addEventListener('click', function() {
                const input = document.querySelector('.quickview-quantity-input');
                let value = parseInt(input.value);
                input.value = value + 1;
            });
            
            quickViewModal.classList.add('open');
            quickViewOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    quickViewClose.addEventListener('click', function() {
        quickViewModal.classList.remove('open');
        quickViewOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    quickViewOverlay.addEventListener('click', function() {
        quickViewModal.classList.remove('open');
        quickViewOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate name
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                nameInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('error');
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('error');
            }
            
            // Validate message
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                messageInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                messageInput.parentElement.classList.remove('error');
            }
            
            if (isValid) {
                // Form is valid, you can submit it here
                // For demo, we'll just show a success message
                showToast('Your message has been sent successfully!');
                contactForm.reset();
            }
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailRegex.test(emailInput.value.trim())) {
                showToast('Thank you for subscribing!');
                emailInput.value = '';
            } else {
                showToast('Please enter a valid email address');
            }
        });
    }
    
    // Footer Newsletter Form
    const footerNewsletter = document.querySelector('.footer-newsletter');
    if (footerNewsletter) {
        footerNewsletter.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailRegex.test(emailInput.value.trim())) {
                showToast('Thank you for subscribing!');
                emailInput.value = '';
            } else {
                showToast('Please enter a valid email address');
            }
        });
    }
    
    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();
});

function formatRupiah(angka) {
    return 'Rp' + angka.toLocaleString('id-ID');
}

// === MULTI LANGUAGE SYSTEM ===
// translations is imported at the top of the file

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    const dict = translations[lang] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });
    // Hero section
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle && dict.hero_subtitle) heroSubtitle.textContent = dict.hero_subtitle;
    const heroBtns = document.querySelectorAll('.hero-buttons .btn');
    if (heroBtns[0] && dict.hero_explore) heroBtns[0].textContent = dict.hero_explore;
    if (heroBtns[1] && dict.hero_contact) heroBtns[1].textContent = dict.hero_contact;
    // Cart
    const cartTitle = document.querySelector('.cart-header h3');
    if (cartTitle && dict.cart_title) cartTitle.textContent = dict.cart_title;
    const cartEmpty = document.querySelector('.cart-empty p');
    if (cartEmpty && dict.cart_empty_message) cartEmpty.textContent = dict.cart_empty_message;
    const cartContinue = document.querySelector('.cart-empty .btn-outline');
    if (cartContinue && dict.cart_continue) cartContinue.textContent = dict.cart_continue;
    const cartSubtotal = document.querySelector('.cart-total span');
    if (cartSubtotal && dict.cart_subtotal) cartSubtotal.textContent = dict.cart_subtotal;
    const cartCheckout = document.querySelector('.btn-checkout');
    if (cartCheckout && dict.cart_checkout_button) cartCheckout.textContent = dict.cart_checkout_button;
    // Toast
    const toastMsg = document.querySelector('.toast-message');
    if (toastMsg && dict.toast_product_added) toastMsg.textContent = dict.toast_product_added;
    // ...tambahkan update untuk section lain sesuai kebutuhan...
}

const langSwitcher = document.getElementById('lang-switcher');
if (langSwitcher) {
    langSwitcher.addEventListener('change', function() {
        setLanguage(this.value);
    });
    // Set default language
    const savedLang = localStorage.getItem('lang') || 'id';
    langSwitcher.value = savedLang;
    setLanguage(savedLang);
}
// === END MULTI LANGUAGE ===

// === WHATSAPP CHECKOUT ===
const btnCheckout = document.querySelector('.btn-checkout');
if (btnCheckout) {
    btnCheckout.addEventListener('click', function(e) {
        e.preventDefault();
        let waText = 'Halo, saya ingin order:\n';
        cart.forEach(item => {
            waText += `- ${item.title} x${item.quantity} = ${formatRupiah(item.price * item.quantity)}\n`;
        });
        waText += `Total: ${formatRupiah(cart.reduce((t, i) => t + i.price * i.quantity, 0))}`;
        window.open('https://wa.me/6278177527?text=' + encodeURIComponent(waText), '_blank');
    });
}