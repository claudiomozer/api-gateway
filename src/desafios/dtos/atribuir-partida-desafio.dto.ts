import { IsNotEmpty } from "class-validator";
import { Resultado } from "../interfaces/partida.interface";

export class AtribuirPartidaDesafioDto
{
    @IsNotEmpty()
    def: string;
    
    @IsNotEmpty()
    resultado: Array<Resultado>;
}