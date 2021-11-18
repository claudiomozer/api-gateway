import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientRankingsService } from 'src/infrastructure/services/client-rankings.service';

@Controller('api/v1/rankings')
export class RankingsController
{

    private readonly clientRankingsService: ClientRankingsService;

    constructor (clientRankingsService: ClientRankingsService)
    {
        this.clientRankingsService = clientRankingsService;
    }

    @Get()
    consultarRankings (
        @Query('idCategoria') idCategoria: string,
        @Query('dataRef') dataRef: string
    ) : Observable<any>
    {
        if (!idCategoria) {
            throw new BadRequestException("O id da Categoria é obrigatório");
        }

        return this.clientRankingsService.client().send('consultar-rankings', {idCategoria, dataRef: (dataRef ? dataRef : '')});
    }

}
