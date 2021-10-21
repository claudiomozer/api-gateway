import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriasController } from './categorias.controller';

@Module({
  imports: [ ConfigModule.forRoot() ],
  providers: [],
  controllers: [CategoriasController]
})
export class CategoriasModule {}
