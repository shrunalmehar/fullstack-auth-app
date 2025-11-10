// AUTH.JS - signup & login, used by signup.html and login.html and included on index (safe no-op there)

// If present on page, wire up signup form
document.addEventListener("DOMContentLoaded", () => {
  // Signup form
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();

      try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          alert("Signup successful — please login.");
          window.location.href = "login.html";
        } else {
          alert(data.message || "Signup failed");
        }
      } catch (err) {
        console.error("Signup error:", err);
        alert("Network error during signup. Check backend is running at :5000");
      }
    });
  }

  // Login form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok && data.token) {
          localStorage.setItem("token", data.token);
          alert("Login successful");
          window.location.href = "index.html";
        } else {
          alert(data.message || "Login failed");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Network error during login. Check backend is running at :5000");
      }
    });
  }
});
