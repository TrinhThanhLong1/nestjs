import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from 'src/configs/database/database.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserController } from './user.controller';
import { UserProvider } from './user.provider';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtStrategy, ...UserProvider],
  exports: [UserService],
})
export class UserModule { }
