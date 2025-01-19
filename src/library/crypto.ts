import { createHash } from 'crypto';

export async function hash(
  password: string,
  algorithm: string = 'sha-256',
): Promise<string> {
  return createHash(algorithm).update(password).digest('hex');
}
