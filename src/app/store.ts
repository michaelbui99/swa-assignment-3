import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import {gameSlice}  from "./features/gameSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        game: gameSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
