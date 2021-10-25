import { IsNotEmpty, Validate } from "class-validator";
import { DesafioStatus } from "../interfaces/desafio-status.enum";
import { DesafioStatusValidator } from "../validators/desafio-status.validator";

export class AtualizarDesafioDto
{
    @IsNotEmpty()
    @Validate(DesafioStatusValidator)
    status: DesafioStatus;
}