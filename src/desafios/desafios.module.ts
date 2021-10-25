import { Module } from '@nestjs/common';
import { ClientAdminBackendService } from 'src/infrastructure/services/client-admin-backend.service';
import { ClientDesafiosService } from 'src/infrastructure/services/client-desafios.service';
import { DesafiosController } from './desafios.controller';

@Module({
  providers: [ ClientDesafiosService, ClientAdminBackendService ],
  controllers: [DesafiosController]
})
export class DesafiosModule {}
