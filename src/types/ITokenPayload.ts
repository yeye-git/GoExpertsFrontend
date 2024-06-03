interface ITokenPayload {
  userId: string;
  username: string;
  iat: number;
  exp: number;
  id: string;
  role: string;
}

export default ITokenPayload;
