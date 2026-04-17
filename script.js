document.addEventListener('DOMContentLoaded', () => {

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const animationOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine if it's a grid/list needing staggered delay
                if (entry.target.classList.contains('scroll-animate')) {
                    const staggerItems = entry.target.querySelectorAll('.stagger-item');
                    staggerItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                }
                
                // Add visible class to simple fade-ins
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('visible');
                }

                // Stop observing once animated to prevent repeating
                observer.unobserve(entry.target);
            }
        });
    }, animationOptions);

    // Observe sections and fade-in elements
    document.querySelectorAll('.scroll-animate, .fade-in').forEach(element => {
        scrollObserver.observe(element);
    });

});
