import React, { Children } from "react";
import { findAllServiceBookingForm } from "@/app/actions/service";
import { auth } from "@/auth";
import BookingForm from "../component/bookingForm";
import prismadb from "@/lib/prisma";

const Booking = async ({
  params,
  searchParams,
}: {
  params: { serviceId: string }
  searchParams: { priorityStaffId: string | undefined }
}
) => {
  const response = await findAllServiceBookingForm();
  const session = await auth();
  const currentService = await prismadb.service.findFirst({
    where: {
      id: params.serviceId
    },
    include: {
      ServiceCombo: true
    }
  })
  return (
    <div className="h-[calc(100vh-5rem)]">
      <BookingForm
        priorityStaffId={searchParams?.priorityStaffId ? searchParams.priorityStaffId : undefined}
        currentService={currentService ? currentService : null}
        services={response.data} userId={session.user.id} />
    </div>);
};

export default Booking;


