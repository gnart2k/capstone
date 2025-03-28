import React, { Children } from "react";
import BookingForm from "./component/bookingForm";
import { findAllServiceBookingForm } from "@/app/actions/service";
import { auth } from "@/auth";
import { GetDefaultAddress } from "@/app/actions/users/GetDefaultAddress";


const Booking = async () => {
  const response = await findAllServiceBookingForm();
  const session = await auth();
  const currentAddress = await GetDefaultAddress({ userId: session?.user?.id }).then(data => data?.data)
  return (
    <div className=" mb-20">
      <BookingForm services={response.data} userId={session.user.id} currentAddress={currentAddress} />
    </div>);
};

export default Booking;

