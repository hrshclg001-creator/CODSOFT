// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const targetId = this.getAttribute('href');
		const targetElement = document.querySelector(targetId);

		if (targetElement) {
			// Close Bootstrap navbar toggler if open
			const navbarToggler = document.querySelector('.navbar-toggler');
			const navbarCollapse = document.querySelector('.navbar-collapse');
			if (navbarToggler && navbarCollapse.classList.contains('show')) {
				navbarToggler.click(); // Simulates the user closing the navbar
			}

			targetElement.scrollIntoView({
				behavior: 'smooth'
			});
		}
	});
});

// Form submission (placeholder functionality)
const form = document.querySelector('form');
if (form) { // Check if form exists before adding event listener
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		alert('Thank you for your message! I will get back to you soon.');
		form.reset();
	});
}

// Scroll animation
const animateOnScroll = () => {
	// Target Bootstrap card elements for skills and projects
	const elements = document.querySelectorAll('#skills .card, #projects .card');
	elements.forEach(element => {
		const elementPosition = element.getBoundingClientRect().top;
		const screenPosition = window.innerHeight / 1.3;

		if (elementPosition < screenPosition) {
			element.style.opacity = '1';
			element.style.transform = 'translateY(0)';
		}
	});
};

// Set initial state for animation
document.querySelectorAll('#skills .card, #projects .card').forEach(element => {
	element.style.opacity = '0';
	element.style.transform = 'translateY(20px)';
	element.style.transition = 'all 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll); // Trigger on load for elements already in view
