import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    currentData: async (_, args) => {
      const { first, skip, lat, lng, lat2, lng2 } = args;
      const post = await prisma.posts({
        skip,
        first,
        orderBy: "createdAt_DESC",
        where: {
          AND: [
            { lat_gte: lat2 },
            { lat_lte: lat },
            { lng_gte: lng },
            { lng_lte: lng2 }
          ]
        }
      });
      const count = await prisma
        .postsConnection()
        .aggregate()
        .count();
      console.log(count, post);
      return { post, count };
    }
  }
};
