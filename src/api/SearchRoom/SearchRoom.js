import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    searchRoom: async (_, args) => {
      console.log(args, "console");
      const data = await prisma.posts({
        where: {
          AND: [
            {
              AND: [
                {
                  OR: [{ caption_contains: args.caption }]
                },
                {
                  OR: [{ content_contains: args.content }]
                },
                {
                  OR: [{ selectType_contains: args.selectType }]
                },
                {
                  OR: [{ airConditioner: args.airConditioner }]
                },
                { OR: [{ washer: args.washer }] },
                {
                  OR: [{ refrigerator: args.refrigerator }]
                },
                {
                  OR: [{ internet: args.internet }]
                },
                {
                  OR: [{ microwave: args.microwave }]
                },
                {
                  OR: [{ wifi: args.wifi }]
                },
                {
                  OR: [{ bed: args.bed }]
                },
                {
                  OR: [{ desk: args.desk }]
                },
                {
                  OR: [{ induction: args.induction }]
                },
                {
                  OR: [{ gasRange: args.gasRange }]
                },
                {
                  OR: [{ doorLock: args.doorLock }]
                },
                {
                  OR: [{ CCTV: args.CCTV }]
                },
                {
                  OR: [{ pets: args.pets }]
                },
                {
                  OR: [{ elevator: args.elevator }]
                },
                {
                  OR: [{ parking: args.parking }]
                },
                {
                  OR: [{ electricHeating: args.electricHeating }]
                },
                {
                  OR: [{ cityGasHeating: args.cityGasHeating }]
                },
                {
                  OR: [{ nightElectric: args.nightElectric }]
                },
                {
                  OR: [{ wateTax: args.wateTax }]
                },
                {
                  OR: [{ includingElectricity: args.includingElectricity }]
                },
                {
                  OR: [{ cityGasIncluded: args.cityGasIncluded }]
                },
                {
                  OR: [{ numberOfFoors_contains: args.numberOfFoors }]
                },
                { OR: [{ MLSnumber_contains: args.MLSnumber }] }
              ]
            },
            {
              AND: [{ money_gte: args.money }, { money_lte: args.money2 }]
            },
            {
              AND: [
                { deposit_gte: args.deposit },
                { deposit_lte: args.deposit2 }
              ]
            }
          ]
        }
      });
      console.log(data, "data");
      return data;
    }
  }
};
