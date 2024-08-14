import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { error } from 'console';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  // send is to send messages and emit is to emit events
  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error)// This error coming of auth-microservice, pipe capture the error propagate from microservice through NATS
      })
    )
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )

  }

  @Get('verify')
  verifyToken() {
    return this.client.send('auth.verify.user', {})
  }
}
