import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        id,
        files,
        content,
        caption,
        location,
        action,
        deposit,
        money,
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
        selectType,
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
        MLSnumbe
      } = args;
      const { user } = request;
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        if (action === EDIT) {
          if (files) {
            files.forEach(async file =>
              (await prisma.$exists.file({ url: file }))
                ? false
                : await prisma.createFile({
                    url: file,
                    post: {
                      connect: {
                        id
                      }
                    }
                  })
            );
          }
          return prisma.updatePost({
            data: {
              caption,
              content,
              location,
              deposit,
              money,
              airConditioner,
              washer,
              refrigerator,
              internet,
              microwave,
              wifi,
              bed,
              desk,
              selectType,
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
              MLSnumbe
            },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
