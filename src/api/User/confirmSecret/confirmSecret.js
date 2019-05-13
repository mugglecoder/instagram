import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      console.log(user);
      if (user.loginSecret === secret) {
        //JWT
        return "TOKEN";
      } else {
        throw Error("비번 조합이 잘못됨");
      }
    }
  }
};
