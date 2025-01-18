

// Function to update content based on selected language
function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = langData[key];
    });
}

// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = data[lang];
    return response;
}

// Function to change language
async function changeLanguage(lang) {
    await setLanguagePreference(lang);
    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function selectLanguage(lang) {
    changeLanguage(lang);
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.style.display = 'none'; // Close dropdown after selection
}

function showMore(button) {
    const reviewText = button.closest('.swiper-slide').querySelector('.review-text');
    reviewText.classList.toggle("show-full"); // Toggle showing full text

    if (reviewText.classList.contains("show-full")) {
        button.innerText = "Less";
    } else {
        button.innerText = "More";
    }
}

// Close the dropdown if clicked outside of it
window.onclick = function (event) {
    if (!event.target.matches('.selector-button')) {
        const dropdown = document.getElementById('dropdownMenu');
        dropdown.style.display = 'none';
    }
}

// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'de';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4, // Show 4 reviews at a time
        spaceBetween: 10, // Space between reviews
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true, // Enable infinite scrolling
        breakpoints: {
            // When the window is <= 1024px
            1024: {
                slidesPerView: 4,
            },
            // When the window is <= 768px
            768: {
                slidesPerView: 3,
            },
            // When the window is <= 640px
            640: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            }
        }
    });
    const maxLength = 200; // Set max character length

    // Shorten text function
    const shortenText = (element) => {
        const text = element.innerText;
        const button = element.closest('.swiper-slide').querySelector('.more-btn');

        if (text.length > maxLength) {
            // const shortened = text.slice(0, maxLength) + '...';
            // element.innerText = shortened;
            button.style.display = "block"; // Show "More" button
        } else {
            button.style.display = "none"; // Hide "More" button if text is short
        }
    };

    // Initial setup: apply shortening to all reviews
    const reviewTexts = document.querySelectorAll(".review-text");
    reviewTexts.forEach((review) => shortenText(review));
});







