import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: async (_, args, { context }) => {
      const post = prisma.posts({
        skip: args.skip,
        first: args.first,
        orderBy: "createdAt_DESC"
      });
      const count = prisma
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
