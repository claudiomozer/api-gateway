import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientAdminBackendService } from 'src/common/infrastructure/services/client-admin-backend.service';
import { JogadoresController } from './jogadores.controller';

@Module({
  imports: [ ConfigModule.forRoot() ],
  providers: [ ClientAdminBackendService ],
  controllers: [JogadoresController]
})
export class JogadoresModule {}
