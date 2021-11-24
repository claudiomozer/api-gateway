import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    private readonly jogadoresService: JogadoresService;
    private readonly logger = new Logger(JogadoresController.name);

    constructor( jogadoresService: JogadoresService ) {
        this.jogadoresService = jogadoresService;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador (
        @Body() criarJogadorDto: CriarJogadorDto
    ) {
        this.jogadoresService.criarJogador(criarJogadorDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    consultarJogadorById ( @Param('id', ValidacaoParametrosPipe) id: string ) : Observable<any>
    {
        return this.jogadoresService.consultarJogadorById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    consultarTodosJogadores () : Observable<any>
    {
        return this.jogadoresService.consultarTodosJogadores();
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Param('id', ValidacaoParametrosPipe) id: string,
        @Body() atualizarJogadorDto: AtualizarJogadorDto
    ) {
        this.jogadoresService.atualizarJogador(id, atualizarJogadorDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/:id/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadArquivo (
        @UploadedFile() file,
        @Param('id') id: string
    ){
        return this.jogadoresService.uploadArquivo(file, id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    deletarJogador (@Param('id', ValidacaoParametrosPipe) id: string) {
        this.jogadoresService.deletarJogador(id);
    }
    
}
