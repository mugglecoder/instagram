import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    nextBoard: async (_, __) => {
      const nowPost = await prisma.posts({ first: 2 }).id();
      console.log(nowPost[1].id);
      return await prisma.posts({ first: 3, after: nowPost[1].id });
    }
  }
};

// 다음 10개의 게시물 보여주기
