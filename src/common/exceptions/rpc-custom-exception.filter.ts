import { Catch, RpcExceptionFilter, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements RpcExceptionFilter<RpcException> {
    catch(exception: RpcException, host: ArgumentsHost): Observable<any> {

        console.log('Paso por aqui en neustro custom filter');

        // return throwError(() => exception.getError());
        throw new UnauthorizedException('Hola mundo')
    }
}