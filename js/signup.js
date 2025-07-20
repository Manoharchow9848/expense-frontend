const form = document.getElementById("signupForm");
const api = "https://expense-backend-7df0.onrender.com/api/users/register";
if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "index.html";
}
form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    if(!name || !password || !email){
        showToast("All fields are required", "error");
    return;
    }
    const user={
        name,email,password
    }

    try {
          const res = await axios.post(api,user);
          console.log(res);
          showToast("Registration successful!", "success");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);

          
    } catch (error) {
          const message = error.response?.data?.message || "Something went wrong";
          showToast(message, "error");
         
    }

    
    
})
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}