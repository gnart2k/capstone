import { capability } from "@/app/(pages)/admin-page/user-management/components/capabilityStaff";
import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const services = await prismadb.service.findMany({
    select: {
      id: true,
      serviceName: true
    }
  })
  const staffSkill = await prismadb.capabilities.findMany({
    where: {
      userId: params.userId
    }
  })
  const result: capability[] = []
  services.map((item) => {
    const matchedSkill = staffSkill.find((skill) => skill.serviceId === item.id)
    if (matchedSkill) {
      result.push({ id: item.id, name: item.serviceName, isSelected: true })
    } else {
      result.push({ id: item.id, name: item.serviceName, isSelected: false })
    }
  })
  return NextResponse.json(result)
}


