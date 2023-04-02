import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../../store';
import { ActionType } from '../schemas/ActionSchema';
import actionsService from '../services/actionsService';

interface ActionsState {
  isLoading: boolean;
  entries: ActionType[];
}

const initialState: ActionsState = {
  isLoading: false,
  entries: [],
};

const slice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setEntries: (state, action: PayloadAction<ActionType[]>) => {
      state.entries = action.payload;
    },
  },
});

export const fetchEntries = createAsyncThunk<undefined, undefined>(
  'actions/fetchEntries',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setIsLoading(true));

      const entries = await actionsService.getAll();

      dispatch(setEntries(entries));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';

      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const { setIsLoading, setEntries } = slice.actions;

export const isLoadingSelector = (state: RootState) => state.actions.isLoading;
export const entriesSelector = (state: RootState) => state.actions.entries;

export default slice.reducer;
