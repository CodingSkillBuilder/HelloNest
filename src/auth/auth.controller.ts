import {Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController{
    // private authService: AuthService;

    constructor(private authService: AuthService){
        // this.authService = authService;

    }

    @Post('signUp')
    signUp():String{
        console.log("I have signed up");
        return this.authService.signUp();
    }


    @Post('signIn')
    signIn():String{
        console.log("I have signed in");
        return this.authService.login();
    }


}