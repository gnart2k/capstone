import { auth } from "@/auth";

export async function isAdmin() {
  const session = await auth();
  return session.user.role.toLowerCase() === "admin"
}

export async function isManager() {
  const session = await auth();
  return session.user.role.toLowerCase() === "manager"
}

export async function isStaff() {
  const session = await auth();
  return session.user.role.toLowerCase() === "staff"
}

export async function isUser() {
  const session = await auth();
  return session.user.role.toLowerCase() === "user"
}

