import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { scoreSlcie } from "./features/scoreSlice";
import { gameSlice } from "./features/gameSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        score: scoreSlcie.reducer,
        game: gameSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
