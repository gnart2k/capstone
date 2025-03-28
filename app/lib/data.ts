import { auth } from "@/auth"
import prismadb from "@/lib/prisma"

export const getUserByEmail = async (email: string) => {
  try {
    return await prismadb.user.findUnique({
      where: {
        email: email
      }
    })
  } catch (err) {
    return null
  }
}


export const getUserById = async (id: string) => {
  try {

    return await prismadb.user.findUnique({
      where: {
        id: id
      },
      include: {
        role: true
      }
    })
  } catch (err) {
    return null
  }
}

