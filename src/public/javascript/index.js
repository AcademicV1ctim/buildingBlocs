const apiUrl = ".";

document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayWishes();

    // Timer setup
    const target_mili_sec = new Date("Dec 25, 2024 00:00:00").getTime();
    function timer() {
        const now_mili_sec = new Date().getTime();
        const remaining_sec = Math.floor((target_mili_sec - now_mili_sec) / 1000);

        const day = Math.floor(remaining_sec / (3600 * 24));
        const hour = Math.floor((remaining_sec % (3600 * 24)) / 3600);
        const min = Math.floor((remaining_sec % 3600) / 60);
        const sec = Math.floor(remaining_sec % 60);

        document.querySelector("#day").textContent = day;
        document.querySelector("#hour").textContent = hour;
        document.querySelector("#min").textContent = min;
        document.querySelector("#sec").textContent = sec;
    }
    setInterval(timer, 1000);

    // Star status setup
    const star = document.getElementById("star");
    const taskCompleted = localStorage.getItem("taskCompleted");
    if (taskCompleted === "true") {
        star.src = "./images/litstar.png";
    }

    // Popup functions
    // Ensure these functions are defined globally
    window.showMessage = function (message) {
        const messageText = document.getElementById('message-text');
        messageText.textContent = message; 
        document.getElementById('message-popup').style.display = 'block'; 
    };

    window.closeMessage = function () {
        document.getElementById('message-popup').style.display = 'none'; 
    };

    // Task popup functions
    window.showTaskPopup = function () {
        document.getElementById("task-popup").style.display = "block";
    };

    window.acceptTask = function () {
        localStorage.setItem("taskCompleted", "true");
        window.location.href = "./evidence.html";
    };

    window.removeTask = function () {
        localStorage.setItem("taskCompleted", "false");
        closeTaskPopup();
    };

    window.closeTaskPopup = function () {
        document.getElementById("task-popup").style.display = "none";
    };
});

async function fetchAndDisplayWishes() {
    try {
        // Fetch all wishes from the database
        const response = await fetch(`${apiUrl}/wishes/getAllWishes`);

        if (!response.ok) {
            throw new Error('Failed to fetch wishes. Please try again later.');
        }

        const wishes = await response.json();
        console.log(wishes);
        // Randomize the order of wishes
        const shuffledWishes = wishes.sort(() => Math.random() - 0.5);

        // Display randomized wishes on ornaments
        const ornaments = document.querySelectorAll('.ornament');
        ornaments.forEach((ornament, index) => {
            ornament.style.display = "block"; 
            const message = shuffledWishes[index]?.message || 'Happy Holidays!'; // Default message if no wish is available
            ornament.dataset.message = message;

            ornament.addEventListener('click', () => {
                showMessage(message);
            });
        });
    } catch (error) {
        console.error('Error fetching or displaying wishes:', error);
        alert('An error occurred while loading wishes. Please refresh the page.');
    }
}
