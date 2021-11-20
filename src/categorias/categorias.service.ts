import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientAdminBackendService } from 'src/infrastructure/services/client-admin-backend.service';
import { AtualizarCategoriaDto } from './dtos/atualiza-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Injectable()
export class CategoriasService
{
    private readonly clientAdminBackendService: ClientAdminBackendService;

    constructor(clientAdminBackendService: ClientAdminBackendService) {
        this.clientAdminBackendService = clientAdminBackendService;
    }

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto ) {
        this.clientAdminBackendService.client().emit('criar-categoria', criarCategoriaDto);
    }
  
    consultarCategorias(id: CriarCategoriaDto) : Observable<any>
    {
        return this.clientAdminBackendService.client().send('consultar-categorias', id ? id : '');
    }
  
    atualizarCategoria(
        atualizarCategoriaDto: AtualizarCategoriaDto,
        id: string
    ) {
      this.clientAdminBackendService.client().emit('atualizar-categoria', {
        id,
        categoria: atualizarCategoriaDto
      });
    }
}
