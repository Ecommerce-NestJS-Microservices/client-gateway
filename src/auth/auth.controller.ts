import { ClientProxy } from '@nestjs/microservices';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { CreateUserDto } from './dto/';


@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  // send is to send messages and emit is to emit events
  @Post('register')
  registerUser() {
    return this.client.send('auth.register.user', {})
  }

  @Post('login')
  loginUser() {
    return this.client.send('auth.login.user', {}
    )
  }

  @Get('verify')
  verifyToken() {
    return this.client.send('auth.verify.user', {})
  }
}
