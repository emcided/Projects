// user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as U } from './schemas/user.schema';

export const UserParam = createParamDecorator<U>(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
