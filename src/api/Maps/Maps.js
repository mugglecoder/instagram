import { prisma } from "../../../generated/prisma-client";

export default {
  Place: {
    post: ({ id }) => prisma.place({ id }).post()
  }
};
