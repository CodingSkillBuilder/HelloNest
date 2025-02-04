import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private prisma: PrismaService,
    configService: ConfigService,
  ) {
    const jwtSecret = configService.get('JWT_SECRET'); // Needs to be debugged...
    // if (!jwtSecret) {
    //   console.log('JWT_SECRET not set');
    //   throw new Error('JWT_SECRET not set');
    // }
    console.log('Log Secret ', jwtSecret);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
      // secretOrKey: "",
    });
  }

  async validate(payload: { sub: number; email: string }) {
    console.log(payload);

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new Error('Error finding the user');
    }

    const { hash: string, ...safeUser } = user;

    return safeUser;

    // return { userId: payload.sub, email: payload.email };
  }
}

// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// // import { jwtConstants } from './constants';
//
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor() {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: "jwtConstants.secret,"
//         });
//     }
//
//     async validate(payload: any) {
//         return { userId: payload.sub, username: payload.username };
//     }
// }
