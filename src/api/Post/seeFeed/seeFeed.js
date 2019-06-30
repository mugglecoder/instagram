import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __, { request }) => {
      return await prisma.posts({ orderBy: "createdAt_DESC" });
    }
  }
};
