import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { lastValueFrom, Observable } from 'rxjs';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { AwsService } from 'src/infrastructure/services/aws.service';
import { ClientAdminBackendService } from 'src/infrastructure/services/client-admin-backend.service';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

    private readonly clientAdminBackendService: ClientAdminBackendService;
    private readonly awsService: AwsService;

    constructor(
        clientAdminBackendService: ClientAdminBackendService,
        awsService: AwsService
    ) {
        this.clientAdminBackendService = clientAdminBackendService;
        this.awsService = awsService;
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

    @Post('/:id/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadArquivo (
        @UploadedFile() file,
        @Param('id') id: string
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

    @Delete('/:id')
    deletarJogador (@Param('id', ValidacaoParametrosPipe) id: string) {
        this.clientAdminBackendService.client().emit('deletar-jogador', id)
    }
    
}
