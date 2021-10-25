import { Controller } from '@nestjs/common';
import { ClientAdminBackendService } from 'src/infrastructure/services/client-admin-backend.service';
import { ClientDesafiosService } from 'src/infrastructure/services/client-desafios.service';

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
}
