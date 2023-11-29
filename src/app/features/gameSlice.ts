import { Game } from "../models/game";
import { Generator } from "../../game/board";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Position } from "../../game/board";
import { move, create } from "../../game/board";
import { User } from "../models/user";
import { createRandomGenerator } from "../../game/random-generator";

export interface GameState {
    value: Game | undefined;
}

export type Move = {
    user: User;
    from: Position;
    to: Position;
    generator: Generator<string>;
};

const initialState: GameState = {
    value: undefined;
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        makeMove: (state, action: PayloadAction<Move>) => {
            if (!state.value) {
                return{value: undefined}
            }
            const { from, to, generator } = action.payload;
            const result = move(generator, state.value.board, from, to);

            const matchEffects = result.effects.filter(
                (effect) => effect.kind === "Match"
            );

            return {
                value: {
                        ...state.value,
                        board: result.board,
                        score:
                            state.value.score + 1000 * matchEffects.length,
                },
            };
        },
        setGame: (_, action: PayloadAction<Game>) => {
            return {
                value: action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(makeMoveThunk.fulfilled, (state, action) => {
            state.value = action.payload;
        });
    },
});

export const createNewGameThunk = createAsyncThunk<Game, User>(
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

        return {
            ...newGame,
            board: create(createRandomGenerator(["A", "B", "C"]), 3, 3),
        };
    }
);

export const makeMoveThunk = createAsyncThunk<Game, Move>(
    "game/makeMoveThunk",
    async (move, thunkAPI) => {
        const state = thunkAPI.getState() as GameState;
        const rollbackState: GameState = JSON.parse(JSON.stringify(state));

        thunkAPI.dispatch(gameSlice.actions.makeMove(move));

        const baseUrl = "http://localhost:9090";
        const endpoint = `${baseUrl}/games?token=${move.user.token}`;
        const response = await fetch(endpoint, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify((thunkAPI.getState() as GameState).value),
        });

        if (response.status < 200 || response.status >= 300) {
            return rollbackState.value!;
        }

        return (thunkAPI.getState() as GameState).value!;
    }
);

export default gameSlice.reducer;
