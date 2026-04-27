const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = [];

function updateUI() {
    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((a, b) => a + b, 0).toFixed(2);

    const income = amounts
        .filter(a => a > 0)
        .reduce((a, b) => a + b, 0)
        .toFixed(2);

    const expense = (
        amounts.filter(a => a < 0)
        .reduce((a, b) => a + b, 0) * -1
    ).toFixed(2);

    balanceEl.innerText = `₹${total}`;
    incomeEl.innerText = `₹${income}`;
    expenseEl.innerText = `₹${expense}`;

    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
}

function addTransactionDOM(transaction) {
    const li = document.createElement("li");

    li.classList.add(transaction.amount > 0 ? "income" : "expense");

    li.innerHTML = `
        ${transaction.text}
        <span>₹${transaction.amount}</span>
        <button class="delete" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(li);
}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateUI();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);

    text.value = "";
    amount.value = "";

    updateUI();
});

updateUI();