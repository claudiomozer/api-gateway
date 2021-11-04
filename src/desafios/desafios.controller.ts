import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { ClientAdminBackendService } from 'src/infrastructure/services/client-admin-backend.service';
import { ClientDesafiosService } from 'src/infrastructure/services/client-desafios.service';
import { AtribuirPartidaDesafioDto } from './dtos/atribuir-partida-desafio.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio-dto';
import { DesafioStatus } from './interfaces/desafio-status.enum';

@Controller('api/v1/desafios')
export class DesafiosController 
{
    private readonly clientAdminBackendService: ClientAdminBackendService;
    private readonly clientDesafiosService: ClientDesafiosService;

    constructor (
        clientAdminBackendService: ClientAdminBackendService,
        clientDesafiosService: ClientDesafiosService
    ) {
        this.clientAdminBackendService = clientAdminBackendService;
        this.clientDesafiosService = clientDesafiosService;
    }

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio (
        @Body() criarDesafioDto: CriarDesafioDto
    ) {
        const { categoria } = criarDesafioDto;
        const { jogadores } = criarDesafioDto;
        const { solicitante } = criarDesafioDto;

        const jogadorSolicitante = jogadores.filter(jogador => {
            return jogador._id === solicitante;
        })
        
        if (!jogadorSolicitante.length) {
            throw new BadRequestException("O Jogador solicitante deve ser um dos jogadores da partida");
        }

        const jogadoresCategoria = jogadores.filter( jogador => {
            return jogador.categoria === categoria;
        });

        if (!jogadoresCategoria || (jogadoresCategoria && (jogadoresCategoria.length < 2))) {
            throw new BadRequestException("Todos os jogadores devem pertencer à categoria informada");
        }

        let categoriaEncontradaOberver = this.clientAdminBackendService.client().send('consultar-categorias', categoria);
        let categoriaEncontrada = await lastValueFrom(categoriaEncontradaOberver);
        if ('error' in categoriaEncontrada) {
            throw new BadRequestException('A categoria informada não existe');
        }

        const jogadoresIds = jogadores.map(jogador => jogador._id);
        
        let jogadoresEncontradosObservable = this.clientAdminBackendService.client().send('consultar-jogadores-ids', jogadoresIds);
        const jogadoresEncontrados = await lastValueFrom(jogadoresEncontradosObservable);
        if ('error' in jogadoresEncontrados) {
            throw new BadRequestException('Nenhum dos jogadores informados existe');
        } else if (jogadoresEncontrados.length !== 2) {
            throw new BadRequestException('Um dos jogadores informados não foi cadastrado');
        }

        criarDesafioDto.categoria = categoriaEncontrada._id;
        this.clientDesafiosService.client().emit('criar-desafio',criarDesafioDto );
    }

    @Get('')
    async consultarDesafios(
        @Query('jogador') jogador: string,
        @Query('id') id: string
    ) {

        if (jogador) {
            let jogadorEncontrado = this.clientAdminBackendService.client().send('consultar-jogadores', jogador);
            jogadorEncontrado = await lastValueFrom(jogadorEncontrado);

            if ('error' in jogadorEncontrado) {
                throw new BadRequestException(`O jogador ${jogador} não foi encontrado`);
            }            
        }
        const payload = {
            jogador: jogador ? jogador : '',
            id: id ? id : ''
        }
        return this.clientDesafiosService.client().send('consultar-desafios', payload);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async atualizarDesafio (
        @Body() atualizarDesafioDto: AtualizarDesafioDto,
        @Param('id', ValidacaoParametrosPipe) id: string
    ) {
        const desafioEncontradoObserver = this.clientDesafiosService.client().send('consultar-desafios', { id });
        const desafioEncontrado = await lastValueFrom(desafioEncontradoObserver);

        console.log(desafioEncontrado)
        if (!desafioEncontrado) {
            throw new NotFoundException(`O desafio ${id} não foi encontrado`);
        }

        if (desafioEncontrado.status !== DesafioStatus.PENDENTE) {
            throw new BadRequestException(`Somente desafios PENDENTES podem ser atualizados`);
        }

        this.clientDesafiosService.client().emit('atualizar-desafio', {id, desafio: atualizarDesafioDto});
    }

    @Delete('/:id')
    async deletarDesafio (
        @Param('id', ValidacaoParametrosPipe) id: string
    ) {
        const desafioEncontradoObserver = this.clientDesafiosService.client().send('consultar-desafios', { id });
        const desafioEncontrado = await lastValueFrom(desafioEncontradoObserver);

        console.log(desafioEncontrado)
        if (!desafioEncontrado) {
            throw new NotFoundException(`O desafio ${id} não foi encontrado`);
        }

        this.clientDesafiosService.client().emit('deletar-desafio', id);
    }

    @Put('/:id/partida')
    @UsePipes(ValidationPipe)
    async atribuirPartidaDesafio (
        @Body() atribuirPartidaDesafioDto: AtribuirPartidaDesafioDto,
        @Param('id', ValidacaoParametrosPipe) id: string
    ) {
        const {def} = atribuirPartidaDesafioDto;
        let jogadorEncontrado = this.clientAdminBackendService.client().send('consultar-jogadores', def._id);
        jogadorEncontrado = await lastValueFrom(jogadorEncontrado);

        if ('error' in jogadorEncontrado) {
            throw new BadRequestException(`O jogador ${def._id} não foi encontrado`);
        }

        // toDo validações que serão possíveis depois de criar o micro-desafios
        this.clientDesafiosService.client().emit('atribuir-partida-desafio', { id, atribuirPartidaDesafioDto});
    }
}
