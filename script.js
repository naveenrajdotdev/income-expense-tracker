//form submission and store data in localStorage

document.getElementById("formid").addEventListener("submit", function (e) {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = {
    id: Date.now(),
    idate: document.getElementById("idate").value,
    income_exp: document.getElementById("dropdown").value,
    desc: document.getElementById("desc").value,
    amount: document.getElementById("amount").value,
  };

  if (isEdit) {
    const index = users.findIndex((u) => u.id === currentUser);
    users[index] = user;
    isEdit = false;
    currentUser = null;
  } else {
    users.push(user);
  }

  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("formid").reset();
  displayData();
});

//display stored transactions in table

function displayData() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const tbody = document.getElementById("tbody");

  tbody.innerHTML = "";

  users.forEach((u, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${u.idate}</td>
      <td>${u.income_exp}</td>
      <td>${u.desc}</td>
      <td>${u.amount}</td>
        <td>
        <button onclick="updateUser(${u.id})">Edit</button>
        <button onclick="deleteUser(${u.id})">Delete</button>
        </td>
      `;

    tbody.appendChild(tr);
  });

  //Netbalance
  const totalIncome = users
    .filter((u) => u.income_exp === "income")
    .reduce((sum, u) => sum + Number(u.amount), 0);

  const totalExpense = users
    .filter((u) => u.income_exp === "expenses")
    .reduce((sum, u) => sum + Number(u.amount), 0);

  const netBalance = totalIncome - totalExpense;

  //UI
  document.getElementById("tincome").textContent = `Income: ₹ ${totalIncome}`;
  document.getElementById("texpenses").textContent =
    `Expenses: ₹ ${totalExpense}`;
  document.getElementById("netbalance").textContent =
    `Net Balance: ₹ ${netBalance}`;
}

displayData();

//add edit and delete transaction functionality

//update

let isEdit = false;
let currentUser = null;

function updateUser(id) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find((u) => u.id === id);

  document.getElementById("idate").value = user.idate;
  document.getElementById("dropdown").value = user.income_exp;
  document.getElementById("desc").value = user.desc;
  document.getElementById("amount").value = user.amount;

  isEdit = true;
  currentUser = id;
}

//delete

function deleteUser(id) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter((u) => u.id !== id);
  localStorage.setItem("users", JSON.stringify(users));
  displayData();
}
