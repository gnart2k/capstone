import { auth } from "@/auth";
import prismadb from "@/lib/prisma";
import { GenerateStaffSchema } from "@/schema";
import { GeneratedStaffType } from "@/type/generateStaff";
import { GeneratedStaffResponse } from "@/type/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { isAdmin } from "@/app/lib/checkPermittedRole";

export async function POST(req: Request) {
  try {

    const isPermitted = await isAdmin();
    if (!isPermitted) {
      return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
        status: 403,
      });
    }
    const body: GeneratedStaffType[] = await req.json();
    const validData = GenerateStaffSchema.safeParse(body);
    if (!validData.success) {
      console.log(validData?.error)
      return NextResponse.json({ success: false, message: "Dữ liệu đầu vào sai, vui lòng thử lại" });
    }
    const session = await auth();
    if (session?.user?.role.toLowerCase() !== 'admin') {
      console.log(body)
      return NextResponse.json({ message: 'Unauthorized' })
    }

    const result: GeneratedStaffResponse[] = [];

    for (const data of body) {
      const foundUser = await prismadb.user.findFirst({ where: { email: data.email } })
      if (foundUser) {
        return NextResponse.json({ success: false, message: `Email ${foundUser.email} đã tồn tại` });
      }
      let skillId: string;
      const skillConverted = data.skills.replaceAll("_", " ");
      console.log(skillConverted)
      const foundSkill = await prismadb.service.findFirst({
        where: {
          serviceName: {
            equals: skillConverted,
          },
        },
      });

      console.log(foundSkill)

      skillId = foundSkill?.id;
      if (skillId === undefined) {
        return NextResponse.json({ success: false, message: "Sai tên kỹ năng của nhân viên" });
      }

      const foundRole = await prismadb.role.findFirst({
        where: {
          roleName: {
            equals: data.role,
          },
        },
      });
      if (!foundRole) return NextResponse.json({ success: false, message: "Sai vai trò của người dùng" });
      const roleId = foundRole.id;

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const newStaff = await prismadb.user.create({
        data: {
          email: data.email,
          phone: data.phone,
          password: hashedPassword,
          name: data.name,
          role: {
            connect: {
              id: roleId,
            },
          },
          emailVerified: new Date(Date.now()),
          capabilities: {
            create: {
              Service: {
                connect: {
                  id: skillId,
                },
              },
            },
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          role: {
            select: {
              roleName: true,
            },
          },
          createdAt: true,
          status: true,
          capabilities: {
            select: {
              Service: {
                select: {
                  serviceName: true,
                },
              },
            },
          },
        },
      });

      const skills = newStaff.capabilities.map(skill => skill.Service.serviceName)
      result.push({ id: newStaff.id, role: newStaff.role.roleName, email: newStaff.email, userName: newStaff.name, userAvatar: newStaff.image, createdAt: newStaff.createdAt.toLocaleDateString(), status: newStaff.status.toString(), skills: skills, password: data.password, name: newStaff.name })
    }

    //   export type UserType = {
    //   id: string;
    //   userName: string;
    //   userAvatar: string;
    //   email: string;
    //   role: string;
    //   createdAt: String;
    //   status: string
    // }
    //
    //
    // export type GeneratedStaffResponse = UserType & { skills: string[], password: string, name: string }
    //

    return NextResponse.json({ message: "Tạo nhân viên thành công", success: true });
    // return NextResponse.json({ string: "fsd" })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Tạo nhân viên thất bại", success: false });
  }
}
