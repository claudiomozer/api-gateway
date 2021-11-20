import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientRankingsService } from 'src/infrastructure/services/client-rankings.service';
import { RankingsController } from './rankings.controller';
import { RankingsService } from './rankings.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ClientRankingsService, RankingsService],
  controllers: [RankingsController]
})
export class RankingsModule {}
