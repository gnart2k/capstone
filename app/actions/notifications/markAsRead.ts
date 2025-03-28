"use server";
import prismadb from "@/lib/prisma";

export async function updateNotification(user_id: string) {
  await prismadb.notifications.updateMany({
    where: {
      userId: user_id,
      is_read: false,
    },
    data: {
      is_read: true,
    },
  });
}
