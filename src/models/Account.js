import db from "../db.js";

export default class Account {
  constructor(username, userId) {
    this.username = username;
    this.userId = userId;
    this.balance = null;
  }

  initializeAccount() {
    const prepareUserId = db.prepare(
      `INSERT INTO accounts(user_id, total_balance) VALUES(?, ?)`
    );
    // set registration bonus to $100
    prepareUserId.run(this.userId, 100);
  }

  setInitialBalance(accountData) {
    this.balance = accountData.total_balance;
  }

  getDataByUserId() {
    const prepareAccount = db.prepare(
      `SELECT * FROM accounts WHERE user_id = ?`
    );
    return prepareAccount.get(this.userId);
  }
}
