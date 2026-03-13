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
});
