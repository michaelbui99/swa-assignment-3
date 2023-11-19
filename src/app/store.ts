import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { scoreSlcie } from "./features/scoreSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        score: scoreSlcie.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
