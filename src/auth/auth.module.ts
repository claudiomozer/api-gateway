import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from 'aws-sdk';
import { AwsCognitoConfig } from 'src/infrastructure/services/aws-cognito.config';
import { AwsCognitoService } from 'src/infrastructure/services/aws-cognito.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({defaultStrategy: 'jwt'})
  ],
  providers: [
    AwsCognitoService,
    AwsCognitoConfig,
    ConfigService,
    JwtStrategy
  ]
})
export class AuthModule {}
