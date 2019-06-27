import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    verified: async (_, args) => {
      try {
        const { email } = args;
        const preCheck = await prisma.$exists.user({ email });
        if (preCheck === true) {
          const check = await prisma.user({ email }).verified();
          if (check === true) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
