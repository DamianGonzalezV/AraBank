import prisma from "../prismaClient.js";
export default class Settings {
  constructor() {}

  static async unique(username) {
    const unique = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    return unique;
  }

  static async editUsername(id, username, newUsername) {
    const result = await prisma.users.update({
      where: {
        id: id,
        username: username,
      },
      data: {
        username: newUsername,
      },
    });
    return result;
  }
}
