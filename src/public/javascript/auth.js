document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    // Check if the user is logged in
    if (!token) {
        alert('You are not logged in. Redirecting to login page.');
        window.location.href = './login.html'; 
    } else {
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp && decodedToken.exp < currentTime) {
                alert('Your session has expired. Redirecting to login page.');
                localStorage.removeItem('token'); // Remove expired token
                window.location.href = './login.html';
            }
        } catch (error) {
            console.error('Invalid token format:', error);
            alert('Invalid session. Redirecting to login page.');
            localStorage.removeItem('token'); // Remove invalid token
            window.location.href = './login.html';
        }
    }

    // Add logout button functionality
    const logoutButton = document.querySelector('a[href="./logout.html"]');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            if (confirm('Are you sure you want to log out?')) {
                localStorage.removeItem('token'); // Clear the token from local storage
                alert('You have been logged out.');
                window.location.href = './login.html'; // Redirect to login page
            }
        });
    }
});
