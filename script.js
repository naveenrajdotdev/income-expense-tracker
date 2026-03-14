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

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));

  this.reset();
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
      <td></td>
      `;

    tbody.appendChild(tr);
  });
}

displayData();

