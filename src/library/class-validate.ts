import { BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

declare type ClassConstructor<T> = {
  new (...args: any[]): T;
};

export async function valid<T>(
  validateClass: ClassConstructor<T>,
  object: object,
) {
  const res = plainToClass(validateClass, object);
  const errors = await validate(res as object);

  if (errors.length > 0) {
    const constraints = errors[0].constraints;

    const messages = Object.values(constraints);

    throw new BadRequestException({
      message: messages,
      error: 'Bad Request',
      statusCode: 400,
    });
  }
}
