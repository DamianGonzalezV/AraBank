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

  static async findById(id) {
    const unique = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    return unique;
  }

  static async editUsername(id, newUsername) {
    const result = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        username: newUsername,
      },
    });
    return result;
  }
}
