import axios from 'axios';
import { snapshot_UNSTABLE } from 'recoil';

import { API_URL } from '../../common/constants';
import { UserInterface } from '../../common/types/UserInterface';
import { authAccessTokenState } from '../state/authAccessTokenState';
import { authUserState } from '../state/authUserState';

class AuthService {
  async login(email: string, password: string) {
    try {
      const response = await axios.post<{ token: string }>(
        `${API_URL}/api/v1/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
      );

      snapshot_UNSTABLE(async ({ set }) => {
        set(authAccessTokenState, response.data.token);
      });

      return response.data.token;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  }

  async logout() {
    snapshot_UNSTABLE(async ({ set }) => {
      set(authAccessTokenState, null);
    });
  }

  async register(firstName: string, email: string, password: string) {
    try {
      const response = await axios.post<UserInterface>(
        `${API_URL}/api/v1/auth/register`,
        {
          firstName,
          email,
          password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
      );

      snapshot_UNSTABLE(async ({ set }) => {
        set(authUserState, response.data);
      });

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  }
}

export default new AuthService();
