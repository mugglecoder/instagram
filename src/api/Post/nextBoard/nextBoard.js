import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    nextBoard: async (_, args) => {
      const firsts = await prisma.posts({
        orderBy: "createdAt_DESC"
      });
      console.log(firsts);
      const post = prisma.posts({
        first: args.first,
        after: firsts[firsts.length - 1].id
      });
      const count = prisma
        .postsConnection()
        .aggregate()
        .count();
      return { post, count };
    }
  }
};

// 다음 10개의 게시물 보여주기
