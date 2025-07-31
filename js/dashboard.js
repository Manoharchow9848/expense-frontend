
if (localStorage.getItem("isLoggedIn") === "false") {
  window.location.href = "login.html";
}
const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;
    const limit = 3;

   
    let incomePage = 1;
    let expensePage = 1;
    let incomeHasNext = true;
    let incomeHasPrev = false;
    let expenseHasNext = true;
    let expenseHasPrev = false;

 
    const incomeList = document.getElementById('income-list');
    const expenseList = document.getElementById('expense-list');
    const incomePrevBtn = document.getElementById('income-prev');
    const incomeNextBtn = document.getElementById('income-next');
    const expensePrevBtn = document.getElementById('expense-prev');
    const expenseNextBtn = document.getElementById('expense-next');

  
    async function fetchIncome(page) {
      const res = await fetch(`https://expense-backend-7df0.onrender.com/api/income/${userId}?page=${page}&limit=${limit}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const data = await res.json();
      
      
      renderList(incomeList, data.income, 'income');
      incomeHasNext = data.currentPage < data.totalPages;
      incomeHasPrev = data.currentPage > 1;
      incomePrevBtn.disabled = !incomeHasPrev;
      incomeNextBtn.disabled = !incomeHasNext;
    }

  
    async function fetchExpenses(page) {
      const res = await fetch(`https://expense-backend-7df0.onrender.com/api/expense/${userId}?page=${page}&limit=${limit}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      console.log(data);
      
      renderList(expenseList, data.expenses, 'expense');
      expenseHasNext = data.currentPage < data.totalPages;
      expenseHasPrev =  data.currentPage > 1;
      expensePrevBtn.disabled = !expenseHasPrev;
      expenseNextBtn.disabled = !expenseHasNext;
    }

   
    function renderList(ul, items, type) {
      ul.innerHTML = '';
      if (!items || items.length === 0) {
        ul.innerHTML = `<li>No ${type === 'income' ? 'income' : 'expenses'} found.</li>`;
        return;
      }
      items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${item.description || item.name || 'No description'}</span>
          <span class="amount">${item.amount ? '₹' + item.amount : ''}</span>
        `;
        ul.appendChild(li);
      });
    }

    

    function getAmount(item, type) {
      if (type === 'income') {
        return item.amount;
      } else if (type === 'expense') {
        return item.price;
      }
      return '';
    }

    
    const originalRenderList = renderList;
    renderList = function(ul, items, type) {
      ul.innerHTML = '';
      if (!items || items.length === 0) {
        ul.innerHTML = `<li>No ${type === 'income' ? 'income' : 'expenses'} found.</li>`;
        return;
      }
      items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${item.description || item.name || 'No description'}</span>
          <span class="amount">${getAmount(item, type) ? '₹' + getAmount(item, type) : ''}</span>
        `;
        ul.appendChild(li);
      });
    };
    
    incomePrevBtn.onclick = () => {
      if (incomeHasPrev && incomePage > 1) {
        incomePage--;
        fetchIncome(incomePage);
      }
    };
    incomeNextBtn.onclick = () => {
      if (incomeHasNext) {
        incomePage++;
        fetchIncome(incomePage);
      }
    };
    expensePrevBtn.onclick = () => {
      if (expenseHasPrev && expensePage > 1) {
        expensePage--;
        fetchExpenses(expensePage);
      }
    };
    expenseNextBtn.onclick = () => {
      if (expenseHasNext) {
        expensePage++;
        fetchExpenses(expensePage);
      }
    };

    
    fetchIncome(incomePage);
    fetchExpenses(expensePage);
 