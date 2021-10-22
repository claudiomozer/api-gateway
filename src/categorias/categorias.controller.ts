import { Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ClientAdminBackendService } from 'src/common/infrastructure/services/client-admin-backend.service';
import { AtualizarCategoriaDto } from './dtos/atualiza-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('/api/v1/categorias')
export class CategoriasController {
    private readonly clientAdminBackendService: ClientAdminBackendService;

    constructor(clientAdminBackendService: ClientAdminBackendService) {
        this.clientAdminBackendService = clientAdminBackendService;
    }

    @Post('')
    @UsePipes(ValidationPipe)
    async criarCategoria(
      @Body() criarCategoriaDto: CriarCategoriaDto
    ) {
      this.clientAdminBackendService.client().emit('criar-categoria', criarCategoriaDto);
    }
  
    @Get('')
    consultarCategorias(@Query('idCategoria') id: CriarCategoriaDto) : Observable<any>
    {
      return this.clientAdminBackendService.client().send('consultar-categorias', id ? id : '');
    }
  
    @Put('/:id')
    @UsePipes(ValidationPipe)
    atualizarCategoria(
      @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
      @Param('id') id: string
    ) {
      this.clientAdminBackendService.client().emit('atualizar-categoria', {
        id,
        categoria: atualizarCategoriaDto
      });
    }

}
