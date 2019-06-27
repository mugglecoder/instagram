import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    detailPost: async (_, args, { request, isAuthenticated }) => {
      const { id } = args;
      const counter = await prisma.post({ id }).count();
      const plusCount = counter + 1;
      await prisma.updatePost({
        where: { id },
        data: { count: plusCount }
      });
      return await prisma.post({ id });
    }
  }
};
