export class RefreshTokenPayload {
  userId: string;
  nickname: string;
  createdAt: Date;
  tokenType: string;
  iat: number;
  exp: number;
}
