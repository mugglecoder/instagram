import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    currentData: (_, args) => {
      const { first, skip, lat, lng, lat2, lng2 } = args;
      const post = prisma.posts({
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
      const count = prisma
        .postsConnection({
          where: {
            AND: [
              { lat_gte: lat2 },
              { lat_lte: lat },
              { lng_gte: lng },
              { lng_lte: lng2 }
            ]
          }
        })
        .aggregate()
        .count();
      return { post, count };
    }
  }
};
