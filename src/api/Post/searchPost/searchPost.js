import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) =>
      prisma.posts({
        where: {
          OR: [
            { location_starts_with: args.term },
            { deposit_contains: args.deposit },
            { caption_starts_with: args.term }
          ]
        }
      })
  }
};
