import { hash } from './crypto';

// To Do: Salting
export async function hashPassword(password: string): Promise<string> {
  return hash(password);
}
