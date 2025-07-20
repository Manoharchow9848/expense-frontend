if (localStorage.getItem("isLoggedIn")==="false") {
  window.location.href = "index.html";
}

const user = JSON.parse(localStorage.getItem("user"));
if(user.isPremium === true) {
    window.location.href = "index.html";
}

const cashfree = Cashfree({
  mode: "sandbox",
});


document.getElementById("renderBtn").addEventListener("click",async()=>{
    try {
        const orderAmount =599;
        const user = JSON.parse(localStorage.getItem("user"));
        const customerId = user.id;
        console.log(customerId);
        const response = await axios.post("https://expense-backend-7df0.onrender.com/api/pay",{
            customerId,
            orderAmount
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        const data = response.data;
        console.log(data);
        const paymentSessionId = data.paymentSessionId;
        localStorage.setItem("paymentSessionId", "true");
        let checkoutOptions = {
                    paymentSessionId: paymentSessionId,
                    redirectTarget: "_self",
                };
             const res =   await cashfree.checkout(checkoutOptions);
             console.log(res);
             
             
    } catch (error) {
        console.log(error);
    }
})
