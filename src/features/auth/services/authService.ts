import axios, { AxiosError } from 'axios';
import * as RNLocalize from 'react-native-localize';

import { API_URL } from '../../../constants';
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
          timeout: 5000,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
      );

      return response.data.token;
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }

      throw new Error('Something went wrong. Please make sure you have a stable internet connection.');
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
          timezone: RNLocalize.getTimeZone(),
          measurementSystem: RNLocalize.usesMetricSystem() ? 'metric' : 'imperial',
        },
        {
          timeout: 5000,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
      );

      return response.data.token;
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }

      throw new Error('Something went wrong. Please make sure you have a stable internet connection.');
    }
  }

  async logout(): Promise<string> {
    try {
      const response = await axios.post<{ message: string }>(`${API_URL}/api/v1/auth/logout`, {
        timeout: 5000,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });

      return response.data.message;
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }

      throw new Error('Something went wrong. Please make sure you have a stable internet connection.');
    }
  }

  async getProfile(): Promise<UserInterface | null> {
    try {
      const response = await axios.get<UserInterface>(`${API_URL}/api/v1/auth/profile`, {
        timeout: 5000,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });

      return response.data;
    } catch (err: unknown) {
      return null;
    }
  }
}

export default new AuthService();
