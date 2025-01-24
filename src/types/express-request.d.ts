import 'express';

declare global {
  namespace Express {
    interface Request {
      isTokenExpired?: boolean;
    }
  }
}
