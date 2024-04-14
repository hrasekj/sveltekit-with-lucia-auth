import { alphabet, generateRandomString } from 'oslo/crypto';
import { Argon2id } from 'oslo/password';

export const hashPassword = async (salt: string, password: string) => {
  const argon2id = getArgon2id(salt);
  return argon2id.hash(password);
};

type UserLike = {
  salt: string;
  password: string;
};
export const verifyPassword = async (user: UserLike, password: string) => {
  const argon2id = getArgon2id(user.salt);
  return argon2id.verify(user.password, password);
};

export const generateRandomId = (length = 16) => {
  return generateRandomString(length, alphabet('a-z', 'A-Z', '0-9'));
};

const getArgon2id = (secret: string) => {
  return new Argon2id({
    secret: toArrayBuffer(secret)
  });
};

const toArrayBuffer = (str: string) => {
  const textEncoder = new TextEncoder();
  return textEncoder.encode(str).buffer;
};
