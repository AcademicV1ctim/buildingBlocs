// auth.js

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('You are not logged in. Redirecting to login page.');
      window.location.href = './login.html'; 
    } else {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
  
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          alert('Your session has expired. Redirecting to login page.');
          localStorage.removeItem('authToken');
          window.location.href = './login.html';
        }
      } catch (error) {
        console.error('Invalid token format:', error);
        alert('Invalid session. Redirecting to login page.');
        localStorage.removeItem('authToken');
        window.location.href = './login.html';
      }
    }
});
  