
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Game } from "../models/game";



export interface GameState {
    value: Game | undefined;
}

const initialGame = {
    value: undefined,
}; // Define initialGame variable

const gameReducers = {
    updateGame: (state: any, action: PayloadAction<any>) => {
        console.log("updating game:", action.payload);
        return { ...state, 
                value: action.payload 
                }
    }
}

export const gameSlice = createSlice({
    name: "game",
    initialState: initialGame, // Use initialGame variable
    reducers: gameReducers,
});

export const {  updateGame } = gameSlice.actions;
export default gameSlice.reducer;


