import { Game } from "../models/game";
import { Generator } from "../../game/board";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Position } from "../../game/board";
import { move } from "../../game/board";
import { createRandomGenerator } from "../../game/random-generator";
import { User } from "../models/user";

export interface GameState {
    value: {
        game: Game | undefined;
    };
}

export type Move = {
    from: Position;
    to: Position;
    generator: Generator<string>;
};

const initialState: GameState = {
    value: {
        game: undefined,
    },
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        makeMove: (state, action: PayloadAction<Move>) => {
            if (!state.value.game) {
                return undefined;
            }
            const { from, to, generator } = action.payload;
            const result = move(generator, state.value.game.board, from, to);

            const matchEffects = result.effects.filter(
                (effect) => effect.kind === "Match"
            );

            return {
                value: {
                    game: {
                        ...state.value.game,
                        board: result.board,
                        score:
                            state.value.game.score + 1000 * matchEffects.length,
                    },
                },
            };
        },
        setGame: (_, action: PayloadAction<Game>) => {
            return {
                value: {
                    game: action.payload,
                },
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
