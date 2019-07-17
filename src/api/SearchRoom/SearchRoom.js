import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    searchRoom: async (_, args) => {
      const { lat, lng, lat2, lng2 } = args;
      const placeId = prisma.posts({
        where: {
          AND: [
            { lat_gte: lat2 },
            { lat_lte: lat },
            { lng_gte: lng },
            { lng_lte: lng2 }
          ]
        }
      });
      console.log(placeId, "placeId");
      const data = prisma.posts({
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
                  OR: [{ airConditioner_contains: args.airConditioner }]
                },
                { OR: [{ washer_contains: args.washer }] },
                {
                  OR: [{ refrigerator_contains: args.refrigerator }]
                },
                {
                  OR: [{ internet_contains: args.internet }]
                },
                {
                  OR: [{ microwave_contains: args.microwave }]
                },
                {
                  OR: [{ wifi_contains: args.wifi }]
                },
                {
                  OR: [{ bed_contains: args.bed }]
                },
                {
                  OR: [{ desk_contains: args.desk }]
                },
                {
                  OR: [{ induction_contains: args.induction }]
                },
                {
                  OR: [{ gasRange_contains: args.gasRange }]
                },
                {
                  OR: [{ doorLock_contains: args.doorLock }]
                },
                {
                  OR: [{ CCTV_contains: args.CCTV }]
                },
                {
                  OR: [{ pets_contains: args.pets }]
                },
                {
                  OR: [{ elevator_contains: args.elevator }]
                },
                {
                  OR: [{ parking_contains: args.parking }]
                },
                {
                  OR: [{ electricHeating_contains: args.electricHeating }]
                },
                {
                  OR: [{ cityGasHeating_contains: args.cityGasHeating }]
                },
                {
                  OR: [{ nightElectric_contains: args.nightElectric }]
                },
                {
                  OR: [{ wateTax_contains: args.wateTax }]
                },
                {
                  OR: [
                    { includingElectricity_contains: args.includingElectricity }
                  ]
                },
                {
                  OR: [{ cityGasIncluded_contains: args.cityGasIncluded }]
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
      return data;
    }
  }
};
