import { Game } from "../models/game";
import { Generator } from "../../game/board";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Position } from "../../game/board";
import { move } from "../../game/board";
import { createRandomGenerator } from "../../game/random-generator";
import { User } from "../models/user";

export interface GameState {
    game: Game | undefined;
    generator: Generator<string>;
}

export type Move = {
    from: Position;
    to: Position;
};

const initialState: GameState = {
    game: undefined,
    generator: createRandomGenerator(["A", "B", "C"]),
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        makeMove: (state, action: PayloadAction<Move>) => {
            if (!state.game) {
                return undefined;
            }
            const { from, to } = action.payload;
            const result = move(state.generator, state.game.board, from, to);

            const matchEffects = result.effects.filter(
                (effect) => effect.kind === "Match"
            );

            return {
                game: {
                    ...state.game,
                    board: result.board,
                    score: state.game.score + 1000 * matchEffects.length,
                },
                generator: state.generator,
            };
        },
        setGame: (state, action: PayloadAction<Game>) => {
            return {
                game: action.payload,
                generator: state.generator,
            };
        },
    },
    extraReducers: (_) => {},
});

export const createNewGame = createAsyncThunk<Game, User>(
    "game/newGame",
    async (user, thunkAPI) => {
        const baseUrl = "http://localhost:9090";
        const endpoint = `${baseUrl}/games?token=${user.token}`;
        const response = await fetch(endpoint, {
            method: "POST",
        });
        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(undefined);
        }

        const newGame = (await response.json()) as Game;
        thunkAPI.dispatch(gameSlice.actions.setGame(newGame));

        return newGame;
    }
);
export default gameSlice.reducer;
