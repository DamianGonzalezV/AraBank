"use strict";
import ProfileSettings from "../models/ProfileSettings.js";
import BalanceAndMovements from "../models/BalanceAndMovements.js";

// let requestBtn = document.querySelector(".account-balance-request-button");
// let sendBtn = document.querySelector(".account-balance-send-button");
// let requestDiv = document.querySelector(".account-balance-request");
// let sendDiv = document.querySelector(".account-balance-send");

class App {
  constructor() {
    // localStorage
    this.storedUsername = localStorage.getItem("activeUser");
    this._token = localStorage.getItem("token");

    // App
    this.welcomeUser = document.querySelector(".welcome-row-user-span");
    this._displayWelcomeMessage();

    // Components
    this._createProfileSettings();
    this._createBalanceAndMovements();
  }

  _createProfileSettings() {
    const profileSettings = new ProfileSettings();
    profileSettings.settingsEvent();
    profileSettings.editUsername();
    profileSettings.editEmail();
  }

  _createBalanceAndMovements() {
    const balanceAndMovements = new BalanceAndMovements();
    balanceAndMovements.fetchBalance(this.storedUsername, this._token);
  }

  _displayWelcomeMessage() {
    this.welcomeUser.textContent = this.storedUsername
      ? this.storedUsername
      : "";
  }
}

// create app
const app = new App();

// // Display request or send div
// requestBtn.addEventListener("click", () => {
//   console.log("request div is shown");
//   requestDiv.classList.remove("hide");
//   sendDiv.classList.add("hide");
// });

// // Display send div
// sendBtn.addEventListener("click", () => {
//   sendDiv.classList.remove("hide");
//   requestDiv.classList.add("hide");
// });
