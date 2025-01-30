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


    async login(dto: AuthDto){

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.username,
            },
        });

        if (!user){
            throw new ForbiddenException("Credentials incorrect");
        }


        const matched = await argon.verify(user.hash, dto.password);

        if (!matched) {
            throw new ForbiddenException("Credentials incorrect ");
        }

        // delete user.hash;


        const {hash, ...safeUser} = user;

        return safeUser;
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