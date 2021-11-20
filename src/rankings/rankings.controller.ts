import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientRankingsService } from 'src/infrastructure/services/client-rankings.service';
import { RankingsService } from './rankings.service';

@Controller('api/v1/rankings')
export class RankingsController
{

    private readonly rankingsService: RankingsService;

    constructor (rankingsService: RankingsService)
    {
        this.rankingsService = rankingsService;
    }

    @Get()
    consultarRankings (
        @Query('idCategoria') idCategoria: string,
        @Query('dataRef') dataRef: string
    ) : Observable<any>
    {
        return this.rankingsService.consultarRankings(idCategoria, dataRef);
    }

}
