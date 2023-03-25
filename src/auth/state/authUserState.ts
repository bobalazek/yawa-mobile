import {atom} from 'recoil';
import {UserInterface} from '../../common/types/UserInterface';

const authUserState = atom<UserInterface | null>({
  key: 'AuthUser',
  default: null,
});

export {authUserState};
