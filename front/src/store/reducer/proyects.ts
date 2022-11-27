import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ArgsGetProjects } from "src/types/store/argsFuncProjects";
import { ProjetsState } from "src/types/store/reducer";
import { RootState } from "..";
import { getProjets } from "./asyncFunc/funcGetProy";

export const initialState: ProjetsState = {
    project: {},
    projects: [],
    status: 'loading'
}

export const getProys = createAsyncThunk(
    'projets/getProjets',
    async (data: ArgsGetProjects) => {
        const { numPro } = data;
        let result = await getProjets({ numPro })
            .then(responce => responce.data)
            .catch(error => error.response.data);
        return result;
    });

export const projectsSlice = createSlice({
    name: 'projets',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProys.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProys.fulfilled, (state, action) => {
                const { payload: { status, data } } = action;
                state.status = status === 'error' ? 'error' : 'success';
                state.projects = data !== undefined ? data : [];
            })
    }
})

export const { projetct, projects, status } = {
    projetct: (state: RootState) => state.projets.project,
    projects: (state: RootState) => state.projets.projects,
    status: (state: RootState) => state.projets.status
}

export default projectsSlice.reducer;