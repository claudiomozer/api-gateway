import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [ CategoriasModule, JogadoresModule, DesafiosModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
