import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor
{

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> 
    {
        console.log('Inicio da requisição');
        const now = Date.now();

        return next
            .handle()
            .pipe(
                tap(() => console.log(`Final da requisição: ${Date.now() - now}ms`))
            );
    }

} 