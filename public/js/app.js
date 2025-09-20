"use strict";

let welcomeUser = document.querySelector(".welcome-row-user-span");
let storedUsername = localStorage.getItem("activeUser");

let requestBtn = document.querySelector(".account-balance-request-button");
let sendBtn = document.querySelector(".account-balance-send-button");
let requestDiv = document.querySelector(".account-balance-request");
let sendDiv = document.querySelector(".account-balance-send");

// Display username

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
