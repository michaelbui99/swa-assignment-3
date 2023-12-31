import { Game } from "../models/game";
import { Generator } from "../../game/board";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Position } from "../../game/board";
import { move, create } from "../../game/board";
import { User } from "../models/user";
import { RandomGenerator } from "../../game/random-generator";

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
    value: undefined,
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        makeMove: (state, action: PayloadAction<Move>) => {
            if (!state.value) {
                return { value: undefined };
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
                    movesUsed: state.value.movesUsed + 1,
                    score: state.value.score + 1000 * matchEffects.length,
                },
            };
        },
        setGame: (_, action: PayloadAction<Game>) => {
            return {
                value: action.payload,
            };
        },
    },
    extraReducers: (_) => {},
});

export const createNewGameThunk = createAsyncThunk<void, User>(
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
        const newGameWithBoard = {
            ...newGame,
            movesUsed: 0,
            board: create(new RandomGenerator(), 5, 5),
        };
        thunkAPI.dispatch(gameSlice.actions.setGame(newGameWithBoard));
    }
);

export const makeMoveThunk = createAsyncThunk<void, Move>(
    "game/makeMoveThunk",
    async (move, thunkAPI) => {
        const state = (thunkAPI.getState() as any).game as GameState;
        const rollbackState: GameState = JSON.parse(JSON.stringify(state));

        thunkAPI.dispatch(gameSlice.actions.makeMove(move));

        const baseUrl = "http://localhost:9090";
        const endpoint = `${baseUrl}/games/${state.value?.id}?token=${move.user.token}`;
        const response = await fetch(endpoint, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify((thunkAPI.getState() as GameState).value),
        });

        if (response.status < 200 || response.status >= 300) {
            thunkAPI.dispatch(gameSlice.actions.setGame(rollbackState.value!));
        }

        // return (thunkAPI.getState() as GameState).value!;
    }
);

export const endGameThunk = createAsyncThunk<void, User>(
    "game/makeMoveThunk",
    async (user, thunkAPI) => {
        const state = (thunkAPI.getState() as any).game as GameState;
        const rollbackState = JSON.parse(JSON.stringify(state)) as GameState;

        const desiredStateOfGame: Game = { ...state.value!, completed: true };
        const baseUrl = "http://localhost:9090";
        const endpoint = `${baseUrl}/games/${state.value?.id}?token=${user.token}`;
        const response = await fetch(endpoint, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(desiredStateOfGame),
        });

        if (response.status < 200 || response.status >= 300) {
            thunkAPI.dispatch(gameSlice.actions.setGame(rollbackState.value!));
        }

        thunkAPI.dispatch(gameSlice.actions.setGame(desiredStateOfGame));
    }
);

export default gameSlice.reducer;
