import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args, { request }) => {
      const { user } = request;
      const { id } = args;
      return prisma.user({ id });
    }
  }
};
