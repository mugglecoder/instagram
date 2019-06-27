import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    checkPassword: async (_, args) => {
      const { email, password2 } = args;
      const userPasswordHash = await prisma.user({ email }).password();
      if (userPasswordHash === null) {
        return false;
      }
      const match = await bcrypt.compare(password2, userPasswordHash);
      if (match) {
        return true;
      } else {
        return false;
      }
    }
  }
};
