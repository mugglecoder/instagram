import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __, { request }) => {
      return await prisma.posts({ first: 9, orderBy: "createdAt_DESC" });
    }
  }
};
