const apiUrl = ".";

document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("userId");  
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const switchToRegister = document.getElementById("switch-to-register");
    const switchToLogin = document.getElementById("switch-to-login");
    const popupTitle = document.getElementById("popup-title");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            await login();
        });
    ``}
    
    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            await register();
        });
    }

    // Initially, ensure login form is visible
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    switchToLogin.classList.add("hidden");
    popupTitle.textContent = "Login";
  
    // Switch to Register Form
    switchToRegister.addEventListener("click", () => {
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
      switchToRegister.classList.add("hidden");
      switchToLogin.classList.remove("hidden");
      popupTitle.textContent = "Register";
    });
  
    // Switch to Login Form
    switchToLogin.addEventListener("click", () => {
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
      switchToLogin.classList.add("hidden");
      switchToRegister.classList.remove("hidden");
      popupTitle.textContent = "Login";
    });
  });
  
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }
    try {
        const response = await fetch(`${apiUrl}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                password: password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Login failed. Please try again.");
        }

        const data = await response.json();
        console.log(data);
        const user_id = parseInt(data.id, 10);
        localStorage.setItem("userId", user_id);
        localStorage.setItem("token", data.token);

        alert("Login successful!");
        window.location.href = "./index.html";
    } catch (error) {
        alert("Login failed. Please check your username and password.");
    }
}

async function register() {
  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  if (!username || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/users/registerNewUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed. Please try again.");
    }

    alert("Registration successful! You can now log in.");
    document.getElementById("switch-to-login").click();
  } catch (error) {
    alert("Registration failed. Please try again.");
  }
}

