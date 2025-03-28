"use server"

import prismadb from "@/lib/prisma";

export async function getNotificationsByUserId(user_id: string, is_read: boolean) {
  const data = await prismadb.notifications.findMany({
    where: {
      userId: user_id,
      is_read: is_read
    },
    orderBy: {
      created_at: "desc"
    }
  });
  return data
}

export async function getAllNotificationsByUserId(user_id: string) {
  const data = await prismadb.notifications.findMany({
    where: {
      userId: user_id
    },
    orderBy: {
      created_at: "desc"
    }
  });
  return data
}

export async function getNotificationsByType(type: string) {
  const data = await prismadb.notifications.findMany({
    where: {
      type: type
    }
  });
  return data
}
