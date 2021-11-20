import { BadRequestException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientRankingsService } from 'src/infrastructure/services/client-rankings.service';

@Injectable()
export class RankingsService
{
    private readonly clientRankingsService: ClientRankingsService;

    constructor (clientRankingsService: ClientRankingsService)
    {
        this.clientRankingsService = clientRankingsService;
    }

    consultarRankings ( idCategoria: string, dataRef: string ) : Observable<any>
    {
        if (!idCategoria) {
            throw new BadRequestException("O id da Categoria é obrigatório");
        }

        return this.clientRankingsService.client().send('consultar-rankings', {idCategoria, dataRef: (dataRef ? dataRef : '')});
    }

}
