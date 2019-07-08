import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    detelePost: async (_, args, { request, isAuthenticated }) => {
      const { id } = args;
      await prisma.deletePost({ id });
    }
  }
};
