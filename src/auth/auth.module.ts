import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from 'aws-sdk';
import { AwsCognitoConfig } from 'src/infrastructure/services/aws-cognito.config';
import { AwsCognitoService } from 'src/infrastructure/services/aws-cognito.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [ConfigModule.forRoot()],
  providers: [AwsCognitoService, AwsCognitoConfig, ConfigService]
})
export class AuthModule {}
