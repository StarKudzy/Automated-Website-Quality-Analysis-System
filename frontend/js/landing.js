// ========================================
// LAUNCHREADY QA - LANDING PAGE JAVASCRIPT
// ========================================


// ================= ICONS =================

// Initialize Lucide icons

if (window.lucide) {
    lucide.createIcons();
}


// ================= NAVBAR =================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


// ================= MOBILE MENU =================

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

});


// Close mobile menu when a link is clicked

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// ================= URL VALIDATION =================

const heroForm = document.getElementById("heroForm");

const websiteURL = document.getElementById("websiteURL");

const formMessage = document.getElementById("formMessage");


heroForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const url = websiteURL.value.trim();

    if (url === "") {

        formMessage.textContent =
            "Please enter a website URL.";

        return;

    }

    try {

        const parsedURL = new URL(url);

        if (
            parsedURL.protocol !== "http:" &&
            parsedURL.protocol !== "https:"
        ) {

            formMessage.textContent =
                "Please enter a valid HTTP or HTTPS website URL.";

            return;

        }

        // Store the submitted URL temporarily.
        // We will use it when building the assessment interface.

        sessionStorage.setItem(
            "launchready_website_url",
            parsedURL.href
        );

        formMessage.textContent =
            "URL accepted! Website assessment will be available after we connect the testing engine.";

        formMessage.style.color = "#b8ffd8";

    } catch (error) {

        formMessage.textContent =
            "Invalid URL. Example: https://example.com";

        formMessage.style.color = "#ffd0b3";

    }

});


// ================= FAQ ACCORDION =================

const faqItems = document.querySelectorAll(".faq-item");


faqItems.forEach(function (item) {

    const question = item.querySelector(".faq-question");

    const answer = item.querySelector(".faq-answer");


    question.addEventListener("click", function () {

        const isActive = item.classList.contains("active");


        // Close all FAQs

        faqItems.forEach(function (faq) {

            faq.classList.remove("active");

            faq.querySelector(".faq-answer").style.maxHeight = null;

            faq.querySelector(".faq-question")
                .setAttribute("aria-expanded", "false");

        });


        // Open selected FAQ

        if (!isActive) {

            item.classList.add("active");

            answer.style.maxHeight = answer.scrollHeight + "px";

            question.setAttribute("aria-expanded", "true");

        }

    });

});


// ================= SCROLL ANIMATIONS =================

const revealElements = document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.1
        }

    );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add("visible");

    });

}


// ================= FOOTER YEAR =================

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();


// ================= INITIALIZATION =================

console.log("LaunchReady QA landing page initialized.");