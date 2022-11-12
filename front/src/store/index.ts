import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import logInSlice from "./reducer/auth";
import pruebaSlice from "./reducer/prueba";

export const store = configureStore({
    reducer: {
        login: logInSlice,
        prueba: pruebaSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;