export default class ProfileSettings {
  constructor() {
    // Fetch data
    this.setWelcomeMessage();
    this.fetchData();

    // Navigation sidebar message
    this.welcomeUser = document.querySelector(".welcome-row-user-span");

    // Profile settings
    this.bankFeaturesContainer = document.querySelector(
      ".main-container-bank-features"
    );
    this.openProfileSettingsBtn = document.querySelector(
      ".profile-settings-image-btn"
    );
    this.profileSettingsContainer = document.querySelector(
      ".container-profile-settings"
    );
    this.closeProfileSettingsBtn = document.querySelector(
      ".profile-settings-close-btn"
    );

    this.username = document.querySelector(".profile-settings-username");
    this.email = document.querySelector(".profile-settings-email");

    this.editUsernameBtn = document.querySelector(
      ".settings-edit-btn-username"
    );
    this.editEmailBtn = document.querySelector(".settings-edit-btn-email");

    this.saveUsernameBtn = document.querySelector(
      ".settings-save-btn-username"
    );
    this.saveEmailBtn = document.querySelector(".settings-save-btn-email");

    this.editUsernameDiv = document.querySelector(
      ".profile-settings-change-username-edit"
    );
    this.saveUsernameDiv = document.querySelector(
      ".profile-settings-change-username-save"
    );

    this.editEmailDiv = document.querySelector(
      ".profile-settings-change-email-edit"
    );
    this.saveEmailDiv = document.querySelector(
      ".profile-settings-change-email-save"
    );

    this.usernameInput = document.querySelector(
      ".profile-settings-username-update"
    );
  }

  // Show welcome message
  setWelcomeMessage() {
    fetch("/settings/welcome", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.welcomeUser.textContent = data.username;
      });
  }

  // Edit username and save it
  editUsername() {
    this.editUsernameBtn.addEventListener("click", () => {
      this.editUsernameDiv.classList.add("hide");
      this.saveUsernameDiv.classList.remove("hide");
    });
    this.saveUsernameBtn.addEventListener("click", () => {
      // this.editUsernameDiv.classList.remove("hide");
      // this.saveUsernameDiv.classList.add("hide");
      this.saveUsername(this.usernameInput.value);
    });
  }

  saveUsername(username) {
    fetch("/settings/username", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        newUsername: username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.saveUsernameDiv.classList.add("hide");
        this.editUsernameDiv.classList.remove("hide");
        this.username.textContent = data.username;
      });
  }

  editEmail() {
    this.editEmailBtn.addEventListener("click", () => {
      this.editEmailDiv.classList.add("hide");
      this.saveEmailDiv.classList.remove("hide");
    });
    this.saveEmailBtn.addEventListener("click", () => {
      this.editEmailDiv.classList.remove("hide");
      this.saveEmailDiv.classList.add("hide");
    });
  }

  displayProfileSettings() {
    this.bankFeaturesContainer.classList.toggle("hide");
    this.profileSettingsContainer.classList.toggle("hide");
  }

  fetchData() {
    fetch("/settings/form", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.username.textContent = data.username;
        this.email.textContent = data.email;
      });
  }

  settingsEvent() {
    // open
    this.openProfileSettingsBtn.addEventListener("click", () => {
      this.fetchData();
      this.displayProfileSettings();
    });

    // close
    this.closeProfileSettingsBtn.addEventListener("click", () => {
      this.displayProfileSettings();
      this.setWelcomeMessage();
    });
  }
}
