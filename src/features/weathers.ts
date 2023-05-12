import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherType } from '../types/WeatherType';
import { ErrorText } from '../types/ErrorText';
import { getWeather } from '../api';

type weathersStateType = {
  weathers: WeatherType[],
  loading: boolean,
  error: ErrorText,
};

const initialState: weathersStateType = {
  weathers: [],
  loading: false,
  error: ErrorText.NONE,
};

const citiesIdsJSON = localStorage.getItem('citiesIds');
const citiesIds: number[] = (citiesIdsJSON ? JSON.parse(citiesIdsJSON) : []);

export const init = createAsyncThunk('weathers/fetch', async () => {
  return Promise.all(citiesIds.map(cityId => getWeather(`${cityId}`)));
});

export const addNew = createAsyncThunk('weather/fetch', (id: string) => getWeather(id));

export const updateOne = createAsyncThunk('weather/fetchUpdate', async (id: string) => getWeather(id));

const weathersSlice = createSlice({
  name: 'weathers',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<WeatherType[]>) => {
      return { ...state, weathers: action.payload };
    },
    delete: (state, action: PayloadAction<number>) => {
      const newWeathers = state.weathers
        .filter(weather => weather.id !== action.payload);
      const ids = newWeathers.map(weather => weather.id);

      localStorage.setItem('citiesIds', JSON.stringify(ids));

      return { ...state, weathers: newWeathers };
    },
    setError: (state, action: PayloadAction<ErrorText>) => {
      return { ...state, error: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return ({ ...state, loading: true });
    });

    builder.addCase(init.fulfilled, (state, action) => {
      if (citiesIds.length === 0) {
        return ({ ...state, weathers: action.payload, loading: false });
      }

      if (action.payload[0]?.cod === 200) {
        return ({ ...state, weathers: action.payload, loading: false });
      }

      return ({ error: ErrorText.LOAD_WEATHER, weathers: [], loading: false });
    });

    builder.addCase(init.rejected, (state) => {
      return ({ ...state, error: ErrorText.LOAD_WEATHER, loading: false });
    });

    builder.addCase(addNew.pending, (state) => {
      return ({ ...state, loading: true });
    });

    builder.addCase(addNew.fulfilled, (state, action) => {
      if (action.payload?.cod === 200) {
        const ids = state.weathers.map(weather => weather.id);

        localStorage.setItem('citiesIds', JSON.stringify([...ids, action.payload.id]));

        return ({
          ...state,
          weathers: [...state.weathers, action.payload],
          loading: false,
        });
      }

      return ({ error: ErrorText.LOAD_ONE, weathers: [...state.weathers], loading: false });
    });

    builder.addCase(addNew.rejected, (state) => {
      return ({ ...state, error: ErrorText.LOAD_ONE, loading: false });
    });

    builder.addCase(updateOne.fulfilled, (state, action) => {
      return ({
        ...state,
        weathers: state.weathers
          .map(weather => (weather.id === action.payload.id ? action.payload : weather)),
      });
    });
  },
});

export default weathersSlice.reducer;
export const { actions } = weathersSlice;
