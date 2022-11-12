import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginState } from "src/types/store/reducer";
import { RootState } from "..";
import { LogInInput } from "src/types/login";
import { apiLogIn } from "./asyncFunc/funcAuth";

const initialState: LoginState = {
    token: '',
    dataUser: {
        Id: '',
        Email: '',
        Rolle: ''
    },
    errors: null
}

export const initSesion = createAsyncThunk(
    'logIn/apiLogIn',
    async (input: LogInInput) => {
        const result = await apiLogIn(input)
            .then(resp => resp.data)
            .catch(error => error.response.data);
        return result;
    }
);

export const logInSlice = createSlice({
    name: 'logIn',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initSesion.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(initSesion.fulfilled, (state, action) => {
                state.status = 'success';
                state.token = action.payload.token !== undefined
                    ? action.payload.token : '';
                state.dataUser = action.payload.token !== undefined
                    ? action.payload.dataUser
                    : { Id: '', Email: '', Rolle: '' };
                state.errors = action.payload.msg !== undefined ? action.payload : {};
            })
    }
})


//export const { initSesion } = logInSlice.actions;
export const { selectData, selectToken, selectErrors } = {
    selectToken: (state: RootState) => state.login.token,
    selectData: (state: RootState) => state.login.dataUser,
    selectErrors: (state: RootState) => state.login.errors
};

export default logInSlice.reducer;