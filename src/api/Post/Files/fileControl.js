import { prisma } from "../../../../generated/prisma-client";
import isAuthenticated from "../../../middlewares";

export default {
  Mutation: {
    deleteFile: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, url } = args;
      const postOf = await prisma.post({ id }).files();
      console.log(postOf);
      const it = postOf.map(async item => {
        console.log(item.url, "item url----");
        console.log(url, "url+++++");
        if (String(item.url.includes(url))) {
          console.log("onthe1");
          await prisma.deleteFile({ id: item.id });
          return false;
        } else {
          console.log("off");
        }
      });
    }
  }
};
