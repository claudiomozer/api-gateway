import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { DesafiosModule } from './desafios/desafios.module';
import { RankingsModule } from './rankings/rankings.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ CategoriasModule, JogadoresModule, DesafiosModule, RankingsModule, AuthModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
