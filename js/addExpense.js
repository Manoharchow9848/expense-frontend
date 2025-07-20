if (localStorage.getItem("isLoggedIn")==="false") {
  window.location.href = "index.html";
}

const from = document.getElementById("expenseForm");
const api = "https://expense-backend-7df0.onrender.com/api/expense/create"
from.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const category = e.target.category.value;

   if( !name || !price || !category){
        showToast("All fields are required", "error");
    return;
   }
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;
        console.log(userId);
        
        const res = await axios.post(api,{name,price,category,userId} ,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        showToast("Expense Added");
        e.target.reset();

        
    } catch (error) {
        const message = error.response?.data?.message || "Something went wrong";
        showToast(message, "error");
        e.target.reset();
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