import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'recoil';

const authAccessTokenState = atom<string | null>({
  key: 'AuthAccessToken',
  default: AsyncStorage.getItem('AuthAccessToken') ?? null,
  effects: [
    ({ setSelf, onSet }) => {
      onSet((newValue) => {
        if (newValue) {
          AsyncStorage.setItem('AuthAccessToken', newValue);
        } else {
          AsyncStorage.removeItem('AuthAccessToken');
        }

        setSelf(newValue);
      });
    },
  ],
});

export { authAccessTokenState };
