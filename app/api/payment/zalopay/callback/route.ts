import { isUser } from '@/app/lib/checkPermittedRole';
import { zalopayConfig } from '@/app/lib/const'
import { HmacSHA256 } from 'crypto-js';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

type ResponseData = {
  return_code: number;
  return_message: string;
}

type PayLoadType = {
  data: string;
  mac: string
}

export async function POST(
  req: Request,
  res: NextApiResponse<ResponseData>
) {
  const isPermitted = await isUser();
  if (!isPermitted) {
    return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
      status: 403,
    });
  }
  console.log("zalopay callback")
  let result: ResponseData;
  try {
    const data = await req.json()
    let dataStr = data.data;
    let reqMac = data.mac;

    let mac = HmacSHA256(dataStr, zalopayConfig.key2).toString();
    console.log("mac =", mac);

    if (reqMac !== mac) {
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      //@ts-ignore
      let dataJson = JSON.parse(dataStr, zalopayConfig.key2);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    //@ts-ignore
    console.log("lỗi:::" + ex.message);
    result.return_code = 0;
    //@ts-ignore
    result.return_message = ex.message;
  }

  return NextResponse.json(result);

}


