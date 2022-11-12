import { createSlice } from "@reduxjs/toolkit"
import { prueba } from "src/types/store/reducer"
import { RootState } from "..";

const initialState: prueba = {
    count: 0,
    status: 'loading'
}

export const pruebaSlice = createSlice({
    name: 'prueba',
    initialState,
    reducers: {
        addPrueba: (state) => {
            state.count += 1;
        },
        removePrueba: (state) => {
            state.count -= 1;
        },
        incrementX: (state, action) => {
            state.count += action.payload;
        }
    }
});

export const { addPrueba, removePrueba, incrementX } = pruebaSlice.actions;
export const selectPrueba = (state: RootState) => state.prueba.count;
export default pruebaSlice.reducer;