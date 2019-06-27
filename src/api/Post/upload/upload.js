import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        selectType,
        deposit,
        money,
        caption,
        files,
        content,
        airConditioner,
        washer,
        refrigerator,
        internet,
        microwave,
        wifi,
        bed,
        desk,
        induction,
        gasRange,
        doorLock,
        CCTV,
        pets,
        elevator,
        parking,
        numberOfFoors,
        electricHeating,
        cityGasHeating,
        nightElectric,
        wateTax,
        includingElectricity,
        cityGasIncluded,
        MLSnumber
      } = args;
      const post = await prisma.createPost({
        selectType,
        deposit,
        money,
        caption,
        content,
        airConditioner,
        washer,
        refrigerator,
        internet,
        microwave,
        wifi,
        bed,
        desk,
        induction,
        gasRange,
        doorLock,
        CCTV,
        pets,
        elevator,
        parking,
        numberOfFoors,
        electricHeating,
        cityGasHeating,
        nightElectric,
        wateTax,
        includingElectricity,
        cityGasIncluded,
        MLSnumber,
        user: { connect: { id: user.id } }
      });
      if (files) {
        files.forEach(
          async file =>
            await prisma.createFile({
              url: file,
              post: {
                connect: {
                  id: post.id
                }
              }
            })
        );
      }
      return post;
    }
  }
};
