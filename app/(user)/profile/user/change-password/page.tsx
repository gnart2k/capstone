import React from 'react'
import ChangePasswordBox from './component/changePasswordBox'
import { auth } from '@/auth';
import prismadb from '@/lib/prisma';


export default async function ChangePassword() {

  const session = await auth();
  if (!session || !session.user) {
    // Xử lý khi không có session hoặc người dùng chưa đăng nhập
    return {error: "Bạn cần đăng nhập để thay đổi mật khẩu."};
  }
  const account = await prismadb.account.findFirst({
    where: { userId: session.user.id },
    select: {
      provider: true,
    }
  });
  return (
    <>
      <div>
        <h3 className="mt-8 text-xl font-semibold">Thay đổi mật khẩu của bạn</h3>
        {!account ? (
        <ChangePasswordBox id={session.user.id} />
      ) : (
        <p className="mt-4">Bạn đang đăng nhập bằng Google</p>
      )}
      </div>
    </>
  );

}
