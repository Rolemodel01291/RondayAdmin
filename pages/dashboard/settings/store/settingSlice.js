import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from "../../../../services/api/api";

const initialState = {

};

export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {

    },
    extraReducers: {
    }
});

export const { } = settingSlice.actions;

export default settingSlice.reducer;



