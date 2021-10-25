import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export interface Partida
{
    categoria?: string,
    desafio?: string,
    jogadores?: Array<Jogador>,
    def?: Jogador,
    resultado?: Array<Resultado>
}

export interface Resultado
{
    set: string
}