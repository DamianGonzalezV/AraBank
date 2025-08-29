"use strict";

// Landpage
const signUpBtnLandpage = document.querySelector(".sign-up-btn-landpage");

// Sign up form
const signUpBtn = document.querySelector(".sign-up-btn");
const signUpForm = document.querySelector("#sign-up-form");
const loginForm = document.querySelector("#log-in-form");
const toogleFormLine = document.querySelector(".log-in-toogle-line");
const toogleFormBtn = document.querySelector(".log-in-toogle-btn");

// Sign up inputs
const nameInput = document.querySelector("#name-input");
const usernameInputSignup = document.querySelector("#username-input-signup");
const emailInput = document.querySelector("#email-input");

// Login inputs
const usernameInputLogin = document.querySelector("#username-input-login");
const passwordInput = document.querySelector("#password");

// Variables
let toogleAtLoginStatus = false;

toogleFormBtn.addEventListener("click", () => {
  toogleAtLoginStatus = !toogleAtLoginStatus;
  signUpForm.classList.toggle("hide");
  loginForm.classList.toggle("hide");

  toogleFormBtn.textContent = toogleAtLoginStatus
    ? "Change to sign up here"
    : "Change to log in here";
});

// Send form with async promise
signUpBtn.addEventListener("click", (e) => {
  // console.log(nameInput.value);
  e.preventDefault();

  if (nameInput.value && usernameInput.value && emailInput.value) {
    fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        username: usernameInputSignup.value,
        email: emailInput.value,
      }),
    }).then((response) => {
      console.log("status", response.status);
      console.log("Account is created!");
    });

    // send user to accounts page
    // window.location.href = "/login";
  } else {
    const emptyInputsHTML = `
    <span class="sign-up-empty" data-qa="sign-up-empty"
        >Please fill out all inputs!</span
      >
    `;

    signUpForm.insertAdjacentHTML("afterend", emptyInputsHTML);
  }
});
