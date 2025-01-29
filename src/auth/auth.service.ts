import {ForbiddenException, Injectable} from "@nestjs/common";
import {user} from "@prisma/client";
import {Bookmark} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";
import * as argon from "argon2";
import {AuthDto} from "./AuthDTO";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

@Injectable({})
export class AuthService{

    constructor(private prisma: PrismaService){}


    login(dto: AuthDto):string{
        console.log("I have signed in");
        return "I have signed in";
    }

    async signUp(dto: AuthDto){

        try {
            const hash = await argon.hash(dto.password);

            const user = await this.prisma.user.create({
                data: {
                    email: dto.username,
                    hash
                },

                select: {
                    firstName: true,
                    email: true,
                    createdAt: true
                }
            })


            console.log("I have signed up");
            return user;
        }catch (error){
            if (error instanceof PrismaClientKnownRequestError){
                if (error.code === 'P2002'){
                    throw new ForbiddenException("Credentials taken");
                }
            }
            throw error;
        }
    }

}