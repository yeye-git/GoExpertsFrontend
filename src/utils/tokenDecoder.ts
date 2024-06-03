import jwt from 'jsonwebtoken';
import ITokenPayload from '../types/ITokenPayload';

/**
 * Decode Json Web Token
 * @param token JWT to be decoded
 * @returns decoded payload
 */
const tokenDecoder = (token: string | null): ITokenPayload => {
  const decoded = jwt.decode(token as string) as ITokenPayload;
  if (!decoded) {
    return {
      userId: '',
      username: '',
      iat: 0,
      exp: 0,
      id: '',
      role: '',
    };
  }

  // 显式转换解码后的结果为 ITokenPayload 类型
  return decoded;
};

export default tokenDecoder;

