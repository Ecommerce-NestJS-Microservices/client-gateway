import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
//  import { JwtService } from '@nestjs/jwt'; client-gateway will not verify the state of the authentication
//  import { jwtConstants } from './constants'; we don't have got the const here.
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Injectable()
export class AuthGuard implements CanActivate {
    //constructor(private jwtService: JwtService) {} we don't need inject jwtService. It's when we use with app that it make all. monolithic


    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) { }



    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('token not found');// here, We stay in client-gateway(client-http) since we can send Unaut... and this throw 401 unauthorize
        }
        try {
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            // when I'll ask petition to my microservice I'm going to generate a new token to extend his life to anyone call this petition

            const { user, token: newToken } = await firstValueFrom(
                this.client.send('auth.verify.user',token)
            )

            request['user'] = user
            request['token'] = newToken;
           // {
                // id: 1,
                // name: 'cesar',
                // email: 'cesar@google.com'// this is come from our microservices
            //}
            // I'm going to generate a new token and I'll put in the request.
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}


// try {
//     // we have not verify still
//     // const payload = await this.jwtService.verifyAsync(
//     //     token,
//     //     {
//     //         secret: jwtConstants.secret
//     //     }
//     // );
//     // 💡 We're assigning the payload to the request object here
//     // so that we can access it in our route handlers
//     // when I'll ask petition to my microservice I'm going to generate a new token to extend his life to anyone call this petition
//     request['user'] = {
//         id: 1,
//         name: 'cesar',
//         email: 'cesar@google.com'// this is come from our microservices
//     }
//     // I'm going to generate a new token and I'll put in the request.
//     request['token'] = token;
// } catch {
//     throw new UnauthorizedException();
// }
// return true;