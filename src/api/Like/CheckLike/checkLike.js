import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    checkLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };
      const existingLike = await prisma.$exists.like(filterOptions);

      if (existingLike) {
        return true;
      } else {
        return false;
      }
    }
  }
};
