export default class ProfileSettings {
  constructor() {
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
  }

  displayProfileSettings() {
    this.bankFeaturesContainer.classList.toggle("hide");
    this.profileSettingsContainer.classList.toggle("hide");
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
