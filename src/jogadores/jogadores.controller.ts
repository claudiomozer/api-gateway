import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { ClientAdminBackendService } from 'src/common/infrastructure/services/client-admin-backend.service';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

    private readonly clientAdminBackendService: ClientAdminBackendService;

    constructor(clientAdminBackendService: ClientAdminBackendService) {
        this.clientAdminBackendService = clientAdminBackendService;
    }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador (
        @Body() criarJogadorDto: CriarJogadorDto
    ) {
        const { categoria } = criarJogadorDto;
        let categoriaEncontrada = this.clientAdminBackendService.client().send('consultar-categorias', categoria);
        categoriaEncontrada = await lastValueFrom(categoriaEncontrada);
        if ('error' in categoriaEncontrada) {
            throw new BadRequestException('A categoria informada não existe');
        } else {
            this.clientAdminBackendService.client().emit('criar-jogador', criarJogadorDto);
        }
    }

    @Get('/:id')
    consultarJogadorById ( @Param('id', ValidacaoParametrosPipe) id: string ) : Observable<any>
    {
        return this.clientAdminBackendService.client().send('consultar-jogadores', id);
    }

    @Get()
    consultarTodosJogadores () : Observable<any>
    {
        return this.clientAdminBackendService.client().send('consultar-jogadores', '');
    }


    @Put('/:id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Param('id', ValidacaoParametrosPipe) id: string,
        @Body() atualizarJogadorDto: AtualizarJogadorDto
    ) {
        const { categoria } = atualizarJogadorDto;

        let categoriaEncontrada = this.clientAdminBackendService.client().send('consultar-categorias', categoria);
        categoriaEncontrada = await lastValueFrom(categoriaEncontrada);

        if ('error' in categoriaEncontrada) {
            throw new BadRequestException('A categoria informada não existe');
        }

        this.clientAdminBackendService.client().emit('atualizar-jogador', {id, jogador: atualizarJogadorDto});
    }

    @Delete('/:id')
    deletarJogador (@Param('id', ValidacaoParametrosPipe) id: string) {
        this.clientAdminBackendService.client().emit('deletar-jogador', id)
    }
    
}
