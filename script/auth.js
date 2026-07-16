// =========================
// DinoShop Auth Logic
// Front-end ONLY (with localStorage)
// =========================
//

// Storage keys
const USERS_KEY = "dinoUsers";
const CURRENT_USER_KEY = "dinoCurrentUser";

// =========================
// Helper Functions
// =========================
//

// Get all users FROM localStorage
function getUsers() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

// Save all users TO localStorage
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Get the currently logged-in user
function getCurrentUser() {
  const currentUser = localStorage.getItem(CURRENT_USER_KEY);
  return currentUser ? JSON.parse(currentUser) : null;
}

// Save the currently logged-in user
function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  // the login state stays there until logout
}

// LOGOUT aka remove current logged-in user
function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

//MUST UPDATE TEXT HERE ********************************
// Show message inside a message element
function showMessage(elementId, message, isSuccess = false) {
  const messageElement = document.getElementById(elementId);

  if (!messageElement) return;

  messageElement.textContent = message;
  messageElement.classList.remove("text-danger", "text-success");
  messageElement.classList.add(isSuccess ? "text-success" : "text-danger");
}

// Email validation
function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}

// =========================
// Registration logic
// =========================
//

function handleRegister() {
  const registerForm = document.getElementById("createAccountForm");

  if (!registerForm) {
    return;
  }

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stops the page from refreshing immediately

    const name = document.getElementById("registerName").value.trim();
    const email = document
      .getElementById("registerEmail")
      .value.trim()
      .toLowerCase();
    const password = document.getElementById("registerPassword").value.trim();
    const birthday = document.getElementById("birthday").value;
    const privacyPolicy = document.getElementById("privacyPolicy").checked;

    // Validation
    if (!name || !email || !password || !birthday) {
      showMessage("registerMessage", "Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("registerMessage", "Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      showMessage(
        "registerMessage",
        "Password must be at least 6 characters long.",
      );
      return;
    }

    if (!privacyPolicy) {
      showMessage(
        "registerMessage",
        "You must read and accept the Privacy Policy.",
      );
      return;
    }

    const users = getUsers();

    // Check if email already exists
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      showMessage(
        "registerMessage",
        "An account with this email already exists. Try to login!",
      );
      return;
    }

    // Create new user (object)
    const newUser = {
      id: Date.now(),    // ← unique id assigned on registration
      name,
      email,
      password,
      birthday,
    };

    users.push(newUser);
    saveUsers(users);

    showMessage(
      "registerMessage",
      "Account created successfully! Redirecting you to login...",
      true,
    );

    registerForm.reset();

    // Redirect after short delay
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500); // Redirect to login page after a short delay
  });
}

// =========================
// Login Logic
// =========================

function handleLogin() {
  // Works on the login page
  const loginForm = document.getElementById("loginForm");

 if (!loginForm) {
    return;
  }

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      showMessage("loginMessage", "Please enter both email and password.");
      return;
    }

    const users = getUsers();

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      showMessage("loginMessage", "Wrong email or password.");
      return;
    }

    // Save login session
    setCurrentUser({
      id: String(matchedUser.id),  // store as string to match server URL params
      name: matchedUser.name,
      email: matchedUser.email,
    });

    await initBasket(String(matchedUser.id));

    // Check first if checkout is waiting
    const pendingCheckout = localStorage.getItem("pendingCheckout");

    showMessage(
      "loginMessage",
      pendingCheckout === "true"
        ? "Login successful! Redirecting you back to your cart..."
        : "Login successful! Redirecting to home page...",
      true
    );

    loginForm.reset();

    setTimeout(() => {
      if (pendingCheckout === "true") {
        localStorage.removeItem("pendingCheckout");
        window.location.href = "shoppingCart.html";
      } else {
        window.location.href = "index.html";
      }
    }, 1000);
  });
}

// ==================================
// Autofill email in the contact form
// =====================================

function autofillUserEmail() {
  const emailInput = document.getElementById("contactEmail");
  const currentUser = getCurrentUser();

  if (!emailInput || !currentUser) {
    return;
  }

  emailInput.value = currentUser.email;
}

// =========================
// Navbar Logic
// =========================

function updateNavbarAuthState() {
  // Checks whether someone is logged in
  const authArea = document.getElementById("auth-area");
  const currentUser = getCurrentUser();

  if (!authArea) {
    return;
  }

  if (currentUser) {
    authArea.innerHTML = `
        <div class="d-flex align-items-center gap-1">
            <i class="bi bi-person"></i>
            <span>Hi, ${currentUser.name}</span>
            <a href="#" id="logoutBtn" class="text-decoration-underline">
                Logout
            </a>
        </div>
    `;

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", function (e) {
        e.preventDefault(); //This prevents the href="#" from jumping the page
        logoutUser();

        setTimeout(() => {
          window.location.href = "index.html";
        }, 100);
      });
    }
  } else {
    authArea.innerHTML = `
        <a href="login.html" class="btn btn-raww-outline">Login</a>
    `;
  }
  //   authArea.innerHTML = `
  //           <a href="login.html" class="nav-icon">
  //               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  //                   <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
  //               </svg>
  //           </a>
  //       `;
  // }
}

// =========================
// Start Everything
// =========================

//DOMContentLoaded - when the page is fully loaded, start the JavaScript
document.addEventListener("DOMContentLoaded", function () {
  handleRegister();
  handleLogin();

  autofillUserEmail(); //Calling autofill

  setTimeout(() => {
    updateNavbarAuthState();
  }, 100);
});