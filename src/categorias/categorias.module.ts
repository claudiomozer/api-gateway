import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientAdminBackendService } from 'src/infrastructure/services/client-admin-backend.service';
import { CategoriasController } from './categorias.controller';

@Module({
  imports: [ ConfigModule.forRoot() ],
  providers: [ ClientAdminBackendService ],
  controllers: [CategoriasController]
})
export class CategoriasModule {}
