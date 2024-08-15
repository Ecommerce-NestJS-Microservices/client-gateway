import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { error } from 'console';
import { AuthGuard } from './guards/auth-guard';
import { User } from './decorators';
import { CurrentUserInterface } from './interfaces/current-user.interface';
import { Token } from './decorators';

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


  @UseGuards(AuthGuard)
  @Get('verify')
  //verifyToken(@Req() req) {
  verifyToken(@User() user: CurrentUserInterface, @Token() token: string) {

    //const user = req['user'];
    //const token = req['token'];


    //console.log(req.headers);
    //return this.client.send('auth.verify.user', {})
    return {user, token }
  }
}

// El AuthGuard se encarga de la lógica de autenticación y autorización, 
// incluyendo la configuración del usuario en el objeto de solicitud.
// El decorador @User() simplemente accede a la información del usuario
//  que el AuthGuard ha configurado.Ambos trabajan juntos, pero no necesitan 
//  interacciones directas en su código.