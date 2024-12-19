// Store image URL and message when the user saves their wish
let selectedImage = '';
let userMessage = '';

// Open the modal with card image
function openModal(imageSrc) {
    document.getElementById('modal').style.display = "block";
    document.getElementById('cardImage').src = imageSrc;
    selectedImage = imageSrc; // Store the image URL for later use
}

// Close the modal
function closeModal() {
    document.getElementById('modal').style.display = "none";
}

// Save the wish and generate a shareable link
function saveWish() {
    userMessage = document.querySelector('.modal-content textarea').value;

    // Create a URL-encoded shareable link
    const shareLink = generateShareLink(selectedImage, userMessage);

    // Display the shareable link in the second modal
    document.getElementById('shareLink').value = shareLink;

    // Open the share modal
    document.getElementById('shareModal').style.display = "block";

    // Close the first modal
    closeModal();
}

// Generate a shareable link
function generateShareLink(imageSrc, message) {
    // Use URL encoding for the message
    const encodedMessage = encodeURIComponent(message);
    const encodedImage = encodeURIComponent(imageSrc);

    // Construct the link (can include more details if necessary)
    return `${window.location.origin}/viewcard.html?image=${encodedImage}&message=${encodedMessage}`;
}

// Close the share modal
function closeShareModal() {
    document.getElementById('shareModal').style.display = "none";
}

// Close modal when clicking outside the content (for both modals)
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    const shareModal = document.getElementById('shareModal');

    if (event.target === modal || event.target === shareModal) {
        closeModal();
        closeShareModal();
    }
}


const container = document.querySelector('.snow-container'); // The container for snowflakes

const snowCount = 50; // Adjust for desired number of snowflakes

for (let i = 1; i <= snowCount; i++) {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snow');

  // Generate random properties for each snowflake
  const xStart = `${Math.random() * 100}vw`;
  const xMid = `${Math.random() * 100}vw`;
  const xEnd = `${Math.random() * 100}vw`;
  const yMid = `${Math.random() * 100}vh`;
  const scale = Math.random();
  const opacity = Math.random();
  const duration = Math.random() * 20 + 10; // Random duration between 10s and 30s
  const delay = Math.random() * -30; // Negative delay for staggered start
  const midpointPercent = `${Math.random() * 70 + 20}%`; // Between 20% and 90%

  // Apply CSS variables for each snowflake
  snowflake.style.setProperty('--x-start', xStart);
  snowflake.style.setProperty('--x-mid', xMid);
  snowflake.style.setProperty('--x-end', xEnd);
  snowflake.style.setProperty('--y-mid', yMid);
  snowflake.style.setProperty('--scale', scale);
  snowflake.style.opacity = opacity;
  snowflake.style.animationDuration = `${duration}s`;
  snowflake.style.animationDelay = `${delay}s`;
  snowflake.style.setProperty('--midpoint-percent', midpointPercent);

  container.appendChild(snowflake);
}

