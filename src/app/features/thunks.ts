import { Board, create } from "../../game/board";
import { createRandomGenerator } from "../../game/random-generator";
import { User } from "../models/user";
import { AppDispatch,  } from "../store";
import {  updateGame } from "./gameSlice";


export const createGameThunk = (user: User) => {
    return async (dispatch: AppDispatch) => {
        if (!user?.token) {
            return undefined;
        }
        const baseUrl = "http://localhost:9090";
        const endpoint = `${baseUrl}/games?token=${user.token}`;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        const game = await response.json();
        const newBoard: Board<string> = create(createRandomGenerator(), 4, 3);
        dispatch(updateGame({ ...game, board: newBoard }));
    };
};

export const updateGameThunk = (user: User, game: any) => {
    return async (dispatch: AppDispatch) => {
        if (!user?.token) {
            return undefined;
        }
        const baseUrl = "http://localhost:9090";
        const endpoint = `${baseUrl}/games/${game.id}?token=${user.token}`;
        const response = await fetch(endpoint, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(game),
        });
        const updatedGame = await response;
        dispatch(updateGame(game));
    };
}


    
