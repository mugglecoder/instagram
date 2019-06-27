import { generateSecret, sendSecretMail, generateToken } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      const user = await prisma.user({ email });
      const checkVerify = await prisma.user({ email }).verified();
      if (checkVerify === true) {
        return generateToken(user.id);
      }
      try {
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return "ok";
      } catch (e) {
        console.log(e);
        return "no";
      }
    }
  }
};
