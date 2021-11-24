import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualiza-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('/api/v1/categorias')
export class CategoriasController {
    private readonly categoriasService: CategoriasService;

    constructor( categoriasService: CategoriasService ) {
        this.categoriasService = categoriasService;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('')
    @UsePipes(ValidationPipe)
    criarCategoria (
      @Body() criarCategoriaDto: CriarCategoriaDto
    ) {
        this.categoriasService.criarCategoria(criarCategoriaDto);
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get('')
    consultarCategorias(@Query('idCategoria') id: CriarCategoriaDto)
    {
        return this.categoriasService.consultarCategorias(id);
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    @UsePipes(ValidationPipe)
    atualizarCategoria(
      @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
      @Param('id') id: string
    ) {
        this.categoriasService.atualizarCategoria(atualizarCategoriaDto, id);
    }

}
