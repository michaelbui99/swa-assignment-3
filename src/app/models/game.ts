import { Board } from "../../game/board";

export type Game = {
    id: number;
    user: number;
    score: number;
    completed: boolean;
    board: Board<string>;
};
