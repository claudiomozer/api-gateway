import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { DesafiosService } from './desafios.service';
import { AtribuirPartidaDesafioDto } from './dtos/atribuir-partida-desafio.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio-dto';

@Controller('api/v1/desafios')
export class DesafiosController 
{
    private readonly desafiosService: DesafiosService;
    constructor (desafiosService: DesafiosService) {
        this.desafiosService = desafiosService;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio (
        @Body() criarDesafioDto: CriarDesafioDto
    ) {
        this.desafiosService.criarDesafio(criarDesafioDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('')
    async consultarDesafios(
        @Query('jogador') jogador: string,
        @Query('id') id: string
    ) {
        return this.desafiosService.consultarDesafios(jogador, id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    @UsePipes(ValidationPipe)
    async atualizarDesafio (
        @Body() atualizarDesafioDto: AtualizarDesafioDto,
        @Param('id', ValidacaoParametrosPipe) id: string
    ) {
        this.desafiosService.atualizarDesafio(atualizarDesafioDto, id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async deletarDesafio (
        @Param('id', ValidacaoParametrosPipe) id: string
    ) {
        this.deletarDesafio(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id/partida')
    @UsePipes(ValidationPipe)
    async atribuirPartidaDesafio (
        @Body() atribuirPartidaDesafioDto: AtribuirPartidaDesafioDto,
        @Param('id', ValidacaoParametrosPipe) id: string
    ) {
        this.desafiosService.atribuirPartidaDesafio(atribuirPartidaDesafioDto, id);
    }
}
