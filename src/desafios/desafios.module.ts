import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientAdminBackendService } from 'src/infrastructure/services/client-admin-backend.service';
import { ClientDesafiosService } from 'src/infrastructure/services/client-desafios.service';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';

@Module({
  providers: [ ConfigService, ClientDesafiosService, ClientAdminBackendService, DesafiosService ],
  controllers: [DesafiosController]
})
export class DesafiosModule {}
