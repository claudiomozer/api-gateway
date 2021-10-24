import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsService } from 'src/infrastructure/services/aws.service';
import { ClientAdminBackendService } from 'src/infrastructure/services/client-admin-backend.service';
import { JogadoresController } from './jogadores.controller';

@Module({
  imports: [ ConfigModule.forRoot() ],
  providers: [ ClientAdminBackendService, AwsService ],
  controllers: [JogadoresController]
})
export class JogadoresModule {}
