import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    nextBoard: async (_, args) => {
      const firsts = await prisma.posts({
        orderBy: "createdAt_DESC"
      });
      console.log(firsts);
      const post = await prisma.posts({
        first: args.first,
        skip: args.skip
      });
      const count = await prisma
        .postsConnection()
        .aggregate()
        .count();
      return { post, count };
    }
  }
};

// 다음 10개의 게시물 보여주기
