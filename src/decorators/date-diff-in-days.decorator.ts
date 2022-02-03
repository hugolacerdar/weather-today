import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DateDiffInDays = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.dateDiffInDays) {
      return null;
    }

    return request.dateDiffInDays;
  },
);
