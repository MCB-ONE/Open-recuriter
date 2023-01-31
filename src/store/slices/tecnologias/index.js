import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../message';

import TecnologiasService from '../../../services/tecnologias/tecnologias.service';

// CRUD thunk middlewares
export const getAllTecnologias = createAsyncThunk(
  'tecnologias/fetchAll',
  async (thunkAPI) => {
    try {
      const res = await TecnologiasService.getAllTecnologias();
      return { tecnologias: res.data };
    } catch (error) {
      const message = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getTecnologiaById = createAsyncThunk(
  'tecnologias/fetchById',
  async (id, thunkAPI) => {
    try {
      const res = await TecnologiasService.getTecnologiasById(id);
      return { tecnologia: res.data };
    } catch (error) {
      const message = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return error;
    }
  },
);

// Sync reducer
export const cleanTecnologiaDetail = () => {
  // eslint-disable-next-line no-undef
  return dispatch(cleanTecnologiaDetail(false));
};

// Slice initial state
const initialState = {
  list: false,
  detail: false,
  filters: [],
  isLoading: false,
  error: false,
};

const tecnologiasSlice = createSlice({
  name: 'tecnologias',
  initialState,
  reducers: {
    resetFilters: (state) => {
      state.filters = [];
    },
    setFilters: (state, action) => {
      const { payload } = action;
      const ids = [];
      payload.map((tech) => ids.push(tech.label));
      state.filters = ids;
    },
  },
  extraReducers: {
    [getAllTecnologias.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllTecnologias.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = action.payload.tecnologias;
    },
    [getAllTecnologias.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = [action];
    },
    // TecnologiasByIdReducers
    [getTecnologiaById.pending]: (state) => {
      state.loading = true;
    },
    [getTecnologiaById.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail = [action.payload.tecnologia];
    },
    [getTecnologiaById.rejected]: (state, action) => {
      state.loading = false;
      state.error = [action.payload];
    },
  },
});
// Destructure and export the plain action creators
export const { resetFilters, setFilters } = tecnologiasSlice.actions;
const { reducer } = tecnologiasSlice;
export default reducer;
