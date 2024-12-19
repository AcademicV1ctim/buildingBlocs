// Copy the generated link to the clipboard
function copyLinkToClipboard() {
    const link = document.getElementById('shareLink');
    link.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
}

// Generate the shareable link (same as in the previous code)
function generateShareLink(imageSrc, message) {
    const encodedMessage = encodeURIComponent(message);
    const encodedImage = encodeURIComponent(imageSrc);
    return `${window.location.origin}/viewcard.html?image=${encodedImage}&message=${encodedMessage}`;
}

// Open the modal when a wish is saved
function saveWish() {
    userMessage = document.querySelector('.modal-content textarea').value;
    const shareLink = generateShareLink(selectedImage, userMessage);

    // Display the link in the input box
    document.getElementById('shareLink').value = shareLink;
    
    // Open the share modal
    document.getElementById('shareModal').style.display = "block";
    closeModal();
}

// Close the share modal
function closeShareModal() {
    document.getElementById('shareModal').style.display = "none";
}

// Share via Email
function shareViaEmail() {
    const link = document.getElementById('shareLink').value;
    window.location.href = `mailto:?subject=Check out this Christmas Card&body=Here is a personalized Christmas card I created: ${link}`;
}

// Share via Telegram
function shareViaTelegram() {
    const link = document.getElementById('shareLink').value;
    window.open(`https://t.me/share/url?url=${link}`, '_blank');
}

// Share via WhatsApp
function shareViaWhatsApp() {
    const link = document.getElementById('shareLink').value;
    window.open(`https://api.whatsapp.com/send?text=${link}`, '_blank');
}

// Share via Instagram (Instagram share functionality requires app support, so it's typically handled differently)
function shareViaInstagram() {
    const link = document.getElementById('shareLink').value;
    // Instagram doesn't directly allow sharing via URL. But you can provide an instruction to the user:
    alert('Instagram sharing is not directly supported. Please copy the link and share manually.');
}
