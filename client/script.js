const API_URL = "http://localhost:5000/transactions";

async function fetchTransactions() {

const res = await fetch(API_URL);
const data = await res.json();

const list = document.getElementById("transactionList");

list.innerHTML = "";

let income = 0;
let expense = 0;

data.forEach(item => {

if(item.type === "income"){
income += item.amount;
}else{
expense += item.amount;
}

const li = document.createElement("li");

li.className =
item.type === "income"
? "income-item"
: "expense-item";

li.innerHTML = `
<span>${item.title} - ₹${item.amount}</span>

<button class="delete-btn"
onclick="deleteTransaction('${item._id}')">
Delete
</button>
`;

list.appendChild(li);

});

document.getElementById("income").textContent =
`₹${income}`;

document.getElementById("expense").textContent =
`₹${expense}`;

document.getElementById("balance").textContent =
`₹${income-expense}`;

}

async function addTransaction(){

const title =
document.getElementById("title").value;

const amount =
document.getElementById("amount").value;

const type =
document.getElementById("type").value;

await fetch(API_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title,
amount:Number(amount),
type
})
});

fetchTransactions();

document.getElementById("title").value="";
document.getElementById("amount").value="";
}

async function deleteTransaction(id){

await fetch(`${API_URL}/${id}`,{
method:"DELETE"
});

fetchTransactions();
}

fetchTransactions();