import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    searchRoom: async (_, args) => {
      const {
        first,
        skip,
        lat,
        lng,
        lat2,
        lng2,
        count,
        count2,
        deposit,
        deposit2,
        money,
        money2,
        caption,
        content,
        files,
        selectType,
        airConditioner,
        washer,
        refrigerator,
        internet,
        microwave,
        wifi,
        bed,
        desk,
        induction,
        gasRange,
        doorLock,
        CCTV,
        pets,
        elevator,
        parking,
        electricHeating,
        cityGasHeating,
        nightElectric,
        wateTax,
        includingElectricity,
        cityGasIncluded,
        numberOfFoors,
        MLSnumber
      } = args;

      //서버 빠르게 해보기

      const post = await prisma.posts({
        skip,
        first,
        orderBy: "createdAt_DESC",
        where: {
          AND: [
            {
              AND: [
                {
                  OR: [{ caption_contains: caption }]
                },
                {
                  OR: [{ content_contains: content }]
                },
                {
                  OR: [{ selectType_contains: selectType }]
                },
                {
                  OR: [{ airConditioner_contains: airConditioner }]
                },
                { OR: [{ washer_contains: washer }] },
                {
                  OR: [{ refrigerator_contains: refrigerator }]
                },
                {
                  OR: [{ internet_contains: internet }]
                },
                {
                  OR: [{ microwave_contains: microwave }]
                },
                {
                  OR: [{ wifi_contains: wifi }]
                },
                {
                  OR: [{ bed_contains: bed }]
                },
                {
                  OR: [{ desk_contains: desk }]
                },
                {
                  OR: [{ induction_contains: induction }]
                },
                {
                  OR: [{ gasRange_contains: gasRange }]
                },
                {
                  OR: [{ doorLock_contains: doorLock }]
                },
                {
                  OR: [{ CCTV_contains: CCTV }]
                },
                {
                  OR: [{ pets_contains: pets }]
                },
                {
                  OR: [{ elevator_contains: elevator }]
                },
                {
                  OR: [{ parking_contains: parking }]
                },
                {
                  OR: [{ electricHeating_contains: electricHeating }]
                },
                {
                  OR: [{ cityGasHeating_contains: cityGasHeating }]
                },
                {
                  OR: [{ nightElectric_contains: nightElectric }]
                },
                {
                  OR: [{ wateTax_contains: wateTax }]
                },
                {
                  OR: [{ includingElectricity_contains: includingElectricity }]
                },
                {
                  OR: [{ cityGasIncluded_contains: cityGasIncluded }]
                },
                {
                  OR: [{ numberOfFoors_contains: numberOfFoors }]
                },
                { OR: [{ MLSnumber_contains: MLSnumber }] }
              ]
            },
            {
              AND: [
                { lat_gte: lat2 },
                { lat_lte: lat },
                { lng_gte: lng },
                { lng_lte: lng2 }
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
      const counts = prisma
        .postsConnection({
          where: {
            AND: [
              { lat_gte: lat2 },
              { lat_lte: lat },
              { lng_gte: lng },
              { lng_lte: lng2 }
            ]
          }
        })
        .aggregate()
        .count();

      return { post, counts };
    }
  }
};
