import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator'

export class CriarJogadorDto
{
    @IsNotEmpty()
    readonly telefone: string;
    
    @IsEmail()
    readonly email: string;
    
    @IsNotEmpty()
    readonly nome: string;
    
    @IsNotEmpty()
    @IsMongoId()
    readonly categoria: string
}