import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientRankingsService } from 'src/infrastructure/services/client-rankings.service';
import { RankingsController } from './rankings.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ClientRankingsService],
  controllers: [RankingsController]
})
export class RankingsModule {}
