const form = document.getElementById("forgotPasswordForm");
const api = "https://expense-backend-7df0.onrender.com/api/users/reset-password-email";
if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "index.html";
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;

  if (!email) {
    showToast("Email is required", "error");
    return;
  }

  try {
    const res = await axios.post(api, { email });
    showToast("Reset link sent to your email", "success");
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
