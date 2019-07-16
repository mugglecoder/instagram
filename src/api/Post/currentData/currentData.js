import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    currentData: async (_, args) => {
      const { lat, lng, lat2, lng2 } = args;
      await prisma.posts({
        where: {
          AND: [
            { lat_gte: lat },
            { lng_lte: lng },
            { lat2_gte: lat2 },
            { lng2_lte: lng2 }
          ]
        }
      });
    }
  }
};
