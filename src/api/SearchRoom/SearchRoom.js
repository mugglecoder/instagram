import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    searchRoom: async (_, args) =>
      prisma.posts({
        where: {
          AND: [
            {
              OR: [
                { caption_contains: args.caption },
                { content_contains: args.content },
                { selectType_contains: args.selectType },
                { airConditioner: args.airConditioner },
                { washer: args.washer },
                { refrigerator: args.refrigerator },
                { internet: args.internet },
                { microwave: args.microwave },
                { wifi: args.wifi },
                { bed: args.bed },
                { desk: args.desk },
                { induction: args.induction },
                { gasRange: args.gasRange },
                { doorLock: args.doorLock },
                { CCTV: args.CCTV },
                { pets: args.pets },
                { elevator: args.elevator },
                { parking: args.parking },
                { electricHeating: args.electricHeating },
                { cityGasHeating: args.cityGasHeating },
                { nightElectric: args.nightElectric },
                { wateTax: args.wateTax },
                { includingElectricity: args.includingElectricity },
                { cityGasIncluded: args.cityGasIncluded },
                { numberOfFoors_contains: args.numberOfFoors },
                { MLSnumber_contains: args.MLSnumber }
              ]
            },
            {
              AND: [
                { money_contains: args.money },
                { deposit_contains: args.deposit }
              ]
            }
          ]
        }
      })
  }
};
