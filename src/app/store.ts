import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import gameSlice from "./features/gameSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        game: gameSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
