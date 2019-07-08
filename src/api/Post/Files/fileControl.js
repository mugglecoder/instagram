import { prisma } from "../../../../generated/prisma-client";
import isAuthenticated from "../../../middlewares";

export default {
  Mutation: {
    deleteManyFiles: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, url, fileId } = args;
      const result = await prisma.deleteManyFiles({
        AND: [{ url_in: url }, { id_in: fileId }]
      });
    }
  }
};
