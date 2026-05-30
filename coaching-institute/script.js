// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    // 1. Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // 2. Close menu when a link is clicked (Mobile optimization)
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // 3. Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            
            // Basic validation check
            if (name) {
                alert(`Success! Thank you, ${name}. We have received your inquiry.`);
                contactForm.reset();
            }
        });
    }

    // 4. Smooth Navbar Background Change on Scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 8%';
            navbar.style.background = '#f1f5f9';
        } else {
            navbar.style.padding = '1rem 8%';
            navbar.style.background = '#ffffff';
        }
    });
});