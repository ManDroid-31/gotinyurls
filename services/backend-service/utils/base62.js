// utils/base62.js
const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const encodeBase62 = (num, length = 4) => {
  let str = "";
  while (num > 0) {
    str = chars[num % 62] + str;
    num = Math.floor(num / 62);
  }

  return str.padStart(length, "0");
};
