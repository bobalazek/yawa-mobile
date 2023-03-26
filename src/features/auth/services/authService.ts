import axios from 'axios';

import { API_URL, AUTHORIZATION_HEADER_NAME } from '../../../constants';
import { UserInterface } from '../../../types/UserInterface';

class AuthService {
  async login(email: string, password: string): Promise<string> {
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

      return response.data.token;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  }

  async register(firstName: string, email: string, password: string): Promise<string> {
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

      return response.data.token;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  }

  async logout(accessToken: string): Promise<string> {
    try {
      const response = await axios.post<{ message: string }>(`${API_URL}/api/v1/auth/register`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          [AUTHORIZATION_HEADER_NAME]: accessToken,
        },
      });

      return response.data.message;
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
