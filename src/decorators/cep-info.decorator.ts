import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CepInfo = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.cepInfo) {
      return null;
    }

    if (data) {
      return request.cepInfo[data];
    }

    return request.cepInfo;
  },
);
