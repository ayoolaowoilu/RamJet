// lib/simpleCrypto.ts

const SECRET_KEY = "ramjet-cache-key-2024"; // Change this in production

function xorCipher(text: string, key: string): string {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return result;
}

export function encrypt(text: string): string {
  const cipher = xorCipher(text, SECRET_KEY);
  return btoa(cipher);
}

export function decrypt(encrypted: string): string {
  const cipher = atob(encrypted);
  return xorCipher(cipher, SECRET_KEY);
}