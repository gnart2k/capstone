"use server"
import prisma_db from "@/lib/prisma";

export async function createNotification(user_id: string, type: string, message: string ) {
    const notification = await prisma_db.notifications.create({
      data: {
          userId: user_id,
          type: type,
          message: message,
          is_read: false,
          created_at: new Date()
      }
    });
    return notification
}