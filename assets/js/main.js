document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("#primary-navigation");

    if (!menuToggle || !navigation) return;

    function closeMenu() {
        menuToggle.setAttribute("aria-expanded", "false");
        navigation.classList.remove("is-open");
    }

    function toggleMenu() {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        navigation.classList.toggle("is-open", !isOpen);
    }

    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    // Close when clicking anywhere outside the menu
    document.addEventListener("click", (event) => {
        if (
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    // Close after clicking a navigation link
    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Close when pressing Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });
});


// Load the latest two news items on the home page
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("latest-news");

    // Run only on pages that contain the latest-news container
    if (!container) return;

    try {
        const response = await fetch("news.html");

        if (!response.ok) {
            throw new Error("Failed to load news");
        }

        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const newsCards = doc.querySelectorAll("#all-news .card");

        container.replaceChildren();

        newsCards.forEach((card, index) => {
            if (index < 2) {
                container.appendChild(card.cloneNode(true));
            }
        });

        if (newsCards.length === 0) {
            container.textContent = "No news available.";
        }
    } catch (error) {
        console.error("Error loading news:", error);
        container.textContent = "Unable to load news.";
    }
});
