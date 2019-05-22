import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, arg, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      if (roomId === undefined) {
        room = await prisma.createRoom({
          participants: {
            connect: [{ id: toId }, { id: user.id }]
          }
        });
      } else {
        room = await prisma.room({ id: roomId });
      }
      if (!room) {
        throw Error("can't find room");
      }
      const newMessage = await prisma.createMessages();
    }
  }
};
