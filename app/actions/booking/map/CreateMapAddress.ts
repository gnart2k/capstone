import { auth } from "@/auth";
import prismadb from "@/lib/prisma";

type Props = {
  mapLink: string;
  addressText: string;
  latitude: number;
  longitude: number;
}
export async function createMapAddress({ props }: { props: Props }) {
  const session = await auth();
  const newMap = await prismadb.mapAddress.create({
    data: {
      mapLink: props.mapLink,
      addressText: props.addressText,
      lat: props.latitude,
      lng: props.longitude,
      users: {
        create: [
          {
            user: {
              connect: {
                id: session?.user?.id
              }
            }
          }

        ]
      }

    },
  })
  return newMap;
}
