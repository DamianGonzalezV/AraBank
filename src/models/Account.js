// import db from "../db.js";
import prisma from "../prismaClient.js";

export default class Account {
  // Bonus for account opening
  static REGISTRATION_BONUS = 100;

  constructor(username, userId) {
    this.username = username;
    this.userId = userId;
    this.balance = null;
  }

  static async getAccountByUserId(userId) {
    const result = await prisma.accounts.findUnique({
      where: {
        userId: userId,
      },
    });
    return result;
  }

  async initializeAccount() {
    await prisma.accounts.create({
      data: {
        userId: this.userId,
        totalBalance: Account.REGISTRATION_BONUS,
      },
    });
  }

  setInitialBalance(accountData) {
    this.balance = accountData.total_balance;
  }
}
