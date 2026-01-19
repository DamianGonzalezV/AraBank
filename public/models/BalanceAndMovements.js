export default class BalanceAndMovements {
  constructor() {
    this.totalBalance = document.querySelector(".account-balance-number");
  }

  fetchBalance(storedUsername, token) {
    // Fetch the balance
    document.addEventListener("DOMContentLoaded", () => {
      if (storedUsername) {
        fetch("/account/balance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response.data);
            this.totalBalance.textContent = `$${String(response.data.totalBalance)}`;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
}
