import { Jogador } from "src/jogadores/interfaces/jogador.interface";
import { DesafioStatus } from "./desafio-status.enum";
import { Partida } from "./partida.interface";

export interface Desafio
{
    dataHoraDesafio: Date,
    status: DesafioStatus,
    dataHoraSolicitacao: Date,
    dataHoraResposta: Date,
    solicitante: Jogador,
    categoria: string,
    partida?: string,
    jogadores: Array<Jogador>
}
