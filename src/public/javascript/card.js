function openModal(cardSrc) {
    document.getElementById("modal").style.display = "block";
    document.getElementById("cardImage").src = cardSrc;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function saveWish() {
    // Get the selected card image and user's wish
    const cardImage = document.getElementById("cardImage").src;
    const userWish = document.querySelector("textarea").value;

    // Encode data in the URL
    const baseUrl = window.location.origin + "./viewcard.html";
    const shareableLink = `${baseUrl}?card=${encodeURIComponent(cardImage)}&message=${encodeURIComponent(userWish)}`;

    // Display the shareable link in the Share Modal
    document.getElementById("shareLink").value = shareableLink;

    // Optionally, open the Share Modal
    document.getElementById("shareModal").style.display = "block";
}


function closeShareModal() {
    document.getElementById("shareModal").style.display = "none";
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



