import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    currentData: async (_, args) => {
      const { lat, lng, lat2, lng2 } = args;
      const placeId = prisma.posts({
        where: {
          AND: [
            { lat_gte: lat2 },
            { lat_lte: lat },
            { lng_gte: lng },
            { lng_lte: lng2 }
          ]
        }
      });
      console.log(placeId);
      return placeId;
    }
  }
};
