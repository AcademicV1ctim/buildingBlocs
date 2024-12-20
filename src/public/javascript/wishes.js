const apiUrl = ".";

document.addEventListener("DOMContentLoaded", () => {
    const wishTextarea = document.querySelector("textarea[name='blog']");
    const submitButton = document.querySelector("input[type='submit']");

    submitButton.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const user_id = localStorage.getItem(parseInt("userId", 10));
        const wishText = wishTextarea.value.trim();
        
        // Validate if the textarea is not empty
        if (!wishText) {
            alert("Please type your wish before submitting.");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/wishes/createWish`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}` // Attach token for authentication
                },
                body: 
                    JSON.stringify({ 
                        message: wishText,
                        user_id: user_id
                    }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit your wish. Please try again.");
            }

            const data = await response.json();
            alert("Your wish has been submitted successfully!");
            window.location.href = "./index.html";
        } catch (error) {
            console.error("Error submitting the wish:", error.message);
            alert("An error occurred while submitting your wish. Please try again.");
        }
    });
});
