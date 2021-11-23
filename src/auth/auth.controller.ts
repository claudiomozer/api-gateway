import { Body, Controller, Post } from '@nestjs/common';
import { AwsCognitoService } from 'src/infrastructure/services/aws-cognito.service';
import { AuthLoginUsuarioDto } from './dtos/auth-login-usuario.dto';
import { AuthRegistroUsuarioDto } from './dtos/auth-registro-usuario.dto';

@Controller('api/v1/auth')
export class AuthController
{
    private readonly awsCognitoService: AwsCognitoService;

    constructor(awsCognitoService: AwsCognitoService)
    {
        this.awsCognitoService = awsCognitoService;
    }

    @Post('/registro')
    async registro (
        @Body() authRegistroUsuarioDto: AuthRegistroUsuarioDto
    ) {
        return await this.awsCognitoService.registrarUsuario(authRegistroUsuarioDto);
    }

    @Post('/login')
    async login(
        @Body() authLoginUsuarioDto: AuthLoginUsuarioDto
    ) {
        return await this.awsCognitoService.autenticarUsuario(authLoginUsuarioDto);
    }
}
