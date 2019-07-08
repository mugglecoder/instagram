import { prisma } from "../../../../generated/prisma-client";
import isAuthenticated from "../../../middlewares";

export default {
  Mutation: {
    deleteManyFiles: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, url, fileId } = args;
      console.log(url, "이거 안되나 url");
      const result = await prisma.deleteManyFiles({
        AND: [{ url_in: url }, { id_in: fileId }]
      });
      console.log(result, "remove file result");
    }
  }
};
