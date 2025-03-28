import { isUser } from '@/app/lib/checkPermittedRole';
import { zalopayConfig } from '@/app/lib/const'
import { auth } from '@/auth';
import prismadb from '@/lib/prisma';
import axios from 'axios';
import { createHmac } from 'crypto';
import { NextResponse } from 'next/server';

import PayOS from "@payos/node";
type ResponseData = {
  return_code: number;
  return_message: string;
}

type RequestProps = {
  transactionId: string;
  id: number;
  paymentMethod: string;
}

export async function GET(
) {


  const isPermitted = await isUser();
  if (!isPermitted) {
    return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
      status: 403,
    });
  }
  let userRequest: RequestProps[] = []

  const session = await auth();
  try {

    if (session?.user) {
      userRequest = await prismadb.request.findMany({
        where: {
          userId: session.user.id,
          AND: {
            status: {
              equals: "pending"
            },
          }
        },
        select: {
          id: true,
          transactionId: true,
          paymentMethod: true
        }
      })
    }
  } catch (error) {
    return NextResponse.error()
  }

  if (userRequest.length == 0) return NextResponse.json('empty')

  for (let index = 0; index < userRequest.length; index++) {
    if (userRequest[index].paymentMethod == 'payos' && userRequest[index].transactionId) {
      await updatePayOsPaymentStatus({ requestId: userRequest[index].id })
    } else {
      //zalopay
      if (userRequest[index].transactionId == null) {
        await prismadb.request.update({
          where: {
            id: userRequest[index].id
          },
          data: {
            status: "canceled"
          }
        })
      } else {
        const transactionId = userRequest[index].transactionId;
        const res = await paymentRequest({ app_trans_id: transactionId });
        const resJson: ResponseData = await res.json();
        if (resJson.return_code == 1) {
          await prismadb.request.update({
            where: {
              id: userRequest[index].id
            },
            data: {
              status: "paid"
            }
          })
        } else if (resJson.return_code == 2) {
          await prismadb.request.update({
            where: {
              id: userRequest[index].id
            },
            data: {
              status: "canceled"
            }
          })
        }
      }
    }

  }

  return NextResponse.json({ data: userRequest, success: true });
}

const updatePayOsPaymentStatus = async ({ requestId }: { requestId: number }) => {
  const payOS = new PayOS(
    process.env.x_client_id,
    process.env.x_api_key,
    process.env.checksum
  );

  const paymentLink = await payOS.getPaymentLinkInformation(
    requestId
  );
  if (paymentLink?.status == "PAID") {
    await prismadb.request.update({
      where: {
        id: +requestId
      }, data: {
        status: "paid"
      }
    })
    return true;
  } else if (paymentLink?.status == "CANCELLED") {
    await prismadb.request.update({
      where: {
        id: +requestId
      }, data: {
        status: "canceled"
      }
    })
    return true;
  }

}

const paymentRequest = async ({ app_trans_id }: { app_trans_id: string }) => {
  const data = `${zalopayConfig.app_id}|${app_trans_id}|${zalopayConfig.key1}`;
  const mac = createHmac('sha256', zalopayConfig.key1).update(data).digest('hex');
  const post_data = `app_id=${zalopayConfig.app_id}&app_trans_id=${app_trans_id}&mac=${mac}`;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const response = await axios.post('https://sb-openapi.zalopay.vn/v2/query', post_data, { headers });
    const data = await response.data
    const returnValue: ResponseData = {
      return_code: data.return_code,
      return_message: data.return_message
    }

    return NextResponse.json(returnValue ? returnValue : null);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }


}
