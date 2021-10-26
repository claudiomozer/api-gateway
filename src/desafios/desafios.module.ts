import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientAdminBackendService } from 'src/infrastructure/services/client-admin-backend.service';
import { ClientDesafiosService } from 'src/infrastructure/services/client-desafios.service';
import { DesafiosController } from './desafios.controller';

@Module({
  providers: [ ConfigService, ClientDesafiosService, ClientAdminBackendService ],
  controllers: [DesafiosController]
})
export class DesafiosModule {}
