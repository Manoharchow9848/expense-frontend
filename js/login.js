const form = document.getElementById("loginForm");
const api = "https://expense-backend-7df0.onrender.com/api/users/login";

if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "index.html";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  if (!password || !email) {
    showToast("All fields are required", "error");
    return;
  }

  try {
    const res = await axios.post(api, { email, password });
    localStorage.setItem("user", JSON.stringify(res.data.safeUser));
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("isLoggedIn", "true");
    showToast("User successfully logged in");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong";
    showToast(message, "error");
  }
});

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}
