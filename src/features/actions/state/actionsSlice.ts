import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../../store';
import actionsService from '../services/actionsService';
import { ActionInterface } from '../types/ActionInterface';

interface ActionsState {
  isLoading: boolean;
  actions: ActionInterface[];
}

const initialState: ActionsState = {
  isLoading: false,
  actions: [],
};

const slice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setActions: (state, action: PayloadAction<ActionInterface[]>) => {
      state.actions = action.payload;
    },
  },
});

export const fetchActions = createAsyncThunk<undefined, undefined>(
  'actions/updateProfile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setIsLoading(true));

      const actions = await actionsService.getAll();

      dispatch(setActions(actions));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';

      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const { setIsLoading, setActions } = slice.actions;

export const isLoadingSelector = (state: RootState) => state.actions.isLoading;
export const actionsSelector = (state: RootState) => state.actions.actions;

export default slice.reducer;
