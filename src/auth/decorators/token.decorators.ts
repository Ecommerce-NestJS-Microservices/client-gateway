import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const Token = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {

        // can you get the token from the headers or of anywhere
        const request = ctx.switchToHttp().getRequest();

        // we can get the request.token 
        if (!request.token) {
            throw new InternalServerErrorException('Token not found in request (AuthGuard called?)')
        }

        return request.token;

    },
);