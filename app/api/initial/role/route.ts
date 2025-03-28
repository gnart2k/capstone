import prismadb from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function GET(
) {
  try {
    const roles = await prismadb.role.findMany({ select: { roleName: true } });
    const result: string = roles.map(role => role.roleName).join(', ')
    return NextResponse.json([result]);
  } catch (error) {
    return NextResponse.error();
  }

}

