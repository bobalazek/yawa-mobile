import NetInfo, { NetInfoSubscription } from '@react-native-community/netinfo';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

let netInfoSubscription: NetInfoSubscription;
export const attachEventListeners = createAsyncThunk('network/attachEventListeners', async (_, { dispatch }) => {
  const state = await NetInfo.fetch();
  dispatch(setIsConnected(!!state.isConnected));
  dispatch(setConnectionType(state.type));

  netInfoSubscription = NetInfo.addEventListener((eventState) => {
    dispatch(setIsConnected(!!eventState.isConnected));
    dispatch(setConnectionType(eventState.type));
  });
});

export const detachEventListeners = createAsyncThunk('network/detachEventListeners', async () => {
  netInfoSubscription();
});

export const { setIsConnected, setConnectionType } = networkSlice.actions;

export const isConnectedSelector = (state: RootState) => state.network.isConnected;
export const connectionTypeSelector = (state: RootState) => state.network.connectionType;

export default networkSlice.reducer;
