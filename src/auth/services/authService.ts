import axios from 'axios';

import { API_URL, AUTHORIZATION_HEADER_NAME } from '../../common/constants';
import { UserInterface } from '../../common/types/UserInterface';

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

      const accessToken = response.data.token;

      return accessToken;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  }

  async logout() {
    // TODO
  }

  async register(firstName: string, email: string, password: string) {
    try {
      const response = await axios.post<{ token: string }>(
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

      const accessToken = response.data.token;

      return accessToken;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  }

  async getProfile(accessToken: string): Promise<UserInterface | null> {
    try {
      const response = await axios.get<UserInterface>(`${API_URL}/api/v1/auth/profile`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          [AUTHORIZATION_HEADER_NAME]: accessToken,
        },
      });

      return response.data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return null;
    }
  }
}

export default new AuthService();
