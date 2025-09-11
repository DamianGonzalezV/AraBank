"use strict";

const welcomeUser = document.querySelector(".welcome-row-user-span");

const storedUsername = localStorage.getItem("activeUser");

welcomeUser.textContent = storedUsername ? storedUsername : "";
