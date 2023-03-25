import { atom } from 'recoil';

const authAccessTokenState = atom<string | null>({
  key: 'AuthAccessToken',
  default: null,
});

export { authAccessTokenState };
