"use strict";

let welcomeUser = document.querySelector(".welcome-row-user-span");
let storedUsername = localStorage.getItem("activeUser");
let token = localStorage.getItem("token");

let requestBtn = document.querySelector(".account-balance-request-button");
let sendBtn = document.querySelector(".account-balance-send-button");
let requestDiv = document.querySelector(".account-balance-request");
let sendDiv = document.querySelector(".account-balance-send");
let totalBalance = document.querySelector(".account-balance-number");

// display welcome message
(function setWelcomeMessage() {
  welcomeUser.textContent = storedUsername ? storedUsername : "";
})();

// Display request or send div
requestBtn.addEventListener("click", () => {
  console.log("request div is shown");
  requestDiv.classList.remove("hide");
  sendDiv.classList.add("hide");
});

// Display send div
sendBtn.addEventListener("click", () => {
  sendDiv.classList.remove("hide");
  requestDiv.classList.add("hide");
});

// Fetch the balance
document.addEventListener("DOMContentLoaded", () => {
  console.log(storedUsername);
  if (storedUsername) {
    fetch("/account/balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.data.total_balance);
        totalBalance.textContent = `$${String(data.data.total_balance)}`;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
