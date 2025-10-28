export default class ProfileSettings {
  constructor() {
    this.fetchData();
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
      this.displayProfileSettings();
    });

    // close
    this.closeProfileSettingsBtn.addEventListener("click", () => {
      this.displayProfileSettings();
    });
  }
}
