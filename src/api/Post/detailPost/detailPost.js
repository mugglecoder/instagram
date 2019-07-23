import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    detailPost: async (_, args, { request, isAuthenticated }) => {
      const { id } = args;
      const counter = prisma.post({ id }).count();
      const plusCount = counter + 1;
      prisma.updatePost({
        where: { id },
        data: { count: plusCount }
      });
      return prisma.post({ id });
    }
  }
};
