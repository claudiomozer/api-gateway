import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
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

    @Post('')
    @UsePipes(ValidationPipe)
    criarCategoria (
      @Body() criarCategoriaDto: CriarCategoriaDto
    ) {
        this.categoriasService.criarCategoria(criarCategoriaDto);
    }
  
    @Get('')
    consultarCategorias(@Query('idCategoria') id: CriarCategoriaDto)
    {
        return this.categoriasService.consultarCategorias(id);
    }
  
    @Put('/:id')
    @UsePipes(ValidationPipe)
    atualizarCategoria(
      @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
      @Param('id') id: string
    ) {
        this.categoriasService.atualizarCategoria(atualizarCategoriaDto, id);
    }

}
