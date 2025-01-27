import {Injectable} from "@nestjs/common";

@Injectable({})
export class AuthService{

    login():String{
        console.log("I have signed in");
        return "I have signed in";
    }

    signUp():String{
        console.log("I have signed up");
        return "I have signed up";
    }

}