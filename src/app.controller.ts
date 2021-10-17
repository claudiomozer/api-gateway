import { Body, Controller, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);
  private clientAdminBackend: ClientProxy;
  private configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
    let amqpUrl = 'amqp://';
    amqpUrl += `${this.configService.get<string>('RABBITMQ_USER')}:`;
    amqpUrl += this.configService.get<string>('RABBITMQ_PASS');
    amqpUrl += `@${this.configService.get<string>('RABBITMQ_HOST')}`;
    amqpUrl += `:${this.configService.get<string>('RABBITMQ_PORT')}/smartranking`;

    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options:{
        urls: [amqpUrl],
        queue: 'admin-backend'
      }
    });
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto
  ) {
    return await this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto);
  }

}
