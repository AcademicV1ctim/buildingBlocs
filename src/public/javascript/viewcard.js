// Extract query parameters
const params = new URLSearchParams(window.location.search);
const cardImage = params.get("card");
const userMessage = params.get("message");

// Populate the card and message
if (cardImage) {
  document.getElementById("cardImage").src = decodeURIComponent(cardImage);
} else {
  document.getElementById("cardImage").alt = "No card selected.";
}

if (userMessage) {
  document.getElementById("userMessage").textContent =
    decodeURIComponent(userMessage);
} else {
  document.getElementById("userMessage").textContent = "No message provided.";
}

// Go back to the main page
function goBack() {
  window.location.href = "card.html";
}

// Go back to the main page
function goBack() {
  window.location.href = "card.html";
}

// Share via Email
function shareViaEmail() {
  const link = document.getElementById("shareLink").value;
  window.location.href = `mailto:?subject=Check out this Christmas Card&body=Here is a personalized Christmas card I created: ${link}`;
}

// Share via Telegram
function shareViaTelegram() {
  const link = document.getElementById("shareLink").value;
  window.open(`https://t.me/share/url?url=${link}`, "_blank");
}

// Share via WhatsApp
function shareViaWhatsApp() {
  const link = document.getElementById("shareLink").value;
  window.open(`https://api.whatsapp.com/send?text=${link}`, "_blank");
}

// Share via Instagram (Instagram share functionality requires app support, so it's typically handled differently)
function shareViaInstagram() {
  const link = document.getElementById("shareLink").value;
  // Instagram doesn't directly allow sharing via URL. But you can provide an instruction to the user:
  alert(
    "Instagram sharing is not directly supported. Please copy the link and share manually."
  );
}
