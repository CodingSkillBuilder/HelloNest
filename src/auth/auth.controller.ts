import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './AuthDTO';

@Controller('auth')
export class AuthController {
  // private authService: AuthService;

  constructor(private authService: AuthService) {
    // this.authService = authService;
  }

  @Post('signUp')
  signUp(@Body() dto: AuthDto) {
    console.log({
      dto,
    });
    // console.log(req.body);
    return this.authService.signUp(dto);
  }

  // @Post('signUp')
  // signUp(@Body('username') email: string,
  //        @Body('password') password: string):String{
  //
  //     console.log({
  //         email,
  //         typeOfEmail: typeof email,
  //         password,
  //         typeOfPassword: typeof password
  //     })
  //
  //
  //     // console.log(req.body);
  //     return this.authService.signUp();
  // }

  @Post('signIn')
  signIn(@Body() dto: AuthDto) {
    console.log('I have signed in');
    return this.authService.login(dto);
  }
}
