export const PAYMENT_URI = "https://api-merchant.payos.vn/v2/payment-requests";
export const CANCEL_URI = `${process.env.NEXT_PUBLIC_API_URL}/status/payment/cancel`;
export const SUCCESS_URI = `${process.env.NEXT_PUBLIC_API_URL}/status/payment/success`;
export const GHN_PROVINCE_URL =
  "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province";
export const GHN_DISTRICT_URL =
  "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district";
export const GHN_WARD_URL =
  "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward";
export const zalopayConfig = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

export const enum requestStatus {
  pending = "pending",
  success = "success",
  confirm = "confirm",
  cancel = "cancel",
  error = "error",
  complete = "complete",
}

export enum UserRole {
  admin = "ADMIN",
  manager = "MANAGER",
  staff = "STAFF",
  user = "USER",
}

export enum UserStatus {
  enabled = "Hoạt động",
  disabled = "Vô hiệu hóa",
}
