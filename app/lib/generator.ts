import * as CryptoJS from 'crypto-js';

export function generateRandomUsername() {
  const length = 8; // Length of the random username
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Characters to choose from
  let username = "user@";

  // Generate random characters to form the username
  for (let i = 0; i < length; i++) {
    username += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );

  }

  return username;
}

export type GenerateSignatureProps = {
  amount: string;
  cancelUrl: string;
  description: string;
  orderCode: string;
  returnUrl: string;
};

export function generateSignature(params: { [key: string]: string }, checksumKey: string): string {
  const sortedKeys = Object.keys(params).sort();

  const data = sortedKeys.map(key => `${key}=${params[key]}`).join('&');

  const signature = CryptoJS.HmacSHA256(data, checksumKey).toString(CryptoJS.enc.Hex);

  return signature;
}


