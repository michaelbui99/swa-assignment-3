import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Game } from "../models/game";
import { User } from "../models/user";
import {
    Position,
    create,
    move,
    Generator,
    MatchEffect,
    canMove,
} from "../../game/board";
import { RandomGenerator } from "../../game/random-generator";

export interface GameState {
    value: Game | undefined;
    generator: Generator<string>;
}

const initialState: GameState = {
    value: undefined,
    generator: new RandomGenerator(),
};

export type Move = {
    from: Position;
    to: Position;
};

export const createGame = createAsyncThunk<Game, User>(
    "game/createGame",
    async (user, thunkAPI) => {
        if (!user.token) {
            return undefined;
        }
        const baseUrl = "http://localhost:9090";
        const endpoint = `${baseUrl}/games?token=${user.token}`;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const state = thunkAPI.getState() as GameState;
        const game = await response.json();
        const newBoard = create(state.generator, 3, 3);
        return { ...game, board: newBoard };
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        makeMove(state, action: PayloadAction<Move>) {
            if (!state.value) {
                return state;
            }

            if (state.value.completed) {
                return state;
            }

            const moveResult = move(
                state.generator,
                state.value!.board,
                action.payload.from,
                action.payload.to
            );

            const newScore = moveResult.effects
                .filter((effect) => effect.kind === "Match")
                .map((effect) => effect as MatchEffect<string>)
                .reduce(
                    (acc, curr) => acc + curr.match.positions.length,
                    state.value.score
                );

            return {
                value: {
                    board: moveResult.board,
                    completed: false,
                    score: newScore,
                    id: state.value.id,
                    user: state.value.user,
                },
            };
        },
    },
    extraReducers: (builder) => {},
});

export default userSlice.reducer;
