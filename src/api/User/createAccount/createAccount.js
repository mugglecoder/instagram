import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcrypt";

const saltRounds = 12;

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const {
        username,
        password2,
        email,
        firstName = "",
        lastName = "",
        bio = ""
      } = args;
      const exists = await prisma.$exists.user({
        OR: [
          {
            username
          },
          {
            email
          }
        ]
      });
      if (exists) {
        return false;
      }

      const password = await bcrypt.hashSync(password2, saltRounds);

      await prisma.createUser({
        username,
        password,
        email,
        firstName,
        lastName,
        bio
      });
      return true;
    }
  }
};
