// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById('theme-toggle');
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const navToggleButton = document.getElementById("nav-toggle-button");
    const mobileFloatNav = document.querySelector(".mobile-float-nav");
    const desktopNav = document.querySelector(".desktop-nav");
    const centerCircle = document.querySelector(".center-circle");
    const navSegments = document.querySelectorAll(".mobile-float-nav .nav-segment");
    const segments = document.querySelectorAll(".side-nav-segment");
    const scrollTopBtn = document.querySelector(".scroll-top");
    const sideNav = document.querySelector(".side-nav");
  
     const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        document.querySelector('.cloud-banner')?.setAttribute('data-theme', theme);        
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            //console.error("Error writing theme to localStorage:", error.message);
        }
        
        const sunIcon = themeToggle.querySelector('.icon-sun');
        const moonIcon = themeToggle.querySelector('.icon-moon');
        if (theme === 'dark') {
            sunIcon.style.transform = 'rotate(-180deg) scale(0)';
            moonIcon.style.transform = 'rotate(0deg) scale(1)';
        } else {
            sunIcon.style.transform = 'rotate(0deg) scale(1)';
            moonIcon.style.transform = 'rotate(180deg) scale(0)';
        }
    };
    
    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });    
    
    // Safe functions for reading and writing to localStorage
    const initTheme = () => {
        let savedTheme;        
       
        try {
            savedTheme = localStorage.getItem('theme');
        } catch (error) {
            //console.error("Error reading theme from localStorage:", error.message);
            savedTheme = null; 
        }
    
        const urlTheme = new URLSearchParams(window.location.search).get('theme');
        const browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';        
        
        setTheme(urlTheme || savedTheme || browserTheme || 'light');
    };    
   
    initTheme();

    // FAQ Toggle
    document.querySelectorAll('.faq-item').forEach(item => {
        const answer = item.querySelector('.faq-answer');
        item.querySelector('h3').addEventListener('click', () => {
            item.classList.toggle('active');
            answer.style.maxHeight = item.classList.contains('active') ? `${answer.scrollHeight}px` : '0';
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
        });
    });

    //  Image Gallery Expand    
const galleryGrid = document.querySelector('.gallery-grid');
const scrollRange = document.getElementById('scroll-range');

scrollRange.max = galleryGrid.scrollWidth - galleryGrid.clientWidth;

scrollRange.addEventListener('input', () => {
    galleryGrid.scrollLeft = scrollRange.value;
});

galleryGrid.addEventListener('scroll', () => {
    scrollRange.value = galleryGrid.scrollLeft;
});

// Image Gallery Expand

document.querySelectorAll('.expand-btn').forEach(button => {
    button.addEventListener('click', () => button.closest('.gallery-item').querySelector('.gallery-overlay').style.display = 'flex');
    history.pushState(null, null, location.href);
});

document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', () => thumbnail.closest('.gallery-item').querySelector('.gallery-overlay').style.display = 'flex');
    history.pushState(null, null, location.href);
});
document.querySelectorAll('.close-overlay').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.gallery-overlay').style.display = 'none';
        //history.replaceState(null, null, location.href);
        scrollToSection('section8'); 
    });
});

window.addEventListener('popstate', () => {
    document.querySelectorAll('.gallery-overlay').forEach(overlay => {
        if (overlay.style.display === 'flex') {
            overlay.style.display = 'none';
        }
    });
});

   // debounce function
    function debounce(func, delay) {
     let timeout;
     return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
     };
    }

    // Toggle Mobile/ Desktop Navigation
    const toggleNavVisibility = () => {
        const isMobile = window.innerWidth <= 840;
        desktopNav.style.display = isMobile ? 'none' : 'block';
        mobileFloatNav.style.display = isMobile ? 'flex' : 'none';
        navToggleButton.style.display = isMobile ? 'block' : 'none';
        sideNav.style.display = isMobile ? 'none' : 'flex';
    };

    window.addEventListener('resize', debounce(toggleNavVisibility, 150));
    
    toggleNavVisibility();

    // Show/Hide Mobile Navigation on button click
    navToggleButton.addEventListener("click", () => mobileFloatNav.classList.toggle("hidden"));
    
    // Scroll to specific sections when navigation segments are clicked
    navSegments.forEach(segment => {
        segment.addEventListener("click", (event) => {
            event.stopPropagation();
            const targetSection = document.getElementById(segment.getAttribute("data-target"));
            targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
    

    // Scroll to top when center circle is clicked
    centerCircle.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // Arrange navigation segments in a circular layout
    const radius = 50, totalSegments = navSegments.length;
    navSegments.forEach((segment, index) => {
        const angle = (360 / totalSegments) * index;
        segment.style.transform = `translate(${radius * Math.cos((angle * Math.PI) / 180)}px, ${radius * Math.sin((angle * Math.PI) / 180)}px)`;
    });

    // Fix desktop navigation at top when scrolled
    const navOffsetTop = desktopNav.offsetTop;

    function handleScroll() {
      desktopNav.classList.toggle("fixed", window.scrollY > navOffsetTop);
    }    

    // Form Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    

    const validateForm = () => {
        const isEmailValid = emailPattern.test(emailField.value.trim());
        const isMessageValid = messageField.value.trim() !== '';
        submitBtn.disabled = !(isEmailValid && isMessageValid);
    };

    emailField.addEventListener('input', validateForm);
    messageField.addEventListener('input', validateForm);

    // Safe function to read from localStorage
    function safeReadStorage(key) {
        try {
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch (error) {
            //console.error("Error reading from localStorage:", error.message);
            return [];
        }
    }

    // Safe function to write to localStorage
    function safeWriteStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            //console.error("Error writing to localStorage:", error.message);
        }
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        formResponse.textContent = '';

        // Spam Protection
        const now = Date.now();
        const oneMinute = 60 * 1000;
        let submissions = safeReadStorage('submissions');

        // Remove entries older than one minute
        const recentSubmissions = submissions.filter(timestamp => now - timestamp < oneMinute);
        
        if (recentSubmissions.length >= 5) {
            formResponse.textContent = 'You have reached the maximum of 5 submissions per minute. Please try again later.';
            formResponse.style.color = 'red';
            submitBtn.disabled = false;
            return;
        }

        if (recentSubmissions.length && now - recentSubmissions[recentSubmissions.length - 1] < oneMinute) {
            formResponse.textContent = 'Please wait at least a minute before submitting again.';
            formResponse.style.color = 'red';
            submitBtn.disabled = false;
            return;
        }

        recentSubmissions.push(now);
        safeWriteStorage('submissions', recentSubmissions);

        // Change button text to "Sending..."
        submitBtn.textContent = 'Sending...';

        const formData = new FormData(contactForm);
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbxUbPt7dwfbK928m-KRled0s4km18cJCgZHV9Nohf7MnvCoxxrSvMXqs1zblzi1wWfq/exec', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                formResponse.textContent = 'Message sent successfully!';
                formResponse.style.color = 'green';
                contactForm.reset();
            } else {
                formResponse.textContent = 'Error sending message. Please try again later.';
                formResponse.style.color = 'red';
            }
        } catch (error) {
            //console.error('Error sending form:', error.message);
            formResponse.textContent = 'Error connecting to the server. Please try again.';
            formResponse.style.color = 'red';
        } finally {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    });    

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return; 
    
        const offset = 60;
        const top = section.offsetTop - offset;
    
        window.scrollTo({
            top: top,
            behavior: "smooth"
        });
    }
    

    function updateActiveSegment(target) {
        segments.forEach(segment => segment.classList.remove("active"));
        target.classList.add("active");
    }

    segments.forEach(segment => {
        segment.addEventListener("click", function () {
            const sectionId = this.getAttribute("data-target");
            if (!sectionId) return;
            scrollToSection(sectionId);
            updateActiveSegment(this);
        });
    });    

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    const sections = document.querySelectorAll("section"); 
    
    function highlightActiveSegment() {
        let scrollPosition = window.scrollY + desktopNav.offsetHeight + 50; 

        sections.forEach((section) => {
            const sectionId = section.getAttribute("id");
            if (!sectionId) return;

            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const activeSegments = desktopNav.style.display === 'block' ? segments : navSegments;
                activeSegments.forEach(segment => {
                    segment.classList.remove("active");
                    if (segment.getAttribute("data-target") === sectionId) {                        
                        segment.classList.add("active");
                    }
                });
            }
        });
    }    

    window.addEventListener("scroll", debounce(() => {
        highlightActiveSegment();
        handleScroll();
    }, 100));   
    
});