import { fetchData } from "./fetchData";

export async function handleBookingStatus() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/payment/zalopay/get-order-status`;
  try {
    const response = await fetchData({ url: url, method: "GET" })
    return true
  } catch (error) {
    console.error(error);
    return false;
  }
};

