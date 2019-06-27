import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __) => {
      return await prisma.posts({ first: 12, orderBy: "createdAt_DESC" });
    }
  }
};
