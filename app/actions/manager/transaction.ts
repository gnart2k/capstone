import { isAdmin } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";
import { TransactionDetail } from "@/type/transaction";
import { format } from "date-fns";

export default async function findTransaction({transactionId} : {transactionId: string }) {
  const isPermitted = await isAdmin();
    if (!isPermitted) {
      return { error: "Bạn không có quyền thực hiện chức năng này" };
    }
    try {
        const data = await prismadb.request.findFirst({
            select: {
              id: true,
              createdAt: true,
              price: true,
              status: true,
              service: {
                select: {
                  serviceName: true,
                }
              },
              user: {
                select: {
                  name: true,
                  image: true,
                }
              },
              phone: true,
              address: {
                select: {
                  specificAddress: true,
                  province: {
                    select:{
                      provinceName: true,
                    }
                  },
                  district: {
                    select: {
                      districtName: true,
                    }
                  },
                  ward: {
                    select: {
                      wardName: true,
                    }
                  }
                }
              },
            },
            where: {
              id: parseInt(transactionId), 
            },
          });
  
          let result: TransactionDetail = {
          transactionId: data.id+ "",
          transactionDate: format(new Date(data.createdAt), "dd/MM/yyyy"),
          amount:data.price,
          status: data.status == "pending" ? "Chưa thanh toán" : "Đã thanh toán",
          transactionType: "Chuyển khoản",
          serviceName: data.service.serviceName,
          customerName: data.user.name,
          address: data.address.specificAddress + ", " + data.address.ward.wardName + ", " + data.address.district.districtName + ", " + data.address.province.provinceName,
          phoneNumber: data.phone,
          customerAvatar: data.user.image
        };
      if (!data) {
        return { error: "Không tìm thấy thông tin request" };
      }
      return { transaction: result };
    } catch (error) {
      return { error: "Đã xảy ra lỗi khi lấy thông tin request" };
    }
  }