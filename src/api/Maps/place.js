import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    place: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, lat, lng } = args;
      const createPlace = await prisma.createPlace({
        lat,
        lng,
        post: { connect: { id } }
      });
      return createPlace;
    }
  }
};
