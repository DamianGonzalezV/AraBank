"use strict";

// Landpage
const signUpBtnLandpage = document.querySelector(".sign-up-btn-landpage");

// Sign up form
const signUpBtn = document.querySelector(".sign-up-btn");
const signUpForm = document.querySelector("#sign-up-form");

// Sign up inputs
const nameInput = document.querySelector("#name-input");
const usernameInput = document.querySelector("#username-input");
const emailInput = document.querySelector("#email-input");

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
        username: usernameInput.value,
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
