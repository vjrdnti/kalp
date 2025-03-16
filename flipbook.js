let currentPage = 1;
const totalPages = 71; // Update this based on actual pages
const pageLeft = document.getElementById("page-left");
const pageRight = document.getElementById("page-right");
const flipbook = document.getElementById("flipbook");

function updatePages() {
    pageLeft.classList.add("fade-out");
    pageRight.classList.add("fade-out");

    setTimeout(() => {
        if (window.innerWidth > 768) {
            // Two-page view for PC/Laptop
            if (currentPage === 1) {
                pageLeft.style.display = "none";
                pageRight.src = "pages/1.jpg";
            } else {
                pageLeft.style.display = "block";
                pageLeft.src = `pages/${currentPage}.jpg`;
                pageRight.src = `pages/${currentPage + 1}.jpg`;
            }
        } else {
            // One-page view for Mobile
            pageLeft.style.display = "none";
            pageRight.src = `pages/${currentPage}.jpg`;
        }

        pageLeft.classList.remove("fade-out");
        pageRight.classList.remove("fade-out");
        pageLeft.classList.add("fade-in");
        pageRight.classList.add("fade-in");
    }, 200);
}

function turnPage(direction) {
    if (direction === "left" && currentPage > 1) {
        if (currentPage === 2) {
            currentPage = 1;
        } else {
            currentPage -= 2;
        }
    } else if (direction === "right" && currentPage + 1 < totalPages) {
        currentPage += (currentPage === 1) ? 1 : 2;
    }
    updatePages();
}

flipbook.addEventListener("click", (event) => {
    const rect = flipbook.getBoundingClientRect();
    const clickX = event.clientX - rect.left;

    if (clickX < rect.width * 0.2) {
        turnPage("left");
    } else if (clickX > rect.width * 0.8) {
        turnPage("right");
    }
});

flipbook.addEventListener("touchstart", (event) => {
    const touchX = event.touches[0].clientX;
    const rect = flipbook.getBoundingClientRect();

    if (touchX < rect.width * 0.2) {
        turnPage("left");
    } else if (touchX > rect.width * 0.8) {
        turnPage("right");
    }
});

updatePages();

