import prismadb from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function GET(
) {
  try {
    const skills = await prismadb.service.findMany({ select: { serviceName: true } });
    const result: string = skills.map(skill => skill.serviceName).join(',').replaceAll(' ', '_')
    console.log([result])
    return NextResponse.json([result]);
  } catch (error) {
    return NextResponse.error();
  }

}


