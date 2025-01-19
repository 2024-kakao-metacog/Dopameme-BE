export class AccessTokenPayload {
  userId: string;
  nickname: string;
  createdAt: Date;
  tokenType: string;
  iat: number;
  exp: number;
}
