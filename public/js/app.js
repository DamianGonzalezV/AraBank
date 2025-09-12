"use strict";

let welcomeUser = document.querySelector(".welcome-row-user-span");

let storedUsername = localStorage.getItem("activeUser");

(function setWelcomeMessage() {
  welcomeUser.textContent = storedUsername ? storedUsername : "";
})();
