document.addEventListener('DOMContentLoaded', function () {
    // Initialize Swiper for Featured Books
    const featuredBooksSwiper = new Swiper('.featured-books-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20, // Adjusted space
        grabCursor: true,
        pagination: {
            el: '.featured-books-slider .swiper-pagination', // Scoped pagination
            clickable: true,
        },
        navigation: {
            nextEl: '.featured-books-slider .swiper-button-next', // Scoped navigation
            prevEl: '.featured-books-slider .swiper-button-prev', // Scoped navigation
        },
        breakpoints: {
            576: { // Small devices (landscape phones, 576px and up)
                slidesPerView: 2,
                spaceBetween: 20
            },
            768: { // Medium devices (tablets, 768px and up)
                slidesPerView: 3,
                spaceBetween: 30
            },
            1200: { // Extra large devices (large desktops, 1200px and up)
                slidesPerView: 4,
                spaceBetween: 30
            }
        }
    });

    // Initialize Swiper for Testimonials
    const testimonialSwiper = new Swiper('.testimonial-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.testimonial-slider .swiper-pagination', // Scoped pagination
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    // Initialize Flatpickr for Event Calendar
    // Option 1: Calendar as a dropdown for the input field
    flatpickr("#eventCalendarFlatpickr", {
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "F j, Y",
        // Example: To mark specific dates as events (you'd fetch these dynamically)
        // Add 'enable' option with specific dates if you want to highlight them.
        // For example:
        // enable: [
        //     { from: "today", to: new Date().fp_incr(7) }, // Enable next 7 days
        //     "2025-07-25", // A specific event date
        //     "2025-08-10"  // Another specific event date
        // ],
        // To show which dates have events, you might need custom styling or a 'dayCreate' hook.
        // This basic setup just provides a date picker.
        onChange: function (selectedDates, dateStr, instance) {
            // You can add logic here if a date is selected, e.g., filter events list
            console.log("Date selected for calendar: " + dateStr);
        }
    });

    // Option 2: If you want an inline calendar, uncomment below and ensure #eventCalendarContainer exists
    /*
    flatpickr("#eventCalendarContainer", {
        dateFormat: "Y-m-d",
        altInput: false, // No alternate input field needed for inline
        inline: true, // Show calendar inline
        enable: [
            { from: "today", to: new Date().fp_incr(60) }
        ],
        // Add more configurations as needed
        onChange: function(selectedDates, dateStr, instance) {
            console.log("Date selected on inline calendar: " + dateStr);
            // Potentially update a hidden input or filter events
            // document.getElementById('hiddenEventDateInput').value = dateStr;
        }
    });
    */


    // Initialize Vanilla Tilt.js on book cards
    VanillaTilt.init(document.querySelectorAll(".vanilla-tilt"), {
        max: 8,     // Reduced max tilt
        speed: 300,
        glare: true,
        "max-glare": 0.1 // Reduced glare
    });

    // Newsletter Form Submission with SweetAlert2
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput.value;
            if (email && emailInput.checkValidity()) { // Added basic HTML5 validation check
                // Simulate API call
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Subscribed!',
                        text: 'Thanks for subscribing to our newsletter.',
                        confirmButtonColor: '#3498db'
                    });
                    newsletterForm.reset();
                }, 500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Email',
                    text: 'Please enter a valid email address.',
                    confirmButtonColor: '#3498db'
                });
            }
        });
    }

    // Contact Form Submission with SweetAlert2
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;

            // Basic validation using HTML5 `required` attribute.
            // For more complex validation, you'd add more JS checks here.
            if (contactForm.checkValidity()) {
                // Simulate API call
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Message Sent!',
                        text: 'We have received your message and will get back to you shortly.',
                        confirmButtonColor: '#3498db'
                    });
                    contactForm.reset();
                }, 500);
            } else {
                // If using more complex JS validation, this alert could be more specific.
                // For now, relying on browser's default messages for required fields.
                Swal.fire({
                    icon: 'error',
                    title: 'Incomplete Form',
                    text: 'Please fill out all required fields correctly.',
                    confirmButtonColor: '#3498db'
                });
            }
        });
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Adjust for fixed navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                // Close mobile nav if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarToggler && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // Active nav link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarHeight = document.querySelector('.navbar').offsetHeight || 70;


    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - navbarHeight - 10)) { // Adjusted offset
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section's ID
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Special case for top of page / hero
        if (window.pageYOffset < sections[0].offsetTop - navbarHeight - 10) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.navbar-nav .nav-link[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call to set active link on page load


    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

});