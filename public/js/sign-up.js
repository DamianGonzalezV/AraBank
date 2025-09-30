"use strict";

// Landpage
const signUpBtnLandpage = document.querySelector(".sign-up-btn-landpage");

// Sign up form
const signUpBtn = document.querySelector(".sign-up-btn");
const signUpForm = document.querySelector("#sign-up-form");
const toggleFormText = document.querySelector(".log-in-toggle-span");
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

// // Bank
// const welcomeMessageUser = document.querySelector(".active-user");

// Variables
let toggleAtLoginStatus = false;
let emptyInputsHTML = null;

// Form toggle
toggleFormBtn.addEventListener("click", () => {
  console.log("click toggle");
  signUpForm.classList.toggle("hide");
  loginForm.classList.toggle("hide");

  toggleFormBtn.textContent = toggleAtLoginStatus
    ? "Login"
    : "Create an account";

  toggleFormText.textContent = toggleAtLoginStatus
    ? "Already have an account?"
    : "New to AraBank?";

  toggleAtLoginStatus = !toggleAtLoginStatus;
  // emptyInputsHTML.classList.add("hide");
});

// Insert HTML for errors
function insertHTMLerror(signUpOrLogin, err) {
  emptyInputsHTML = `
            <span class="sign-up-empty" data-qa="sign-up-empty"
            >${err}</span>
          `;

  signUpOrLogin.insertAdjacentHTML("afterend", emptyInputsHTML);
}

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
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("message", data.message);

        // Store the token
        localStorage.setItem("token", data.token);
        // Save user to local storage
        localStorage.setItem("activeUser", data.username);
        // send user to app
        window.location.href = "/app.html";
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "Username or email already in use") {
          insertHTMLerror(signUpForm, err.message);
        }
      });
  } else {
    insertHTMLerror("Please fill out all inputs!");
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
        password: passwordInputLogin.value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.user);
        localStorage.setItem("activeUser", data.username);
        localStorage.setItem("token", data.token);
        // send user to app
        window.location.href = "/app.html";
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "User does not exist")
          insertHTMLerror(loginForm, err.message);
      });
  }
});
