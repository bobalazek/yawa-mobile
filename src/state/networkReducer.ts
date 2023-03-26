import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface NetworkState {
  isConnected: boolean;
  connectionType: string;
}

const initialState: NetworkState = {
  isConnected: true,
  connectionType: 'unknown',
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setConnectionType: (state, action: PayloadAction<string>) => {
      state.connectionType = action.payload;
    },
  },
});

export const { setIsConnected, setConnectionType } = networkSlice.actions;

export const isConnectedSelector = (state: RootState) => state.network.isConnected;
export const connectionTypeSelector = (state: RootState) => state.network.connectionType;

export default networkSlice.reducer;
