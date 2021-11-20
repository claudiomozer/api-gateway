import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    private readonly jogadoresService: JogadoresService;

    constructor( jogadoresService: JogadoresService ) {
        this.jogadoresService = jogadoresService;
    }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador (
        @Body() criarJogadorDto: CriarJogadorDto
    ) {
        this.jogadoresService.criarJogador(criarJogadorDto);
    }

    @Get('/:id')
    consultarJogadorById ( @Param('id', ValidacaoParametrosPipe) id: string ) : Observable<any>
    {
        return this.jogadoresService.consultarJogadorById(id);
    }

    @Get()
    consultarTodosJogadores () : Observable<any>
    {
        return this.jogadoresService.consultarTodosJogadores();
    }


    @Put('/:id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Param('id', ValidacaoParametrosPipe) id: string,
        @Body() atualizarJogadorDto: AtualizarJogadorDto
    ) {
        this.jogadoresService.atualizarJogador(id, atualizarJogadorDto);
    }

    @Post('/:id/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadArquivo (
        @UploadedFile() file,
        @Param('id') id: string
    ){
        return this.jogadoresService.uploadArquivo(file, id);
    }

    @Delete('/:id')
    deletarJogador (@Param('id', ValidacaoParametrosPipe) id: string) {
        this.jogadoresService.deletarJogador(id);
    }
    
}
