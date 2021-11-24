import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsS3Config } from 'src/infrastructure/services/aws-s3.config';
import { AwsS3Service } from 'src/infrastructure/services/aws-s3.service';
import { ClientAdminBackendService } from 'src/infrastructure/services/client-admin-backend.service';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [ ConfigModule.forRoot() ],
  providers: [ ClientAdminBackendService, AwsS3Service, AwsS3Config, JogadoresService ],
  controllers: [JogadoresController]
})
export class JogadoresModule {}
