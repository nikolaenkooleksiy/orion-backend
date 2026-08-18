import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { type Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    let request = ctx.switchToHttp().getRequest<Request>();

    if (!request || !request.headers) {
      const gqlCtx = GqlExecutionContext.create(ctx);
      request = gqlCtx.getContext<{ req: Request }>().req;
    }

    const user = request?.user;

    if (!user) {
      throw new UnauthorizedException('User not found in request');
    }

    return user;
  },
);
