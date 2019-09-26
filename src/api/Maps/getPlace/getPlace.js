import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    getPlace: async (_, args) => {
      const { lat, lng } = args;
      const place = await prisma.places({
        orderBy: "createdAt_DESC",
        where: {
          AND: [
            {
              AND: [
                { lat_gte: lat - 0.001516634371 },
                { lat_lte: lat + 0.0020903087423 },
                { lng_gte: lng - 0.00551462173462 },
                { lng_lte: lng + 0.0058364868164 }
              ]
            }
          ]
        }
      });
      return place;
    }
  }
};
