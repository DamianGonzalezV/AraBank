"use strict";

// Landpage
const signUpBtnLandpage = document.querySelector(".sign-up-btn-landpage");

// Sign up form
const signUpBtn = document.querySelector(".sign-up-btn");
const signUpForm = document.querySelector("#sign-up-form");
const toggleFormBtn = document.querySelector(".log-in-toggle-btn");

// Sign up inputs
const nameInput = document.querySelector("#name");
const usernameInputSignup = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInputSignup = document.querySelector("#password");

// Login form
const loginForm = document.querySelector("#log-in-form");
const loginBtn = document.querySelector(".login-btn");

// Login inputs
const usernameInputLogin = document.querySelector("#username-login");
const passwordInputLogin = document.querySelector("#password-login");

// Variables
let toggleAtLoginStatus = false;

// Form toggle
toggleFormBtn.addEventListener("click", () => {
  toggleAtLoginStatus = !toggleAtLoginStatus;
  signUpForm.classList.toggle("hide");
  loginForm.classList.toggle("hide");

  toggleFormBtn.textContent = toggleAtLoginStatus
    ? "Change to sign up here"
    : "Change to log in here";
});

// Sign up logic
signUpBtn.addEventListener("click", (e) => {
  // console.log(nameInput.value);
  e.preventDefault();

  if (
    nameInput.value &&
    usernameInputSignup.value &&
    emailInput.value &&
    passwordInputSignup
  ) {
    fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        username: usernameInputSignup.value,
        email: emailInput.value,
        password: passwordInputSignup.value,
      }),
    }).then((response) => {
      console.log("status", response.status);
      console.log("Account is created!");
    });

    // send user to accounts page
    window.location.href = "/bank.html";
  } else {
    const emptyInputsHTML = `
    <span class="sign-up-empty" data-qa="sign-up-empty"
        >Please fill out all inputs!</span
      >
    `;

    signUpForm.insertAdjacentHTML("afterend", emptyInputsHTML);
  }
});

// Log in logic
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (usernameInputLogin && passwordInputLogin) {
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInputLogin.value,
        password: passwordInputSignup.value,
      }),
    }).then((response) => {
      console.log("status", response.status);
    });
  }

  // send user to accounts page
  window.location.href = "/bank.html";
});
