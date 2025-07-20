if (localStorage.getItem("isLoggedIn")==="false") {
  window.location.href = "index.html";
}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 300); // wait for animation
  }, 3000); // show for 3 seconds
}

document.getElementById("incomeForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const source = document.getElementById("source").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  try {
    const res = await axios.post('https://expense-backend-7df0.onrender.com/api/income', {
      amount,source,description,date,userId
    },{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    const data = await res.data;
    console.log(data.user);
    
    localStorage.setItem("user", JSON.stringify(data.user));
    showToast("Income Added Successfully");
    document.getElementById("incomeForm").reset();
  } catch (error) {
    console.error("Error:", error);
    showToast("Server error.");
  }
});

const backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});