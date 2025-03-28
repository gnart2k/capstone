"use server"

import { UserRole } from "@/app/lib/const"
import prismadb from "@/lib/prisma"

export async function getNumberOfUserData(){
    const amountCustomer = await prismadb.user.count({
        where: {
          role: {
            roleName: UserRole.user
          }
        }
      }) 

    const amountStaff = await prismadb.user.count({
        where: {
            role: {
                roleName: UserRole.staff
            }
        }
    })

    const amountManager = await prismadb.user.count({
        where: {
            role: {
                roleName: UserRole.manager
            }
        }
    })

    const amountAdmin = await prismadb.user.count({
        where: {
            role: {
                roleName: UserRole.admin
            }
        }
    })

    const amountUser = await prismadb.user.count()
    
    const data = [
        {
            title: "Tổng số Quản trị viên",
            amount: amountAdmin
        },
        {
            title: "Tổng số Quản lý",
            amount: amountManager
        },
        {
            title: "Tổng số Nhân viên",
            amount: amountStaff
        },
        {
            title: "Tổng số Khách hàng",
            amount: amountCustomer
        },
        {
            title: "Tổng số người dùng hệ thống",
            amount: amountUser
        }
    ]
    return { data: data }
}