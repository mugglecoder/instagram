import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: async (_, args, { context }) => {
      const post = await prisma.posts({
        skip: args.skip,
        first: args.first,
        orderBy: "createdAt_DESC"
      });
      const count = await prisma
        .postsConnection()
        .aggregate()
        .count();
      return {
        post,
        count
      };
    }
  }
};
