import { BadRequestException, Injectable } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { AwsService } from 'src/infrastructure/services/aws.service';
import { ClientAdminBackendService } from 'src/infrastructure/services/client-admin-backend.service';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

@Injectable()
export class JogadoresService
{
    private readonly clientAdminBackendService: ClientAdminBackendService;
    private readonly awsService: AwsService;

    constructor(
        clientAdminBackendService: ClientAdminBackendService,
        awsService: AwsService
    ) {
        this.clientAdminBackendService = clientAdminBackendService;
        this.awsService = awsService;
    }

    async criarJogador ( criarJogadorDto: CriarJogadorDto ) {
        const { categoria } = criarJogadorDto;
        let categoriaEncontrada = this.clientAdminBackendService.client().send('consultar-categorias', categoria);
        categoriaEncontrada = await lastValueFrom(categoriaEncontrada);
        if ('error' in categoriaEncontrada) {
            throw new BadRequestException('A categoria informada não existe');
        } else {
            this.clientAdminBackendService.client().emit('criar-jogador', criarJogadorDto);
        }
    }

    consultarJogadorById ( id: string ) : Observable<any>
    {
        return this.clientAdminBackendService.client().send('consultar-jogadores', id);
    }

    consultarTodosJogadores () : Observable<any>
    {
        return this.clientAdminBackendService.client().send('consultar-jogadores', '');
    }

    async atualizarJogador( id: string, atualizarJogadorDto: AtualizarJogadorDto ) {
        const { categoria } = atualizarJogadorDto;

        let categoriaEncontrada = this.clientAdminBackendService.client().send('consultar-categorias', categoria);
        categoriaEncontrada = await lastValueFrom(categoriaEncontrada);

        if ('error' in categoriaEncontrada) {
            throw new BadRequestException('A categoria informada não existe');
        }

        this.clientAdminBackendService.client().emit('atualizar-jogador', {id, jogador: atualizarJogadorDto});
    }

    async uploadArquivo ( file, id: string
    ){
        let jogador = this.clientAdminBackendService.client().send('consultar-jogadores', id);
        jogador = await lastValueFrom(jogador);

        if ('error' in jogador) {
            throw new BadRequestException('O jogaodor informado não existe');
        }

        const urlFotoJogador = await this.awsService.uploadArquivo(file, id);
        
        const atualizarjogadorDto: AtualizarJogadorDto = {};
        atualizarjogadorDto.urlFotoJogador = urlFotoJogador.url;

        await this.clientAdminBackendService.client().emit('atualizar-jogador', {id, jogador: atualizarjogadorDto});

        return this.clientAdminBackendService.client().send('consultar-jogadores', id);
    }

    deletarJogador ( id: string ) {
        this.clientAdminBackendService.client().emit('deletar-jogador', id)
    }
}
